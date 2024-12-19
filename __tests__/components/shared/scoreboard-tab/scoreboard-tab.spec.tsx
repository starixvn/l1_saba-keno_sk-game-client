import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import React from "react";

import ScoreboardTab from "../../../../src/components/shared/scoreboard-tab";
import { GameActionsContextProvider } from "../../../../src/contexts/game-actions-context";

describe("Scoreboard tab", () => {
    // arrange
    const resourceTab = {
        redBlack: { tabName: "Red/Back", tabWinningStreak: 4 },
        suits: { tabName: "suits", tabWinningStreak: 0 },
    };

    test("should render once class active", () => {
        // act
        render(<ScoreboardTab tabsValue={resourceTab} activeScoreboardTab={1} />);

        // assert
        expect(document.getElementsByClassName("tabs-active").length).toBe(1);
    });

    test("click tab", () => {
        // arrange
        const gameActionsContext = {
            placeBet: null,
            openPopup: null,
            closePopup: () => { },
            registerMessageHandler: Function,
            unsubscribeMessageHandler: Function,
            updateViewMode: null,
            playAcceptedBetAnimation: () => { },
            finishProcessingBet: () => { },
            renderResultCollapse: null,
            setActiveScoreboardTab: jest.fn(),
            updateStatusShowResult: Function,
        };

        // act
        const { getAllByTestId } = render(
            <GameActionsContextProvider value={gameActionsContext as any}>
                <ScoreboardTab tabsValue={resourceTab} activeScoreboardTab={1} />
            </GameActionsContextProvider>
        );
        let tabs = getAllByTestId("tab-child");
        fireEvent.click(tabs[0]);

        // assert
        expect(tabs[0].getElementsByClassName("tabs-active").length).toBe(1);
    });

    test("show winning streak when tabWinningStreak is greater than three", () => {
        // act
        const { getAllByTestId } = render(<ScoreboardTab tabsValue={resourceTab} activeScoreboardTab={0} />);

        // assert
        expect(getAllByTestId("winning-streak").length).toBeGreaterThan(0);
    });
});
