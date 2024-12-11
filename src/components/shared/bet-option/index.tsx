import React, { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { useGameActionContext } from "../../../contexts/game-actions-context";
import { useGameContext } from "../../../contexts/game-context/game-context";
import { useSystemContext } from "../../../contexts/system";
import { formatOdds, numberWithCommas } from "../../../helpers/number-helper";
import { GameState } from "../game-base/type";
import { Tooltip } from "../tooltip";
import Styles from "./bet-option.module.scss";
import { HighlightType, Props } from "./types";

const HighlightClassNameMapper = {
    [HighlightType.Background]: "highlight-winning",
    [HighlightType.None]: "",
};

const convertStakeToString = (amount: number, rate: number) => {
    if (amount) {
        const total = amount / rate;
        const options = { maximumFractionDigits: 2 };
        const locale = "en-US";
        if (total >= 10_000_000) {
            return (total / 1_000_000).toLocaleString(locale, options) + "M";
        }
        if (total >= 10_000) {
            return (total / 1_000).toLocaleString(locale, options) + "K";
        }
        if (total < 0.1) {
            return "0";
        }
        return total.toLocaleString(locale, options);
    }
    return "";
};

const BetOption: React.FunctionComponent<Props> = ({
    gameState,
    choice,
    odd,
    children,
    tooltipMessage,
    isHighlight = false,
    isDisplayOdd = true,
    isShowWinningEffect = false,
    isShowPoolStake = true,
    isShowTooltip = false,
    isBoostedOdds = false,
}) => {
    const { totalBets, ownBets, rate, gameSetting } = useGameContext();
    const { openPlaceBetModal, placeBet } = useGameActionContext();
    const { enabledQuickBet, betValue, fractionalOddsFormat } = useSystemContext();
    const [highlightType, updateHighlightType] = useState<HighlightType>(HighlightType.None);
    const [totalBet, setTotalBet] = useState<number>(totalBets?.[choice] ?? 0);
    const { countUp, update } = useCountUp({ start: 0, end: 0, decimals: 1 });
    const betChoiceRef = useRef<HTMLDivElement>(null);
    const totalBetRef = useRef<HTMLDivElement>(null);
    const [isFocusChoice, setIsFocusChoice] = useState<boolean>(false);

    useEffect(() => {
        const actionByGameState = {
            [GameState.LockingBet]: () => {
                updateHighlightType(HighlightType.None);
            },
            [GameState.InRound]: () => {
                updateHighlightType(HighlightType.Background);
            },
            [GameState.BeforeStartRound]: () => {
                updateHighlightType(HighlightType.Background);
            },
        };

        actionByGameState[gameState] && actionByGameState[gameState]();

        setTotalBet(totalBets[choice]);
        update(totalBet);
    }, [gameState, totalBets?.[choice]]);

    const onClickBet = (event: any) => {
        event.preventDefault();
        const betChoiceRect = betChoiceRef.current.getBoundingClientRect();

        if (enabledQuickBet) {
            placeBet(choice, betValue, { x: event.clientX, y: event.clientY }, { left: betChoiceRect.left, right: betChoiceRect.right });
        } else {
            setIsFocusChoice(true);
            const betOptionElement = totalBetRef.current.nextElementSibling;
            openPlaceBetModal(choice, removeBetChoiceFocus, betOptionElement, betChoiceRef.current);
        }
    };

    const removeBetChoiceFocus = () => {
        setIsFocusChoice(false);
    };

    const betOptionClasses = `${Styles["bet-option"]} ${isFocusChoice ? Styles["focus"] : ""} 
        ${isHighlight && Styles[HighlightClassNameMapper[highlightType]]} 
        ${isHighlight && isShowWinningEffect && Styles["winning-effect"]} 
        ${gameState !== GameState.InRound && Styles["disallowed"]}
        ${Styles[gameSetting.gameName.toLocaleLowerCase()]}`;

    const oddsClass = isBoostedOdds ? `${Styles["boosted-odd"]}` : `${Styles["odd"]}`;
    const oddsValue = formatOdds(odd, fractionalOddsFormat);
    return (
        <>
            <div className={Styles.container} ref={betChoiceRef}>
                <div className={betOptionClasses} onClick={onClickBet}>
                    {isDisplayOdd && <div className={oddsClass}>{odd ? oddsValue : ""}</div>}

                    <div className={Styles["total-bet"]} ref={totalBetRef}>
                        {isShowPoolStake &&
                            (gameState === GameState.BalancingBet
                                ? convertStakeToString(+countUp, rate)
                                : convertStakeToString(totalBet, rate))}
                    </div>

                    {children}
                    <div className={Styles["own-bet"]}>
                        {ownBets?.[choice] ? (
                            <span key={ownBets[choice]} className={`d-inline-block ${ownBets[choice]}`}>
                                {numberWithCommas(ownBets[choice])}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
            {isShowTooltip && <Tooltip message={tooltipMessage} hoverWrapper={betChoiceRef} isShowAtHoverPosition={true} />}
        </>
    );
};

export default BetOption;
