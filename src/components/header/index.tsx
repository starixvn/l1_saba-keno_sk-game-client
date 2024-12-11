import React from "react";
import { isMobileOnly } from "react-device-detect";
import { User } from "sc-user-service-client/dist/auth";
import { buildVersion } from "../../common/constants";

import { Settings } from "../shared/settings";
import { UserInfo } from "../user-info";
import Styles from "./header.module.scss";

type Props = {
    user: User;
    enabledSound: boolean;
    enabledNotification: boolean;
    onToggleSound: Function;
    onToggleNotification: Function;
    toggleHistoryModal: Function;
    toggleGuideModal: Function;
    toggleAnnouncementModal: Function;
    updateFavoriteGames: Function;
    favoriteGames: number[];
    offerGames: number[];
    enabledQuickBet?: boolean;
    updateEnabledQuickBet?: Function;
    isShowBoostedOdds: boolean;
    promotionNotifications: [];
    isShowToolbarGuide: boolean;
};

export const getLogoName = () => {
    return "saba-keno";
};

const Header: React.FC<Props> = (props) => {
    // const logoName=
    return (
        <>
            <header className={`${Styles.header} ${isMobileOnly ? Styles["mobile"] : ""}`} data-testid="header">
                <div className="game-container d-flex">
                    <div className={Styles["header-container"]}>
                        <a onClick={() => window.location.reload()} className={Styles["site-name"]}>
                            <img
                                className="header-logo"
                                alt="UM"
                                src={`/static/images/logo-desktop-${getLogoName()}.svg?v=${buildVersion}`}
                            />
                        </a>
                        <div className={Styles["header-right"]}>
                            {
                                <Settings
                                    enabledSound={props.enabledSound}
                                    enabledNotification={props.enabledNotification}
                                    onToggleSound={props.onToggleSound}
                                    onToggleNotification={props.onToggleNotification}
                                    toggleHistoryModal={props.toggleHistoryModal}
                                    toggleGuideModal={props.toggleGuideModal}
                                    toggleAnnouncementModal={props.toggleAnnouncementModal}
                                    favoriteGames={props.favoriteGames}
                                    offerGames={props.offerGames}
                                    updateFavoriteGames={props.updateFavoriteGames}
                                    enabledQuickBet={props.enabledQuickBet}
                                    updateEnabledQuickBet={props.updateEnabledQuickBet}
                                    isShowBoostedOdds={props.isShowBoostedOdds}
                                    promotionNotifications={props.promotionNotifications}
                                    isShowToolbarGuide={props.isShowToolbarGuide}
                                />
                            }
                            {!isMobileOnly && <UserInfo user={props.user} />}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
