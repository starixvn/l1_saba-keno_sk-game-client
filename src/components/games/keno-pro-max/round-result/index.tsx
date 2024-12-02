import { useTranslation } from "next-i18next";
import React from "react";

import { useGameContext } from "../../../../contexts/game-context/game-context";
import { Result, SettlementResult } from "../keno-pro-max";
import { GetChoiceTranslate, getLabelFromFiveElements } from "../keno-pro-max-helper";
import Styles from "./keno-promax-animations.module.scss";

export enum ResultClassState {
    result,
    collapse,
    betHistory,
}

const elements = ["gold", "wood", "water", "fire", "earth"];

export const winningInfo: React.FC<{ settlementResult: SettlementResult; textTranslate; customizeClass?: string }> = ({
    settlementResult,
    textTranslate,
    customizeClass,
}) => {
    const element = getLabelFromFiveElements(settlementResult);
    const renderTextInfo = (choices: string[]) => {
        return (
            settlementResult &&
            choices.map((choice) => {
                if (settlementResult[choice]) {
                    return textTranslate[choice];
                }
                return "";
            })
        );
    };

    return (
        <div className={`${Styles["winning-info"]} ${Styles[customizeClass]}`}>
            <div className={Styles[`result-info-${settlementResult?.big ? "blue" : "red"}`]}>{renderTextInfo(["big", "small"])}</div>
            <div className={Styles[`result-info-${settlementResult?.even ? "blue" : "red"}`]}>{renderTextInfo(["even", "odd"])}</div>
            <div className={Styles["result-info-grey"]}>{textTranslate[element]}</div>
        </div>
    );
};

export const getSettleResult = (result: Result, settlementResult: SettlementResult) => {
    const shuffle = [];
    for (let i = 1; i <= result.length; i++) {
        shuffle.push(i);
    }

    const total = result.reduce((a, b) => a + b, 0);

    return {
        total,
        shuffle,
        big: settlementResult?.big,
        even: settlementResult?.even,
        element: elements.filter((e) => settlementResult[e])[0],
    };
};

export const generateResult = (result: Result, shuffle: number[], isAnimation = true) => {
    const rows = [];
    const maxNumInRow = 5;
    const noRows = result.length / maxNumInRow;
    for (let i = 0; i < noRows; i++) {
        rows.push([]);
    }

    rows.forEach((row, index) => {
        for (let i = 0; i < maxNumInRow; i++) {
            row.push(result[i + index * maxNumInRow]);
        }
    });

    return rows.map((row, ri) => {
        return row.map((num, ni) => {
            const index = ri * maxNumInRow + ni;
            const classAnimateNumber = noRows === 4 ? `animate-${shuffle[index]}` : `animate-10ball-${shuffle[index]}`;

            return (
                <div key={index} className={`${Styles["number-animate"]} ${isAnimation && Styles[classAnimateNumber]}`}>
                    <div className={`${Styles["number"]}`}>{num}</div>
                    <div className={`${Styles["number-cover"]}`}></div>
                </div>
            );
        });
    });
};

class AnimationComponent extends React.PureComponent<
    {
        result?: Result;
        big?: boolean;
        even?: boolean;
        element?: string;
        playResultAnimation?: boolean;
        shuffle: number[];
        settleTotal: number;
        texts: any;
    },
    {
        result?: Result;
        big?: boolean;
        even?: boolean;
        element?: string;
        playResultAnimation?: boolean;
        shuffle: number[];
        settleTotal: number;
        texts: any;
        currentTotal: number;
        currentIndex: number;
    }
> {
    private animationInterval: NodeJS.Timeout;
    private animationTimeOut: NodeJS.Timeout;
    constructor(props) {
        super(props);
        this.state = {
            currentTotal: props.playResultAnimation ? 0 : props.settleTotal,
            currentIndex: 0,
            ...props,
        };
    }

    componentDidMount() {
        if (this.state.playResultAnimation) {

            this.animationInterval = setInterval(() => {
                if (this.state.currentIndex === this.state.result.length) {
                    clearInterval(this.animationInterval);
                    return;
                }

                const numberIndex = this.state.shuffle[this.state.currentIndex] - 1;
                this.animationTimeOut = setTimeout(() => {
                    this.setState({
                        currentTotal: this.state.currentTotal + this.state.result[this.state.result.length - numberIndex - 1],
                    });
                }, 700);
                this.setState({
                    currentIndex: this.state.currentIndex + 1,
                });
            }, 250);
        } else if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.setState({
                currentTotal: this.state.settleTotal,
                currentIndex: 0,
            });
        }
    }

    componentWillUnmount() {
        this.animationInterval && clearInterval(this.animationInterval);
        clearTimeout(this.animationTimeOut);
    }

    render() {
        const rows = this.state.result.length / 5;
        return (
            <div className={`${Styles["animation-container"]}`}>
                <div className={Styles["result"]}>
                    <div className={`${Styles["number-container"]} ${Styles["rows-" + rows]}`}>
                        {generateResult(this.state.result, this.state.shuffle)}
                    </div>

                    <div className={`${Styles["pro-max"]} ${Styles["result-total"]}`}>
                        <div className={Styles["result-total-lbl"]}>{this.state.texts.total} </div>
                        <div className={Styles["result-total-number"]}>{this.state.currentTotal === 0 ? "" : this.state.currentTotal}</div>
                    </div>
                </div>
                <div className={`${Styles["settle-info-" + rows]}`}>
                    <div className={Styles[`result-info-${this.state.big ? "blue" : "red"}`]}>
                        {this.state.big ? this.state.texts.big : this.state.texts.small}
                    </div>
                    <div className={Styles[`result-info-${this.state.even ? "blue" : "red"}`]}>
                        {this.state.even ? this.state.texts.even : this.state.texts.odd}
                    </div>
                    <div className={Styles["result-info-grey"]}>{this.state.texts[this.state.element]}</div>
                </div>
            </div>
        );
    }
}

export const KenoProMaxRoundResult: React.FC<{ result?: Result; settlementResult: SettlementResult }> = ({ result, settlementResult }) => {
    const { playResultAnimation, gameSetting } = useGameContext();
    const { t } = useTranslation(gameSetting.gameName.toLowerCase());
    const settleResult = getSettleResult(result, settlementResult);
    const texts = GetChoiceTranslate(t);

    return (
        <div className={`${playResultAnimation ? Styles["has-animation"] : ""}`}>
            <div className="overlay-mask">
                <AnimationComponent
                    big={settlementResult.big}
                    even={settlementResult.even}
                    element={settleResult.element}
                    playResultAnimation={playResultAnimation}
                    result={result}
                    shuffle={settleResult.shuffle}
                    settleTotal={settleResult.total}
                    texts={texts}
                />
            </div>
        </div>
    );
};
