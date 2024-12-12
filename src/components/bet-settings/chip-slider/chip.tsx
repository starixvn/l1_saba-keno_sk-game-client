import React from "react";
import Styles from "./chip-slider.module.scss";
import { ChipImage } from "./chip-image";

export const Chip: React.FC<{
    value: number;
    text: string;
    color: string;
    selectedChip: number;
    onClickChip: Function;
}> = ({ value, text, color, selectedChip, onClickChip }) => {
    return (
        <div
            className={`${Styles["chip-container"]} ${selectedChip === value ? Styles["selected"] : ""}`}
            onClick={() => onClickChip(value)}
        >
            <ChipImage className={`img-fluid ${Styles["chip"]}`} width="60" height="62" color={color} />
            <span className={Styles["value"]}>{text}</span>
        </div>
    );
};
