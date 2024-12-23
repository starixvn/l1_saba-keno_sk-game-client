import { KenoMatchConfigs, choicesMapper } from '../../../../../src/components/games/keno-match/bet-options/choice-config';

describe('KenoMatchConfigs', () => {
    describe('Structure validation', () => {
        it('should have exactly 3 main sections', () => {
            expect(KenoMatchConfigs).toHaveLength(3);
            expect(KenoMatchConfigs.map(config => config.name)).toEqual([
                'firstHalf',
                'fullTime',
                'fullTimeLive'
            ]);
        });

        it('should have 7 options in each section', () => {
            KenoMatchConfigs.forEach(section => {
                expect(section.config).toHaveLength(7);
            });
        });
    });

    describe('First Half configuration', () => {
        const firstHalf = KenoMatchConfigs.find(config => config.name === 'firstHalf')!;

        it('should have correct blue option configuration', () => {
            const blueOption = firstHalf.config.find(opt => opt.name === 'fhBlue')!;
            expect(blueOption).toEqual({
                name: 'fhBlue',
                displayedName: 'blue',
                bettypeName: 'bettype-fhBlue',
                isShowTooltip: false,
            });
        });

        it('should have correct tooltip configurations', () => {
            const overOption = firstHalf.config.find(opt => opt.name === 'fhOver')!;
            const underOption = firstHalf.config.find(opt => opt.name === 'fhUnder')!;

            expect(overOption.tooltipMessage).toBe('[811~1410]');
            expect(underOption.tooltipMessage).toBe('[210~810]');
        });
    });

    describe('Full Time configuration', () => {
        const fullTime = KenoMatchConfigs.find(config => config.name === 'fullTime')!;

        it('should have correct tooltip configurations', () => {
            const overOption = fullTime.config.find(opt => opt.name === 'ftOver')!;
            const underOption = fullTime.config.find(opt => opt.name === 'ftUnder')!;

            expect(overOption.tooltipMessage).toBe('[1621~2820]');
            expect(underOption.tooltipMessage).toBe('[420~1620]');
        });
    });

    describe('Full Time Live configuration', () => {
        const fullTimeLive = KenoMatchConfigs.find(config => config.name === 'fullTimeLive')!;

        it('should have correct live betting options', () => {
            const liveOptions = fullTimeLive.config.map(opt => opt.name);
            expect(liveOptions).toContain('liveFTBlue');
            expect(liveOptions).toContain('liveFTRed');
            expect(liveOptions).toContain('liveFTOver');
            expect(liveOptions).toContain('liveFTUnder');
            expect(liveOptions).toContain('liveFTEven');
            expect(liveOptions).toContain('liveFTOdd');
        });
    });

    describe('choicesMapper', () => {
        it('should map all first half options correctly', () => {
            expect(choicesMapper.fhBlue).toBe('blue');
            expect(choicesMapper.fhRed).toBe('red');
            expect(choicesMapper.fhOver).toBe('over');
            expect(choicesMapper.fhUnder).toBe('under');
            expect(choicesMapper.fhOdd).toBe('odd');
            expect(choicesMapper.fhEven).toBe('even');
        });

        it('should map all full time options correctly', () => {
            expect(choicesMapper.ftBlue).toBe('blue');
            expect(choicesMapper.ftRed).toBe('red');
            expect(choicesMapper.ftOver).toBe('over');
            expect(choicesMapper.ftUnder).toBe('under');
            expect(choicesMapper.ftOdd).toBe('odd');
            expect(choicesMapper.ftEven).toBe('even');
        });

        it('should map all live full time options correctly', () => {
            expect(choicesMapper.liveFTBlue).toBe('blue');
            expect(choicesMapper.liveFTRed).toBe('red');
            expect(choicesMapper.liveFTOver).toBe('over');
            expect(choicesMapper.liveFTUnder).toBe('under');
            expect(choicesMapper.liveFTOdd).toBe('odd');
            expect(choicesMapper.liveFTEven).toBe('even');
        });
    });
}); 