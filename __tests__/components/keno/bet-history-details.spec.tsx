import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import BetLogsDetails, { RenderCell, renderRefund } from "../../../src/components/keno/bet-history/bet-history-details";
import { GetTranslateMapping } from "../../../src/components/keno/keno.helper";
import '@testing-library/jest-dom';
import { TFunction } from "i18next";

// Mocking the RenderRowKenoMatch and RenderRowKenoPower components
jest.mock("../../../src/components/games/keno-match/bet-history/bet-history-details", () => () => <td>Mock Keno Match Row</td>);
jest.mock("../../../src/components/games/keno-power/bet-history/bet-history-details", () => () => <td>Mock Keno Power Row</td>);

// Mocking the RenderHeaderRows component
jest.mock("../../../src/components/dashboard/history/bet-history", () => ({
    RenderHeaderRows: () => <tr><th>Header</th></tr>,
}));

jest.mock("../../../src/components/keno/keno.helper", () => ({
    GetTranslateMapping: jest.fn(),
}));

const mockSetIsShowResultDetail = jest.fn();
const mockT: TFunction = ((key: string) => key) as TFunction;

describe("BetLogsDetails", () => {
    const mockBetLog = {
        roundId: 123,
        bet: {
            roundId: 123,
            betLogDetails: [
                { betwin: 10, choice: "Choice1" },
                { betwin: 0, choice: "Choice2" },
            ],
        },
        gameName: "keno",
    };

    beforeEach(() => {
        (GetTranslateMapping as jest.Mock).mockReturnValue({
            round: "Round",
            result: "Result",
            details: "Details",
            "keno:game_name": "Keno Game",
        });
    });

    afterEach(cleanup); // Cleanup after each test

    it("renders without crashing when betLog is provided", () => {
        render(<BetLogsDetails betLog={mockBetLog} gameName="keno" t={mockT} setIsShowResultDetail={mockSetIsShowResultDetail} gameId={1} fractionalOddsFormat={false} />);
        expect(screen.getByText("keno:game_name - round: 123")).toBeInTheDocument();
    });

    it("renders the correct number of bet log details", () => {
        render(<BetLogsDetails betLog={mockBetLog} gameName="keno" t={mockT} setIsShowResultDetail={mockSetIsShowResultDetail} gameId={1} fractionalOddsFormat={false} />);
        expect(screen.getAllByRole("row")).toHaveLength(3); // 2 rows + 1 header row
    });

    it("calls setIsShowResultDetail when clicking on details", () => {
        render(<BetLogsDetails betLog={mockBetLog} gameName="keno" t={mockT} setIsShowResultDetail={mockSetIsShowResultDetail} gameId={1} fractionalOddsFormat={false} />);
        fireEvent.click(screen.getByTestId("info-results-details"));
        expect(mockSetIsShowResultDetail).toHaveBeenCalledWith(true); // Ensure it is called with true
    });

    it("renders without crashing when betLog is not provided", () => {
        render(<BetLogsDetails betLog={null} gameName="keno" t={mockT} setIsShowResultDetail={mockSetIsShowResultDetail} gameId={1} fractionalOddsFormat={false} />);
        expect(screen.queryByText("Keno Game - Round: 123")).not.toBeInTheDocument();
    });

    it("renders an empty table when betLogDetails is empty", () => {
        const emptyBetLog = {
            roundId: 123,
            bet: {
                roundId: 123,
                betLogDetails: [],
            },
        };
        render(<BetLogsDetails betLog={emptyBetLog} gameName="keno" t={mockT} setIsShowResultDetail={mockSetIsShowResultDetail} gameId={1} fractionalOddsFormat={false} />);
        expect(screen.getByText("keno:game_name - round: 123")).toBeInTheDocument();

        const tableBody = screen.getByTestId("bet-history-details").querySelector("tbody");
        expect(tableBody).toBeInTheDocument();
        expect(tableBody).toBeEmptyDOMElement(); // Ensure the tbody is empty
    });
});

describe("RenderCell", () => {
    afterEach(cleanup);
    it("renders with highlight class when isHighligh is true", () => {
        render(<RenderCell isHighligh={true} name="stake">Test Content</RenderCell>);
        const cell = screen.getByTestId("stake");
        expect(cell).toHaveClass("highlight");
        expect(cell).toHaveTextContent("Test Content");
    });

    it("renders without highlight class when isHighligh is false", () => {
        render(<RenderCell isHighligh={false} name="stake">Test Content</RenderCell>);
        const cell = screen.getByTestId("stake");
        expect(cell).not.toHaveClass("highlight");
        expect(cell).toHaveTextContent("Test Content");
    });
});

describe("renderRefund", () => {
    afterEach(cleanup);
    it("renders refund amount when isShowRefundAmount is true", () => {
        render(renderRefund({ amount: 100, isShowRefundAmount: true }));
        expect(screen.getAllByText("100").length).toBeGreaterThan(0);
        expect(screen.getByTestId("refund")).toHaveTextContent("100");
    });

    it("renders only stake amount when isShowRefundAmount is false", () => {
        render(renderRefund({ amount: 100, isShowRefundAmount: false }));
        expect(screen.getByText("100")).toBeInTheDocument();
        expect(screen.queryByTestId("refund")).not.toBeInTheDocument();
    });
});

