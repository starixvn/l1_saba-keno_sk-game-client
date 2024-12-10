import { useTranslation } from "next-i18next";
import React from "react";

import { getAppSettings } from "../../common/app-settings";
import { GameResourceKeys } from "../../common/resources";
import Styles from "./favorite-guide.module.scss";
import { GameIds } from "../../common/constants/gameIds";
import { useAuthContext } from "../../contexts/auth";
import { GetAllGameByCurrencyGroup } from "../../helpers/category-helper";

const favoriteGamesSample = [];
const favoriteBtnClass = "favorite-btn";
const favoriteIconClass = "icon-favorite";

export const FavoriteGuide: React.FC = () => {
    const { t } = useTranslation();
    const { currencyGroup } = useAuthContext();
    const offeredGameByCurrencyGroup = GetAllGameByCurrencyGroup(currencyGroup);
    const favoriteGames = offeredGameByCurrencyGroup.filter((game) => favoriteGamesSample.includes(game)).slice(0, 2);
    const unfavoriteGames = offeredGameByCurrencyGroup.filter((game) => !favoriteGames.includes(game)).slice(0, 3);
    const { gameSettings } = getAppSettings();

    return (
        <div className={Styles["container"]}>
            <p>{t("favorite-setting-guideline-1")}</p>
            <p>{t("favorite-setting-guideline-2")}</p>
            <div className={Styles["favorite-wrapper"]}>
                <div className={Styles["favorite-games"]}>
                    <div className={`${Styles[favoriteBtnClass]} ${Styles["btn-favorite-single"]}`}>
                        <span className={`icon-favorite ${Styles[favoriteIconClass]}`}></span>
                    </div>
                </div>
                <div className={`${Styles["hint"]} ${Styles["top"]}`}>
                    <div className={Styles["text"]}>{t("favorite-setting-btn-hint")}</div>
                    <span className={Styles["direction"]}></span>
                </div>
                <div className={Styles["favorite-setting"]}>
                    <div className={Styles["title"]}>{t("menu-favorite-setting")}</div>
                    <ul className={Styles["favorite-games"]}>
                        {favoriteGames.map((gameId, index) => (
                            <li className={`${Styles["game"]}`} key={index}>
                                <div className={Styles[favoriteBtnClass]}>
                                    <span className={`icon-favorite ${Styles[favoriteIconClass]}`}></span>
                                </div>
                                <span className={Styles["game-name"]}>
                                    {t(`${gameSettings[gameId].gameName.toLocaleLowerCase()}:${GameResourceKeys.GAME_NAME}`)}
                                </span>
                                <div className={Styles["group-btn-move"]}>
                                    <button className={Styles["btn-move"]}>
                                        <span className={Styles["icon-move-up"]}></span>
                                    </button>
                                    <button className={Styles["btn-move"]}>
                                        <span className={Styles["icon-move-down"]}></span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className={Styles["unfavorite-games"]}>
                        {unfavoriteGames.map((gameId, index) => (
                            <li className={`${Styles["game"]} ${Styles["un-favorite"]}`} key={index}>
                                <div className={Styles[favoriteBtnClass]}>
                                    <span className={`icon-favorite-normal ${Styles[favoriteIconClass]}`}></span>
                                </div>
                                <span className={Styles["game-name-un-favorite"]}>
                                    {t(`${gameSettings[gameId].gameName.toLocaleLowerCase()}:${GameResourceKeys.GAME_NAME}`)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={Styles["hint"]}>
                    <span className={Styles["direction"]}></span>
                    {t("header-favorite-btn-hint")}
                </div>
            </div>

            <div className={Styles["game-favortite-paragraph"]}>
                {t("favorite-btn-guideline").split("{icon}")[0]}
                <span className={`icon-favorite-normal ${Styles[favoriteIconClass]}`}></span>
                {t("favorite-btn-guideline").split("{icon}")[1]}
            </div>

            <div className={Styles["header"]}>
                <div className={Styles[favoriteBtnClass]}>
                    <span className={`icon-favorite-normal ${Styles["icon-favorite-normal"]}`}></span>
                </div>
                <div className={Styles["header-overlay-img"]}></div>
                <div className={Styles["header-overlay"]}></div>
                <div className={Styles["header-left"]}>
                    <div className={Styles["title-roundID"]}>
                        <div className={Styles.title}>
                            {t(`${gameSettings[2].gameName.toLocaleLowerCase()}:${GameResourceKeys.GAME_NAME}`)}
                        </div>
                        <div className={Styles.round}>#6868</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
