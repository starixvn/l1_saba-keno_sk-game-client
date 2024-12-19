import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { KenoProMaxRoundResult } from "../../../../src/components/games/keno-pro-max/round-result";
import { useGameContext } from "../../../../src/contexts/game-context/game-context";
import { Result, SettlementResult } from "../../../../src/components/games/keno-pro-max/keno-pro-max";

jest.mock("../../../../src/contexts/game-context/game-context", () => ({
    useGameContext: jest.fn(),
}));

jest.mock("next-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe("KenoProMaxRoundResult", () => {
    const mockResult: Result = [1, 2, 3, 4, 5];
    const mockSettlementResult: SettlementResult = {
        big: true,
        even: false,
        odd: false,
        small: false,
        gold: false,
        wood: true,
        water: false,
        fire: false,
        earth: false,
    };

    beforeEach(() => {
        (useGameContext as jest.Mock).mockReturnValue({
            playResultAnimation: true,
            gameSetting: { gameName: "kenopromax" },
        });
    });

    it("renders without crashing", () => {
        render(<KenoProMaxRoundResult result={mockResult} settlementResult={mockSettlementResult} />);
        expect(screen.getByText("kenopromax:total")).toBeInTheDocument();
    });

    it("displays the correct total when animation is playing", () => {
        render(<KenoProMaxRoundResult result={mockResult} settlementResult={mockSettlementResult} />);
        expect(screen.getByText("kenopromax:total")).toBeInTheDocument();
    });

    it("displays the correct result info for big", () => {
        render(<KenoProMaxRoundResult result={mockResult} settlementResult={mockSettlementResult} />);
        expect(screen.getByText("kenopromax:big")).toBeInTheDocument();
    });

    it("displays the correct result info for small", () => {
        const settlementResultSmall: SettlementResult = {
            big: false,
            even: false,
            gold: false,
            wood: true,
            water: false,
            fire: false,
            earth: false,
            odd: false,
            small: false,
        };
        render(<KenoProMaxRoundResult result={mockResult} settlementResult={settlementResultSmall} />);
        expect(screen.getByText("kenopromax:small")).toBeInTheDocument();
    });

    it("displays the correct result info for even", () => {
        const settlementResultEven: SettlementResult = {
            big: false,
            even: true,
            gold: false,
            wood: false,
            water: false,
            fire: false,
            earth: false,
            odd: false,
            small: false,
        };
        render(<KenoProMaxRoundResult result={mockResult} settlementResult={settlementResultEven} />);
        expect(screen.getByText("kenopromax:even")).toBeInTheDocument();
    });

    it("displays the correct result info for odd", () => {
        const settlementResultOdd: SettlementResult = {
            big: false,
            even: false,
            gold: false,
            wood: false,
            water: false,
            fire: false,
            earth: false,
            odd: false,
            small: false

        };
        render(<KenoProMaxRoundResult result={mockResult} settlementResult={settlementResultOdd} />);
        expect(screen.getByText("kenopromax:odd")).toBeInTheDocument();
    });

    it("displays the correct element", () => {
        render(<KenoProMaxRoundResult result={mockResult} settlementResult={mockSettlementResult} />);
        expect(screen.getByText("kenopromax:wood")).toBeInTheDocument(); // Assuming wood is the first true element
    });

    it("handles no result gracefully", () => {
        render(<KenoProMaxRoundResult result={[]} settlementResult={mockSettlementResult} />);
        expect(screen.getByText("kenopromax:total")).toBeInTheDocument();
    });
}); 