import { render } from "@testing-library/react";
import { useTranslation } from "next-i18next";

import RenderScoreDetailKenoMatch from "./";
import { GetTranslateMapping } from "../../../../keno/keno.helper";

describe("KenoSoccer bet-history Result detail", () => {
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
            settlementResult: { blue: false, even: false, odd: true, over: true, red: true, tie: false, under: false },
            sum: 897,
        };

        const { t } = useTranslation(["bethistory", gameName]);
        const translateMapping = GetTranslateMapping(t, gameName);
        test("should render correctly", () => {
            // Act
            const { getAllByTestId } = render(
                RenderScoreDetailKenoMatch({ bet: { firstHalf: firstHalf, fullTime: fullTime }, translateMapping })
            );

            // Assert
            expect(getAllByTestId("score-round").length).toBe(2);
            expect(getAllByTestId("team-component").length).toBe(4);
            expect(getAllByTestId("team-result-row-component").length).toBe(4);
            expect(getAllByTestId("team-winning-info").length).toBe(4);
            expect(document.querySelector(".blue")).toBeTruthy();
            expect(document.querySelector(".red")).toBeTruthy();
        });
    });

    describe("Show text winning info Tie", () => {
        // Arrange
        const gameName = "kenosoccer";
        const firstHalf = {
            result: { blue: [14, 32, 34, 35, 41, 60, 66, 68, 72, 80], red: [14, 32, 34, 35, 41, 60, 66, 68, 72, 80] },
            settlementResult: { blue: false, even: false, odd: true, over: true, red: false, tie: true, under: false },
            sum: 897,
        };
        const fullTime = {
            result: { blue: [3, 7, 22, 27, 43, 44, 56, 63, 64, 66], red: [3, 7, 22, 27, 43, 44, 56, 63, 64, 66] },
            settlementResult: { blue: false, even: false, odd: true, over: true, red: false, tie: true, under: false },
            sum: 897,
        };

        const { t } = useTranslation(["bethistory", gameName]);
        const translateMapping = GetTranslateMapping(t, gameName);
        test("should render correctly", () => {
            // Act
            const { getAllByTestId, getByTestId } = render(
                RenderScoreDetailKenoMatch({ bet: { firstHalf: firstHalf, fullTime: fullTime }, translateMapping })
            );

            // Assert
            expect(getAllByTestId("team-winning-info").length).toBe(4);
            expect(document.querySelector(".tie")).toBeTruthy();
        });
    });
});
