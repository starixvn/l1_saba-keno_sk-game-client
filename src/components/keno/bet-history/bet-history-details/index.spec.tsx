import { render, fireEvent } from "@testing-library/react";
import { useTranslation } from "next-i18next";
import '@testing-library/jest-dom';
import BetLogsDetails from "./";

describe("KenoSoccer bet-history bet logs detail", () => {
    const gameId = 36;
    describe("Users have  bet, should render data on bet-history ", () => {
        // Arrange
        const gameName = "kenosoccer";
        const firstHalf = {
            result: { blue: [14, 32, 34, 35, 41, 60, 66, 68, 72, 80], red: [3, 7, 22, 27, 43, 44, 56, 63, 64, 66] },
            settlementResult: { blue: true, even: false, odd: true, over: false, red: false, tie: true, under: true },
            sum: 897,
        };
        const fullTime = {
            result: { blue: [21, 24, 25, 32, 51, 52, 56, 64, 75, 77], red: [3, 6, 28, 33, 34, 44, 46, 50, 51, 64] },
            settlementResult: { blue: true, even: false, odd: true, over: false, red: false, tie: false, under: true },
            sum: 897,
        };
        const betLogDetails = [
            { amount: 100, choice: "liveFTRed", time: "2021-09-13T09:16:11.216Z" },
            { amount: 100, choice: "ftUnder", time: "2021-09-13T09:16:06.045Z" },
            { amount: 100, choice: "fhUnder", time: "2021-09-13T09:16:03.382Z" },
            { amount: 100, choice: "fhOdd", time: "2021-09-13T09:16:01.382Z" },
        ];
        const odds = {
            fhBlue: 1.96,
            fhEven: 1.96,
            fhOdd: 1.96,
            fhOver: 1.96,
            fhRed: 1.96,
            fhUnder: 1.96,
            ftBlue: 1.96,
            ftEven: 1.96,
            ftOdd: 1.96,
            ftOver: 1.96,
            ftRed: 1.96,
            ftUnder: 1.96,
            liveFTBlue: 1.2,
            liveFTOver: 1.46,
            liveFTRed: 6.16,
        };
        const resultDetail = { bet: { firstHalf, fullTime, betLogDetails, odds }, roundId: 23230 };

        const { t } = useTranslation(["bethistory", gameName]);
        const resource = { betLog: resultDetail, gameName, t, setIsShowResultDetail: jest.fn, gameId };

        test("should render correctly", () => {
            // Act
            const { getByTestId, getAllByTestId } = render(BetLogsDetails({ ...resource } as any));

            // Assert

            expect(getByTestId("bet-history-details")).toBeInTheDocument();
            expect(getAllByTestId("bet-time").length).toBeGreaterThan(0);
            expect(getAllByTestId("bet-type").length).toBeGreaterThan(0);
            expect(getAllByTestId("bet-choice").length).toBeGreaterThan(0);
            expect(getAllByTestId("stake-refund").length).toBeGreaterThan(0);
        });

        test("should render class highlight", () => {
            // Act
            render(BetLogsDetails({ ...resource } as any));

            // Assert
            expect(document.querySelector(".highlight")).toBeTruthy();
        });

        test("click show result details", () => {
            // Act
            const { getByTestId } = render(BetLogsDetails({ ...resource } as any));
            fireEvent.click(getByTestId("info-results-details"));

            // Assert
            expect(getByTestId("info-results-details")).toBeInTheDocument();
        });
    });

    describe("User without bet", () => {
        // Arrange
        const gameName = "kenosoccer";

        const { t } = useTranslation(["bethistory", gameName]);
        const resource = { betLog: [], gameName, t, setIsShowResultDetail: jest.fn, gameId };

        test("should render correctly", () => {
            // Act
            render(BetLogsDetails({ ...resource } as any));

            // Assert
            expect(document.querySelector(".bet-time")).toBeNull();
            expect(document.querySelector(".bet-type")).toBeNull();
            expect(document.querySelector(".bet-choice")).toBeNull();
            expect(document.querySelector(".stake-refund")).toBeNull();
        });
    });
    describe("Without render component BetLogsDetails ", () => {
        // Arrange
        const gameName = "";

        const { t } = useTranslation(["bethistory", gameName]);
        const resource = { betLog: null, gameName, t, setIsShowResultDetail: jest.fn, gameId };

        test("should render correctly", () => {
            // Act
            render(BetLogsDetails({ ...resource } as any));

            // Assert
            expect(document.querySelector(".bet-history-details")).toBeNull();
        });
    });
});

describe("KenoPower bet-history bet logs detail", () => {
    const gameId = 40;
    describe("Users have  bet, should render data on bet-history ", () => {
        // Arrange
        const gameName = "kenopower";
        const betLogDetails = [{ time: "2021-09-27T04:37:09.353Z", choice: "blueSmall", amount: 1 }];
        const odds = {
            banker: 1.96,
            bankerBig: 1.96,
            bankerSmall: 1.96,
            big: 1.96,
            blue: 4.15,
            even: 1.96,
            green: 3.2,
            indigo: 9.5,
            odd: 1.96,
            orange: 9.5,
            player: 1.96,
            playerBig: 1.96,
            playerSmall: 1.96,
            red: 46,
            small: 1.96,
            viloet: 46,
            yellow: 4.15,
        };
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
                betLogDetails,
                odds,
            },
            roundId: 23230,
        };

        const { t } = useTranslation(["bethistory", gameName]);
        const resource = { betLog: resultDetail, gameName, t, setIsShowResultDetail: jest.fn, gameId };

        test("should render correctly", () => {
            // Act
            const { getByTestId, getAllByTestId } = render(BetLogsDetails({ ...resource } as any));

            // Assert

            expect(getByTestId("bet-history-details")).toBeInTheDocument();
            expect(getAllByTestId("bet-time").length).toBeGreaterThan(0);
            expect(getAllByTestId("bet-type").length).toBeGreaterThan(0);
            expect(getAllByTestId("bet-choice").length).toBeGreaterThan(0);
            expect(getAllByTestId("stake-refund").length).toBeGreaterThan(0);
        });
    });
});
