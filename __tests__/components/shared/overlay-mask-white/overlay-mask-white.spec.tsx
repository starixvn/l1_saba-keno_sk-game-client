import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import OverlayMaskWhite from "../../../../src/components/shared/overlay-mask-white";

test("should render correctly", () => {
    const { getByTestId } = render(<OverlayMaskWhite />);

    expect(getByTestId("overlay")).toHaveClass("overlay-mask-white");
});
