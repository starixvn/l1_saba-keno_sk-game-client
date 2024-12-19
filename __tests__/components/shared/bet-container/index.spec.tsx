import React from "react";
import { render, screen } from "@testing-library/react";
import BetContainer from "../../../../src/components/shared/bet-container/index";
import { useSystemContext } from "../../../../src/contexts/system";
import { GameState } from "../../../../src/components/shared/game-base/type";

jest.mock("../../../../src/contexts/system", () => ({
    useSystemContext: jest.fn(),
}));

jest.mock("../../../../src/common/constants", () => ({
    buildVersion: "1",
}));

describe("BetContainer", () => {
    const mockChildren = <div>Test Children</div>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders children correctly", () => {
        (useSystemContext as jest.Mock).mockReturnValue({
            betValue: "100",
            chipSettings: {
                chipColors: [{ value: "100", color: "#ff0000" }],
            },
        });

        render(<BetContainer gameState={GameState.InRound}>{mockChildren}</BetContainer>);

        expect(screen.getByText("Test Children")).toBeInTheDocument();
    });

    it("sets cursor style correctly when gameState is InRound", () => {
        (useSystemContext as jest.Mock).mockReturnValue({
            betValue: "100",
            chipSettings: {
                chipColors: [{ value: "100", color: "#ff0000" }],
            },
        });

        const { container } = render(<BetContainer gameState={GameState.InRound}>{mockChildren}</BetContainer>);

        expect(container.firstChild).toHaveStyle(`cursor: url("/static/images/chips/cursor/chip-ff0000.png?v=1"), url(/static/images/chips/cursor/chip-default.png?v=2), auto`);
    });

    it("sets cursor style to not-allowed when gameState is not InRound", () => {
        (useSystemContext as jest.Mock).mockReturnValue({
            betValue: "100",
            chipSettings: {
                chipColors: [{ value: "100", color: "#ff0000" }],
            },
        });

        const { container } = render(<BetContainer gameState={GameState.LockingBet}>{mockChildren}</BetContainer>);

        expect(container.firstChild).toHaveStyle("cursor: not-allowed");
    });

    it("renders OverlayMaskWhite when gameState is LockingBet", () => {
        (useSystemContext as jest.Mock).mockReturnValue({
            betValue: "100",
            chipSettings: {
                chipColors: [{ value: "100", color: "#ff0000" }],
            },
        });

        render(<BetContainer gameState={GameState.LockingBet}>{mockChildren}</BetContainer>);

        expect(screen.queryByTestId("overlay")).toBeInTheDocument();
    });

    it("does not render OverlayMaskWhite when gameState is not LockingBet", () => {
        (useSystemContext as jest.Mock).mockReturnValue({
            betValue: "100",
            chipSettings: {
                chipColors: [{ value: "100", color: "#ff0000" }],
            },
        });

        render(<BetContainer gameState={GameState.InRound}>{mockChildren}</BetContainer>);

        expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
    });
}); 