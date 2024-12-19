import React from "react";
import { render, waitFor } from "@testing-library/react";
import AnalyticTool from "../../../../../src/components/shared/tools/analytic-tool";
import { getAppSettings } from "../../../../../src/common/app-settings";

// Mock the getAppSettings function
jest.mock("../../../../../src/common/app-settings", () => ({
    getAppSettings: jest.fn(),
}));

describe("AnalyticTool", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("renders the Google Tag Manager script when analytic tool is enabled", async () => {
        (getAppSettings as jest.Mock).mockReturnValue({
            analyticId: "UA-12345678-1",
            enableAnalyticTool: true,
        });
        render(<AnalyticTool />);
        // Wait for the script to be added to the document
        await waitFor(() => {
            const scriptTag = document.querySelector('script[src="https://www.googletagmanager.com/gtag/js?id=UA-12345678-1"]');
            expect(scriptTag).toBeInTheDocument();
        });
        // Check if the inline script is present
        const inlineScript = document.body.innerHTML;
        expect(inlineScript).toContain("gtag('config', 'UA-12345678-1'");
    });
    it("does not render anything when analytic tool is disabled", () => {
        (getAppSettings as jest.Mock).mockReturnValue({
            analyticId: "UA-12345678-1",
            enableAnalyticTool: false,
        });
        const { container } = render(<AnalyticTool />);
        // Check that no script tags are rendered
        expect(container.querySelector('script')).not.toBeInTheDocument();
    });
});
