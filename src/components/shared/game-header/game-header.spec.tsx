import { render, fireEvent } from "@testing-library/react";
import React from "react";
import * as rdd from "react-device-detect";

import GameHeader from ".";
import { GameContextProvider } from "../../../contexts/game-context/game-context";
import { SystemContextProvider } from "../../../contexts/system";
import { GameState, ViewMode } from "../game-base/type";
import { GameActionsContextProvider } from "../../../contexts/game-actions-context";

describe("GameHeader", () => {
    // Arrange
    const isShowCollapse = false;
    const isUpdateDisableRebet = false;
    const countdownTimerComponent = null;
    const gameSetting = {
        id: 1,
        gameName: "BigSmall",
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
        notifyWinStreak: jest.fn,
        playPlaceBetSound: jest.fn,
        viewMode: ViewMode.full,
        setApiErrorMessage: jest.fn,
        supportMD5: false,
        userStakeLevel: null,
        updateUserStakeLevel: jest.fn,
    };
    const gameContext = {
        gameSetting: gameSetting as any,
        totalBets: {},
        ownBets: {},
        roundId: 1,
        remainingTime: 1,
        gameConfigs: null,
        gameState: GameState.DisplayResult,
        viewMode: ViewMode.full,
        isShowBlink: false,
        playResultAnimation: true,
        supportMD5: false,
    };

    const systemContext = {
        setFavorite: jest.fn,
        favoriteGames: [],
        enabledPlaySound: true,
        gamesOrder: [],
        userStakeLevel: { minBet: 1, maxBet: 2000 },
        betValue: 10,
        enabledQuickBet: true,
    };

    const gameActionsContext = {
        placeBet: jest.fn,
        openPopup: jest.fn,
        closePopup: jest.fn,
        registerMessageHandler: jest.fn,
        unsubscribeMessageHandler: jest.fn,
        updateViewMode: jest.fn,
        playAcceptedBetAnimation: jest.fn,
        finishProcessingBet: null,
        renderResultCollapse: null,
        setActiveScoreboardTab: jest.fn,
        updateStatusShowResult: jest.fn,
    };

    test("renders GameHeader component", () => {
        rdd.isMobileOnly = true;

        // Act
        const { getByTestId } = render(
            <SystemContextProvider value={systemContext}>
                <GameContextProvider value={gameContext}>
                    <GameActionsContextProvider value={gameActionsContext}>
                        <GameHeader
                            isShowCollapse={isShowCollapse}
                            isUpdateDisableRebet={isUpdateDisableRebet}
                            countdownTimerComponent={countdownTimerComponent}
                        />
                    </GameActionsContextProvider>
                </GameContextProvider>
            </SystemContextProvider>
        );
        fireEvent.click(getByTestId("header"));
        fireEvent.click(getByTestId("favorite-btn"));
        fireEvent.click(getByTestId("rebet-btn"));

        // Assert
        expect(getByTestId("header")).toBeInTheDocument();
        expect(document.querySelector(".header-right")).toBeTruthy();
    });

    test("render GameHeader on desktop", () => {
        rdd.isMobileOnly = false;

        // Act
        const { getByTestId } = render(
            <SystemContextProvider value={systemContext}>
                <GameContextProvider value={gameContext}>
                    <GameActionsContextProvider value={gameActionsContext}>
                        <GameHeader
                            isShowCollapse={isShowCollapse}
                            isUpdateDisableRebet={isUpdateDisableRebet}
                            countdownTimerComponent={countdownTimerComponent}
                        />
                    </GameActionsContextProvider>
                </GameContextProvider>
            </SystemContextProvider>
        );
        fireEvent.click(getByTestId("header"));

        // Assert
        expect(getByTestId("header")).toBeInTheDocument();
        expect(document.querySelector(".header-right")).toBeTruthy();
    });
});
