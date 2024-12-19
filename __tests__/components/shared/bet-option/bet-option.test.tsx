import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BetOption from "../../../../src/components/shared/bet-option";
import { GameState } from "../../../../src/components/shared/game-base/type";
import { useGameContext } from "../../../../src/contexts/game-context/game-context";
import { useGameActionContext } from "../../../../src/contexts/game-actions-context";
import { useSystemContext } from "../../../../src/contexts/system";

jest.mock("../../../../src/contexts/game-context/game-context");
jest.mock("../../../../src/contexts/game-actions-context");
jest.mock("../../../../src/contexts/system");

const mockUseGameContext = useGameContext as jest.Mock;
const mockUseGameActionContext = useGameActionContext as jest.Mock;
const mockUseSystemContext = useSystemContext as jest.Mock;

describe("BetOption Component", () => {
    beforeEach(() => {
        mockUseGameContext.mockReturnValue({
            totalBets: { choice1: 100 },
            ownBets: { choice1: 50 },
            rate: 1,
            gameSetting: { gameName: "TestGame" },
        });
        mockUseGameActionContext.mockReturnValue({
            placeBet: jest.fn(),
        });
        mockUseSystemContext.mockReturnValue({
            betValue: 10,
            fractionalOddsFormat: false,
        });
    });

    it("renders correctly with props", () => {
        render(
            <BetOption
                gameState={GameState.InRound}
                choice="choice1"
                odd={2}
                isDisplayOdd={true}
                children={<div>Some child content</div>}
                isHighlight={false}
                isShowWinningEffect={false}
            />
        );

        expect(screen.getByText("1:2")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument(); // Total bet
        expect(screen.getByText("50")).toBeInTheDocument(); // Own bet
    });

    it("calls placeBet on click", () => {
        const { placeBet } = mockUseGameActionContext();
        render(
            <BetOption
                gameState={GameState.InRound}
                choice="choice1"
                odd={2}
                isDisplayOdd={true}
                children={<div>Some child content</div>}
                isHighlight={false}
                isShowWinningEffect={false}
            />
        );

        fireEvent.click(screen.getByText("1:2"));

        expect(placeBet).toHaveBeenCalledWith("choice1", 10, expect.any(Object), expect.any(Object));
    });

    it("displays tooltip when isShowTooltip is true", () => {
        render(<BetOption gameState={GameState.InRound} choice="choice1" odd={2.0} isShowTooltip={true} tooltipMessage="Test Tooltip" children={<div>Some child content</div>}
            isHighlight={false}
            isShowWinningEffect={false} />);

        expect(screen.getByText("Test Tooltip")).toBeInTheDocument();
    });
}); 