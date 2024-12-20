import { KenoMatchConfigs, choicesMapper } from "../../../../../src/components/games/keno-match/bet-options/choice-config";

describe("KenoMatchConfigs", () => {
    it("should have the correct structure and values", () => {
        expect(KenoMatchConfigs).toBeDefined();
        expect(KenoMatchConfigs).toBeInstanceOf(Array);
        expect(KenoMatchConfigs.length).toBe(3); // Check for three configurations

        // Check firstHalf configuration
        const firstHalfConfig = KenoMatchConfigs[0];
        expect(firstHalfConfig.name).toBe("firstHalf");
        expect(firstHalfConfig.config).toHaveLength(7); // Check for 7 choices

        // Check specific choice properties
        expect(firstHalfConfig.config[0]).toEqual({
            name: "fhBlue",
            displayedName: "blue",
            bettypeName: "bettype-fhBlue",
            isShowTooltip: false,
        });

        expect(firstHalfConfig.config[3]).toEqual({
            name: "fhOver",
            displayedName: "over",
            bettypeName: "bettype-fhOver",
            isShowTooltip: true,
            tooltipMessage: "[811~1410]",
        });

        // Check fullTime configuration
        const fullTimeConfig = KenoMatchConfigs[1];
        expect(fullTimeConfig.name).toBe("fullTime");
        expect(fullTimeConfig.config).toHaveLength(7); // Check for 7 choices

        // Check fullTimeLive configuration
        const fullTimeLiveConfig = KenoMatchConfigs[2];
        expect(fullTimeLiveConfig.name).toBe("fullTimeLive");
        expect(fullTimeLiveConfig.config).toHaveLength(7); // Check for 7 choices
    });
});

describe("choicesMapper", () => {
    it("should map choices correctly", () => {
        expect(choicesMapper).toBeDefined();
        expect(typeof choicesMapper).toBe("object");

        // Check specific mappings
        expect(choicesMapper.fhBlue).toBe("blue");
        expect(choicesMapper.ftRed).toBe("red");
        expect(choicesMapper.liveFTOver).toBe("over");
        expect(choicesMapper.fhUnder).toBe("under");
        expect(choicesMapper.ftEven).toBe("even");
        expect(choicesMapper.liveFTOdd).toBe("odd");
    });
}); 