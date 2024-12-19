import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import Loader from "../../../../src/components/shared/loader";

test("should render correctly", () => {
    const { getByTestId } = render(<Loader />);

    expect(getByTestId("loader")).toHaveClass("loader");
});
