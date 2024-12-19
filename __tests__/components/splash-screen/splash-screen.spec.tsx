import { render } from "@testing-library/react";
import React from "react";

import SplashScreen from "../../../src/components/splash-screen";
import { locales } from "../../../src/common/constants";
jest.mock("../../../src/common/constants", () => ({
    systemName: "sk",
    locales: { vi: "vi" },
}));

describe("Splash screen", () => {
    ["en", "vi"].forEach((locale) => {
        it("should render logo", () => {
            const { getByAltText } = render(<SplashScreen locale={locale} />);
            console.log("getByAltText", getByAltText);
            expect(getByAltText("Logo")).toBeInTheDocument();
        });
    });

    it("should render intro image when local is vn", () => {
        const { getByAltText } = render(<SplashScreen locale={locales.vi} />);

        expect(getByAltText("Info")).toBeInTheDocument();
    });

    it("render empty component", () => {
        const { getByAltText } = render(<SplashScreen locale={undefined} />);

        expect(document.querySelector(".page")).toBeNull();
    });
});
