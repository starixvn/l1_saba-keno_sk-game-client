import { getAppSettings } from "../common/app-settings";
import { GameIds } from "../common/constants/gameIds";

export const GamesInOnePage = 20;

export const isMegaKenoLobby = () => {
    return getAppSettings().appType === 1;
};

const isIncludeMegaCategory = () => {
    return !!getAppSettings().isIncludeMegaCategory;
};

export enum GameCategoryType {
    megakeno,
    keno,
}

const Categories = {
    megakeno: "megakeno",
    keno: "keno",
};

const KenoCategoryConfig = {
    [Categories.megakeno]: [
        GameIds.MegaKeno,
        GameIds.MegaKeno2,
        GameIds.SkKenoMini,
        GameIds.SkKenoMini2,
        GameIds.SkKenoEast,
        GameIds.SkKenoWest,
        GameIds.SkKenoSouth,
        GameIds.SkKenoNorth,
    ],
    [Categories.keno]: [GameIds.SkKenoPower, GameIds.SkKenoPower2, GameIds.SkKenoSoccer, GameIds.SkKenoSoccer2],
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

export const favoriteGameIdIgnore = [GameIds.SkKenoPower, GameIds.SkKenoPower2, GameIds.SkKenoSoccer, GameIds.SkKenoSoccer2];
