import { TFunction } from "next-i18next";
import React from "react";

import ResultDetailContainer from "../../../dashboard/history/bet-history/result-detail";
import { GameResourceKeys } from "../../../../common/resources";
import { GetTranslateMapping, Choices } from "../../keno.helper";
import RenderScoreDetailKenoMatch from "../../../games/keno-match/bet-history/result-detail";
import RenderScoreDetailKenoPower from "../../../games/keno-power/bet-history/result-detail";
import TeamResult from "../../team-result";
import TeamScore from "../../team-score";
import Styles from "../bet-history.module.scss";
import { GameIds } from "../../../../common/constants/gameIds";

export const renderTeamWinningInfo = ({ settlementResult, translateMapping, choices, choiceClassExtend }) => {
    return Object.keys(settlementResult).map((keyName, index) => {
        if (settlementResult[keyName] && choices.includes(keyName)) {
            const classFollowKey = choiceClassExtend.includes(keyName) ? "result-info-blue" : "result-info-red";
            return (
                <div key={index} className={`${Styles[classFollowKey]}`} data-testid="team-winning-info">
                    {translateMapping[keyName]}
                </div>
            );
        }
        return "";
    });
};

export const renderTextWinningForTeam = ({ settlementResult, translateMapping }) => {
    const classFollowTeam = settlementResult?.tie ? Choices.tie : settlementResult?.blue ? Choices.blue : Choices.red;
    return (
        <div className={`${Styles["team-win"]} ${Styles[classFollowTeam]}`}>
            {settlementResult?.tie
                ? translateMapping.tie
                : settlementResult?.blue
                ? translateMapping.teamBlueWin
                : translateMapping.teamRedWin}
        </div>
    );
};

export const TeamResultInfo: React.FC<{
    result;
    translateMapping;
    isWin: boolean;
    score: number;
    teamName: string;
}> = ({ result, translateMapping, score, isWin, teamName }) => {
    return (
        <>
            <div className={Styles["container-team"]}>
                <TeamResult result={result} customizeClassName={"ticket-history"} />
                <TeamScore
                    isShowScore={true}
                    teamName={translateMapping[teamName]}
                    score={score}
                    isWin={isWin}
                    customClassName={teamName}
                />
            </div>
        </>
    );
};

export const WinningInfo: React.FC<{ settlementResult; translateMapping; choices: string[]; choiceClassExtend: string[] }> = ({
    settlementResult,
    translateMapping,
    choices,
    choiceClassExtend,
}) => {
    return (
        <div className={Styles["winning-info"]}>
            {renderTextWinningForTeam({ settlementResult, translateMapping })}
            <div className={Styles["sum"]}> {translateMapping?.sum}</div>
            <div className={Styles["result-info"]}>
                {renderTeamWinningInfo({
                    settlementResult,
                    translateMapping,
                    choices: choices,
                    choiceClassExtend: choiceClassExtend,
                })}
            </div>
        </div>
    );
};

const ResultDetail = (resultDetail, t: TFunction, closeModal: () => void, gameName: string, gameId: number) => {
    if (resultDetail) {
        const renderScoreDetail = [GameIds.KenoSoccer, GameIds.KenoSoccer2].includes(gameId)
            ? RenderScoreDetailKenoMatch
            : RenderScoreDetailKenoPower;
        const { bet, roundId } = resultDetail;
        const translateMapping = GetTranslateMapping(t, gameName);
        return (
            <ResultDetailContainer
                roundId={roundId}
                closeModal={closeModal}
                gameName={t(`${gameName}:${GameResourceKeys.GAME_NAME}`)}
                customizeClass="keno"
            >
                <div className={Styles["result-details"]} data-testid="result-details">
                    {renderScoreDetail({ bet, translateMapping })}
                </div>
            </ResultDetailContainer>
        );
    }
    return <></>;
};

export default ResultDetail;
