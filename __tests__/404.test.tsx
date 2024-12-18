import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Custom404, { getStaticProps } from "../src/pages/404";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import "@testing-library/jest-dom";
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
jest.mock("next-themes", () => ({
    useTheme: jest.fn(),
}));
jest.mock("next-i18next", () => ({
    useTranslation: jest.fn(),
    Trans: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("next-i18next/serverSideTranslations", () => ({
    serverSideTranslations: jest.fn(),
}));

describe("Custom404 Component", () => {
    const mockUseRouter = useRouter as jest.Mock;
    const mockUseTheme = useTheme as jest.Mock;
    const mockUseTranslation = useTranslation as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseRouter.mockReturnValue({ isReady: true });
        mockUseTheme.mockReturnValue({ theme: "light" });
        mockUseTranslation.mockReturnValue({
            t: (key: string) => key,
        });
    });

    // test("renders nothing while loading", () => {
    //     // Arrange
    //     mockUseRouter.mockReturnValue({ isReady: false });

    //     // Act
    //     const { container } = render(<Custom404 />);

    //     // Assert
    //     expect(container).toBeEmptyDOMElement();
    // });

    test("renders error page with correct theme and translation", async () => {
        // Arrange
        mockUseRouter.mockReturnValueOnce({ isReady: true });
        mockUseTheme.mockReturnValueOnce({ theme: "dark" });
        mockUseTranslation.mockReturnValueOnce({
            t: (key: string) => key === "errorOccurred" ? "Error occurred with code 404" : key,
        });

        // Act
        render(<Custom404 />);

        // Wait for loading to finish
        await waitFor(() => expect(screen.queryByText("errorOccurred")).toBeInTheDocument());

        // Assert
        expect(screen.getByAltText("error")).toBeInTheDocument();
        expect(screen.getByText("errorOccurred")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "/static/images/error-light.svg");
    });

    test("getStaticProps returns correct props", async () => {
        // Arrange
        const locale = "en";
        const translations = { messages: "mocked-translations" };
        (serverSideTranslations as jest.Mock).mockResolvedValueOnce(translations);

        // Act
        const result = await getStaticProps({ locale });

        // Assert
        expect(serverSideTranslations).toHaveBeenCalledWith(locale, ["messages"]);
        expect(result).toEqual({
            props: {
                ...translations,
            },
        });
    });
});
