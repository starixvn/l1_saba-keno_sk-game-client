import { TFunction, useTranslation } from "next-i18next";
import React from "react";
import { useGameContext } from "../../../../contexts/game-context/game-context";
import BetOption from "../../../shared/bet-option";
import { GameState } from "../../../shared/game-base/type";
import { SettlementResult } from "../keno-power";
import { MainChoices, SumChoices, TeamChoices, IChoiceConfig } from "../keno-power-helper";
import Styles from "./bet-options.module.scss";

type Props = {
    settlementResult: SettlementResult;
    gameState: GameState;
    isShowWinningEffect: boolean;
};

const renderBetOptionByChoice = (
    choiceConfig: IChoiceConfig,
    label: string,
    odd: number,
    gameState: GameState,
    isHighlight: boolean,
    isShowWinningEffect: boolean
) => {
    const props = {
        choice: choiceConfig.name,
        odd,
        isDisplayOdd: true,
        isHighlight,
        gameState,
        isShowWinningEffect,
        isShowTooltip: choiceConfig.isShowTooltip,
        tooltipMessage: choiceConfig.tooltipMessage,
        isShowPoolStake: false,
    };

    return (
        <BetOption {...props}>
            <div className={`${Styles["bet-choice-name"]} ${Styles[props.choice]}`}>{label}</div>
        </BetOption>
    );
};

const RenderBetOptionsGroup = (
    choices: IChoiceConfig[],
    gameState: GameState,
    settlementResult: SettlementResult,
    isShowWinningEffect: boolean,
    odds,
    t: TFunction
) =>
    choices.map((choice) => {
        const isHighLight = gameState !== GameState.LockingBet && settlementResult[choice.name];
        console.log({ odds })
        return (
            <div key={`choice-${choice.name}`} className={Styles[`choice-${choice.name}`]}>
                {odds && renderBetOptionByChoice(choice, t(choice.name), odds[choice.name] || 0, gameState, isHighLight, isShowWinningEffect)}
            </div>
        );
    });

const KenoPowerOptions: React.FunctionComponent<Props> = (props) => {
    const { gameState, settlementResult, isShowWinningEffect } = props;
    const { gameConfigs, gameSetting } = useGameContext();
    const { odds } = gameConfigs;
    const { t } = useTranslation(gameSetting.gameName.toLowerCase());

    return (
        <div className={`${Styles["layout-keno-power"]}`}>
            {RenderBetOptionsGroup(MainChoices, gameState, settlementResult, isShowWinningEffect, odds, t)}
            <div className={Styles["sum-choice-area"]}>{t("sum")}</div>
            {RenderBetOptionsGroup(SumChoices, gameState, settlementResult, isShowWinningEffect, odds, t)}
            <div className={Styles["team-choice-area-blue"]}>{t("blue")}</div>
            <div className={Styles["team-choice-area-red"]}>{t("red")}</div>
            {RenderBetOptionsGroup(TeamChoices, gameState, settlementResult, isShowWinningEffect, odds, t)}
        </div>
    );
};

export default KenoPowerOptions;
