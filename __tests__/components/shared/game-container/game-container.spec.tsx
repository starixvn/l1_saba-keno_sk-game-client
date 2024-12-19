import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";

import GameContainer from "../../../../src/components/shared/game-container";

describe("GameContainer", () => {
    test("renders GameContainer component", () => {
        const { getByText } = render(<GameContainer>{"children"}</GameContainer>);

        expect(getByText("children")).toBeInTheDocument();
    });
});
