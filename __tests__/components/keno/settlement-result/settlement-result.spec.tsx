import { render } from "@testing-library/react";
import React from "react";

import { GameContextProvider } from "../../../../src/contexts/game-context/game-context";
import { DefaultGameContext, DefaultSettlementResult } from "../../keno/keno-test-helper";
import RoundSettlementResult from "../../../../src/components/keno/settlement-result";

describe("RoundSettlementResult", () => {
    //Arrange
    const displayChoices = ["big", "small", "odd", "even", "blueBig", "blueSmall", "redBig", "redSmall"];

    test("should render component", () => {
        // Act
        render(
            <GameContextProvider value={DefaultGameContext as any}>
                <RoundSettlementResult title={""} settlementResult={DefaultSettlementResult} displayChoices={displayChoices} />
            </GameContextProvider>
        );

        // Assert
        expect(document.querySelector(".half-round-settlement")).toBeTruthy();
        expect(document.querySelector(".winning-team")).toBeTruthy();
        expect(document.querySelector(".teamBlueWin")).toBeTruthy();
        expect(document.querySelector(".result-info-red")).toBeTruthy();
        expect(document.querySelector(".result-info-blue")).toBeTruthy();
    });

    // test("should without render component", () => {
    //     // Act
    //     render(
    //         <GameContextProvider value={DefaultGameContext as any}>
    //             <RoundSettlementResult title={""} settlementResult={{}} displayChoices={displayChoices} />
    //         </GameContextProvider>
    //     );

    //     // Assert
    //     expect(document.querySelector(".half-round-settlement")).toBeNull();
    // });

    test("should render winning Tie", () => {
        // Act
        const settlementResult = {
            big: true,
            blue: false,
            tie: true,
            blueBig: false,
            blueSmall: true,
            even: false,
            odd: true,
            red: false,
            redBig: true,
            redSmall: true,
            small: false,
        };
        render(
            <GameContextProvider value={DefaultGameContext as any}>
                <RoundSettlementResult title={""} settlementResult={settlementResult} displayChoices={displayChoices} />
            </GameContextProvider>
        );

        // Assert
        expect(document.querySelector(".half-round-settlement")).toBeTruthy();
        expect(document.querySelector(".tie")).toBeTruthy();
    });

    test("should render team Red winning", () => {
        // Act
        const settlementResult = {
            big: true,
            blue: false,
            tie: false,
            blueBig: false,
            blueSmall: true,
            even: false,
            odd: true,
            red: true,
            redBig: true,
            redSmall: true,
            small: false,
        };
        render(
            <GameContextProvider value={DefaultGameContext as any}>
                <RoundSettlementResult title={""} settlementResult={settlementResult} displayChoices={displayChoices} />
            </GameContextProvider>
        );

        // Assert
        expect(document.querySelector(".half-round-settlement")).toBeTruthy();
        expect(document.querySelector(".teamRedWin")).toBeTruthy();
    });
});
