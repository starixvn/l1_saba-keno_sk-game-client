import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header, { HeaderProps, getLogoName } from "../../../src/components/header";
import { isMobileOnly } from 'react-device-detect';
import '@testing-library/jest-dom';

jest.mock('react-device-detect', () => ({
    isMobileOnly: false
}));

describe('Header Component', () => {
    const mockProps: HeaderProps = {
        user: {
            UID: 1,
            avatarId: 1,
            currency: 'USD',
            name: 'John Doe',
            red: 100,
            settings: { quickBet: false, theme: 'light' },
            isSignedInSM: true,
            offerGames: [],
            enabledGameIds: [],
            availSpins: 10,
            scoins: 100,
            fractionalOddsFormat: true,
            isDisplayPlayerCurrency: true,
            currencyGroup: 'USD',
        },
        enabledSound: true,
        enabledNotification: true,
        onToggleSound: jest.fn(),
        onToggleNotification: jest.fn(),
        toggleHistoryModal: jest.fn(),
        toggleGuideModal: jest.fn(),
        toggleAnnouncementModal: jest.fn(),
        isShowBoostedOdds: true,
        promotionNotifications: [],
        isShowToolbarGuide: true,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders header component', () => {
        render(<Header {...mockProps} />);
        const headerElement = screen.getByTestId('header');
        expect(headerElement).toBeInTheDocument();
    });

    test('renders logo with correct source', () => {
        render(<Header {...mockProps} />);
        const logoImage = screen.getByAltText('UM');
        expect(logoImage).toHaveClass('header-logo');
        expect(logoImage.getAttribute('src')).toContain('logo-desktop-saba-keno.svg');
    });

    test('logo click triggers page reload', () => {
        const reloadMock = jest.fn();
        Object.defineProperty(window, 'location', {
            value: { reload: reloadMock },
            writable: true
        });

        render(<Header {...mockProps} />);
        const logo = screen.getByAltText('UM');
        fireEvent.click(logo.parentElement!);
        expect(reloadMock).toHaveBeenCalled();
    });

    test('renders UserInfo component when not mobile', () => {
        render(<Header {...mockProps} />);
        expect(screen.getByText(mockProps.user.name)).toBeInTheDocument();
    });

    test('does not render UserInfo component on mobile', () => {
        (isMobileOnly as boolean) = true;

        render(<Header {...mockProps} />);
        expect(screen.queryByText(mockProps.user.name)).not.toBeInTheDocument();
    });

    test('getLogoName returns correct value', () => {
        expect(getLogoName()).toBe('saba-keno');
    });

    test('applies mobile class when on mobile device', () => {
        (isMobileOnly as boolean) = true;

        render(<Header {...mockProps} />);
        const headerElement = screen.getByTestId('header');
        expect(headerElement).toHaveClass('mobile');
    });
});