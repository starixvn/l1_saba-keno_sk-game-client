import { GameIds } from "../../src/common/constants/gameIds";
import {
    GameCategoryType,
    Categories,
    GetGameCategoryConfig,
    GetOfferedGames,
    GetAllGameByCurrencyGroup,
    favoriteGameIdIgnore,
    GamesInOnePage
} from "../../src/helpers/category-helper";

describe("Category Helper", () => {
    describe("Constants", () => {
        it("should have correct GamesInOnePage value", () => {
            expect(GamesInOnePage).toBe(20);
        });

        it("should have correct GameCategoryType enum values", () => {
            expect(GameCategoryType.hot).toBe(0);
            expect(GameCategoryType.megakeno).toBe(1);
            expect(GameCategoryType.keno).toBe(2);
            expect(GameCategoryType.favorite).toBe(3);
        });

        it("should have correct Categories object values", () => {
            expect(Categories.hot).toBe("hot");
            expect(Categories.megakeno).toBe("megakeno");
            expect(Categories.keno).toBe("keno");
            expect(Categories.favorite).toBe("favorite");
        });

        it("should have correct favoriteGameIdIgnore array", () => {
            expect(favoriteGameIdIgnore).toEqual([
                GameIds.KenoPower,
                GameIds.KenoPower2,
                GameIds.KenoSoccer,
                GameIds.KenoSoccer2
            ]);
        });
    });

    describe("GetGameCategoryConfig", () => {
        it("should return KenoCategoryConfig regardless of currency group", () => {
            const config = GetGameCategoryConfig("any-currency");

            expect(config[Categories.megakeno]).toEqual([
                GameIds.MegaKeno,
                GameIds.MegaKeno2,
                GameIds.KenoMini,
                GameIds.KenoMini2,
                GameIds.KenoEast,
                GameIds.KenoWest,
                GameIds.KenoSouth,
                GameIds.KenoNorth,
            ]);

            expect(config[Categories.keno]).toEqual([
                GameIds.KenoPower,
                GameIds.KenoPower2,
                GameIds.KenoSoccer,
                GameIds.KenoSoccer2
            ]);
        });
    });

    describe("GetAllGameByCurrencyGroup", () => {
        it("should return all unique games from category config", () => {
            const allGames = GetAllGameByCurrencyGroup("any-currency");

            // Check if all games from both categories are included
            const expectedGames = [
                GameIds.MegaKeno,
                GameIds.MegaKeno2,
                GameIds.KenoMini,
                GameIds.KenoMini2,
                GameIds.KenoEast,
                GameIds.KenoWest,
                GameIds.KenoSouth,
                GameIds.KenoNorth,
                GameIds.KenoPower,
                GameIds.KenoPower2,
                GameIds.KenoSoccer,
                GameIds.KenoSoccer2
            ];

            expect(allGames).toEqual(expectedGames);

            // Verify uniqueness
            const uniqueGames = new Set(allGames);
            expect(allGames.length).toBe(uniqueGames.size);
        });
    });

    describe("GetOfferedGames", () => {
        it("should return intersection of offered games and available games", () => {
            const offeredGames = [
                GameIds.MegaKeno,
                GameIds.KenoMini,
                GameIds.KenoPower,
                999 // Non-existent game
            ];

            const result = GetOfferedGames("any-currency", offeredGames);

            expect(result).toEqual([
                GameIds.MegaKeno,
                GameIds.KenoMini,
                GameIds.KenoPower
            ]);
        });

        it("should return empty array when no games are offered", () => {
            const result = GetOfferedGames("any-currency", []);
            expect(result).toEqual([]);
        });

        it("should return empty array when offered games don't match available games", () => {
            const result = GetOfferedGames("any-currency", [999, 888]);
            expect(result).toEqual([]);
        });
    });
});