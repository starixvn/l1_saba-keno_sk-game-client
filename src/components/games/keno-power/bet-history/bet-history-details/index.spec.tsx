import { render } from "@testing-library/react";
import { useTranslation } from "next-i18next";

import RenderRowKenoMatch from "./";
import { GetTranslateMapping } from "../../../../keno/keno.helper";

describe("KenoSoccer Info Bet History Detail", () => {
    const tableRow = document.createElement("tr");
    const gameName = "kenopower";
    const odds = {
        big: 1.96,
        blue: 1.96,
        blueBig: 1.96,
        blueSmall: 1.96,
        even: 1.96,
        odd: 1.96,
        red: 1.96,
        redBig: 1.96,
        redSmall: 1.96,
        small: 1.96,
    };
    const { t } = useTranslation(["bethistory", gameName]);
    const translateMapping = GetTranslateMapping(t, gameName);

    describe("Users have  bet, should render data on bet-history ", () => {
        // Arrange
        const settlementResult = {
            big: true,
            blue: true,
            blueBig: true,
            blueSmall: false,
            even: false,
            odd: true,
            red: false,
            redBig: true,
            redSmall: false,
            small: false,
            tie: false,
        };
        const betDetail = { amount: 100, choice: "blue", time: "2021-10-12T03:16:09.104Z" };
        const resource = { bet: { settlementResult, odds }, betDetail, translateMapping };
        test("should render correctly", () => {
            // Act
            const { getAllByTestId } = render(RenderRowKenoMatch({ ...resource }), {
                container: document.body.appendChild(tableRow),
            });

            // Assert

            expect(getAllByTestId("bet-time").length).toBeGreaterThan(0);
            expect(getAllByTestId("bet-type").length).toBeGreaterThan(0);
            expect(getAllByTestId("bet-choice").length).toBeGreaterThan(0);
            expect(getAllByTestId("stake-refund").length).toBeGreaterThan(0);
        });
    });

    describe("Users bet full bet-options, should render data on bet-history ", () => {
        // Arrange
        const settlementResult = {
            big: true,
            blue: false,
            blueBig: true,
            blueSmall: false,
            even: false,
            odd: true,
            red: false,
            redBig: true,
            redSmall: false,
            small: false,
            tie: true,
        };
        test.each`
            betDetail                                                               | expectedResult                         | refund
            ${{ amount: 100, choice: "blue", time: "2021-10-12T03:16:09.104Z" }}    | ${`${gameName}:blue/${gameName}:red`}  | ${100}
            ${{ amount: 100, choice: "big", time: "2021-10-12T03:16:09.104Z" }}     | ${`${gameName}:big/${gameName}:small`} | ${0}
            ${{ amount: 100, choice: "odd", time: "2021-10-12T03:16:09.104Z" }}     | ${`${gameName}:odd/${gameName}:even`}  | ${0}
            ${{ amount: 100, choice: "redBig", time: "2021-10-12T03:16:09.104Z" }}  | ${`${gameName}:teamRedBigSmall`}       | ${0}
            ${{ amount: 100, choice: "blueBig", time: "2021-10-12T03:16:09.104Z" }} | ${`${gameName}:teamBlueBigSmall`}      | ${0}
        `("render disabled correctly", ({ betDetail, expectedResult, refund }) => {
            const resource = { bet: { settlementResult, odds }, betDetail, translateMapping };

            // Act
            const { getByTestId, getAllByTestId, container } = render(RenderRowKenoMatch({ ...resource }), {
                container: document.body.appendChild(tableRow),
            });

            // Assert
            expect(getByTestId("bet-type")).toHaveTextContent(expectedResult);
            refund > 0 && expect(document.querySelector(".refund")).toHaveTextContent(refund);
        });
    });
});
