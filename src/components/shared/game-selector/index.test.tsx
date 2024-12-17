import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GameSelector from "./index";
import { getAppSettings } from "../../../common/app-settings";
import "@testing-library/jest-dom";

jest.mock("../../../common/app-settings", () => ({
    getAppSettings: jest.fn(),
}));

describe("GameSelector", () => {
    const mockOnChangeGame = jest.fn();
    const mockOfferGames = [1, 2, 3];
    const mockSelectedGame = 1;

    beforeEach(() => {
        (getAppSettings as jest.Mock).mockReturnValue({
            gameSettings: {
                1: { gameName: "Game One" },
                2: { gameName: "Game Two" },
                3: { gameName: "Game Three" },
            },
        });
    });

    it("renders correctly and handles game selection", () => {
        const { getByTestId } = render(
            <GameSelector
                onChangeGame={mockOnChangeGame}
                selectedGame={mockSelectedGame}
                offerGames={mockOfferGames}
            />
        );

        // Check if the selected item is rendered
        expect(getByTestId("selected-item")).toHaveTextContent("game one");

        // Open the dropdown menu
        fireEvent.click(getByTestId("selected-item"));

        // Check if dropdown items are rendered
        expect(getByTestId("dropdown-item-1")).toBeInTheDocument();
        expect(getByTestId("dropdown-item-2")).toBeInTheDocument();
        expect(getByTestId("dropdown-item-3")).toBeInTheDocument();

        // Select a game
        fireEvent.click(getByTestId("dropdown-item-2"));
        expect(mockOnChangeGame).toHaveBeenCalledWith(2);
    });
}); 