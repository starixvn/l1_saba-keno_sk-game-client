import { withTranslation } from "next-i18next";
import { withRouter } from "next/router";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { LanguageLocaleMapper } from "../../../common/constants";
import { RoundKenoMatchBase } from "../../../types";
import RoundSettlementResult from "../../keno/settlement-result";
import GameBase from "../../shared/game-base";
import { GameState, PopupType, WinStreakCollectorModel } from "../../shared/game-base/type";
import GameHeader from "../../shared/game-header";
import OverlayMaskWhite from "../../shared/overlay-mask-white";
import ScoreboardDragon from "../../shared/round-history/scoreboard/dragon";
import ScoreboardTab from "../../shared/scoreboard-tab";
import { StatisticFollowPercent } from "../../shared/statistic";
import KenoMatchBetOptions from "./bet-options";
import KenoCountdownTimer from "./countdown-timer";
import Styles from "./game.module.scss";
import { ChoiceForTabActive, Choices, defaultResult, FakeSettlementResult, StatisticRuleMapping } from "./keno-match-helper";
import AnimationResult from "./round-result/animation-result";
import MainFrameResult from "./round-result/main-frame-result";
import { KenoMatchGameBaseState, KenoMatchProps, KenoMatchRound, Result, SeparateRoundHistoryProps, SettlementResult } from "./type";

export class KenoSoccer extends GameBase<KenoMatchProps, KenoMatchGameBaseState<Result, SettlementResult>> {
    protected showResultInfoH1Timeout: NodeJS.Timeout;
    private winStreakCollectorFH: WinStreakCollectorModel;
    private winStreakCollectorFT: WinStreakCollectorModel;
    private isUM = false;

    constructor(props: KenoMatchProps) {
        super(props);

        this.state = {
            ...this.defaultState,
            ...{
                signedIn: false,
                gameState: GameState.None,
                remainingTime: 0,
                gameConfigs: { ...this.defaultGameConfig },
                roundId: 0,
                ownBets: {},
                totalBets: {},
                displayPopup: null,
                betPercentage: {},
                viewMode: this.props.viewMode,
                showResultInfo: false,
                acceptedBetQueue: {},
                showWinningAnimation: false,
                playResultAnimation: false,
                isShowBlink: false,
                notice: null,
                activeScoreboardTab: 0,
                md5: "",
                md5ResultKey: "",
                rate: 1,
                disconnectReason: "",
                roundHistory: [],
                liveOdds: null,
                halfTimeResult: defaultResult,
                fullTimeResult: defaultResult,
                halfTimeResultInline: defaultResult,
                fullTimeResultInline: defaultResult,
                isShowBlinkFH: false,
                isShowBlinkFT: false,
                roundHistoryFH: [],
                roundHistoryFT: [],
                isJoiningAtMiddleShowInlineResult: false,
                isFirstHalf: false,
                isShowSettlementResult: false,
                isShowInlineResult: false,
                beforeStartFulltime: false,
                isShowFTScore: false,
                isShowH1Score: false,
            },
        };
    }

    onDestroy() {
        super.onDestroy();
        this.clearTimeout();
        this.socket && this.socket.disconnect();
    }

    clearTimeout = () => {
        this.showResultInfoH1Timeout && clearTimeout(this.showResultInfoH1Timeout);
        this.showResultInfoTimeout && clearTimeout(this.showResultInfoTimeout);
        this.showWinningAnimationTimeout && clearTimeout(this.showWinningAnimationTimeout);
    };

    retryConnect = () => {
        this.onStart();
    };

    async onStart() {
        await super.onStart();

        this.socket && this.socket.off("message").on("message", this.handleRestrictPermission.bind(this));
    }

    getMainOptions(): string[] {
        return ["blue", "red", "tie", "over", "under", "odd", "even"];
    }

    renderBetOptions() {
        const {
            gameState,
            firstHalfSettlementResult,
            fullTimeSettlementResult,
            isFirstHalf,
            showWinningAnimation,
            liveOdds,
            beforeStartFulltime,
        } = this.state;

        const betOptionsProps = {
            liveOdds,
            gameState,
            firstHalfSettlementResult: firstHalfSettlementResult ?? FakeSettlementResult,
            fullTimeSettlementResult: fullTimeSettlementResult ?? FakeSettlementResult,
            isShowWinningEffect: showWinningAnimation,
            isFirstHalf,
            beforeStartFulltime,
        };

        const isShowOverlay = gameState === GameState.DisplayResult && !showWinningAnimation;
        return (
            <div>
                {isShowOverlay && <OverlayMaskWhite />}
                <KenoMatchBetOptions {...betOptionsProps} />
            </div>
        );
    }

    get isShowInlineResult() {
        return true;
    }

    renderResultSection() {
        const {
            isFirstHalf,
            fullTimeResult,
            halfTimeResult,
            fullTimeResultInline,
            halfTimeResultInline,
            firstHalfSettlementResult,
            fullTimeSettlementResult,
            isShowSettlementResult,
            showResultInfo,
            isShowH1Score,
            isShowFTScore,
            isJoiningAtMiddleShowInlineResult,
        } = this.state;

        const settlementResult = isFirstHalf ? firstHalfSettlementResult : fullTimeSettlementResult;

        if (showResultInfo) {
            const animationResultProps = {
                isFirstHalf,
                halfTimeResultInline,
                fullTimeResultInline,
                playResultAnimation: isJoiningAtMiddleShowInlineResult,
            };
            return <AnimationResult {...animationResultProps} />;
        }

        if (isShowSettlementResult) {
            return (
                <RoundSettlementResult
                    title={isFirstHalf ? "firstHalf" : "fullTime"}
                    extendClass={isFirstHalf ? "half-time" : "full-time"}
                    settlementResult={settlementResult}
                    displayChoices={["over", "under", "odd", "even"]}
                />
            );
        }

        return <MainFrameResult {...{ halfTimeResult, fullTimeResult, isShowH1Score, isShowFTScore }} />;
    }

    renderRoundHistory() {
        const sourceTabsValue = {
            firstHalfBlueRed: {
                tabName: this.getGameTranslate("firstHalfBlueRed"),
                tabWinningStreak: this.getWinningStreakByOptions({
                    options: ["blue", "red", "tie"],
                    winStreakCollector: this.winStreakCollectorFH,
                }),
                tabHoverValue: this.getGameTranslate("firstHalfBlueRedTabs"),
            },
            firstHalfOverUnder: {
                tabName: this.getGameTranslate("firstHalfOverUnder"),
                tabWinningStreak: this.getWinningStreakByOptions({
                    options: ["over", "under"],
                    winStreakCollector: this.winStreakCollectorFH,
                }),
                tabHoverValue: this.getGameTranslate("firstHalfOverUnderTabs"),
            },
            firstHalfEvenOdd: {
                tabName: this.getGameTranslate("firstHalfEvenOdd"),
                tabWinningStreak: this.getWinningStreakByOptions({
                    options: ["even", "odd"],
                    winStreakCollector: this.winStreakCollectorFH,
                }),
                tabHoverValue: this.getGameTranslate("firstHalfOddEvenTabs"),
            },
            fullTimeBlueRed: {
                tabName: this.getGameTranslate("fullTimeBlueRed"),
                tabWinningStreak: this.getWinningStreakByOptions({
                    options: ["blue", "red", "tie"],
                    winStreakCollector: this.winStreakCollectorFT,
                }),
                tabHoverValue: this.getGameTranslate("fullTimeBlueRedTabs"),
            },
            fullTimeOverUnder: {
                tabName: this.getGameTranslate("fullTimeOverUnder"),
                tabWinningStreak: this.getWinningStreakByOptions({
                    options: ["over", "under"],
                    winStreakCollector: this.winStreakCollectorFT,
                }),
                tabHoverValue: this.getGameTranslate("fullTimeOverUnderTabs"),
            },
            fullTimeEvenOdd: {
                tabName: this.getGameTranslate("fullTimeEvenOdd"),
                tabWinningStreak: this.getWinningStreakByOptions({
                    options: ["even", "odd"],
                    winStreakCollector: this.winStreakCollectorFT,
                }),
                tabHoverValue: this.getGameTranslate("fullTimeOddEvenTabs"),
            },
        };
        return (
            <ScoreboardTab
                key={this.state.roundId}
                tabsValue={sourceTabsValue}
                activeScoreboardTab={this.state.activeScoreboardTab}
                customClassName={"keno-match"}
            ></ScoreboardTab>
        );
    }

    renderStatistic() {
        const { activeScoreboardTab, roundHistoryFH, roundHistoryFT } = this.state;
        const roundHistory = [0, 1, 2].includes(activeScoreboardTab) ? roundHistoryFH : roundHistoryFT;
        const statisticFollowPercentProps = {
            roundHistory,
            activeScoreboardTab,
            statisticRuleEntries: StatisticRuleMapping[activeScoreboardTab],
        };

        return <StatisticFollowPercent {...statisticFollowPercentProps} />;
    }

    renderBoard() {
        const { activeScoreboardTab, isShowBlinkFH, isShowBlinkFT, roundHistoryFH, roundHistoryFT } = this.state;
        const translateDotTextMapping = {
            [Choices.blue]: this.getGameTranslate("blueTextDot"),
            [Choices.red]: this.getGameTranslate("redTextDot"),
            [Choices.tie]: this.getGameTranslate("tieTextDot"),
            [Choices.over]: this.getGameTranslate("overTextDot"),
            [Choices.under]: this.getGameTranslate("underTextDot"),
            [Choices.even]: this.getGameTranslate("evenTextDot"),
            [Choices.odd]: this.getGameTranslate("oddTextDot"),
        };

        const dataFollowTabActive = [0, 1, 2].includes(activeScoreboardTab)
            ? { roundHistory: roundHistoryFH, isShowBlink: isShowBlinkFH }
            : { roundHistory: roundHistoryFT, isShowBlink: isShowBlinkFT };

        return (
            <ScoreboardDragon
                roundHistory={dataFollowTabActive.roundHistory}
                dotDetails={{
                    translateDotTextMapping: translateDotTextMapping,
                    choice: ChoiceForTabActive[activeScoreboardTab]?.choice,
                }}
                isShowBlink={dataFollowTabActive.isShowBlink}
            />
        );
    }

    renderStartRoundAnimation() {
        return <></>;
    }

    renderResult() {
        return <></>;
    }

    renderResultCollapse() {
        const { halfTimeResultInline, fullTimeResultInline, isFirstHalf, isJoiningAtMiddleShowInlineResult } = this.state,
            animationResultProps = {
                isFirstHalf,
                halfTimeResultInline,
                fullTimeResultInline,
                playResultAnimation: isJoiningAtMiddleShowInlineResult,
                isShowCollapse: true,
            };

        return <AnimationResult {...animationResultProps} />;
    }

    renderSettlementInfo() {
        return <div className={Styles["result-container"]}></div>;
    }

    registerMessageHandler() {
        super.registerMessageHandler();
        this.messageTransmitter.register("firstHalfResult", this.handleFinishHalfTime.bind(this));
        this.messageTransmitter.register("liveOdds", this.handleLiveOdds.bind(this));
    }

    handleUM({ um, um_message, remainingTime }) {
        const { durations, i18n } = this.props;
        this.isUM = true;
        if (um && remainingTime && remainingTime + 1 === durations.wholeRound) {
            this.isUMInFirstLoad = true;
        } else {
            this.isUMInFirstLoad = false;
        }

        if (
            um &&
            (this.timeCounter < durations.halfTimePlacingBets ||
                this.timeCounter < durations.fullTimePlacingBets ||
                remainingTime + 1 === durations.wholeRound)
        ) {
            this.interval && clearInterval(this.interval);
            this.showResultInfoTimeout && clearTimeout(this.showResultInfoTimeout);
            this.showWinningAnimationTimeout && clearTimeout(this.showWinningAnimationTimeout);

            this.setState({
                gameState: GameState.Disabled,
                disabledMessage: um_message[LanguageLocaleMapper[i18n.language]],
                showResultInfo: false,
                isShowSettlementResult: false,
            });
        }
    }

    handleRemainingTime({ remainingTime }) {
        const { gameState } = this.state;
        const durations = this.props.durations;

        if (gameState === GameState.None || !this.isUMInFirstLoad) {
            this.isUM = false;
            this.runGame(remainingTime);
        }

        this.isUMInFirstLoad = false;

        const isJoiningAtMiddleShowInlineResult =
            (durations.showHalfTimeResult > remainingTime && remainingTime > durations.beforeStartFullTimePlacingBet) ||
            remainingTime > durations.halfTimePlacingBets;

        this.setState({ isJoiningAtMiddleShowInlineResult });

        if (durations.showHalfTimeResult > remainingTime && remainingTime >= durations.showFullTimeResult) {
            this.setState({
                fullTimeResult: defaultResult,
                fullTimeResultInline: defaultResult,
            });
        }
    }

    resetState() {
        this.setState({
            halfTimeResult: defaultResult,
            fullTimeResult: defaultResult,
            halfTimeResultInline: defaultResult,
            fullTimeResultInline: defaultResult,
            isShowH1Score: false,
            isShowFTScore: false,
        });
    }

    handleGamePlay(remainingTime: number) {
        const durations = this.props.durations;
        const { halfTimeResultInline, fullTimeResultInline, roundId, gameState } = this.state;
        if (remainingTime === durations.halfTimeLockingBet) {
            this.resetState();
        }

        if (remainingTime === durations.halfTimePlacingBets && !this.isUM) {
            this.setState({ roundId: roundId + 1 });
        }

        const isShowSettlementResult =
            (durations.showFullTimeSettlementResult >= remainingTime && remainingTime > durations.halfTimePlacingBets) ||
            (durations.showHalfTimeSettlementResult >= remainingTime && remainingTime > durations.fullTimePlacingBets);

        if (isShowSettlementResult) {
            this.setState({
                halfTimeResult: halfTimeResultInline,
                fullTimeResult: fullTimeResultInline,
            });
        }

        if (durations.showHalfTimeResult === remainingTime && remainingTime === durations.showFullTimeResult) {
            this.setState({
                isJoiningAtMiddleShowInlineResult: false,
            });
        }

        const showResultInfo =
            (durations.showFullTimeResult <= remainingTime && remainingTime > durations.showFullTimeSettlementResult) ||
            (durations.showHalfTimeResult >= remainingTime && remainingTime > durations.showHalfTimeSettlementResult);

        this.setState({
            beforeStartFulltime: remainingTime === durations.beforeStartFullTimePlacingBet,
            isFirstHalf: durations.halfTimePlacingBets >= remainingTime && remainingTime >= durations.beforeStartFullTimePlacingBet,
            isShowH1Score: !(durations.halfTimeLockingBet >= remainingTime && remainingTime > durations.showHalfTimeResult),
            isShowFTScore: remainingTime > durations.halfTimeLockingBet,
            showMD5ResultKey: isShowSettlementResult,
            showResultInfo,
            isShowSettlementResult,
        });

        const newGameState = this.determineGameState(remainingTime);

        if (gameState !== newGameState) {
            const newState = {
                gameState: newGameState,
                ...this.getStateByNextGameState(newGameState),
            };

            this.setState(newState);
        }
    }

    determineGameState(remainingTime: number) {
        const durations = this.props.durations;

        switch (true) {
            case (durations.wholeRound >= remainingTime && remainingTime > durations.halfTimePlacingBets) ||
                (durations.showHalfTimeResult >= remainingTime && remainingTime >= durations.beforeStartFullTimePlacingBet):
                return GameState.DisplayResult;
            case (durations.halfTimePlacingBets >= remainingTime && remainingTime > durations.halfTimeLockingBet) ||
                (durations.fullTimePlacingBets >= remainingTime && remainingTime > durations.fullTimeLockingBet):
                return GameState.InRound;
            case (durations.halfTimeLockingBet >= remainingTime && remainingTime > durations.showHalfTimeResult) ||
                (durations.fullTimeLockingBet >= remainingTime && remainingTime >= 0):
                return GameState.LockingBet;

            default:
                return GameState.None;
        }
    }

    getStateByNextGameState(nextGameState): any {
        const { displayPopup, notice, isFirstHalf, ownBets } = this.state;
        const timeCounter = this.getTimeCounter(this.timeCounter, nextGameState);

        if (nextGameState === GameState.InRound) {
            this.betWin = 0;
        }

        const newStateDetector = [
            {
                condition: [GameState.BeforeStartRound, GameState.InRound].includes(nextGameState),
                state: {
                    ownBets: isFirstHalf ? {} : ownBets,
                    totalBets: {},
                    showWinningAnimation: false,
                    isShowBlinkFH: false,
                    isShowBlinkFT: false,
                    playResultAnimation: false,
                    showResultInfo: false,
                    isShowSettlementResult: false,
                    betPercentage: {},
                    showMD5ResultKey: false,
                },
            },
            {
                condition: nextGameState === GameState.LockingBet,
                state: {
                    isShowBlinkFH: isFirstHalf,
                    isShowBlinkFT: !isFirstHalf,
                    displayPopup: displayPopup === PopupType.Rebet ? null : displayPopup,
                    notice: displayPopup === PopupType.Rebet ? null : notice,
                },
            },
        ];

        return newStateDetector.reduce(
            (newState, stateDetector) => {
                if (stateDetector.condition) {
                    newState = Object.assign(newState, stateDetector.state);
                }

                return newState;
            },
            { remainingTime: timeCounter }
        );
    }

    getOddsByChoice(choice: string) {
        const { gameConfigs, liveOdds } = this.state;

        return liveOdds?.[choice] ?? gameConfigs.odds[choice];
    }

    separateRoundHistory = ({ roundHistory, firstHalfResult, roundIdCurrent }) => {
        const rounds = {
            roundHistoryFH: [],
            roundHistoryFT: [],
        };

        roundHistory.forEach((round: KenoMatchRound<Result, SettlementResult>) => {
            rounds.roundHistoryFH.push({ ...round.firstHalf, roundId: round.roundId, odds: round.odds });
            rounds.roundHistoryFT.push({ ...round.fullTime, roundId: round.roundId, odds: round.odds });
        });

        if (firstHalfResult && rounds.roundHistoryFH[0]?.roundId !== roundIdCurrent) {
            rounds.roundHistoryFH = this.handleRoundHistoryFH({
                firstHalfResult,
                roundHistoryFH: rounds.roundHistoryFH,
                roundId: roundIdCurrent,
            });
        }

        return rounds;
    };

    handleRoundHistory({ roundHistory, roundId, firstHalfResult }) {
        const { gameState, isShowH1Score, isShowFTScore, isFirstHalf } = this.state;
        const { firstHalf, fullTime } = roundHistory[0];

        let roundIdCurrent = roundId;

        if (
            ([GameState.DisplayResult, GameState.Disabled].includes(gameState) &&
                (!isFirstHalf || (fullTime ?? roundId - roundHistory[0].roundId === 1))) ||
            this.isUMInFirstLoad
        ) {
            roundIdCurrent = roundId - 1;
        }

        let stateJoinGame = {};
        let stateShowResult = {};
        const rounds: SeparateRoundHistoryProps = this.separateRoundHistory({
            roundHistory,
            firstHalfResult,
            roundIdCurrent,
        });

        const stateDefault = {
            roundHistory: roundHistory,
            roundId: roundIdCurrent,
            roundHistoryFH: rounds.roundHistoryFH,
            roundHistoryFT: rounds.roundHistoryFT,
        };

        if (isShowFTScore) {
            const halfTimeResult = isShowH1Score ? firstHalf.result : defaultResult;
            this.setState({
                halfTimeResult,
                halfTimeResultInline: halfTimeResult,
            });
        }

        const fullTimeResult = isShowFTScore ? fullTime.result : defaultResult;

        stateJoinGame = {
            fullTimeResult,
            fullTimeResultInline: fullTimeResult,
            firstHalfSettlementResult: firstHalf.settlementResult,
            fullTimeSettlementResult: fullTime.settlementResult,
            md5: isShowFTScore ? fullTime.md5 : firstHalf.md5,
            md5ResultKey: isShowFTScore ? fullTime.resultKey : firstHalf.resultKey,
        };

        if ([GameState.DisplayResult].includes(gameState) || this.isUMInFirstLoad) {
            stateShowResult = {
                playResultAnimation: false,
                showResultInfo: true,
            };
        }

        this.setState({ ...stateDefault, ...stateJoinGame, ...stateShowResult });
        this.setWinStreakByRoundHistory(rounds);
    }

    handleFinishHalfTime({ firstHalfResult }) {
        const { roundHistoryFH, roundId, remainingTime, isShowH1Score } = this.state;
        const { durations } = this.props;
        const roundHistoryFHClone =
            roundHistoryFH[0]?.roundId !== roundId
                ? this.handleRoundHistoryFH({ firstHalfResult, roundHistoryFH, roundId })
                : roundHistoryFH;
        const isJoinFT = durations.fullTimePlacingBets >= remainingTime && remainingTime >= 0;
        this.storeOwnBet(roundId);

        this.setState({
            halfTimeResultInline: firstHalfResult.result,
            firstHalfSettlementResult: firstHalfResult.settlementResult,
            playResultAnimation: !isJoinFT,
            md5ResultKey: firstHalfResult.resultKey,
            roundId: firstHalfResult.roundId,
        });

        if (isShowH1Score) {
            this.setState({
                halfTimeResult: firstHalfResult.result,
            });
        }
        const animationDuration = this.getFinishAnimationDuration();
        this.showResultInfoH1Timeout = setTimeout(() => {
            this.setState({ roundHistoryFH: roundHistoryFHClone, isShowBlinkFH: false, playResultAnimation: false });
            !isJoinFT &&
                this.notifyWinStreakByLatestSettlementResultTimeMatch(
                    firstHalfResult.settlementResult,
                    this.winStreakCollectorFH,
                    this.getGameTranslate("winStreakTextFH")
                );
        }, animationDuration);

        this.showWinningAnimationTimeout =
            !isJoinFT &&
            setTimeout(() => {
                this.setState({
                    showWinningAnimation: true,
                });
            }, this.winningAnimationWaitingTimeInSecond);
    }

    handleRoundHistoryFH = ({ firstHalfResult, roundHistoryFH, roundId }) => {
        const roundHistoryFHClone = [...roundHistoryFH];
        roundHistoryFHClone.unshift({ ...firstHalfResult, roundId } as RoundKenoMatchBase<Result, SettlementResult>);
        roundHistoryFHClone.length > 100 && roundHistoryFHClone.pop();

        return roundHistoryFHClone;
    };

    handleLiveOdds({ liveOdds }) {
        this.setState({ liveOdds });
    }

    handleFinish({ finish }) {
        const { roundHistoryFT } = this.state;
        const { durations } = this.props;
        const roundHistoryFTClone = [...roundHistoryFT];
        this.isProcessingBet = false;
        this.clearRetryInterval();
        roundHistoryFTClone.unshift(finish);
        roundHistoryFTClone.length > 100 && roundHistoryFTClone.pop();
        const newState = {
            fullTimeResultInline: finish.result,
            fullTimeSettlementResult: finish.settlementResult,
            playResultAnimation: true,
            md5ResultKey: finish.resultKey,
        };

        this.setState(newState as any);

        const animationDuration = this.getFinishAnimationDuration();
        this.showResultInfoTimeout = setTimeout(() => {
            this.setState({
                isShowBlinkFT: false,
                roundHistoryFT: roundHistoryFTClone,
                playResultAnimation: false,
            });
            this.notifyWinStreakByLatestSettlementResultTimeMatch(
                finish.settlementResult,
                this.winStreakCollectorFT,
                this.getGameTranslate("winStreakTextFT")
            );
        }, animationDuration);

        this.showWinningAnimationTimeout = setTimeout(() => {
            this.setState({
                showWinningAnimation: true,
            });
            this.betWin > 0 && this.updateUserBalance();
        }, this.winningAnimationWaitingTimeInSecond);

        this.runGame(durations.wholeRound);
    }

    handleStatus = ({ status }) => {
        const { win, bet } = status;
        const durations = this.props.durations;

        if (win) {
            setTimeout(() => {
                this.betWin = bet;
            }, durations.settlementWinning * 1000);
        }
    };

    setWinStreakByRoundHistory(rounds: SeparateRoundHistoryProps) {
        const setWinStreakByTimeMatch = (roundHistory, winStreakCollector) => {
            const history = roundHistory.sort((a, b) => a.roundId < b.roundId);
            const mainOptions = this.getMainOptions();
            for (const round of history) {
                mainOptions.forEach((option) => {
                    if (round.settlementResult[option] && !winStreakCollector[option].isStopStreak) {
                        winStreakCollector[option].streak += 1;
                    } else {
                        winStreakCollector[option].isStopStreak = true;
                    }
                });

                if (!mainOptions.some((option) => winStreakCollector[option].isStopStreak === false)) {
                    break;
                }
            }
        };

        this.initWinStreakCollector();
        setWinStreakByTimeMatch(rounds?.roundHistoryFH, this.winStreakCollectorFH);
        setWinStreakByTimeMatch(rounds?.roundHistoryFT, this.winStreakCollectorFT);
    }

    initWinStreakCollector() {
        const mainOptions = this.getMainOptions();
        const getWinningStreakByTimeMatch = () => {
            return mainOptions.reduce((result, option) => {
                result[option] = {
                    streak: 0,
                    isStopStreak: false,
                };

                return result;
            }, {});
        };
        this.winStreakCollectorFH = getWinningStreakByTimeMatch();
        this.winStreakCollectorFT = getWinningStreakByTimeMatch();
    }

    getWinningStreakByOptions = ({ options, winStreakCollector }) => {
        return Math.max(...options.map((option) => winStreakCollector[option]?.streak ?? 0));
    };

    getChoiceNameOnHedgeBetMessage(choiceKey: any): string {
        return this.getGameTranslate(`fullText-${choiceKey}`);
    }

    notifyWinStreakByLatestSettlementResultTimeMatch(
        settlementResult: SettlementResult,
        winStreakCollector: WinStreakCollectorModel,
        optionalText: string
    ) {
        const { notifyWinStreak, gameName } = this.props;
        const mainOptions = this.getMainOptions();
        mainOptions.forEach((option) => {
            const winStreak = winStreakCollector[option];

            if (settlementResult[option]) {
                winStreak.streak += 1;

                if (winStreak.streak > 3) {
                    notifyWinStreak({
                        key: uuidv4(),
                        gameName: gameName,
                        choice: option,
                        streak: winStreak.streak,
                        optional: optionalText,
                    });
                }
            } else {
                winStreak.streak = 0;
            }
        });
    }

    renderGameHeader() {
        const { gameState, isFirstHalf } = this.state;

        const gameHeaderProps = {
            isShowCollapse: [GameState.DisplayResult, GameState.BeforeStartRound].includes(gameState),
            isUpdateDisableRebet: gameState !== GameState.InRound,
            countdownTimerComponent: <KenoCountdownTimer isFistHalf={isFirstHalf} />,
        };

        return <GameHeader {...gameHeaderProps} />;
    }
}

export default withRouter(withTranslation()(KenoSoccer));
