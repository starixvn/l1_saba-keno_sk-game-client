import React from "react";
import { render } from "@testing-library/react";
import KenoPowerOptions from "../../../../../src/components/games/keno-power/bet-options";
import { GameContextProvider } from "../../../../../src/contexts/game-context/game-context";
import { DefaultGameContext, DefaultSettlementResult } from "../keno-power-test-helper";
import { GameState } from "../../../../../src/components/shared/game-base/type";

describe("KenoPowerOptions tests", () => {
    test("should render correctly", () => {
        render(
            <GameContextProvider value={DefaultGameContext as any}>
                <KenoPowerOptions settlementResult={DefaultSettlementResult} gameState={GameState.InRound} isShowWinningEffect={false} />
            </GameContextProvider>
        );

        expect(document.querySelector(".layout-keno-power")).toBeTruthy();
        expect(document.querySelector(".sum-choice-area")).toBeTruthy();
        expect(document.querySelector(".team-choice-area-blue")).toBeTruthy();
        expect(document.querySelector(".team-choice-area-red")).toBeTruthy();
    });
});
