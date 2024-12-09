import { render } from "@testing-library/react";
import { useTranslation } from "next-i18next";

import ResultDetail from "./";

describe("KenoSoccer bet-history Result detail", () => {
    const gameId = 36;
    describe("Users have  bet, should render data on bet-history ", () => {
        // Arrange
        const gameName = "kenosoccer";
        const firstHalf = {
            result: { blue: [14, 32, 34, 35, 41, 60, 66, 68, 72, 80], red: [3, 7, 22, 27, 43, 44, 56, 63, 64, 66] },
            settlementResult: { blue: true, even: false, odd: true, over: true, red: false, tie: false, under: false },
            sum: 897,
        };
        const fullTime = {
            result: { blue: [21, 24, 25, 32, 51, 52, 56, 64, 75, 77], red: [3, 6, 28, 33, 34, 44, 46, 50, 51, 64] },
            settlementResult: { blue: true, even: false, odd: true, over: true, red: false, tie: false, under: false },
            sum: 897,
        };
        const resultDetail = { bet: { firstHalf: firstHalf, fullTime: fullTime }, roundId: 23230 };
        const { t } = useTranslation(["bethistory", gameName]);

        test("should render correctly", () => {
            // Act
            const { getByTestId, getAllByTestId } = render(ResultDetail(resultDetail, t, null, gameName, gameId));

            // Assert
            expect(getByTestId("result-details")).toBeInTheDocument();
            expect(getAllByTestId("score-round").length).toBe(2);
            expect(getAllByTestId("team-winning-info").length).toBe(4);
        });
    });

    describe("Without render component ResultDetail ", () => {
        // Arrange
        const gameName = "";
        const { t } = useTranslation(["bethistory", gameName]);
        const resultDetail = null;

        test("should render correctly", () => {
            // Act
            render(ResultDetail(resultDetail, t, null, gameName, gameId));

            // Assert
            expect(document.querySelector(".result-details")).toBeNull();
        });
    });
});

describe("KenoPower bet-history Result detail", () => {
    const gameId = 40;
    describe("Users have  bet, should render data on bet-history ", () => {
        // Arrange
        const gameName = "kenopower1";
        const resultDetail = {
            bet: {
                result: {
                    blue: [3, 6, 8, 13, 14, 15, 18, 19, 26, 27, 32, 39, 43, 46, 49, 54, 59, 60, 75, 78],
                    red: [1, 4, 14, 16, 22, 24, 29, 30, 32, 38, 39, 45, 52, 53, 54, 59, 69, 73, 76, 79],
                },
                settlementResult: {
                    big: false,
                    blue: false,
                    blueBig: false,
                    blueSmall: true,
                    even: false,
                    odd: true,
                    red: true,
                    redBig: false,
                    redSmall: true,
                    small: true,
                    tie: false,
                },
            },
            roundId: 33820,
        };
        const { t } = useTranslation(["bethistory", gameName]);

        test("should render correctly", () => {
            // Act
            const { getByTestId, getAllByTestId } = render(ResultDetail(resultDetail, t, null, gameName, gameId));

            // Assert
            expect(getByTestId("result-details")).toBeInTheDocument();
            expect(getAllByTestId("score-round").length).toBe(1);
            expect(getAllByTestId("team-winning-info").length).toBe(4);
        });
    });
});
