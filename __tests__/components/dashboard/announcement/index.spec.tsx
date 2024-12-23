import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AnnouncementModal } from "../../../../src/components/dashboard/announcement";
import { useTranslation } from "next-i18next";

// Mock dependencies
jest.mock("next-i18next", () => ({
    useTranslation: jest.fn(),
    Trans: ({ children }) => children,
}));

jest.mock("../../../../src/components/dashboard/announcement/announcement-item", () => ({
    __esModule: true,
    default: ({ title, message, isActive, gameId, openGame }) => (
        <div data-testid="mock-announcement" className={`item-content ${isActive ? 'active' : ''}`}>
            <div data-testid="announcement-title">{title}</div>
            <div data-testid="announcement-message">{message}</div>
            {gameId && <button onClick={() => openGame(gameId)}>Play Game</button>}
        </div>
    )
}));

describe("AnnouncementModal", () => {
    // Mock props and translation setup
    const mockOnCloseModal = jest.fn();
    const mockOpenGame = jest.fn();
    const mockPromotionNotifications = [
        {
            title: {
                en: "Test Promotion 1",
                vi: "Khuyến mãi 1"
            },
            messages: {
                en: "Test Message 1",
                vi: "Nội dung 1"
            },
            isActive: true,
            gameId: 123
        },
        {
            title: {
                en: "Test Promotion 2",
                vi: "Khuyến mãi 2"
            },
            messages: {
                en: "Test Message 2",
                vi: "Nội dung 2"
            },
            isActive: false,
            gameId: 456
        }
    ];

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Setup translation mock
        (useTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key,
            i18n: {
                language: "en"
            }
        });
    });

    it("should render promotion tab by default", () => {
        render(
            <AnnouncementModal
                onCloseModal={mockOnCloseModal}
                promotionNotifications={mockPromotionNotifications}
                openGame={mockOpenGame}
            />
        );

        expect(screen.getByText("promotion")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("should switch to terms tab when clicked", () => {
        render(
            <AnnouncementModal
                onCloseModal={mockOnCloseModal}
                promotionNotifications={mockPromotionNotifications}
                openGame={mockOpenGame}
            />
        );

        fireEvent.click(screen.getByText("terms"));

        // Should show terms content
        expect(screen.getByText("common:termsPromotion-1")).toBeInTheDocument();
        expect(screen.getByText("common:termsPromotion-2")).toBeInTheDocument();
    });

    it("should close modal when close icon is clicked", () => {
        render(
            <AnnouncementModal
                onCloseModal={mockOnCloseModal}
                promotionNotifications={mockPromotionNotifications}
                openGame={mockOpenGame}
            />
        );

        fireEvent.click(screen.getByTestId("icon-close"));
        expect(mockOnCloseModal).toHaveBeenCalled();
    });

    it("should render empty promotion list when no notifications", () => {
        render(
            <AnnouncementModal
                onCloseModal={mockOnCloseModal}
                promotionNotifications={[]}
                openGame={mockOpenGame}
            />
        );

        expect(screen.queryByText("Test Promotion 1")).not.toBeInTheDocument();
        expect(screen.queryByText("2")).not.toBeInTheDocument();
    });


    it("should pass correct props to AnnouncementItem", () => {
        render(
            <AnnouncementModal
                onCloseModal={mockOnCloseModal}
                promotionNotifications={mockPromotionNotifications}
                openGame={mockOpenGame}
            />
        );

        // Verify AnnouncementItem props
        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveClass("item-content -0");
        expect(items[1]).toHaveClass("item-content -1");
    });

}); 