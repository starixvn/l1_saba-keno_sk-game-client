import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { GameContextProvider } from "../../../../../src/contexts/game-context/game-context";
import ChainRoundHistory from "../../../../../src/components/shared/round-history/chain";
import { GameState } from "../../../../../src/components/shared/game-base/type";
import { roundHistory, gameContext } from "../round-history-test-helper";

describe("ChainRoundHistory", () => {
    const renderRoundDetail = () => {
        <span>renderRoundDetail</span>;
    };
    const renderGameDot = () => {
        <span>renderGameDot</span>;
    };

    test("should render ChainRoundHistory component", () => {
        // Arrange
        const resource = {
            gameState: GameState.InRound,
            roundHistory,
            renderRoundDetail,
            renderGameDot,
        };

        // Act
        render(
            <GameContextProvider value={gameContext as any}>
                <ChainRoundHistory {...(resource as any)} />
            </GameContextProvider>
        );

        // Arrange
        expect(document.querySelector(".round-dot-wrapper")).toBeTruthy();
        expect(document.querySelector(".dot-wrapper")).toBeTruthy();
    });

    test("show dot blink when game state locking-bet", () => {
        // Arrange
        gameContext.isShowBlink = true;
        const resource = {
            gameState: GameState.LockingBet,
            roundHistory,
            renderRoundDetail,
            renderGameDot,
        };

        // Act
        render(
            <GameContextProvider value={gameContext as any}>
                <ChainRoundHistory {...(resource as any)} />
            </GameContextProvider>
        );

        // Arrange
        expect(document.querySelector(".round-dot-wrapper")).toBeTruthy();
        expect(document.querySelector(".dot-next")).toBeTruthy();
    });

    test("show tooltip when click dot", () => {
        // Arrange
        gameContext.isShowBlink = false;
        const resource = {
            gameState: GameState.InRound,
            roundHistory,
            renderRoundDetail,
            renderGameDot,
        };

        // Act
        const { getAllByTestId } = render(
            <GameContextProvider value={gameContext as any}>
                <ChainRoundHistory {...(resource as any)} />
            </GameContextProvider>
        );
        fireEvent.click(getAllByTestId("dot-wrapper")[0]);

        // Arrange
        expect(document.querySelector(".tooltip")).toBeTruthy();
    });
});
