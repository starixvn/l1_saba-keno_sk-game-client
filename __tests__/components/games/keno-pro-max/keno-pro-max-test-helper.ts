import { GameState, ViewMode } from "../../../../src/components/shared/game-base/type";

export const gameSetting = {
    id: 8,
    gameName: "KenoProMax",
    supportMD5: false,
    socketInfo: {
        namespace: "kenopromax",
        path: "kenopromax",
    },
    durations: {
        wholeRound: 40,
        placingBets: 30,
        lockingBet: 5,
        showResult: 9,
        resultAnimation: 4,
        beforeStartRound: 0,
    },
};

const userStakeLevel = { minBet: 1, maxBet: 2000 };

export const DefaultGameContext = {
    gameSetting: gameSetting,
    totalBets: {},
    ownBets: {},
    roundId: 1,
    remainingTime: 1,
    gameConfigs: {
        minBet: 1,
        maxBet: 2000,
        maxBetPerChoices: {
            big: 2000,
            earth: 500,
            even: 2000,
            fire: 1500,
            gold: 500,
            odd: 2000,
            small: 2000,
            water: 2000,
            wood: 1500,
        },
        odds: {
            big: 1.96,
            earth: 9.2,
            even: 1.96,
            fire: 4.6,
            gold: 9.2,
            odd: 1.96,
            small: 1.96,
            water: 2.4,
        },
        enableFreeBet: false,
    },
    gameState: GameState.InRound,
    viewMode: ViewMode.full,
    isShowBlink: false,
    playResultAnimation: true,
};

export const DefaultResult = [4, 6, 17, 24, 26, 39, 41, 44, 46, 47, 49, 58, 62, 64, 66, 69, 70, 76, 78, 79];

export const DefaultSettlementResult = {
    big: true,
    earth: true,
    even: false,
    fire: false,
    gold: false,
    odd: true,
    small: false,
    water: false,
    wood: false,
};

export const session = {
    isAuthenticated: true,
    username: "roger.le",
    language: "en-US",
    ss: "test123",
    memberName: "",
    isUM: false,
    umInfo: { startTime: new Date("2022-09-16"), endTime: new Date("2022-09-19") },
};

export const AuthContextValueDefault = { currencyGroup: "test", session: session, setBalance: jest.fn, signOut: jest.fn };

export const SystemContextValue = {
    setFavorite: jest.fn,
    favoriteGames: [],
    enabledPlaySound: true,
    gamesOrder: [8],
    userStakeLevel: userStakeLevel,
    enabledQuickBet: true,
    betValue: 0,
};

export const kenoProps = {
    id: 8,
    gameName: "KenoProMax",
    socketInfo: gameSetting.socketInfo,
    durations: gameSetting.durations,
    notifyWinStreak: () => { },
    playPlaceBetSound: () => { },
    viewMode: ViewMode.full,
    setApiErrorMessage: () => { },
    supportMD5: false,
    userStakeLevel: userStakeLevel,
    updateUserStakeLevel: () => { },
    socketGateway: null,
    socketGatewayState: 0,
    retryConnectSocket: () => { },
    them: "light",
    unsubscribeGlobalMessageEvent: () => { },
    registerGlobalMessageEvent: () => { },
};
