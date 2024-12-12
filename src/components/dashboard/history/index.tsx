import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import KenoBetHistory from "../../keno/bet-history";
import KenoProMaxBetHistory from "../../games/keno-pro-max/bet-history";

import BaseDialog from "../../shared/base-dialog";
import GameSelector from "../../shared/game-selector";
import Styles from "./history.module.scss";
import { GameIds } from "../../../common/constants/gameIds";

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
            case GameIds.MegaKeno:
            case GameIds.MegaKeno2:
            case GameIds.KenoMini:
            case GameIds.KenoMini2:
            case GameIds.KenoEast:
            case GameIds.KenoWest:
            case GameIds.KenoSouth:
            case GameIds.KenoNorth:
                return <KenoProMaxBetHistory key={selectedGameId} gameId={selectedGameId} fractionalOddsFormat={fractionalOddsFormat} />;

            case GameIds.KenoSoccer:
            case GameIds.KenoSoccer2:
            case GameIds.KenoPower:
            case GameIds.KenoPower2:
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
