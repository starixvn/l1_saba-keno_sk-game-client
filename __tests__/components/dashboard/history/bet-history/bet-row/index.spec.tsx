import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RenderCellOnTable from "../../../../../../src/components/dashboard/history/bet-history/bet-row/index";
import { TFunction } from "next-i18next";
import { BetLogs } from "../../../../../../src/components/dashboard/history/bet-history/bet-history.d";
import "@testing-library/jest-dom";
const fakeDate = new Date('2024-12-20T00:00:00.000Z');

const mockBetHistoryItem = {
    time: fakeDate.toISOString(),
    phien: 1,
    betwin: 100,
    freeBet: false,
    totalAmount: 200,
    odds: { choice1: 2, choice2: 3 },
    settlementResult: { choice1: true, choice2: false },
    name: "Test Bet",
    choice1: 100,
    choice2: 50,
    result: {},
    refund: 50,
} as BetLogs & {
    choice1: number;
    choice2: number;
};

const mockRenderResult = jest.fn();
const mockSetIsShowResultDetail = jest.fn();
const mockSetBetLog = jest.fn();
const mockSetIsShowBetLogDetails = jest.fn();
const mockT: TFunction = ((key: string) => key) as TFunction;

describe("RenderCellOnTable", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("renders round correctly", () => {
        render(
            <RenderCellOnTable
                betHistoryItem={mockBetHistoryItem}
                renderResult={mockRenderResult}
                renderBet={jest.fn()}
                t={mockT}
                setIsShowResultDetail={mockSetIsShowResultDetail}
                gameName="testGame"
                setIsShowBetLogDetails={mockSetIsShowBetLogDetails}
                setBetLog={mockSetBetLog}
                headerName={["round"]}
                fractionalOddsFormat={false}
            />
        );

        expect(screen.getByText(mockBetHistoryItem.phien)).toBeInTheDocument();
    });

    it("renders result correctly", () => {
        render(
            <RenderCellOnTable
                betHistoryItem={mockBetHistoryItem}
                renderResult={mockRenderResult}
                renderBet={jest.fn()}
                t={mockT}
                setIsShowResultDetail={mockSetIsShowResultDetail}
                gameName="testGame"
                setIsShowBetLogDetails={mockSetIsShowBetLogDetails}
                setBetLog={mockSetBetLog}
                headerName={["result"]}
                fractionalOddsFormat={false}
            />
        );

        expect(mockRenderResult).toHaveBeenCalledWith(mockBetHistoryItem, mockBetHistoryItem.phien, mockSetIsShowResultDetail, mockSetBetLog, mockT);
    });

    it("renders choice correctly", () => {
        const mockRenderBet = jest.fn().mockReturnValue(<div>{mockBetHistoryItem.name}</div>);
        render(
            <RenderCellOnTable
                betHistoryItem={mockBetHistoryItem}
                renderResult={mockRenderResult}
                renderBet={mockRenderBet}
                t={mockT}
                setIsShowResultDetail={mockSetIsShowResultDetail}
                gameName="testGame"
                setIsShowBetLogDetails={mockSetIsShowBetLogDetails}
                setBetLog={mockSetBetLog}
                headerName={["choice"]}
                fractionalOddsFormat={false}
            />
        );

        expect(screen.getByText(mockBetHistoryItem.name)).toBeInTheDocument();
    });

    it("renders stake correctly", () => {
        render(
            <RenderCellOnTable
                betHistoryItem={mockBetHistoryItem}
                renderResult={mockRenderResult}
                renderBet={jest.fn()}
                t={mockT}
                setIsShowResultDetail={mockSetIsShowResultDetail}
                gameName="testGame"
                setIsShowBetLogDetails={mockSetIsShowBetLogDetails}
                setBetLog={mockSetBetLog}
                headerName={["stake"]}
                fractionalOddsFormat={false}
            />
        );

        expect(screen.getByText(mockBetHistoryItem.choice1.toString())).toBeInTheDocument();
        expect(screen.getByText(mockBetHistoryItem.choice2.toString())).toBeInTheDocument();
    });

    it("renders refund correctly", () => {
        render(
            <RenderCellOnTable
                betHistoryItem={mockBetHistoryItem}
                renderResult={mockRenderResult}
                renderBet={jest.fn()}
                t={mockT}
                setIsShowResultDetail={mockSetIsShowResultDetail}
                gameName="testGame"
                setIsShowBetLogDetails={mockSetIsShowBetLogDetails}
                setBetLog={mockSetBetLog}
                headerName={["onlyRefund"]}
                fractionalOddsFormat={false}
            />
        );

        expect(screen.getByText(mockBetHistoryItem.refund!.toString())).toBeInTheDocument();
    });

    it("renders total stake and handles click", () => {
        render(
            <RenderCellOnTable
                betHistoryItem={mockBetHistoryItem}
                renderResult={mockRenderResult}
                renderBet={jest.fn()}
                t={mockT}
                setIsShowResultDetail={mockSetIsShowResultDetail}
                gameName="testGame"
                setIsShowBetLogDetails={mockSetIsShowBetLogDetails}
                setBetLog={mockSetBetLog}
                headerName={["totalStake"]}
                fractionalOddsFormat={false}
            />
        );

        const totalStakeElement = screen.getByText(mockBetHistoryItem.totalAmount!.toString());
        fireEvent.click(totalStakeElement);
        expect(mockSetIsShowBetLogDetails).toHaveBeenCalledWith(true);
        expect(mockSetBetLog).toHaveBeenCalledWith({ bet: mockBetHistoryItem, roundId: mockBetHistoryItem.phien, t: mockT });
    });

    it("renders win correctly", () => {
        render(
            <RenderCellOnTable
                betHistoryItem={mockBetHistoryItem}
                renderResult={mockRenderResult}
                renderBet={jest.fn()}
                t={mockT}
                setIsShowResultDetail={mockSetIsShowResultDetail}
                gameName="testGame"
                setIsShowBetLogDetails={mockSetIsShowBetLogDetails}
                setBetLog={mockSetBetLog}
                headerName={["win"]}
                fractionalOddsFormat={false}
            />
        );

        expect(screen.getByText(mockBetHistoryItem.betwin.toString())).toBeInTheDocument();
    });

    it("handles unknown header gracefully", () => {
        render(
            <RenderCellOnTable
                betHistoryItem={mockBetHistoryItem}
                renderResult={mockRenderResult}
                renderBet={jest.fn()}
                t={mockT}
                setIsShowResultDetail={mockSetIsShowResultDetail}
                gameName="testGame"
                setIsShowBetLogDetails={mockSetIsShowBetLogDetails}
                setBetLog={mockSetBetLog}
                headerName={["unknownHeader"]}
                fractionalOddsFormat={false}
            />
        );

        expect(screen.queryByText(/unknownHeader/i)).not.toBeInTheDocument();
    });
}); 