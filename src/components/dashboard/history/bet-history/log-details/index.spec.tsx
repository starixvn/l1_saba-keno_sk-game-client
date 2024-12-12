import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BetHistoryDetailsContainer from './index';

describe('BetHistoryDetailsContainer', () => {
    const mockProps = {
        renderBetLogsDetails: jest.fn(() => <div>Bet Logs Details</div>),
        renderResultDetail: <div>Result Detail</div>,
        isShowResultDetail: false,
        closeModalBetHistory: jest.fn(),
        closeModalBetDetails: jest.fn(),
        translateText: {
            betDetails: 'Bet Details'
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component correctly', () => {
        render(<BetHistoryDetailsContainer {...mockProps} />);

        expect(screen.getByTestId('bet-history-details')).toBeInTheDocument();
        expect(screen.getByText('Bet Details')).toBeInTheDocument();
        expect(screen.getByAltText('arrow-left')).toBeInTheDocument();
        expect(mockProps.renderBetLogsDetails).toHaveBeenCalledTimes(1);
    });

    it('calls closeModalBetDetails when back arrow is clicked', () => {
        render(<BetHistoryDetailsContainer {...mockProps} />);

        const backButton = screen.getByAltText('arrow-left').parentElement;
        fireEvent.click(backButton!);

        expect(mockProps.closeModalBetDetails).toHaveBeenCalledTimes(1);
    });

    it('calls closeModalBetHistory when close icon is clicked', () => {
        render(<BetHistoryDetailsContainer {...mockProps} />);

        const closeIcon = screen.getByTestId('icon-close');
        fireEvent.click(closeIcon);

        expect(mockProps.closeModalBetHistory).toHaveBeenCalledTimes(1);
    });

    it('renders result detail when isShowResultDetail is true', () => {
        render(
            <BetHistoryDetailsContainer
                {...mockProps}
                isShowResultDetail={true}
            />
        );

        expect(screen.getByText('Result Detail')).toBeInTheDocument();
    });

    it('does not render result detail when isShowResultDetail is false', () => {
        render(<BetHistoryDetailsContainer {...mockProps} />);

        expect(screen.queryByText('Result Detail')).not.toBeInTheDocument();
    });
});