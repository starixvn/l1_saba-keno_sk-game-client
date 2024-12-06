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
        GameIds.SkKenoMini,
        GameIds.SkKenoMini2,
        GameIds.SkKenoEast,
        GameIds.SkKenoWest,
        GameIds.SkKenoSouth,
        GameIds.SkKenoNorth,
    ],
    [Categories.keno]: [GameIds.KenoPower, GameIds.KenoPower2, GameIds.SkKenoSoccer, GameIds.SkKenoSoccer2],
};

const GrUSDCategoryConfig = {
    [Categories.hot]: [
    ],

    ...KenoCategoryConfig,
    [Categories.favorite]: [],
};

const OtherCurrencyGroupCategoryConfig = {
    [Categories.hot]: [
    ],
    ...KenoCategoryConfig,
    [Categories.favorite]: [],
};

export const GetGameCategoryConfig = (currencyGroupName: string) => {
    if (isMegaKenoLobby()) {
        return KenoCategoryConfig;
    }

    const groups = ["Cash_INH", "GrUSD"];
    const configs = groups.includes(currencyGroupName) ? GrUSDCategoryConfig : OtherCurrencyGroupCategoryConfig;
    if (!isIncludeMegaCategory()) {
        delete configs[Categories.megakeno];
        delete configs[Categories.keno];
    }
    return configs;
};

export const GetOfferedGames = (currencyGroupName: string, offerGames: number[]) => {
    return GetAllGameByCurrencyGroup(currencyGroupName).filter((gameId) => offerGames.includes(gameId));
};

export const GetAllGameByCurrencyGroup = (currencyGroupName: string) => {
    return Object.values(GetGameCategoryConfig(currencyGroupName))
        .flatMap((e) => e)
        .filter((gameId, index, array) => array.indexOf(gameId) === index);
};

export const favoriteGameIdIgnore = [GameIds.KenoPower, GameIds.KenoPower2, GameIds.SkKenoSoccer, GameIds.SkKenoSoccer2];
