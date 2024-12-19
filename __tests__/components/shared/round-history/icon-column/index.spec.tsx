import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";

import IconColumn, { IconColumnCompactMode } from "../../../../../src/components/shared/round-history/icon-column";

describe("IconColumn", () => {
    test("should render component", () => {
        // arrange
        const children = <span>Test</span>;
        // act
        render(<IconColumn>{children}</IconColumn>);

        // assert
        expect(document.querySelector(".board-col")).toBeTruthy();
    });
});

describe("IconColumn on Compact Mode", () => {
    test("should render component", () => {
        // arrange
        const children = <span>Test</span>;
        // act
        render(<IconColumnCompactMode>{children}</IconColumnCompactMode>);

        // assert
        expect(document.querySelector(".board-col-line")).toBeTruthy();
    });
});
