import { GameState, ViewMode } from "../../shared/game-base/type";

const gameSetting = {
    id: 40,
    gameName: "KenoPower",
    socketInfo: {
        namespace: "kenopower",
        path: "kenopower",
    },
    supportMD5: false,
    durations: {
        wholeRound: 51,
        placingBets: 42,
        lockingBet: 5,
        showResult: 8,
        resultAnimation: 4,
        beforeStartRound: 0,
    },
};

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
            blue: 2000,
            red: 2000,
            tie: 2000,
            big: 2000,
            small: 2000,
            odd: 2000,
            even: 2000,
            blueBig: 2000,
            blueSmall: 2000,
            redBig: 2000,
            redSmall: 2000,
        },
        odds: {
            blue: 1.96,
            red: 1.96,
            big: 1.96,
            small: 1.96,
            odd: 1.96,
            even: 1.96,
            blueBig: 1.96,
            blueSmall: 1.96,
            redBig: 1.96,
            redSmall: 1.96,
        },
        enableFreeBet: false,
    },
    gameState: GameState.InRound,
    viewMode: ViewMode.full,
    isShowBlink: false,
    playResultAnimation: true,
};

export const DefaultResult = {
    blue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    red: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
};

export const DefaultSettlementResult = {
    big: true,
    blue: true,
    tie: false,
    blueBig: false,
    blueSmall: true,
    even: false,
    odd: true,
    red: false,
    redBig: true,
    redSmall: true,
    small: false,
};

const session = {
    isAuthenticated: true,
    username: "roger.le",
    language: "en-US",
    ss: "test123",
    memberName: "",
    isUM: false,
    umInfo: { startTime: null, endTime: null },
};

export const authContextValue = { session: session, setBalance: jest.fn };
