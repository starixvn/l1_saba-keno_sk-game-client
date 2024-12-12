import { WithTranslation } from "next-i18next";
import { WithRouterProps } from "next/dist/client/with-router";
import { AuthorizeResponse, SSOResponse } from "sc-user-service-client/dist/auth";
import { UserStakeLevel } from "../shared/game-base/type";
import { ChipInfo } from "sc-user-service-client/dist/setting";

export type Props = {
    session: SSOResponse;
    queryGame: number;
    setIsUm: Function;
} & WithRouterProps &
    WithTranslation;

type APIErrorProp = {
    message: string;
    errorCode: string;
};

export type State = {
    orientation: string;
    enabledWinningStreakNotification: boolean;
    enabledPlaySound: boolean;
    userStakeLevel: UserStakeLevel;
    authorizeInfo: AuthorizeResponse;
    isShowErrorModal: boolean;
    apiError: APIErrorProp;
    isShowHistory: boolean;
    isShowAnnouncement: boolean;
    isShowGuide: boolean;
    favoriteGames: number[];
    betValue: number;
    isBlockUI: boolean;
    isShowSlidingChip: boolean;
    isShowBoostedOdds: boolean;
    isNewPromotion: boolean;
    promotionNotifications: [];
    promotions: Promotion[];
    queryGame: number;
    isJoinGame: boolean;
    settingGames: number[];
    openGameId: number;
    isShowToolbarGuide: boolean;
    chipSettings: ChipSettings;
    offeredGames: number[];
};

export type Promotion = {
    gameId: number;
    _id: string;
    endDateTime: string;
    isDaily: boolean;
    odds: any;
    startDateTime: string;
    status: string;
    time: string;
};

export type GameOffer = {
    gameId: number;
    maxBet: number;
    minBet: number;
    _id: string;
    maxBetPerChoices: any;
};

export type ChipSettings = {
    minBet?: number;
    maxBet?: number;
    chips?: string[];
    chipColors?: ChipInfo[];
};
