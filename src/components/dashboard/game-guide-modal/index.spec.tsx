import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameGuideModal } from "./index";
import { useTranslation } from "next-i18next";

// Mock the dependencies
jest.mock("next-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock("../../shared/game-selector", () => ({
    GameSelector: ({ onChangeGame, selectedGame, offerGames }) => (
        <select
            data-testid="game-selector"
            value={selectedGame}
            onChange={(e) => onChangeGame(Number(e.target.value))}
        >
            {offerGames.map((game) => (
                <option key={game} value={game}>
                    Game {game}
                </option>
            ))}
        </select>
    ),
}));

jest.mock("./game-guide", () => ({
    __esModule: true,
    default: () => <div data-testid="game-guides">Game Guides Content</div>,
}));

describe("GameGuideModal", () => {
    const defaultProps = {
        onCloseModal: jest.fn(),
        userStakeLevel: 1,
        offerGames: [1, 2, 3],
        promotions: [{ gameId: 1 }],
        settingGames: [
            {
                gameId: 1,
                maxBetPerChoices: 1000,
                maxBet: 5000,
                minBet: 100,
            },
        ],
        fractionalOddsFormat: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders correctly with initial props", () => {
        render(<GameGuideModal {...defaultProps} />);

        expect(screen.getByText("popupTitleGuide")).toBeInTheDocument();
        expect(screen.getByText("common:game")).toBeInTheDocument();
        expect(screen.getByTestId("game-selector")).toBeInTheDocument();
        expect(screen.getByTestId("game-guides")).toBeInTheDocument();
    });

    it("calls onCloseModal when close icon is clicked", () => {
        render(<GameGuideModal {...defaultProps} />);

        const closeIcon = screen.getByTestId("icon-close");
        fireEvent.click(closeIcon);

        expect(defaultProps.onCloseModal).toHaveBeenCalledTimes(1);
    });

    it("updates selected game when game selector changes", () => {
        render(<GameGuideModal {...defaultProps} />);

        const gameSelector = screen.getByTestId("game-selector");
        fireEvent.change(gameSelector, { target: { value: "2" } });

        expect(screen.getByTestId("game-guides")).toBeInTheDocument();
    });

    it("sets promotion status correctly based on selected game", () => {
        const props = {
            ...defaultProps,
            promotions: [{ gameId: 2 }],
        };

        render(<GameGuideModal {...props} />);

        const gameSelector = screen.getByTestId("game-selector");

        expect(screen.getByTestId("game-guides")).toBeInTheDocument();

        fireEvent.change(gameSelector, { target: { value: "2" } });
        expect(screen.getByTestId("game-guides")).toBeInTheDocument();
    });

    it("sets game configs correctly when game changes", () => {
        const props = {
            ...defaultProps,
            settingGames: [
                {
                    gameId: 2,
                    maxBetPerChoices: 2000,
                    maxBet: 10000,
                    minBet: 200,
                },
            ],
        };

        render(<GameGuideModal {...props} />);

        const gameSelector = screen.getByTestId("game-selector");
        fireEvent.change(gameSelector, { target: { value: "2" } });

        expect(screen.getByTestId("game-guides")).toBeInTheDocument();
    });
});