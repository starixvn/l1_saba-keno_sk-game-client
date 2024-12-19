import { render, fireEvent } from "@testing-library/react";
import React from "react";

import Register from "../../../../src/components/dashboard/register";
import { session } from "../dashboard-test-helper"

const setup = () => {
    const utils = render(<input aria-label="cost-input" />);
    const input = utils.getByLabelText("cost-input");
    return {
        input,
        ...utils,
    };
};

jest.mock("../../../../src/common/constants", () => ({
    systemName: "sk",
    maximumAvatarId: 10,
}));

describe("Register", () => {
    test("should render correctly", async () => {
        // Act
        render(<Register session={session as any} handleStateLogin={jest.fn} />);

        // Assert
        expect(document.querySelector(".page-bg")).toBeTruthy();
        expect(document.querySelector(".profile-picture")).toBeTruthy();
    });

    test("action generate username", async () => {
        // Act
        const { getByTestId } = render(<Register session={session as any} handleStateLogin={jest.fn} />);
        fireEvent.click(getByTestId("btn-generate-username"));

        // Assert
        expect(document.querySelector(".btn-refresh")).toBeTruthy();
    });

    test("action clear username", async () => {
        // Act
        const { getByTestId } = render(<Register session={session as any} handleStateLogin={jest.fn} />);
        fireEvent.click(getByTestId("btn-clear-username"));

        // Assert
        expect(document.querySelector(".icon-cancel")).toBeTruthy();
    });

    test("should render component Avatar Gallery", async () => {
        // Act
        const { getByTestId } = render(<Register session={session as any} handleStateLogin={jest.fn} />);
        fireEvent.change(getByTestId("input-username"));
        fireEvent.click(getByTestId("profile-picture"));

        // Assert
        expect(document.querySelector(".gallery-wrapper")).toBeTruthy();
        expect(document.querySelector(".img-wrapper")).toBeTruthy();

        fireEvent.click(getByTestId("btn-close-gallery"));
    });

    test("selected one avatar gallery", async () => {
        // Act
        const { getByTestId } = render(<Register session={session as any} handleStateLogin={jest.fn} />);
        fireEvent.click(getByTestId("profile-picture"));
        fireEvent.click(getByTestId("btn-submit-gallery"));

        // Assert
        expect(document.querySelector(".gallery-wrapper")).toBeNull();
    });

    test("action submit form register", async () => {
        // Act
        const { getByTestId } = render(<Register session={session as any} handleStateLogin={jest.fn} />);
        fireEvent.click(getByTestId("btn-generate-username"));
        fireEvent.submit(getByTestId("btn-form-submit"));
        fireEvent.click(getByTestId("profile-picture"));
        fireEvent.click(getByTestId("btn-submit-gallery"));

        // Assert
        expect(document.querySelector(".login-form")).toBeTruthy();
    });

    test("allow input username on form", async () => {
        // Act
        const { getByTestId } = render(<Register session={session as any} handleStateLogin={jest.fn} />);
        fireEvent.change(getByTestId("input-username"), { target: { value: "test123" } });

        // Assert
        expect(document.querySelector(".user-box")).toBeTruthy();
        expect(getByTestId("input-username")).toHaveValue("test123");
    });
});
