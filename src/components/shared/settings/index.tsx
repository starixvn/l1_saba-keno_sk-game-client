import { useTranslation } from "next-i18next";
import React, { useMemo, useRef, useState } from "react";
import { isMobileOnly, isSafari } from "react-device-detect";

import { getAppSettings } from "../../../common/app-settings";
import { AppTypes } from "../../../common/constants";
import { SystemType } from "../../../common/constants/system";
import { FavoriteSetting } from "../../favorite-setting";
import { getLogoName } from "../../header";
import { Tooltip } from "../tooltip";
import { Menu } from "./menu";
import styles from "./settings.module.scss";
import { Props } from "./types";

const ButtonSettingClassName = "setting-button";

export const Settings: React.FC<Props> = ({
    enabledNotification,
    onToggleNotification,
    toggleHistoryModal,
    toggleAnnouncementModal,
    onToggleSound,
    enabledSound,
    toggleGuideModal,
    favoriteGames,
    offerGames,
    updateFavoriteGames,
    enabledQuickBet,
    updateEnabledQuickBet,
    isShowQuickBet = false,
    promotionNotifications,
    isShowToolbarGuide,
}) => {
    const { t } = useTranslation();
    const [showFavoriteSetting, setShowFavoriteSetting] = useState(false);
    const toggleHistoryBtnRef = useRef<HTMLDivElement>(null);
    const toggleAnnouncementBtnRef = useRef<HTMLDivElement>(null);
    const toggleSoundBtnRef = useRef<HTMLDivElement>(null);
    const favoriteToggleBtnRef = useRef<HTMLDivElement>(null);
    const specialClassByDevice = !isMobileOnly ? "desktop-style" : "";
    return useMemo(() => {
        return (
            <div className={styles["settings-container"]}>
                {isShowQuickBet && isMobileOnly && (
                    <div className={styles["setting-left"]}>
                        {/* <QuickBetBtn
                            enabledQuickBet={enabledQuickBet}
                            updateEnabledQuickBet={(enabled) => updateEnabledQuickBet(enabled)}
                            isHeaderSetting={true}
                            isShowToolbarGuide={isShowToolbarGuide}
                        /> */}
                    </div>
                )}

                <div className={`${styles["setting-right"]} ${styles[getLogoName()]}`}>
                    <div
                        ref={toggleAnnouncementBtnRef}
                        className={`${styles[ButtonSettingClassName]} ${styles[specialClassByDevice]}`}
                        onClick={() => toggleAnnouncementModal()}
                    >
                        {promotionNotifications.length > 0 && (
                            <span className={`icon-bell ${styles["icon-bell"]}`}>
                                {<span className={styles["count-label"]}>{promotionNotifications?.length}</span>}
                            </span>
                        )}

                        <Tooltip message={t("popupAnnouncement")} hoverWrapper={toggleAnnouncementBtnRef} />
                    </div>
                    <div
                        ref={toggleSoundBtnRef}
                        id="sound-settings"
                        className={`${styles[ButtonSettingClassName]} ${styles[specialClassByDevice]}`}
                        onClick={() => onToggleSound()}
                    >
                        <span
                            className={
                                enabledSound ? `icon-sound-on ${styles["icon-sound-on"]}` : `icon-sound-off ${styles["icon-sound-off"]}`
                            }
                        ></span>

                        <Tooltip message={`${t("sound")}: ${enabledSound ? t("on") : t("off")}`} hoverWrapper={toggleSoundBtnRef} />
                    </div>

                    <div
                        ref={toggleHistoryBtnRef}
                        id="ticket-history"
                        className={`${styles[ButtonSettingClassName]} ${styles[specialClassByDevice]}`}
                        onClick={() => toggleHistoryModal()}
                    >
                        <span className={`icon-history ${styles["icon-history"]}`}></span>
                        <Tooltip message={t("popupTitleHistory")} hoverWrapper={toggleHistoryBtnRef} />
                    </div>

                    {getAppSettings().appType !== AppTypes.megaKeno && (
                        <div
                            id="favorite-setting"
                            className={`${styles[ButtonSettingClassName]} ${styles[specialClassByDevice]}`}
                            onClick={() => setShowFavoriteSetting(!showFavoriteSetting)}
                            ref={favoriteToggleBtnRef}
                        >
                            <span className={`icon-favorite-normal ${styles["icon-favorite-normal"]}`}></span>
                            <Tooltip message={t("menu-favorite-setting")} hoverWrapper={favoriteToggleBtnRef} />
                        </div>
                    )}

                    <Menu
                        handleToggleNotification={onToggleNotification}
                        enabledNotification={enabledNotification}
                        handleToggleGuideModal={toggleGuideModal}
                    />
                </div>

                {showFavoriteSetting && (
                    <FavoriteSetting
                        currentFavoriteGames={favoriteGames}
                        offerGames={offerGames}
                        onCloseModal={() => setShowFavoriteSetting(false)}
                        updateFavorite={updateFavoriteGames}
                        toggleBtnRef={favoriteToggleBtnRef}
                    />
                )}
            </div>
        );
    }, [promotionNotifications, showFavoriteSetting, enabledSound, enabledNotification, isShowToolbarGuide]);
};
