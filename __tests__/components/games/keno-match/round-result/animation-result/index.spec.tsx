import { render } from "@testing-library/react";
import React from "react";
import { GameContextProvider } from "../../../../../../src/contexts/game-context/game-context";
import AnimationResult from "../../../../../../src/components/games/keno-match/round-result/animation-result";
import buildGameContext, { buildDefaultResult } from "../../keno-match-test-helper";

const buildAnimationResultProps = (isFirstHalf = true, isShowCollapse = false, playResultAnimation = true) => {
    return {
        halfTimeResultInline: buildDefaultResult(),
        fullTimeResultInline: buildDefaultResult(),
        isFirstHalf,
        playResultAnimation,
        isShowCollapse,
    };
};

describe("AnimationResult", () => {
    test("should be render correctly in fullmode case", () => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <AnimationResult {...buildAnimationResultProps()} />
            </GameContextProvider>
        );

        expect(document.querySelector(".animation-result")).toBeTruthy();
        expect(document.querySelector(".result")).toBeTruthy();
        expect(document.querySelector(".open-result")).toBeTruthy();
        expect(document.querySelector(".header")).toBeTruthy();
        expect(document.querySelector(".main-content")).toBeTruthy();
    });

    test("should be render correctly in collapse case", () => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <AnimationResult {...buildAnimationResultProps(true, true)} />
            </GameContextProvider>
        );

        expect(document.querySelector(".animation-result")).toBeFalsy();
    });
    test.each`
        isFirstHalf | expectedHeaderText
        ${true}     | ${"firstHalf"}
        ${false}    | ${"fullTime"}
    `("always render header text correctly", ({ isFirstHalf, expectedHeaderText }) => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <AnimationResult {...buildAnimationResultProps(isFirstHalf, false, true)} />
            </GameContextProvider>
        );

        expect(document.querySelector(".header")).toHaveTextContent(expectedHeaderText);
    });
});
