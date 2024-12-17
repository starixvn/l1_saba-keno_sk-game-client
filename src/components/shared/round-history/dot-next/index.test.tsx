import React from "react";
import { render } from "@testing-library/react";
import { MiniItemNext, ScoreboardItemNext } from "./index";

describe("MiniItemNext", () => {
    it("renders without crashing", () => {
        const { container } = render(<MiniItemNext />);
        expect(container).toBeInTheDocument();
    });
});

describe("ScoreboardItemNext", () => {
    it("renders with correct grid styles", () => {
        const { getByTestId } = render(<ScoreboardItemNext col={1} row={2} />);
        const dot = getByTestId("scoreboard-dot-next");
        expect(dot).toHaveStyle("grid-column-start: 1");
        expect(dot).toHaveStyle("grid-row-start: 2");
    });
}); 