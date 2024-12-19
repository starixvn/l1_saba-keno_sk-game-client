import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";

import { MiniItemNext, ScoreboardItemNext } from "../../../../../src/components/shared/round-history/dot-next";

describe("MiniItem Next", () => {
    test("should render component", () => {
        // act
        render(<MiniItemNext />);

        // assert
        expect(document.getElementsByClassName("dot-next")).toBeTruthy();
    });
});

describe("Scoreboard ItemNext", () => {
    test("should render component", () => {
        // arrange
        const resource = { row: 0, col: 1 };

        // act
        const { getByTestId } = render(<ScoreboardItemNext {...resource} />);

        // assert
        expect(document.getElementsByClassName("dot-next")).toBeTruthy();
        expect(getByTestId("scoreboard-dot-next")).toHaveStyle(`grid-column-start: ${resource.col}; grid-row-start: ${resource.row};`);
    });
});
