import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BetHistoryDetailsContainer from "../../../../../../src/components/dashboard/history/bet-history/log-details";
import { Props } from "../../../../../../src/components/dashboard/history/bet-history/log-details/bet-history-detail";
import "@testing-library/jest-dom";

describe("BetHistoryDetailsContainer", () => {
    const mockProps: Props = {
        renderBetLogsDetails: <div>Bet Logs</div>,
        renderResultDetail: <div>Result Detail</div>,
        isShowResultDetail: true,
        closeModalBetHistory: jest.fn(),
        closeModalBetDetails: jest.fn(),
        translateText: { betDetails: "Bet Details" },
    };

    test("renders bet details and close button", () => {
        render(<BetHistoryDetailsContainer {...mockProps} />);

        expect(screen.getByText("Bet Details")).toBeInTheDocument();
        expect(screen.getByText("Bet Logs")).toBeInTheDocument();
        expect(screen.getByText("Result Detail")).toBeInTheDocument();
    });

    test("calls closeModalBetDetails when back button is clicked", () => {
        render(<BetHistoryDetailsContainer {...mockProps} />);

        fireEvent.click(screen.getByTestId("back-button"));
        expect(mockProps.closeModalBetDetails).toHaveBeenCalled();
    });

    test("calls closeModalBetHistory when close icon is clicked", () => {
        render(<BetHistoryDetailsContainer {...mockProps} />);

        fireEvent.click(screen.getByTestId("icon-close"));
        expect(mockProps.closeModalBetHistory).toHaveBeenCalled();
    });
}); 