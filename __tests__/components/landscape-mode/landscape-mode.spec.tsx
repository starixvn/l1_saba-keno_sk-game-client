import { render } from "@testing-library/react";
import React from "react";

import LandscapeMode from "../../../src/components/landscape-mode";

// import '@testing-library/jest-dom';

test("landscape mode component should render correctly", () => {
    const { getByTestId } = render(<LandscapeMode />);
    expect(getByTestId("landscape-mode-component")).toHaveClass("landscape-mode");
});
