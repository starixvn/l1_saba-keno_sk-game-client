import { render, screen } from "@testing-library/react";
import { useTranslation } from "next-i18next";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { useGameContext } from "../../../../../src/contexts/game-context/game-context";
import { GameState } from "../../../../../src/components/shared/game-base/type";
import KenoCountdownTimer from "../../../../../src/components/games/keno-match/countdown-timer";

jest.mock("next-i18next", () => ({
    useTranslation: jest.fn(),
}));

jest.mock("react-countdown-circle-timer", () => ({
    CountdownCircleTimer: jest.fn(({ children }) => children({ remainingTime: 10 })),
}));

jest.mock("../../../../../src/contexts/game-context/game-context", () => ({
    useGameContext: jest.fn(),
}));

describe("KenoCountdownTimer", () => {
    const mockTranslation = {
        t: (key: string) => key,
    };

    const mockGameContext = {
        gameState: GameState.InRound,
        remainingTime: 30,
        gameSetting: {
            durations: {
                halfTimePlacingBets: 60,
                showHalfTimeResult: 10,
                fullTimePlacingBets: 60,
                showFullTimeResult: 10,
            },
        },
    };

    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
        (useGameContext as jest.Mock).mockReturnValue(mockGameContext);
    });

    it("renders timer in InRound state for first half", () => {
        render(<KenoCountdownTimer isFistHalf={true} />);

        expect(screen.queryAllByTestId("start-betting")).toBeTruthy();
        expect(CountdownCircleTimer).toHaveBeenCalledWith(
            expect.objectContaining({
                duration: 50, // halfTimePlacingBets - showHalfTimeResult
                initialRemainingTime: 20, // remainingTime - timeResult
                colors: [["#15e84b", 1]],
            }),
            expect.any(Object)
        );
    });

    it("renders timer in LockingBet state", () => {
        (useGameContext as jest.Mock).mockReturnValue({
            ...mockGameContext,
            gameState: GameState.LockingBet,
        });

        render(<KenoCountdownTimer isFistHalf={true} />);

        expect(screen.queryAllByTestId("no-more-bets")).toBeTruthy();
        expect(CountdownCircleTimer).toHaveBeenCalledWith(
            expect.objectContaining({
                colors: [["#FF7B7B", 1]],
            }),
            expect.any(Object)
        );
    });

    it("renders loader in None state", () => {
        (useGameContext as jest.Mock).mockReturnValue({
            ...mockGameContext,
            gameState: GameState.None,
        });

        render(<KenoCountdownTimer isFistHalf={true} />);

        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders nothing in BeforeStartRound state", () => {
        (useGameContext as jest.Mock).mockReturnValue({
            ...mockGameContext,
            gameState: GameState.BeforeStartRound,
        });

        const { container } = render(<KenoCountdownTimer isFistHalf={true} />);

        expect(container.firstChild).toBeNull();
    });

    it("renders result screen in ShowResult state", () => {
        (useGameContext as jest.Mock).mockReturnValue({
            ...mockGameContext,
            gameState: GameState.DisplayResult,
        });

        render(<KenoCountdownTimer isFistHalf={true} />);

        expect(screen.getByText("openResult")).toBeInTheDocument();
    });
});