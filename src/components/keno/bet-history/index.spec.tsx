import React from "react";
import { render, screen } from "@testing-library/react";
import KenoBetHistory from "./index";
import BetHistoryContainer from "../../dashboard/history/bet-history";
import "@testing-library/jest-dom";

jest.mock("../../dashboard/history/bet-history", () => {
    return jest.fn(() => <div data-testid="bet-history-container">Mocked BetHistoryContainer</div>);
});

describe("KenoBetHistory", () => {
    const defaultProps = {
        gameId: 123,
        fractionalOddsFormat: false,
        closeModal: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders BetHistoryContainer with correct props", () => {
        render(<KenoBetHistory {...defaultProps} />);

        expect(BetHistoryContainer).toHaveBeenCalledWith(
            {
                gameId: 123,
                isRefund: false,
                renderResultDetail: expect.any(Function),
                closeModal: expect.any(Function),
                renderBetLogsDetails: expect.any(Function),
                fractionalOddsFormat: false,
                nameHeaderOnTable: ["roundTime", "round", "totalStake", "onlyRefund", "win"],
            },
            {}
        );
    });

    test("renders with fractionalOddsFormat as true", () => {
        render(<KenoBetHistory {...defaultProps} fractionalOddsFormat={true} />);

        expect(BetHistoryContainer).toHaveBeenCalledWith(
            expect.objectContaining({
                fractionalOddsFormat: true,
            }),
            {}
        );
    });

    test("renders with fractionalOddsFormat as undefined", () => {
        render(<KenoBetHistory {...defaultProps} fractionalOddsFormat={undefined} />);

        expect(BetHistoryContainer).toHaveBeenCalledWith(
            expect.objectContaining({
                fractionalOddsFormat: undefined,
            }),
            {}
        );
    });

    test("passes closeModal function to BetHistoryContainer", () => {
        const mockCloseModal = jest.fn();
        render(<KenoBetHistory {...defaultProps} closeModal={mockCloseModal} />);

        expect(BetHistoryContainer).toHaveBeenCalledWith(
            expect.objectContaining({
                closeModal: mockCloseModal,
            }),
            {}
        );
    });

    test("component renders without crashing", () => {
        render(<KenoBetHistory {...defaultProps} />);
        expect(screen.getByTestId("bet-history-container")).toBeInTheDocument();
    });
});