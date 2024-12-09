import { useTranslation } from "next-i18next";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import { GameResourceKeys } from "../../common/resources";
import styles from "./winning-streak.module.scss";
import { WinningStreakItem } from "./winning-streak.type";

const getIconClassName = (gameName: string, choice: string) => {
    const gameNameLower = gameName.toLocaleLowerCase();
    switch (gameNameLower) {
        case "kenosoccer":
        case "kenosoccer2":
        case "kenopower1":
        case "kenopower2":
        case "kenomini":
        case "kenomini2":
        case "megakeno":
        case "megakeno2":
        case "kenoeast":
        case "kenowest":
        case "kenosouth":
        case "kenonorth":
            const choiceName = `dot-${choice}`;
            return `${styles[choiceName]} ${styles[gameNameLower]}`;
        default:
            return styles[`dot-${choice}`];
    }
};

const getTextOnIconChoice = (gameName: string, choice: string, translate: Function) => {
    const gameNameLowerCase = gameName.toLocaleLowerCase();

    return translate(`${gameNameLowerCase}:${choice}TextDot`);
};

const winningStreak = {};

/* eslint-disable react/display-name */
export const WinningStreak = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const [winningStreakQueue, setWinningStreakQueue] = useState<{ [key: string]: WinningStreakItem }>({});

    useImperativeHandle(ref, () => ({
        addWinningStreak(streak: WinningStreakItem) {
            winningStreak[streak.key] = streak;

            setWinningStreakQueue({ ...winningStreak });

            setTimeout(() => removeWinStreakNotification(streak.key), 4 * 1000);
        },
    }));

    const removeWinStreakNotification = (key: string) => {
        delete winningStreak[key];
        setWinningStreakQueue({ ...winningStreak });
    };

    return (
        <div className={styles["winning-streak-container"]}>
            {Object.values(winningStreakQueue).map(({ gameName, choice, streak, key, optional }) => {
                return (
                    <div key={key} className={styles["streak-notification"]}>
                        <div className={styles["game-name"]}>{t(`${gameName.toLocaleLowerCase()}:${GameResourceKeys.GAME_NAME}`)}</div>
                        {optional && <span className={styles["optional"]}>{optional}</span>}
                        <span className={`${styles["option-icon"]} ${getIconClassName(gameName, choice)}`}>
                            {getTextOnIconChoice(gameName, choice, t)}
                        </span>
                        <span>
                            x <span className={styles["number"]}>{streak}</span>
                        </span>
                        <span className={`icon-close ${styles["icon-close"]}`} onClick={() => removeWinStreakNotification(key)}></span>
                    </div>
                );
            })}
        </div>
    );
});
