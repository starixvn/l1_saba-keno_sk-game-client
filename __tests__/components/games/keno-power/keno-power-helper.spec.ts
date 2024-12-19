import { Choices, MainChoices, SumChoices, TeamChoices, StatisticRuleMapping, GetChoiceTranslate, ChoiceForTabActive } from "../../../../src/components/games/keno-power/keno-power-helper";
import { TFunction } from "next-i18next";

describe("Keno Power Helper", () => {
    it("should have correct choices", () => {
        expect(Choices).toEqual({
            blue: "blue",
            red: "red",
            tie: "tie",
            big: "big",
            small: "small",
            odd: "odd",
            even: "even",
            blueBig: "blueBig",
            blueSmall: "blueSmall",
            redBig: "redBig",
            redSmall: "redSmall",
        });
    });

    it("should have correct main choices", () => {
        expect(MainChoices).toEqual([
            { name: Choices.blue, isShowTooltip: false },
            { name: Choices.red, isShowTooltip: false },
        ]);
    });

    it("should have correct sum choices", () => {
        expect(SumChoices).toEqual([
            { name: Choices.big, isShowTooltip: true, tooltipMessage: "[1621~2820]" },
            { name: Choices.small, isShowTooltip: true, tooltipMessage: "[420~1620]" },
            { name: Choices.odd, isShowTooltip: false },
            { name: Choices.even, isShowTooltip: false },
        ]);
    });

    it("should have correct team choices", () => {
        expect(TeamChoices).toEqual([
            { name: Choices.blueBig, isShowTooltip: true, tooltipMessage: "[811~1410]" },
            { name: Choices.blueSmall, isShowTooltip: true, tooltipMessage: "[210~810]" },
            { name: Choices.redBig, isShowTooltip: true, tooltipMessage: "[811~1410]" },
            { name: Choices.redSmall, isShowTooltip: true, tooltipMessage: "[210~810]" },
        ]);
    });

    it("should return correct translations", () => {
        const t: TFunction = ((key: string) => key) as TFunction; // Mock translation function with type assertion
        const settleResult = { big: true, even: false };
        const result = GetChoiceTranslate(t, settleResult);
        expect(result).toEqual({
            total: "kenopower:total",
            big: "kenopower:big",
            even: "kenopower:odd",
        });
    });

    it("should have correct tab active choices", () => {
        expect(ChoiceForTabActive).toEqual([
            { choice: ["red", "blue", "tie"] },
            { choice: ["big", "small"] },
            { choice: ["even", "odd"] },
            { choice: ["blueBig", "blueSmall"] },
            { choice: ["redBig", "redSmall"] },
        ]);
    });

    it("should have correct statistic rule mapping", () => {
        expect(StatisticRuleMapping).toHaveLength(5);
    });
}); 