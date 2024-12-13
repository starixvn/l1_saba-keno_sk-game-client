import { useTranslation } from "next-i18next";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { useGameContext } from "../../../../contexts/game-context/game-context";
import { Rotation } from "../../../shared/countdown-timer/countdown-timer";
import Styles from "../../../shared/countdown-timer/countdown-timer.module.scss";
import { GameState } from "../../../shared/game-base/type";
import Loader from "../../../shared/loader";
import { KenoMatchGameDurations, TimerProps } from "../type";

interface GameStatusWithTimerProps {
    duration: number;
    initialRemainingTime: number;
    lockingBet: boolean;
    isStarBetting: boolean;
}

type Props = {
    isFistHalf: boolean;
};

const KenoCountdownTimer: React.FC<Props> = ({ isFistHalf }) => {
    const { gameState, remainingTime, gameSetting } = useGameContext();
    const { halfTimePlacingBets, showHalfTimeResult, fullTimePlacingBets, showFullTimeResult } =
        gameSetting.durations as KenoMatchGameDurations;
    const duration = isFistHalf ? halfTimePlacingBets - showHalfTimeResult : fullTimePlacingBets;
    const timeResult = isFistHalf ? showHalfTimeResult : showFullTimeResult;
    switch (gameState) {
        case GameState.InRound:
            return (
                <GameStatusAndTimer
                    duration={duration}
                    initialRemainingTime={remainingTime - timeResult}
                    lockingBet={false}
                    isStarBetting={true}
                />
            );

        case GameState.LockingBet:
            return (
                <GameStatusAndTimer
                    duration={duration}
                    initialRemainingTime={remainingTime - timeResult}
                    lockingBet={true}
                    isStarBetting={false}
                />
            );

        case GameState.None:
            return <Loader />;
        case GameState.BeforeStartRound:
            return <></>;
        default:
            return <GameStatusAndShowResult />;
    }
};

export function GameStatusAndShowResult() {
    const { t } = useTranslation("common");
    return (
        <>
            <div className="loader-show-result"></div>
            <GameStatus>
                <div className={Styles["open-result"]}>{t("openResult")}</div>
            </GameStatus>
        </>
    );
}

export const GameStatusAndTimer = ({ duration, initialRemainingTime, lockingBet, isStarBetting }: GameStatusWithTimerProps) => {
    const { t } = useTranslation("common");
    const content = isStarBetting ? (
        <div data-testid="start-betting" className={Styles["start-betting"]}>{t("startBetting")}</div>
    ) : (
        <div data-testid="no-more-bets" className={Styles["no-more-bets"]}>{t("noMoreBets")}</div>
    );

    return (
        <>
            <Timer {...{ duration, initialRemainingTime, lockingBet }} />
            <div className={Styles["game-status"]}>{content}</div>

            <GameStatus>{content}</GameStatus>
        </>
    );
};

export const Timer = ({ duration, initialRemainingTime, lockingBet }: TimerProps) => {
    const timerProps = {
        isPlaying: true,
        size: 30,
        strokeWidth: 3,
        trailColor: "#fff",
        trailStrokeWidth: 1,
        initialRemainingTime,
        duration,
        rotation: "counterclockwise" as Rotation,
    };

    return (
        <div className={Styles.timer}>
            <CountdownCircleTimer {...timerProps} colors={[[lockingBet ? "#FF7B7B" : "#15e84b", 1]]}>
                {({ remainingTime }) => (remainingTime === 0 ? 1 : remainingTime).toLocaleString("en-US", { minimumIntegerDigits: 2 })}
            </CountdownCircleTimer>
        </div>
    );
};

export const GameStatus = ({ children }) => {
    return <div className={Styles["game-status"]}>{children}</div>;
};

export default KenoCountdownTimer;
