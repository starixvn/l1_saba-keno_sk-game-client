import React from "react";
import { render, screen } from "@testing-library/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import TimeOut, { getStaticProps } from "../../src/pages/timeout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import "@testing-library/jest-dom";

// Mock the necessary hooks
jest.mock("next-i18next", () => ({
    useTranslation: jest.fn(),
}));

jest.mock("next-i18next/serverSideTranslations", () => ({
    serverSideTranslations: jest.fn(),
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next-themes", () => ({
    useTheme: jest.fn(),
}));

describe("TimeOut Component", () => {
    const mockT = jest.fn((key) => key); // Mock translation function

    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
        (useRouter as jest.Mock).mockReturnValue({ isReady: true });
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading state initially", () => {
        (useRouter as jest.Mock).mockReturnValue({ isReady: false });
        const { container } = render(<TimeOut />);
        expect(container.firstChild).toBeNull(); // Expect null to be rendered
    });

    it("renders the timeout message after loading", () => {
        const { getByAltText, getByText } = render(<TimeOut />);

        // Check if the image is rendered
        expect(getByAltText("SessionTimeout")).toBeInTheDocument();

        // Check if the timeout messages are rendered
        expect(getByText(/sessionTimeout-1/i)).toBeInTheDocument();
        expect(getByText(/sessionTimeout-2/i)).toBeInTheDocument();
    });
});

describe("getStaticProps", () => {
    it("returns translations for the specified locale", async () => {
        const locale = "en";
        const mockTranslations = { common: "mocked-translations" };
        (serverSideTranslations as jest.Mock).mockResolvedValueOnce(mockTranslations);

        const result = await getStaticProps({ locale });

        expect(serverSideTranslations).toHaveBeenCalledWith(locale, ["common"]);
        expect(result).toEqual({
            props: {
                ...mockTranslations,
            },
        });
    });
}); 