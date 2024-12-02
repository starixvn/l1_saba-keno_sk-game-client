import React, { useState, useEffect } from "react";
import { TFunction } from "next-i18next";

import BetHistoryContainer from "../../../dashboard/history/bet-history";
import ResultDetailContainer from "../../../dashboard/history/bet-history/result-detail";
import { BetLogs } from "./bet-history";
import { GetChoiceTranslate, getTotalPoint } from "../keno-pro-max-helper";
import { ResultDetail } from "../../../dashboard/history/bet-history/bet-history";
import { GameResourceKeys } from "../../../../common/resources";
import Styles from "./bet-history.module.scss";
import { ResultClassState, winningInfo } from "../round-result/index";
import { Result } from "../keno-pro-max";
import { generateResultCollapse } from "../round-result/round-result-collapse";

export const renderResult = (bet: BetLogs, roundId: number, setIsShowResultDetail: Function, setBetLog: Function, t: TFunction) => {
    if (bet?.result) {
        const clickHandle = () => {
            setIsShowResultDetail(true);
            setBetLog({ bet: bet, roundId: roundId, t });
        };
        const totalPoint = getTotalPoint(bet.result);

        return (
            <div className={Styles["detail"]} onClick={() => clickHandle()} data-testid="detail">
                {totalPoint}
            </div>
        );
    }
    return <></>;
};


export const RenderTotalPoint: React.FC<{ result: Result; textTranslate; customizeClass?: string; isAnimation?: boolean }> = ({
    result,
    textTranslate,
    customizeClass,
    isAnimation,
}) => {
    const [total, setTotal] = useState<number>(0);
    let interval: NodeJS.Timeout = null;
    useEffect(() => {
        if (isAnimation) {
            let currentTotal = 0;
            let index = 0;
            interval = setInterval(() => {
                if (index < result.length) {
                    currentTotal += result[index];
                    setTotal(currentTotal);
                    index++;
                }
            }, 100);
        } else {
            result && setTotal(getTotalPoint(result));
        }

        return () => {
            interval && clearInterval(interval);
        };
    }, [result, isAnimation]);
    return (
        <div className={`${Styles["result-total"]} ${Styles[customizeClass]}`}>
            <div className={Styles["result-total-lbl"]}>{textTranslate.total} </div>
            <div className={Styles["result-total-number-max"]}>{total}</div>
        </div>
    );
};

export const renderResultDetail = (resultDetail: ResultDetail, t: TFunction, closeModal: () => void, gameName: string) => {
    if (resultDetail?.bet) {
        const { bet, roundId } = resultDetail;
        const result: any = bet?.result;
        const settlementResult: any = bet?.settlementResult;
        const textTranslate = GetChoiceTranslate(t);
        const resultLength = result.length / 10;

        return (
            <ResultDetailContainer roundId={roundId} closeModal={closeModal} gameName={t(`${gameName}:${GameResourceKeys.GAME_NAME}`)}>
                <div className={Styles["result-detail"]}>
                    <div className={Styles["result"]}>
                        <div className={`${Styles["number-container"]} ${Styles["number-rows-" + resultLength]}`}>
                            {generateResultCollapse(result, false, ResultClassState.betHistory)}
                        </div>
                        <div className={Styles["result-total-number"]}>
                            <RenderTotalPoint
                                result={result}
                                textTranslate={textTranslate}
                                isAnimation={false}
                                customizeClass={"bet-history"}
                            />
                        </div>
                    </div>
                    <div className={Styles["settle-info"]}>{winningInfo({ settlementResult, textTranslate })}</div>
                </div>
            </ResultDetailContainer>
        );
    }
    return <></>;
};

const KenoProMaxBetHistory: React.FunctionComponent<{ gameId: number; fractionalOddsFormat: boolean | undefined }> = ({
    gameId,
    fractionalOddsFormat,
}) => {
    return (
        <BetHistoryContainer
            gameId={gameId}
            isRefund={false}
            renderResult={renderResult}
            renderResultDetail={renderResultDetail}
            fractionalOddsFormat={fractionalOddsFormat}
        ></BetHistoryContainer>
    );
};
export default KenoProMaxBetHistory;
