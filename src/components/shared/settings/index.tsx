import { useTranslation } from "next-i18next";
import React, { useMemo, useRef } from "react";
import { isMobileOnly } from "react-device-detect";

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
    promotionNotifications,
    isShowToolbarGuide,
}) => {
    const { t } = useTranslation();
    const toggleHistoryBtnRef = useRef<HTMLDivElement>(null);
    const toggleAnnouncementBtnRef = useRef<HTMLDivElement>(null);
    const toggleSoundBtnRef = useRef<HTMLDivElement>(null);
    const specialClassByDevice = !isMobileOnly ? "desktop-style" : "";
    return useMemo(() => {
        return (
            <div className={styles["settings-container"]}>
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
                    <Menu
                        handleToggleNotification={onToggleNotification}
                        enabledNotification={enabledNotification}
                        handleToggleGuideModal={toggleGuideModal}
                    />
                </div>
            </div>
        );
    }, [promotionNotifications, enabledSound, enabledNotification, isShowToolbarGuide]);
};
