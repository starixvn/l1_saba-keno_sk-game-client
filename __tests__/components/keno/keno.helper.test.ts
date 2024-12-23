import { TFunction } from "next-i18next";
import { Choices, StatisticRuleEntriesEvenOdd, StatisticRuleEntriesBlueRed, GetTranslateMapping } from '../../../src/components/keno/keno.helper';

const mockT: TFunction = ((key: string) => key) as TFunction;

describe('Keno Helper', () => {
    describe('StatisticRuleEntriesEvenOdd', () => {
        it('should calculate even percentage correctly', () => {
            const [, evenCalculator] = StatisticRuleEntriesEvenOdd.find(([key]) => key === Choices.even) || [];
            const countResult = { even: 60 };
            const total = 100;

            expect(evenCalculator!(countResult, total)).toBe(60);
        });

        it('should return 0 for even when no even results', () => {
            const [, evenCalculator] = StatisticRuleEntriesEvenOdd.find(([key]) => key === Choices.even) || [];
            const countResult = {};
            const total = 100;

            expect(evenCalculator!(countResult, total)).toBe(0);
        });

        it('should calculate odd percentage as complement of even', () => {
            const [, oddCalculator] = StatisticRuleEntriesEvenOdd.find(([key]) => key === Choices.odd) || [];
            const countResult = { even: 60 };
            const total = 100;

            expect(oddCalculator!(countResult, total)).toBe(40);
        });

        it('should return 100 for odd when no even results', () => {
            const [, oddCalculator] = StatisticRuleEntriesEvenOdd.find(([key]) => key === Choices.odd) || [];
            const countResult = {};
            const total = 100;

            expect(oddCalculator!(countResult, total)).toBe(100);
        });
    });

    describe('StatisticRuleEntriesBlueRed', () => {
        it('should calculate blue percentage correctly', () => {
            const [, blueCalculator] = StatisticRuleEntriesBlueRed.find(([key]) => key === Choices.blue) || [];
            const countResult = { blue: 50 };
            const total = 100;

            expect(blueCalculator!(countResult, total)).toBe(50);
        });

        it('should return 0 for blue when no blue results', () => {
            const [, blueCalculator] = StatisticRuleEntriesBlueRed.find(([key]) => key === Choices.blue) || [];
            const countResult = {};
            const total = 100;

            expect(blueCalculator!(countResult, total)).toBe(0);
        });

        it('should calculate tie percentage correctly', () => {
            const [, tieCalculator] = StatisticRuleEntriesBlueRed.find(([key]) => key === Choices.tie) || [];
            const countResult = { tie: 20 };
            const total = 100;

            expect(tieCalculator!(countResult, total)).toBe(20);
        });

        it('should return 0 for tie when no tie results', () => {
            const [, tieCalculator] = StatisticRuleEntriesBlueRed.find(([key]) => key === Choices.tie) || [];
            const countResult = {};
            const total = 100;

            expect(tieCalculator!(countResult, total)).toBe(0);
        });

        it('should calculate red percentage as complement of blue and tie', () => {
            const [, redCalculator] = StatisticRuleEntriesBlueRed.find(([key]) => key === Choices.red) || [];
            const countResult = { blue: 50, tie: 20 };
            const total = 100;

            expect(redCalculator!(countResult, total)).toBe(30);
        });

        it('should return 100 for red when no blue and tie results', () => {
            const [, redCalculator] = StatisticRuleEntriesBlueRed.find(([key]) => key === Choices.red) || [];
            const countResult = {};
            const total = 100;

            expect(redCalculator!(countResult, total)).toBe(100);
        });
    });

    describe('GetTranslateMapping', () => {
        it('should return correct translations with default game name', () => {
            const result = GetTranslateMapping(mockT);

            expect(result.blue).toBe('kenosoccer:blue');
            expect(result.red).toBe('kenosoccer:red');
            expect(result.tie).toBe('kenosoccer:tie');
            // ... add more expectations for other translations
        });

        it('should return correct translations with custom game name', () => {
            const result = GetTranslateMapping(mockT, 'customGame');

            expect(result.blue).toBe('customGame:blue');
            expect(result.red).toBe('customGame:red');
            expect(result.tie).toBe('customGame:tie');
            // ... add more expectations for other translations
        });
    });
}); 