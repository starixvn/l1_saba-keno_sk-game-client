import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AnnouncementItem from "../../../../../src/components/dashboard/announcement/announcement-item";

describe("AnnouncementItem", () => {
    const mockProps = {
        title: "Test Promotion",
        content: "Test Content",
        isActive: true,
        gameId: 123,
        openGame: jest.fn(),
        onCloseAnnouncement: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render title and content", () => {
        render(<AnnouncementItem {...mockProps} />);

        expect(screen.getByText("Test Promotion")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should handle play now click when promotion is active", () => {
        render(<AnnouncementItem {...mockProps} />);

        const playButton = screen.getByText("joinGame");
        fireEvent.click(playButton);

        expect(mockProps.openGame).toHaveBeenCalledWith(123);
        expect(mockProps.onCloseAnnouncement).toHaveBeenCalled();
    });

    it("should disable play button when promotion is inactive", () => {
        render(<AnnouncementItem {...mockProps} isActive={false} />);

        const playButton = screen.getByText("joinGame");
        expect(playButton).toBeDisabled();

        fireEvent.click(playButton);
        expect(mockProps.openGame).not.toHaveBeenCalled();
        expect(mockProps.onCloseAnnouncement).not.toHaveBeenCalled();
    });

    it("should not render play button when gameId is not provided", () => {
        render(<AnnouncementItem {...mockProps} gameId={123} />);

        expect(screen.queryByText("Play Now")).not.toBeInTheDocument();
    });
}); 