import { GameIds } from "../common/constants/gameIds";

export const GamesInOnePage = 20;

export enum GameCategoryType {
    hot,
    megakeno,
    keno,
    favorite,
}

export const Categories = {
    hot: "hot",
    megakeno: "megakeno",
    keno: "keno",
    favorite: "favorite",
};

const KenoCategoryConfig = {
    [Categories.megakeno]: [
        GameIds.MegaKeno,
        GameIds.MegaKeno2,
        GameIds.KenoMini,
        GameIds.KenoMini2,
        GameIds.KenoEast,
        GameIds.KenoWest,
        GameIds.KenoSouth,
        GameIds.KenoNorth,
    ],
    [Categories.keno]: [GameIds.KenoPower, GameIds.KenoPower2, GameIds.KenoSoccer, GameIds.KenoSoccer2],
};

export const GetGameCategoryConfig = (currencyGroupName: string) => {
    return KenoCategoryConfig;
};

export const GetOfferedGames = (currencyGroupName: string, offerGames: number[]) => {
    return GetAllGameByCurrencyGroup(currencyGroupName).filter((gameId) => offerGames.includes(gameId));
};

export const GetAllGameByCurrencyGroup = (currencyGroupName: string) => {
    return Object.values(GetGameCategoryConfig(currencyGroupName))
        .flatMap((e) => e)
        .filter((gameId, index, array) => array.indexOf(gameId) === index);
};

export const favoriteGameIdIgnore = [GameIds.KenoPower, GameIds.KenoPower2, GameIds.KenoSoccer, GameIds.KenoSoccer2];
