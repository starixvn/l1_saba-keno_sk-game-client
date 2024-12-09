import { render } from "@testing-library/react";
import React from "react";
import KenoMatchBetOptions from "./";
import { FakeSettlementResult } from "../keno-match-helper";
import { GameState } from "../../../shared/game-base/type";
import { GameContextProvider } from "../../../../contexts/game-context/game-context";
import buildGameContext from "../__test__/test-helper";

const liveOdds = {
    liveFTBlue: 2.54,
    liveFTRed: 1.66,
    liveFTOver: 1.37,
    liveFTUnder: 3.7,
};

function buildBetOptionsProps(isFirstHalf: boolean, beforeStartFulltime = false, isLockingBet = false) {
    return {
        liveOdds,
        gameState: isLockingBet ? GameState.LockingBet : GameState.InRound,
        firstHalfSettlementResult: FakeSettlementResult,
        fullTimeSettlementResult: FakeSettlementResult,
        isShowWinningEffect: true,
        isFirstHalf,
        beforeStartFulltime
    };
}

describe("KenoMatchBetOptions", () => {
    test.each`
        isFirstHalf | beforeStartFulltime | expectedLiveBetOptionResult | expectedHasAnimationResult
        ${true}     | ${true}             | ${0}                        | ${0}
        ${true}     | ${false}            | ${0}                        | ${0}
        ${false}    | ${false}            | ${1}                        | ${0}
        ${false}    | ${true}             | ${1}                        | ${1}
    `(
        "should render has-animation and live-bet-option correctly",
        ({ isFirstHalf, beforeStartFulltime, expectedLiveBetOptionResult, expectedHasAnimationResult }) => {
            render(
                <GameContextProvider value={buildGameContext() as any}>
                    <KenoMatchBetOptions {...buildBetOptionsProps(isFirstHalf, beforeStartFulltime)} />
                </GameContextProvider>
            );

            expect(document.getElementsByClassName("live-bet-option").length).toEqual(expectedLiveBetOptionResult);
            expect(document.getElementsByClassName("has-animation").length).toEqual(expectedHasAnimationResult);
        }
    );

    test.each`
        isFirstHalf
        ${true}
        ${true}
        ${false}
        ${false}
    `("always render in match", ({ isFirstHalf }) => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <KenoMatchBetOptions {...buildBetOptionsProps(isFirstHalf, false)} />
            </GameContextProvider>
        );

        expect(document.querySelector(".title-wrapper")).toBeTruthy();
        expect(document.querySelector(".title-left")).toBeTruthy();
        expect(document.querySelector(".layout-kenosoccer")).toBeTruthy();

        expect(document.getElementsByClassName("total-row").length).toEqual(2);
        expect(document.querySelectorAll('div[class^="choice-"]').length).toEqual(12);
        expect(document.getElementsByClassName("bet-choice-name").length).toEqual(12);
    });

    test.each`
        isFirstHalf | expectedDisabledContainer | expectedDisabledChoice
        ${true}     | ${0}                      | ${0}
        ${false}    | ${1}                      | ${2}
    `("render disabled correctly", ({ isFirstHalf, expectedDisabledContainer, expectedDisabledChoice }) => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <KenoMatchBetOptions {...buildBetOptionsProps(isFirstHalf, false)} />
            </GameContextProvider>
        );

        expect(document.getElementsByClassName("layout-kenosoccer disabled").length).toEqual(expectedDisabledContainer);
        expect(document.querySelectorAll('div[class^="choice-"].disabled').length).toEqual(expectedDisabledChoice);
    });

    test.each`
        isLockingBet | expectedHighlightWinning
        ${true}      | ${false}
        ${false}     | ${true}
    `("render highlight wining correctly", ({ isLockingBet, expectedHighlightWinning }) => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <KenoMatchBetOptions {...buildBetOptionsProps(true, false, isLockingBet)} />
            </GameContextProvider>
        );

        expect(document.getElementsByClassName("highlight-winning").length > 0).toEqual(expectedHighlightWinning);
    });
});
