import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { useGameContext } from "../../../contexts/game-context/game-context";
import Styles from "./progress-bar.module.scss";
import { sumArray } from "../../../helpers/number-helper";

interface Props {
    result: {
        blue: number[];
        red: number[];
    };
    totalBlueH1?: number;
    totalRedH1?: number;
    isShowCollapse?: boolean;
    isFirstHalf?: boolean;
    isShowProgressBarTitle?: boolean;
    hasAnimation: boolean;
}

interface ProgressBarFullModeProps {
    totalBlue: number;
    totalRed: number;
    winningTeam: string;
    inlineStyles: React.CSSProperties;
}

interface ProgressBarCollapseModeProps {
    totalBlue: number;
    totalRed: number;
    isFirstHalf: boolean;
    winningTeam: string;
    inlineStyles: React.CSSProperties;
    isShowProgressBarTitle?: boolean;
    showWinningTeam: boolean;
}

export default function ProgressBar({
    result,
    isShowCollapse,
    isFirstHalf,
    isShowProgressBarTitle,
    hasAnimation,
    totalBlueH1 = 0,
    totalRedH1 = 0,
}: Props) {
    const [width, setWidth] = useState<number>(50);
    const [winningTeam, setWinningTeam] = useState<string>("draw");
    const [showWinningTeam, setShowWinningTeam] = useState(false);
    const [totalBlue, setTotalBlue] = useState<number>(0);
    const [totalRed, setTotalRed] = useState<number>(0);
    let interval: NodeJS.Timeout = null;
    let percent = 50;

    useEffect(() => {
        let currentTotalRed = totalRedH1;
        let currentTotalBlue = totalBlueH1;

        function drawProgressBar() {
            setTotalBlue(currentTotalBlue);
            setTotalRed(currentTotalRed);
            percent = parseFloat(((currentTotalBlue * 100) / (currentTotalBlue + currentTotalRed)).toFixed(2));

            setWidth(percent);
            percent > 50 && setWinningTeam("blue");
            percent < 50 && setWinningTeam("red");
            percent === 50 && setWinningTeam("draw");
        }

        if (hasAnimation) {
            let index = 0;
            interval = setInterval(() => {
                if (index === result.blue.length) {
                    setShowWinningTeam(true);
                    clearInterval(interval);
                } else {
                    currentTotalBlue += result.blue[index];
                    currentTotalRed += result.red[index];
                    drawProgressBar();
                    index++;
                }
            }, 100);
        } else {
            currentTotalRed += sumArray(result.red);
            currentTotalBlue += sumArray(result.blue);
            drawProgressBar();
        }

        return () => {
            interval && clearInterval(interval);
        };
    }, [result]);

    const inlineStyles = {
        "--width": `${width}%`,
    } as React.CSSProperties;

    return isShowCollapse ? (
        <ProgressBarCollapseMode
            {...{ totalBlue, totalRed, winningTeam, inlineStyles, isFirstHalf, isShowProgressBarTitle, showWinningTeam }}
        />
    ) : (
        <ProgressBarFullMode {...{ totalBlue, totalRed, winningTeam, inlineStyles }} />
    );
}

const ProgressBarFullMode = ({ totalBlue, totalRed, winningTeam, inlineStyles }: ProgressBarFullModeProps) => {
    const { gameSetting } = useGameContext();
    const gameName = gameSetting.gameName.toLowerCase();
    const { t } = useTranslation(gameName);
    return (
        <div className={`${Styles["progress-bar-team"]} ${Styles[gameName]}`}>
            <div className={Styles["title"]}>
                <div className={Styles["title-blue"]}>
                    <span className={Styles["text"]}>{t("blue")}:</span>
                    <span className={Styles["score"]}>{totalBlue}</span>
                </div>
                <div className={Styles["title-red"]}>
                    <span className={Styles["text"]}>{t("red")}:</span>
                    <span className={Styles["score"]}>{totalRed}</span>
                </div>
            </div>
            <div className={`${Styles["progress-bar"]}`}>
                <div className={`${Styles["triangle"]} ${Styles[winningTeam]}`} style={inlineStyles}></div>
                <div className={Styles["blue-team"]} style={inlineStyles}></div>
                <div className={Styles["sperate"]}>
                    <div className={Styles["total-score-match"]}>
                        <span className={Styles["text"]}>{t("sum")}</span>
                        <div className={Styles["score-match"]}>{totalBlue + totalRed}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProgressBarCollapseMode = ({
    totalBlue,
    totalRed,
    isFirstHalf,
    winningTeam,
    inlineStyles,
    isShowProgressBarTitle,
}: ProgressBarCollapseModeProps) => {
    const { gameSetting } = useGameContext();
    const { t } = useTranslation(gameSetting.gameName.toLowerCase());
    return (
        <>
            <div className={Styles["result-collapse-mode"]}>
                <div className={Styles["result-container"]}>
                    <div className={Styles["progress-extra"]}>
                        <div className={Styles["score-blue"]}>{totalBlue}</div>
                        <div className={Styles["score-red"]}>{totalRed}</div>
                    </div>
                    <div className={`${Styles["progress-bar-team"]} ${Styles["progress-bar-collapse"]}`}>
                        <div className={`${Styles["progress-bar"]}`}>
                            <div className={`${Styles["triangle"]} ${Styles[winningTeam]}`} style={inlineStyles}></div>
                            <div className={Styles["blue-team"]} style={inlineStyles}></div>
                            <div className={Styles["sperate"]}>
                                <div className={Styles["total-score-match"]}>
                                    {isShowProgressBarTitle && (
                                        <span className={Styles["text"]}>{t(isFirstHalf ? "firstHalf" : "fullTime")}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {winningTeam && <div className={Styles["result-label"]}>{t(winningTeam)}</div>}
            </div>
        </>
    );
};
