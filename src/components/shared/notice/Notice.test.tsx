import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Notice } from "./index";

describe("Notice Component", () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        render(
            <Notice
                message="Test message"
                onClose={mockOnClose}
                duration={3}
                isWarning={true}
            />
        );
    });

    it("renders the message correctly", () => {
        expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        fireEvent.click(screen.getByTestId("close-btn"));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
}); 