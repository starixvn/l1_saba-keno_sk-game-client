import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import WinningBet from "../../../../../src/components/shared/animations/winning-bet";

test("should render correct winning amount", () => {
    const { getByTestId } = render(<WinningBet amount={1000} />);

    expect(getByTestId("number")).toHaveTextContent("+1,000");
});
