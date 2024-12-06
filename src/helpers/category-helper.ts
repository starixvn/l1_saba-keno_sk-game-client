import { getAppSettings } from "../common/app-settings";
import { GameIds } from "../common/constants/gameIds";

export const GamesInOnePage = 20;

export const isMegaKenoLobby = () => {
    return getAppSettings().appType === 4;
};

const isIncludeMegaCategory = () => {
    return !!getAppSettings().isIncludeMegaCategory;
};

export enum GameCategoryType {
    hot,
    megakeno,
    keno,
    sedie,
    dice,
    card,
    kenolottery,
    favorite,
}

const Categories = {
    hot: "hot",
    sedie: "sedie",
    dice: "dice",
    card: "card",
    kenolottery: "kenolottery",
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
    [Categories.keno]: [GameIds.SkKenoPower, GameIds.SkKenoPower2, GameIds.SkKenoSoccer, GameIds.SkKenoSoccer2],
};

const GrUSDCategoryConfig = {
    [Categories.hot]: [
        GameIds.SeDie,
        GameIds.VipSeDie,
        GameIds.MiniSeDie,
        GameIds.BigSmall,
        GameIds.BigSmallTurbo,
        GameIds.SpecialSeDie,
        GameIds.KenoProMax,
        GameIds.FishPrawnCrab,
        GameIds.DragonTiger,
        GameIds.VipBaccarat,
        GameIds.Baccarat,
        GameIds.ThreeCards,
    ],
    [Categories.sedie]: [GameIds.SeDie, GameIds.VipSeDie, GameIds.MiniSeDie, GameIds.SpecialSeDie],
    [Categories.dice]: [GameIds.BigSmall, GameIds.BigSmallTurbo, GameIds.FishPrawnCrab],
    [Categories.card]: [GameIds.DragonTiger, GameIds.VipBaccarat, GameIds.Baccarat, GameIds.ThreeCards],
    ...KenoCategoryConfig,
    [Categories.kenolottery]: [GameIds.KenoProMax],
    [Categories.favorite]: [],
};

const OtherCurrencyGroupCategoryConfig = {
    [Categories.hot]: [
        GameIds.Baccarat,
        GameIds.VipBaccarat,
        GameIds.DragonTiger,
        GameIds.ThreeCards,
        GameIds.KenoProMax,
        GameIds.FishPrawnCrab,
        GameIds.SeDie,
        GameIds.VipSeDie,
        GameIds.MiniSeDie,
    ],
    [Categories.card]: [GameIds.Baccarat, GameIds.VipBaccarat, GameIds.DragonTiger, GameIds.ThreeCards],
    [Categories.dice]: [GameIds.FishPrawnCrab, GameIds.SeDie, GameIds.VipSeDie, GameIds.MiniSeDie],
    ...KenoCategoryConfig,
    [Categories.kenolottery]: [GameIds.KenoProMax],
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

export const favoriteGameIdIgnore = [GameIds.SkKenoPower, GameIds.SkKenoPower2, GameIds.SkKenoSoccer, GameIds.SkKenoSoccer2];
