import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import KenoBetHistory from "../../keno/bet-history";
import KenoProMaxBetHistory from "../../games/keno-pro-max/bet-history";

import BaseDialog from "../../shared/base-dialog";
import GameSelector from "../../shared/game-selector";
import Styles from "./history.module.scss";

export const HistoryModal: React.FC<{ onCloseModal: Function; offerGames: number[]; fractionalOddsFormat: boolean | undefined }> = ({
    onCloseModal,
    offerGames,
    fractionalOddsFormat,
}) => {
    const { t } = useTranslation();
    const [selectedGameId, setSelectedGameId] = useState<number>(offerGames?.[0] || 0);
    const closeModal = () => {
        onCloseModal();
    };

    const renderHistory = () => {
        switch (selectedGameId) {
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 52:
            case 53:
                return <KenoProMaxBetHistory key={selectedGameId} gameId={selectedGameId} fractionalOddsFormat={fractionalOddsFormat} />;

            case 36:
            case 37:
            case 40:
            case 41:
                return (
                    <KenoBetHistory
                        key={selectedGameId}
                        gameId={selectedGameId}
                        fractionalOddsFormat={fractionalOddsFormat}
                        closeModal={closeModal}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <BaseDialog onCloseModal={closeModal} enableBackdrop={true}>
            <div className={`w-100 ${Styles["popup-container"]}`}>
                <div className={Styles["title"]}>{t("popupTitleHistory")}</div>
                <span className={`icon-close ${Styles["icon-close"]}`} onClick={closeModal} data-testid="icon-close"></span>
                <div className={Styles["form"]}>
                    <span className={Styles["form-label"]}>{t("common:game")}</span>
                    <GameSelector onChangeGame={setSelectedGameId} selectedGame={selectedGameId} offerGames={offerGames} />
                </div>
                <div className={`w-100 ${Styles["history-content"]}`}>{renderHistory()}</div>
            </div>
        </BaseDialog>
    );
};
