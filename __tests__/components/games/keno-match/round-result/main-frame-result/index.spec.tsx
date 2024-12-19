import { render } from "@testing-library/react";
import React from "react";
import { GameContextProvider } from "../../../../../../src/contexts/game-context/game-context";
import MainFrameResult, { MiddleColum, HalfRoundResult } from "../../../../../../src/components/games/keno-match/round-result/main-frame-result";
import buildGameContext, { buildDefaultResult } from "../../keno-match-test-helper";

const buildMiddleColumProps = (isShowScore = true) => {
    return {
        totalScore: 650,
        headerText: "full time",
        isShowScore,
    };
};

describe("MiddleColum", () => {
    test("should be render correctly", () => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <MiddleColum {...buildMiddleColumProps()} />
            </GameContextProvider>
        );

        expect(document.querySelector(".middle-column")).toBeTruthy();
        expect(document.querySelector(".header")).toBeTruthy();
        expect(document.querySelector(".score-wrapper")).toBeTruthy();
        expect(document.querySelector(".score-wrapper")).toHaveTextContent("sum");
    });

    test.each`
        isShowScore | expectedHeaderText
        ${true}     | ${"650"}
        ${false}    | ${""}
    `("always render header text correctly", ({ isShowScore, expectedHeaderText }) => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <MiddleColum {...buildMiddleColumProps(isShowScore)} />
            </GameContextProvider>
        );

        expect(document.querySelector(".score")).toHaveTextContent(expectedHeaderText);
    });
});

const buildHalfRoundResultProps = (isFirstHalf = true, totalBlue = 650, totalRed = 480) => {
    return {
        isFirstHalf,
        totalBlue,
        totalRed,
        isShowScore: true,
        result: buildDefaultResult(),
    };
};

describe("HalfRoundResult", () => {
    test("should be render correctly", () => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <HalfRoundResult {...buildHalfRoundResultProps()} />
            </GameContextProvider>
        );

        expect(document.querySelector(".result")).toBeTruthy();
        expect(document.querySelector(".main-content")).toBeTruthy();
        expect(document.getElementsByClassName("team").length).toEqual(4);
    });

    test.each`
        isFirstHalf | expectedHeaderText
        ${true}     | ${"firstHalf"}
        ${false}    | ${"fullTime"}
    `("always render header text correctly", ({ isFirstHalf, expectedHeaderText }) => {
        render(
            <GameContextProvider value={buildGameContext() as any}>
                <HalfRoundResult {...buildHalfRoundResultProps(isFirstHalf)} />
            </GameContextProvider>
        );

        expect(document.querySelector(".header")).toHaveTextContent(expectedHeaderText);
    });
});

test("MainFrameResult should be render correctly", () => {
    const props = {
        halfTimeResult: buildDefaultResult(),
        fullTimeResult: buildDefaultResult(),
        isShowH1Score: true,
        isShowFTScore: true,
    };

    render(
        <GameContextProvider value={buildGameContext() as any}>
            <MainFrameResult {...props} />
        </GameContextProvider>
    );

    expect(document.querySelector(".main-result")).toBeTruthy();
});
