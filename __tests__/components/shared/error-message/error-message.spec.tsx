import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { ErrorMessage, ConnectFailedMessage } from "../../../../src/components/shared/error-message";

describe("ErrorMessage", () => {
    test("renders ErrorMessage component", () => {
        // Arrange
        const resource = { message: "test", closeModal: jest.fn, onSubmit: jest.fn };

        // Act
        render(<ErrorMessage {...resource} />);
        const closeButton = document.querySelector(".icon-close");
        if (closeButton) {
            fireEvent.click(closeButton);
        }

        // Assert
        expect(document.querySelector(".error-message-container")).toBeTruthy();
        expect(document.querySelector(".message")).toHaveTextContent("test");
    });
});

describe("ConnectFailedMessage", () => {
    test("renders ConnectFailedMessage component", () => {
        // Arrange
        const resource = { gameName: "keno", retryConnect: jest.fn, reason: "", onSubmit: jest.fn };
        // Act
        render(<ConnectFailedMessage {...resource} />);
        const closeButton = document.querySelector(".icon-close");
        if (closeButton) {
            fireEvent.click(closeButton);
        }

        // Assert
        expect(document.querySelector(".error-message-container")).toBeTruthy();
        expect(document.querySelector(".list-action")).toBeTruthy();
    });
});
