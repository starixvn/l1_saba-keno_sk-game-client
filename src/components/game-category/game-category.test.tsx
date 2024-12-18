import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameCategory } from "./index";
import { GameCategoryType } from "../../helpers/category-helper";
import "@testing-library/jest-dom";
import { AuthContextValueDefault, DefaultGameContext, SystemContextValue } from "../games/keno-pro-max/__tests__/test-helper";
import { GameContextProvider } from "../../contexts/game-context/game-context";
import { SystemContextProvider } from "../../contexts/system";
import { AuthContextProvider } from "../../contexts/auth";

describe("GameCategory Component", () => {
    const mockSelectCategoryPage = jest.fn();
    const favoriteGames = [1, 2, 3];

    beforeEach(() => {
        render(
            <AuthContextProvider value={AuthContextValueDefault as any}>
                <SystemContextProvider value={SystemContextValue}>
                    <GameContextProvider value={DefaultGameContext as any}>
                        <GameCategory
                            selectedCategory={GameCategoryType.keno}
                            selectedPage={1}
                            selectCategoryPage={mockSelectCategoryPage}
                            favoriteGames={favoriteGames}
                        />
                    </GameContextProvider>
                </SystemContextProvider>
            </AuthContextProvider>
        );
    });

    it("renders the category list", () => {
        const categoryItems = screen.getAllByRole("listitem");
        expect(categoryItems.length).toBeGreaterThan(0);
    });

    it("calls selectCategoryPage when a category is clicked", () => {
        const categoryText = screen.getByText("category-keno");
        fireEvent.click(categoryText);
        expect(mockSelectCategoryPage).toHaveBeenCalledWith("keno", 1, true);
    });

    it("renders paging when there are multiple pages", () => {
        const pagingItems = screen.getAllByRole("listitem");
        expect(pagingItems.length).toBeGreaterThan(1);
    });
}); 