import React, { useEffect, useState } from "react";
import { buildVersion } from "../../../common/constants";
import { useSystemContext } from "../../../contexts/system";
import { GameState } from "../game-base/type";
import OverlayMaskWhite from "../overlay-mask-white";
import { Props } from "./bet-container";
import Styles from "./bet-container.module.scss";

const BetContainer: React.FC<Props> = (props) => {
    const systemContext = useSystemContext();
    const { betValue, chipSettings } = systemContext;
    const [customStyle, setCustomStyle] = useState<object>();
    const [cursorImage, setCursorImage] = useState<string>("");

    useEffect(() => {
        setCursorImage(
            `"/static/images/chips/cursor/chip-${chipSettings?.chipColors
                ?.find((c) => c.value === betValue)
                ?.color.replace("#", "")
                .toLowerCase()}.png?v=${buildVersion}"`
        );
    }, [betValue, chipSettings]);

    useEffect(() => {
        if (props.gameState === GameState.InRound) {
            setCustomStyle({ cursor: `url(${cursorImage}), url(/static/images/chips/cursor/chip-default.png?v=2), auto` });
        } else {
            setCustomStyle({ cursor: "not-allowed" });
        }
    }, [props.gameState, cursorImage]);

    return (
        <div className={Styles["bet-container"]} style={customStyle}>
            {props.children}
            {GameState.LockingBet === props.gameState && <OverlayMaskWhite />}
        </div>
    );
};

export default BetContainer;
