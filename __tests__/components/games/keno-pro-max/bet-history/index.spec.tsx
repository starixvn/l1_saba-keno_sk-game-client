import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { useTranslation } from "next-i18next";

import KenoProMaxBetHistory, { renderResult, renderResultDetail } from "../../../../../src/components/games/keno-pro-max/bet-history";
import { AuthContextProvider } from "../../../../../src/contexts/auth";
import { DefaultGameContext, AuthContextValueDefault, DefaultResult, DefaultSettlementResult } from "../keno-pro-max-test-helper";
import "@testing-library/jest-dom";

const gameName = "kenopromax";

describe("KenoProMaxBetHistory BetHistory", () => {
    test("should render correctly", () => {
        // Arrange
        const gameId = 8;

        // Act
        const { getByTestId } = render(
            <AuthContextProvider value={AuthContextValueDefault as any}>
                <KenoProMaxBetHistory gameId={gameId} fractionalOddsFormat={false}></KenoProMaxBetHistory>
            </AuthContextProvider>
        );

        // Assert
        expect(getByTestId("bet-history-loading")).toBeInTheDocument();
    });
});

describe("renderResult BetHistory", () => {
    test("should render correctly", () => {
        // Arrange
        const { t } = useTranslation(["bethistory", gameName]);
        const betLogs = {
            time: "2021-10-14T09:25:19.767Z",
            result: DefaultResult,
            settlementResult: DefaultSettlementResult,
            odds: DefaultGameContext.gameConfigs.odds,
            big: 10,
            earth: 0,
            even: 0,
            fire: 0,
            gold: 0,
            odd: 0,
            small: 20,
            water: 0,
            wood: 0,
        };
        const roundId = 1;

        // Act
        const { getByTestId } = render(renderResult(betLogs, roundId, jest.fn, jest.fn, t));
        fireEvent.click(getByTestId("detail"));

        // Assert
        expect(document.querySelector(".detail")).toBeTruthy();
    });

    test("should render empty children correctly", () => {
        // Arrange
        const { t } = useTranslation(["bethistory", gameName]);
        const betLogs = {};
        const roundId = 1;

        // Act
        render(renderResult(betLogs as any, roundId, jest.fn, jest.fn, t));

        // Assert
        expect(document.querySelector(".detail")).toBeNull();
    });
});

describe("renderResultDetail BetHistory", () => {
    // Arrange
    const { t } = useTranslation(["bethistory", gameName]);
    const roundId = 1;
    test("should render correctly", () => {
        // Arrange
        const betLogs = {
            time: "2021-10-14T09:25:19.767Z",
            result: DefaultResult,
            settlementResult: DefaultSettlementResult,
            odds: DefaultGameContext.gameConfigs.odds,
            big: 10,
            earth: 0,
            even: 0,
            fire: 0,
            gold: 0,
            odd: 0,
            small: 20,
            water: 0,
            wood: 0,
        };
        const resultDetail = { bet: betLogs, roundId };

        // Act
        render(renderResultDetail(resultDetail, t, jest.fn, gameName));

        // Assert
        expect(document.querySelector(".result-detail")).toBeTruthy();
        expect(document.querySelector(".number-container")).toBeTruthy();
        expect(document.querySelector(".settle-info")).toBeTruthy();
        expect(document.querySelector(".keno-pro-max-bet-history")).toBeTruthy();
    });

    test("should render empty children correctly", () => {
        // Arrange
        const betLogs = null;
        const resultDetail = { bet: betLogs, roundId };

        // Act
        render(renderResultDetail(resultDetail, t, jest.fn, gameName));

        // Assert
        expect(document.querySelector(".result-detail")).toBeNull();
    });
});
