import { render, screen, act, fireEvent } from '@testing-library/react';
import { WinningStreak } from "../../../src/components/winning-streak";
import { useTranslation } from 'next-i18next';
import React from 'react';

// Mock next-i18next
jest.mock('next-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('WinningStreak', () => {
    const mockT = jest.fn((key) => key);
    const ref = React.createRef<any>();

    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('should render empty initially', () => {
        render(<WinningStreak ref={ref} />);
        expect(screen.queryByTestId('streak-notification')).not.toBeInTheDocument();
    });

    it('should add and remove winning streak notification', () => {
        render(<WinningStreak ref={ref} />);

        // Add winning streak
        act(() => {
            ref.current.addWinningStreak({
                key: '1',
                gameName: 'kenosoccer',
                choice: '1',
                streak: 3,
            });
        });

        expect(screen.getByText('kenosoccer:game_name')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();

        // Auto remove after timeout
        act(() => {
            jest.advanceTimersByTime(4000);
        });

        expect(screen.queryByText('kenosoccer:game_name')).not.toBeInTheDocument();
    });

    it('should handle manual close button click', () => {
        render(<WinningStreak ref={ref} />);

        act(() => {
            ref.current.addWinningStreak({
                key: '1',
                gameName: 'kenosoccer',
                choice: '1',
                streak: 3,
            });
        });

        const closeButton = screen.getByTestId('close-button');
        fireEvent.click(closeButton);

        expect(screen.queryByText('kenosoccer:game_name')).not.toBeInTheDocument();
    });

    it('should handle optional text', () => {
        render(<WinningStreak ref={ref} />);

        act(() => {
            ref.current.addWinningStreak({
                key: '1',
                gameName: 'kenosoccer',
                choice: '1',
                streak: 3,
                optional: 'Optional Text',
            });
        });

        expect(screen.getByText('Optional Text')).toBeInTheDocument();
    });

    describe('getIconClassName', () => {
        const testCases = [
            'kenosoccer',
            'kenosoccer2',
            'kenopower',
            'kenopower2',
            'kenomini',
            'kenomini2',
            'megakeno',
            'megakeno2',
            'kenoeast',
            'kenowest',
            'kenosouth',
            'kenonorth',
            'othergame',
        ];

        testCases.forEach(gameName => {
            it(`should handle icon class for ${gameName}`, () => {
                render(<WinningStreak ref={ref} />);

                act(() => {
                    ref.current.addWinningStreak({
                        key: '1',
                        gameName,
                        choice: '1',
                        streak: 3,
                    });
                });

                const iconElement = screen.getByText(`${gameName.toLowerCase()}:1TextDot`);
                expect(iconElement).toBeInTheDocument();
            });
        });
    });

    it('should handle multiple winning streaks', () => {
        render(<WinningStreak ref={ref} />);

        act(() => {
            ref.current.addWinningStreak({
                key: '1',
                gameName: 'kenosoccer',
                choice: '1',
                streak: 3,
            });
            ref.current.addWinningStreak({
                key: '2',
                gameName: 'kenopower',
                choice: '2',
                streak: 4,
            });
        });

        expect(screen.getByText('kenosoccer:game_name')).toBeInTheDocument();
        expect(screen.getByText('kenopower:game_name')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
    });
});
