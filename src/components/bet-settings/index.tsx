import React, { useMemo } from "react";
import { isMobileOnly, isIOS } from "react-device-detect";
import { useTranslation } from "next-i18next";
import { User } from "sc-user-service-client/dist/auth";
import { UserInfo } from "../user-info";
import { ChipSlider } from "./chip-slider";
import { LanguageLocaleMapper } from "../../common/constants";
import Styles from "./bet-setting.module.scss";
import { useSystemContext } from "../../contexts/system";
import { ChipImage } from "./chip-slider/chip-image";

type Props = {
    updateBetValue: (betValue: number) => void;
    user: User;
    toggleSlidingChip: () => void;
    isShowSlidingChip: boolean;
    toggleAnnouncementModal: () => void;
    isNewPromotion: boolean;
    isShowToolbarGuide: boolean;
};

const BetSettings: React.FC<Props> = ({
    updateBetValue,
    user,
    toggleSlidingChip,
    isShowSlidingChip,
    toggleAnnouncementModal,
    isNewPromotion,
    isShowToolbarGuide,
}) => {
    const { i18n } = useTranslation();
    const { chipSettings, betValue } = useSystemContext();
    return useMemo(() => {
        let deviceClass = "";
        if (isMobileOnly) {
            deviceClass = isIOS ? Styles["ios-device"] : Styles["android-device"];
        }
        return (
            <div className={`${Styles["bet-settings"]} ${deviceClass}`}>
                <div
                    className={`${Styles["settings-container"]} ${isShowSlidingChip ? Styles["open-animation"] : Styles["close-animation"]
                        }`}
                >
                    <div className={`game-container ${Styles["container"]}`}>
                        <div className={Styles["wrapper-chips"]}>
                            {!isMobileOnly && (
                                <>
                                    {isNewPromotion && (
                                        <div data-testid="promotion" className={Styles["promotion"]} onClick={() => toggleAnnouncementModal()}>
                                            <img
                                                className={Styles["promo-light"]}
                                                src={`/static/images/promotion-light.svg?v=1`}
                                                width="97"
                                                alt="promotion"
                                            />
                                            <img
                                                className={Styles["promo-img"]}
                                                src={`/static/images/promotion_${LanguageLocaleMapper[i18n.language]}.svg?v=3`}
                                                width="97"
                                                alt="promotion"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                            <div className={Styles["chips-container"]}>
                                <ChipSlider updateBetValue={updateBetValue} />
                            </div>
                        </div>
                    </div>
                </div>

                {isMobileOnly && (
                    <div className={Styles["footer"]}>
                        <div className={Styles["user-info"]}>
                            <UserInfo user={user} customizeClass={"footer"} />
                        </div>
                        <div data-testid="chip-container" className={`${Styles["chip-container"]} `} onClick={toggleSlidingChip}>
                            <div
                                className={`${Styles["chip-toggle"]} ${isShowSlidingChip ? Styles["open-animation"] : Styles["close-animation"]
                                    }`}
                            >
                                <img className={Styles["chip-default"]} src={`/static/images/chips/chip-close.svg`} alt="Chip" />
                                <ChipImage
                                    className={Styles["chip-selected"]}
                                    color={chipSettings?.chipColors?.find((c) => c.value === betValue)?.color}
                                />
                            </div>
                            <span className={Styles["value"]}>{chipSettings?.chipColors?.find((c) => c.value === betValue)?.text}</span>
                        </div>
                        {isNewPromotion && (
                            <div className={Styles["promotion"]} onClick={() => toggleAnnouncementModal()}>
                                <img
                                    className={Styles["promo-light"]}
                                    src={`/static/images/promotion-light.svg?v=1`}
                                    width="74"
                                    alt="promotion"
                                />
                                <img
                                    className={Styles["promo-img"]}
                                    src={`/static/images/promotion_${LanguageLocaleMapper[i18n.language]}.svg?v=3`}
                                    width="74"
                                    alt="promotion"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }, [user?.red, updateBetValue, isShowSlidingChip, isNewPromotion, isShowToolbarGuide, betValue, chipSettings]);
};

export default BetSettings;
