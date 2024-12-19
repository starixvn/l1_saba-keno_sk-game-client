import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ResultDetailContainer from "../../../../../../src/components/dashboard/history/bet-history/result-detail";

describe("ResultDetailContainer", () => {
    // Arrange
    const resource = {
        roundId: 1,
        children: null,
        closeModal: jest.fn(),
        gameName: "Keno Match",
    };

    test("should render correctly", () => {
        // Act
        const { getByTestId } = render(<ResultDetailContainer {...resource} />);

        // Assert
        expect(getByTestId("bet-history-result-detail")).toBeInTheDocument();
    });

    test("should render game name", () => {
        // Act
        const { getByTestId } = render(<ResultDetailContainer {...resource} />);

        // Assert
        expect(getByTestId("game-name")).toBeInTheDocument();
    });

    test("should render round ID", () => {
        // Act
        const { getByTestId } = render(<ResultDetailContainer {...resource} />);

        // Assert
        expect(getByTestId("roundId")).toBeInTheDocument();
    });

    test("should render icon close", () => {
        // Act
        const { getByTestId } = render(<ResultDetailContainer {...resource} />);

        // Assert
        expect(getByTestId("icon-close")).toBeInTheDocument();
        fireEvent.click(getByTestId("icon-close"));
    });
});
