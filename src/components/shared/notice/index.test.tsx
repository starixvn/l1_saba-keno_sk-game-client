import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Notice } from "./index";

describe("Notice Component", () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the message correctly", () => {
        render(<Notice message="Test message" onClose={mockOnClose} duration={3} />);
        expect(screen.getByText("Test message")).toBeInTheDocument();
    });

    test("calls onClose after duration", () => {
        jest.useFakeTimers();
        render(<Notice message="Test message" onClose={mockOnClose} duration={1} />);

        // Fast-forward time
        jest.advanceTimersByTime(1000);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
        jest.useRealTimers();
    });

    test("calls onClose when close button is clicked", () => {
        render(<Notice message="Test message" onClose={mockOnClose} duration={3} />);
        fireEvent.click(screen.getByTestId("close-btn"));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
}); 