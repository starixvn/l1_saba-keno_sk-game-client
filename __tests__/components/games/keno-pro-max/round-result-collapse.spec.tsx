import React from "react";
import { render, screen } from "@testing-library/react";
import { KenoProMaxRoundResultCollapse, generateResultCollapse } from "../../../../src/components/games/keno-pro-max/round-result/round-result-collapse";
import { ResultClassState } from "../../../../src/components/games/keno-pro-max/round-result";
import { useGameContext } from "../../../../src/contexts/game-context/game-context";
import { GameState } from "../../../../src/components/shared/game-base/type";
import '@testing-library/jest-dom';
import { SettlementResult } from "../../../../src/components/games/keno-pro-max/keno-pro-max";

// Mocking the useGameContext hook
jest.mock("../../../../src/contexts/game-context/game-context", () => ({
    useGameContext: jest.fn(),
}));

// Mocking the BallNumber component
jest.mock("../../../../src/components/keno/ball-number", () => ({ value }) => <div data-testid="ball-number">{value}</div>);

// Mocking the translation function
jest.mock("next-i18next", () => ({
    useTranslation: () => ({ t: (key) => key }), // Return the key as the translation
}));

describe("KenoProMaxRoundResultCollapse", () => {
    const mockGameContext = {
        playResultAnimation: true,
        gameSetting: { gameName: "keno" },
    };

    beforeEach(() => {
        (useGameContext as jest.Mock).mockReturnValue(mockGameContext);
    });

    it("renders without crashing with results", () => {
        const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const settlementResult: SettlementResult = {
            big: true,
            earth: false,
            even: false,
            fire: false,
            gold: false,
            odd: false,
            small: false,
            water: false,
            wood: false,
        };
        const gameState = GameState.DisplayResult;

        render(<KenoProMaxRoundResultCollapse result={result} settlementResult={settlementResult} gameState={gameState} />);

        expect(screen.getByText("10")).toBeInTheDocument(); // Total points
        expect(screen.getByText("- big")).toBeInTheDocument(); // Settlement result
        expect(screen.getAllByTestId("ball-number").length).toBe(result.length); // Check number of balls rendered
    });

    it("renders without crashing with small settlement result", () => {
        const result = [1, 2, 3, 4, 5];
        const settlementResult: SettlementResult = {
            big: false,
            earth: false,
            even: false,
            fire: false,
            gold: false,
            odd: false,
            small: true,
            water: false,
            wood: false,
        };
        const gameState = GameState.DisplayResult;

        render(<KenoProMaxRoundResultCollapse result={result} settlementResult={settlementResult} gameState={gameState} />);

        expect(screen.getByText("5")).toBeInTheDocument(); // Total points
        expect(screen.getByText("- small")).toBeInTheDocument(); // Settlement result
        expect(screen.getAllByTestId("ball-number").length).toBe(result.length); // Check number of balls rendered
    });

    it("handles animation class correctly", () => {
        const result = [1, 2, 3, 4, 5];
        const settlementResult = {
            big: true,
            earth: false,
            even: false,
            fire: false,
            gold: false,
            odd: false,
            small: false,
            water: false,
            wood: false,
        };
        const gameState = GameState.DisplayResult;

        const { container } = render(<KenoProMaxRoundResultCollapse result={result} settlementResult={settlementResult} gameState={gameState} />);

        expect(container.firstChild).toHaveClass("has-animation"); // Check for animation class
    });

    it("does not render balls when result is empty", () => {
        const result: number[] = [];
        const settlementResult = {
            big: true,
            earth: false,
            even: false,
            fire: false,
            gold: false,
            odd: false,
            small: false,
            water: false,
            wood: false,
        };
        const gameState = GameState.DisplayResult;

        render(<KenoProMaxRoundResultCollapse result={result} settlementResult={settlementResult} gameState={gameState} />);

        expect(screen.queryByTestId("ball-number")).not.toBeInTheDocument(); // No balls should be rendered
    });
});

describe("generateResultCollapse", () => {
    it("generates ball numbers correctly", () => {
        const result = [1, 2, 3, 4, 5];
        const isAnimation = true;
        const mode = ResultClassState.collapse;

        const balls = generateResultCollapse(result, isAnimation, mode);
        expect(balls.length).toBe(result.length); // Check number of balls generated
        expect(balls[0].props.value).toBe(1); // Check first ball value
    });
}); 