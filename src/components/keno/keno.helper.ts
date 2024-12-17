import { TFunction } from "next-i18next";

export const Choices = {
    blue: "blue",
    red: "red",
    tie: "tie",
    odd: "odd",
    even: "even",
};

export const StatisticRuleEntriesEvenOdd = Object.entries({
    [Choices.even]: (countResult: object, total: number) =>
        countResult[Choices.even] ? Math.round((countResult[Choices.even] * 100) / total) : 0,

    [Choices.odd]: (countResult: object, total: number) =>
        100 - (countResult[Choices.even] ? Math.round((countResult[Choices.even] * 100) / total) : 0),
});

export const StatisticRuleEntriesBlueRed = Object.entries({
    [Choices.blue]: (countResult: object, total: number) =>
        countResult[Choices.blue] ? Math.round((countResult[Choices.blue] * 100) / total) : 0,
    [Choices.tie]: (countResult: object, total: number) =>
        countResult[Choices.tie] ? Math.round((countResult[Choices.tie] * 100) / total) : 0,
    [Choices.red]: (countResult: object, total: number) =>
        100 -
        (countResult[Choices.blue] ? Math.round((countResult[Choices.blue] * 100) / total) : 0) -
        (countResult[Choices.tie] ? Math.round((countResult[Choices.tie] * 100) / total) : 0),
});

export const GetTranslateMapping = (t: TFunction, gameName = "kenosoccer") => {
    return {
        firstHalf: t(`${gameName}:firstHalf`),
        fullTime: t(`${gameName}:fullTime`),
        blue: t(`${gameName}:blue`),
        red: t(`${gameName}:red`),
        over: t(`${gameName}:over`),
        under: t(`${gameName}:under`),
        odd: t(`${gameName}:odd`),
        even: t(`${gameName}:even`),
        live: t(`${gameName}:live`),
        sum: t(`${gameName}:sum`),
        total: t(`${gameName}:total`),
        tie: t(`${gameName}:tie`),
        big: t(`${gameName}:big`),
        small: t(`${gameName}:small`),
        teamBlueRed: t(`${gameName}:teamBlueRed`),
        sumBigSmall: t(`${gameName}:sumBigSmall`),
        sumEvenOdd: t(`${gameName}:sumEvenOdd`),
        teamRedBigSmall: t(`${gameName}:teamRedBigSmall`),
        teamBlueBigSmall: t(`${gameName}:teamBlueBigSmall`),
        teamBlueWin: t(`${gameName}:teamBlueWin`),
        teamRedWin: t(`${gameName}:teamRedWin`),
        blueBig: t(`${gameName}:blueBig`),
        blueSmall: t(`${gameName}:blueSmall`),
        redBig: t(`${gameName}:redBig`),
        redSmall: t(`${gameName}:redSmall`),
    };
};
