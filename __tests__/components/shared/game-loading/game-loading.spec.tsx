import { render } from "@testing-library/react";
import React from "react";

import GameLoading from "../../../../src/components/shared/game-loading";

describe("GameLoading", () => {
    test("renders GameLoading component", () => {
        // act
        const { getByTestId } = render(<GameLoading />);

        // assert
        expect(getByTestId("game-loading")).toBeInTheDocument();
    });
});
