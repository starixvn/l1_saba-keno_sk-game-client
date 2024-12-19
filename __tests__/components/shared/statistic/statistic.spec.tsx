import { render } from "@testing-library/react";
import React from "react";

import { GameContextProvider } from "../../../../src/contexts/game-context/game-context";
import { StatisticFollowPercent } from "../../../../src/components/shared/statistic";
import { GameState, ViewMode } from "../../../../src/components/shared/game-base/type";

describe("StatisticFollowPercent", () => {
    const Choices = { big: "big", small: "small" };
    const statisticRuleEntries = Object.entries({
        [Choices.big]: (countResult: object, total: number) =>
            countResult[Choices.big] ? Math.round((countResult[Choices.big] * 100) / total) : 0,
        [Choices.small]: (countResult: object, total: number) =>
            100 - (countResult[Choices.big] ? Math.round((countResult[Choices.big] * 100) / total) : 0),
    });
    const roundHistory = [
        { result: { dice1: 5, dice2: 5, dice3: 1 }, roundId: 786275, settlementResult: { big: true, small: false } },
        { result: { dice1: 5, dice2: 5, dice3: 1 }, roundId: 786274, settlementResult: { big: true, small: false } },
        { result: { dice1: 2, dice2: 4, dice3: 1 }, roundId: 786267, settlementResult: { big: false, small: true } },
    ];
    const gameSetting = {
        id: 1,
        gameName: "BigSmall",
        supportMD5: false,
        socketInfo: {
            namespace: "bigsmall",
            path: "bigsmall",
        },
        durations: {
            wholeRound: 62,
            placingBets: 50,
            lockingBet: 5,
            showResult: 8,
            resultAnimation: 3,
            beforeStartRound: 0,
            balancingBet: 3,
        },
    };

    const gameContext = {
        gameSetting: gameSetting,
        totalBets: {},
        ownBets: {},
        roundId: 1,
        remainingTime: 1,
        gameConfigs: {},
        gameState: GameState.BeforeStartRound,
        viewMode: ViewMode.full,
        isShowBlink: false,
        playResultAnimation: true,
    };
    test("should render StatisticFollowPercent component", () => {
        // Arrange
        const resource = { statisticRuleEntries, roundHistory, activeScoreboardTab: 0 };

        // Act
        render(
            <GameContextProvider value={gameContext as any}>
                <StatisticFollowPercent {...resource} />
            </GameContextProvider>
        );

        // Arrange
        expect(document.querySelector(".statistic-group")).toBeTruthy();
        expect(document.querySelector(`.${Choices.big}`)).toBeTruthy();
        expect(document.querySelector(`.${Choices.small}`)).toBeTruthy();
        expect(document.querySelector(".number")).toBeTruthy();
    });
});
