import { render } from "@testing-library/react";
import React from "react";

import { GameContextProvider } from "../../../../src/contexts/game-context/game-context";
import CountdownTimer from "../../../../src/components/shared/countdown-timer/countdown-timer";
import { GameState, ViewMode } from "../../../../src/components/shared/game-base/type";

describe("CountdownTimer", () => {
    // arrange
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

    test.each`
        gameState                     | className
        ${GameState.InRound}          | ${".start-betting"}
        ${GameState.LockingBet}       | ${".no-more-bets"}
        ${GameState.BeforeStartRound} | ${".timer"}
    `("should render CountdownTimer follow timer", ({ gameState, className }) => {
        // Arrange
        gameContext.gameState = gameState;
        // Act
        render(
            <GameContextProvider value={gameContext as any}>
                <CountdownTimer />
            </GameContextProvider>
        );

        // Assert
        expect(document.querySelector(className)).toBeTruthy();
    });

    test("should render CountdownTimer with game-state BalancingBet", () => {
        // Arrange
        gameContext.gameState = GameState.BalancingBet;
        // Act
        render(
            <GameContextProvider value={gameContext as any}>
                <CountdownTimer />
            </GameContextProvider>
        );

        // Assert
        expect(document.querySelector(".loader-balance-pool")).toBeTruthy();
        expect(document.querySelector(".balanced-betting-pool")).toBeTruthy();
    });

    test("should render CountdownTimer with game-state DisplayResult", () => {
        // Arrange
        gameContext.gameState = GameState.DisplayResult;
        // Act
        render(
            <GameContextProvider value={gameContext as any}>
                <CountdownTimer />
            </GameContextProvider>
        );

        // Assert
        expect(document.querySelector(".loader-show-result")).toBeTruthy();
        expect(document.querySelector(".open-result")).toBeTruthy();
    });

    test("should render CountdownTimer with game-state None", () => {
        // Arrange
        gameContext.gameState = GameState.None;
        // Act
        render(
            <GameContextProvider value={gameContext as any}>
                <CountdownTimer />
            </GameContextProvider>
        );

        // Assert
        expect(document.querySelector(".loader")).toBeTruthy();
    });

    test("show timer 1 when remaining-time is 0", () => {
        // Arrange
        gameContext.gameState = GameState.LockingBet;
        gameContext.remainingTime = 0;
        // Act
        render(
            <GameContextProvider value={gameContext as any}>
                <CountdownTimer />
            </GameContextProvider>
        );

        // Assert
        expect(document.querySelector(".timer")).toBeTruthy();
    });
});
