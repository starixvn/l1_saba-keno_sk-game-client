import { render } from "@testing-library/react";
import { useTranslation } from "next-i18next";

import RenderRowKenoPower from "./";
import { GetTranslateMapping } from "../../../../keno/keno.helper";

describe("KenoSoccer Info Bet History Detail", () => {
    const tableRow = document.createElement("tr");
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
            settlementResult: { blue: false, even: false, odd: true, over: false, red: false, tie: true, under: true },
            sum: 897,
        };
        const betDetail = { amount: 100, choice: "fhOdd", time: "2021-09-13T09:16:01.382Z" };
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

        const { t } = useTranslation(["bethistory", gameName]);
        const translateMapping = GetTranslateMapping(t, gameName);
        const resource = { bet: { firstHalf, fullTime, odds }, betDetail, translateMapping };

        test("should render correctly", () => {
            // Act
            const { getByTestId, getAllByTestId } = render(RenderRowKenoPower({ ...resource } as any), {
                container: document.body.appendChild(tableRow),
            });

            // Assert

            expect(getAllByTestId("bet-time").length).toBeGreaterThan(0);
            expect(getAllByTestId("bet-type").length).toBeGreaterThan(0);
            expect(getAllByTestId("bet-choice").length).toBeGreaterThan(0);
            expect(getAllByTestId("stake-refund").length).toBeGreaterThan(0);
        });

        test("should render class highlight", () => {
            // Act
            render(RenderRowKenoPower({ ...resource } as any), {
                container: document.body.appendChild(tableRow),
            });

            // Assert
            expect(document.querySelector(".highlight")).toBeTruthy();
        });
    });
});
