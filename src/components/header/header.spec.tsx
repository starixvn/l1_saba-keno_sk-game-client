import React from 'react';
import { render } from '@testing-library/react';
import Header, { HeaderProps } from './index';
import '@testing-library/jest-dom';

jest.mock('react-device-detect', () => ({
    isMobileOnly: true,
}));

jest.mock('../../common/constants', () => ({
    buildVersion: '1.0.0',
}));


jest.mock('./index', () => ({
    getLogoName: jest.fn().mockReturnValue('test'),
}));

describe('Header component', () => {
    const props: HeaderProps = {
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
        enabledQuickBet: true,
        updateEnabledQuickBet: jest.fn(),
        isShowBoostedOdds: true,
        promotionNotifications: [],
        isShowToolbarGuide: true,
    };

    it('renders header with mobile layout', () => {
        const { getByTestId } = render(<Header {...props} />);
        expect(getByTestId('header')).toHaveClass('mobile');
    });

    it('renders header with desktop layout', () => {
        const { getByTestId } = render(<Header {...props} />);
        expect(getByTestId('header')).not.toHaveClass('mobile');
    });

    it('checks logo image source', () => {
        const { getByAltText } = render(<Header {...props} />);
        expect(getByAltText('UM')).toHaveAttribute('src', `/static/images/logo-desktop-test.svg?v=1.0.0`);
    });

    it('checks settings component props', () => {
        const { getByText } = render(<Header {...props} />);
        expect(getByText('Settings')).toBeInTheDocument();
        expect(getByText('Sound')).toBeInTheDocument();
        expect(getByText('Notification')).toBeInTheDocument();
    });

    it('checks UserInfo component is rendered on desktop layout', () => {
        const { getByText } = render(<Header {...props} />);
        expect(getByText(props.user.name)).toBeInTheDocument();
    });

    it('checks UserInfo component is not rendered on mobile layout', () => {
        const { queryByText } = render(<Header {...props} />);
        expect(queryByText(props.user.name)).not.toBeInTheDocument();
    });
});