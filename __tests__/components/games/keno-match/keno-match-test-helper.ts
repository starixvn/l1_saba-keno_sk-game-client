import { GameState, ViewMode } from "../../../../src/components/shared/game-base/type";

const buildGameContext = (gameState = GameState.InRound) => {
    const gameSetting = {
        id: 1511,
        gameName: "KenoSoccer",
        socketInfo: {
            namespace: "kenosoccer",
            path: "kenosoccer",
        },
        supportMD5: true,
        durations: {
            wholeRound: 71,
            showFullTimeSettlementResult: 66,

            halfTimePlacingBets: 58,
            resetResult: 36,
            halfTimeLockingBet: 36,
            showHalfTimeResult: 31,
            showHalfTimeSettlementResult: 27,

            beforeStartFullTimePlacingBet: 19,
            fullTimePlacingBets: 18,
            fullTimeLockingBet: 5,
            showFullTimeResult: 0,

            showResult: 6,
            halfTimeDuration: 27,
            fullTimeDuration: 18,
            resultAnimation: 8,
            settlementWinning: 6,
        },
    };

    return {
        gameSetting: gameSetting,
        totalBets: {},
        ownBets: {},
        roundId: 1,
        remainingTime: 1,
        gameConfigs: {
            minBet: 1,
            maxBet: 2000,
            maxBetPerChoices: {
                fhBlue: 2000,
                fhRed: 2000,
                fhOver: 2000,
                fhUnder: 2000,
                fhOdd: 2000,
                fhEven: 2000,
                ftBlue: 2000,
                ftRed: 2000,
                ftOver: 2000,
                ftUnder: 2000,
                ftOdd: 2000,
                ftEven: 2000,
            },
            odds: {
                fhBlue: 1.96,
                fhRed: 1.96,
                fhOver: 1.96,
                fhUnder: 1.96,
                fhOdd: 1.96,
                fhEven: 1.96,
                ftBlue: 1.96,
                ftRed: 1.96,
                ftOver: 1.96,
                ftUnder: 1.96,
                ftOdd: 1.96,
                ftEven: 1.96,
            },
            enableFreeBet: false,
        },
        gameState,
        viewMode: ViewMode.full,
        isShowBlink: false,
        playResultAnimation: true,
    };
};

const buildDefaultTeamResult = () => {
    let index = 10;
    const emptyResult = [];
    while (index > 0) {
        emptyResult.push(index);
        index--;
    }

    return emptyResult;
};

export const buildDefaultResult = () => {
    const blueTeam = buildDefaultTeamResult();
    const redTeam = buildDefaultTeamResult();
    return {
        blue: blueTeam,
        red: redTeam,
    };
};

export default buildGameContext;
