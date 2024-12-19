import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameCategory } from "../../../src/components/game-category";
import { GameCategoryType } from "../../../src/helpers/category-helper";
import { AuthContextValueDefault, DefaultGameContext, SystemContextValue } from "../games/keno-pro-max/keno-pro-max-test-helper";
import { GameContextProvider } from "../../../src/contexts/game-context/game-context";
import { SystemContextProvider } from "../../../src/contexts/system";
import { AuthContextProvider } from "../../../src/contexts/auth";

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