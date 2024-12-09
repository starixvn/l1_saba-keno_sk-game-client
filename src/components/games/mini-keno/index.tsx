import { withTranslation } from "next-i18next";
import { withRouter } from "next/router";
import React from "react";

import { KenoProMax, DefaultTooltipMessageFollowChoiceProps } from "../keno-pro-max";
import { TooltipMessageFollowChoiceProps } from "../keno-pro-max/bet-options";

const KenoMiniTooltipMessageFollowChoiceProps = {
    big: `[206~355]`,
    small: `[55~205]`,
    gold: `[55~163]`,
    wood: `[164~187]`,
    water: `[188~222]`,
    fire: `[223~246]`,
    earth: `[247~355]`,
};

export class MiniKeno extends KenoProMax {
    renderRawValueMD5() {
        const { md5ResultKey } = this.state;

        return (
            <>
                <strong>{this.props.t("common:md5Result")}: </strong>
                <span>{md5ResultKey}</span>
            </>
        );
    }

    get isShowPoolStake() {
        return false;
    }

    get tooltipMessageFollowChoiceProps(): TooltipMessageFollowChoiceProps {
        return this.isKenoMini() ? KenoMiniTooltipMessageFollowChoiceProps : DefaultTooltipMessageFollowChoiceProps;
    }

    isKenoMini(): boolean {
        const { id } = this.props;
        console.log({ id });
        return id === 1503 || id === 1504;
    }
}

export default withRouter(withTranslation()(MiniKeno));
