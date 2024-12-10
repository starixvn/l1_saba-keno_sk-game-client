import { render } from "@testing-library/react";
import React from "react";
import * as rdd from "react-device-detect";

import FirstLoginContainer from ".";
jest.mock("../../../common/constants", () => ({
    systemName: "sk",
}));
describe("FirstLoginContainer", () => {
    test.each`
        isMobile | className
        ${true}  | ${".mobile"}
        ${false} | ${".wrapper"}
    `("should render class follow devices", ({ isMobile, className }) => {
        // Arrange
        rdd.isMobileOnly = isMobile;

        // Act
        render(<FirstLoginContainer />);

        // Assert
        expect(document.querySelector(className)).toBeTruthy();
    });
});
