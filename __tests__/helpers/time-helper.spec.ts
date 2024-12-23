import { convertToGMT8, formatDate } from '../../src/helpers/time-helper';

describe('TimeHelper', () => {
    describe('convertToGMT8', () => {
        it('should convert date to GMT+8 (Manila timezone)', () => {
            // Create a fixed date for testing (2024-03-15 10:30:00 UTC)
            const inputDate = new Date('2024-03-15T10:30:00Z');
            const result = convertToGMT8(inputDate);

            // Manila is GMT+8, so should be 18:30
            expect(result.getHours()).toBe(18);
            expect(result.getMinutes()).toBe(30);
        });

        it('should handle date string input', () => {
            const inputDate = '2024-03-15T10:30:00Z';
            const result = convertToGMT8(new Date(inputDate));
            expect(result).toBeInstanceOf(Date);
        });
    });

    describe('formatDate', () => {
        let testDate: Date;

        beforeEach(() => {
            // Use a fixed date for consistent testing
            testDate = new Date('2024-03-15T10:30:45');
        });

        it('should format date with year pattern', () => {
            expect(formatDate(testDate, 'yyyy')).toBe('2024');
            expect(formatDate(testDate, 'yy')).toBe('24');
        });

        it('should format date with month pattern', () => {
            expect(formatDate(testDate, 'MM')).toBe('03');
            expect(formatDate(testDate, 'M')).toBe('3');
        });

        it('should format date with day pattern', () => {
            expect(formatDate(testDate, 'dd')).toBe('15');
            expect(formatDate(testDate, 'd')).toBe('15');
        });

        it('should format date with hours pattern', () => {
            expect(formatDate(testDate, 'hh')).toBe('10');
            expect(formatDate(testDate, 'h')).toBe('10');
        });

        it('should format date with minutes pattern', () => {
            expect(formatDate(testDate, 'mm')).toBe('30');
            expect(formatDate(testDate, 'm')).toBe('30');
        });

        it('should format date with seconds pattern', () => {
            expect(formatDate(testDate, 'ss')).toBe('45');
            expect(formatDate(testDate, 's')).toBe('45');
        });

        it('should format date with combined patterns', () => {
            expect(formatDate(testDate, 'yyyy-MM-dd hh:mm:ss'))
                .toBe('2024-03-15 10:30:45');
        });

        it('should handle single-digit values with padding', () => {
            const singleDigitDate = new Date('2024-01-05T09:05:05');
            expect(formatDate(singleDigitDate, 'yyyy-MM-dd hh:mm:ss'))
                .toBe('2024-01-05 09:05:05');
        });

        it('should handle invalid template', () => {
            expect(formatDate(testDate, null))
                .toBe(testDate.toString());
        });
    });
});