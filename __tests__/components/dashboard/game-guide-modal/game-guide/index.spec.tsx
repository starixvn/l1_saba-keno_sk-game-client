import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import GameGuides from "../../../../../src/components/dashboard/game-guide-modal/game-guide";
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';

jest.mock('next-themes');
jest.mock('react-device-detect', () => ({
    isMobileOnly: false,
    isIOS: false,
    browserVersion: '16'
}));
jest.mock('next-i18next', () => ({
    useTranslation: jest.fn()
}));

describe('GameGuides', () => {
    const mockProps = {
        gameId: 123,
        userStakeLevel: {
            minBet: 10,
            maxBet: 1000
        },
        gameConfigs: { someConfig: 'value' },
        isInPromotionTime: true,
        fractionalOddsFormat: false
    };

    beforeEach(() => {
        // Mock useTheme
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light'
        });

        (useTranslation as jest.Mock).mockImplementation(() => ({
            t: (key: string) => key,
            i18n: { language: 'en' },
        }));

        // Mock window.postMessage
        window.postMessage = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })
    it('renders loader initially', () => {
        render(<GameGuides {...mockProps} />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('renders iframe with correct src', () => {
        render(<GameGuides {...mockProps} />);
        const iframe = screen.getByTestId('game-guide') as HTMLIFrameElement;

        expect(iframe).toBeInTheDocument();
        expect(iframe.src).toContain(`gId=${mockProps.gameId}`);
        expect(iframe.src).toContain(`minBet=${mockProps.userStakeLevel.minBet}`);
        expect(iframe.src).toContain(`maxBet=${mockProps.userStakeLevel.maxBet}`);
        expect(iframe.src).toContain('fof=false');
    });

    it('hides loader after iframe loads', async () => {
        jest.useFakeTimers();

        render(<GameGuides {...mockProps} />);
        const iframe = screen.getByTestId('game-guide');

        fireEvent.load(iframe);

        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

        jest.useRealTimers();
    });

    it('adds resize event listener on mount and removes on unmount', () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const { unmount } = render(<GameGuides {...mockProps} />);

        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('does add resize listener for iOS mobile version 15', () => {
        jest.resetModules();
        jest.unmock('react-device-detect');
        jest.mock('react-device-detect', () => ({
            isMobileOnly: true,
            isIOS: true,
            browserVersion: '15'
        }));

        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

        render(<GameGuides {...mockProps} />);

        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});