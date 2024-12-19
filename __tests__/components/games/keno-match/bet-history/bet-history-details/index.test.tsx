import React from "react";
import { render, screen } from "@testing-library/react";
import RenderRowKenoMatch from "../../../../../../src/components/games/keno-match/bet-history/bet-history-details";
import { BetLogs, BetDetailProps } from "../../../../../../src/components/games/keno-match/bet-history/bet-history";

const mockTranslateMapping = {
    live: "Live",
    firstHalf: "First Half",
    fullTime: "Full Time",
    red: "Red",
    blue: "Blue",
    over: "Over",
    under: "Under",
    odd: "Odd",
    even: "Even",
};

const mockBet: BetLogs = {
    odds: { fhRed: 1.5, fhBlue: 2.0 },
    firstHalf: {
        settlementResult: {
            red: true,
            blue: false,
            tie: false,
            over: false,
            under: false,
            odd: false,
            even: false
        }
    },
    fullTime: {
        settlementResult: {
            red: false,
            blue: true,
            tie: false,
            over: false,
            under: false,
            odd: false,
            even: false
        }
    },
};

const mockBetDetail: BetDetailProps = {
    time: "2023-10-01T12:00:00Z",
    amount: 100,
    choice: "fhRed",
};

describe("RenderRowKenoMatch", () => {
    it("renders bet time correctly", () => {
        render(<RenderRowKenoMatch betDetail={mockBetDetail} bet={mockBet} translateMapping={mockTranslateMapping} fractionalOddsFormat={false} />);
        expect(screen.getByText("01/10/23")).toBeInTheDocument();
    });

    it("renders bet type correctly", () => {
        render(<RenderRowKenoMatch betDetail={mockBetDetail} bet={mockBet} translateMapping={mockTranslateMapping} fractionalOddsFormat={false} />);
        expect(screen.getByText(mockTranslateMapping.firstHalf)).toBeInTheDocument();
    });

    it("renders bet choice correctly", () => {
        render(<RenderRowKenoMatch betDetail={mockBetDetail} bet={mockBet} translateMapping={mockTranslateMapping} fractionalOddsFormat={false} />);
        expect(screen.getByText(/1.5/i)).toBeInTheDocument();
    });

    it("renders stake refund correctly", () => {
        render(<RenderRowKenoMatch betDetail={mockBetDetail} bet={mockBet} translateMapping={mockTranslateMapping} fractionalOddsFormat={false} />);
        expect(screen.getByText(/100/i)).toBeInTheDocument();
    });
}); 