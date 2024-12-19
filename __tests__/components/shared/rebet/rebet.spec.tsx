import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useTranslation } from 'next-i18next';
import Rebet from '../../../../src/components/shared/rebet';
import { useGameContext } from '../../../../src/contexts/game-context/game-context';
import { useGameActionContext } from '../../../../src/contexts/game-actions-context';
import { useSystemContext } from '../../../../src/contexts/system';
import { getLocalStorageItem } from '../../../../src/common/local-storage';

// Mock all the hooks and dependencies
jest.mock('next-i18next', () => ({
    useTranslation: jest.fn(),
}));

jest.mock('../../../../src/contexts/game-context/game-context', () => ({
    useGameContext: jest.fn(),
}));

jest.mock('../../../../src/contexts/game-actions-context', () => ({
    useGameActionContext: jest.fn(),
}));

jest.mock('../../../../src/contexts/system', () => ({
    useSystemContext: jest.fn(),
}));

jest.mock('../../../../src/common/local-storage', () => ({
    getLocalStorageItem: jest.fn(),
    localStorageKeys: {
        rebet: "rebet",
    }
}));

describe('Rebet Component', () => {
    const mockProps = {
        gameId: 1,
        onCloseModal: jest.fn(),
        getOddsByChoice: jest.fn().mockReturnValue(2.0),
    };

    const mockTranslation = {
        t: jest.fn((key) => key),
    };

    const mockGameContext = {
        roundId: '12345',
        gameSetting: {
            gameName: 'TestGame',
        },
    };

    const mockGameActionContext = {
        registerMessageHandler: jest.fn().mockReturnValue('listener-id'),
        unsubscribeMessageHandler: jest.fn(),
        placeBet: jest.fn(),
        finishProcessingBet: jest.fn(),
        playAcceptedBetAnimation: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();

        (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
        (useGameContext as jest.Mock).mockReturnValue(mockGameContext);
        (useGameActionContext as jest.Mock).mockReturnValue(mockGameActionContext);
        (useSystemContext as jest.Mock).mockReturnValue({ fractionalOddsFormat: false });

        // Mock localStorage data
        (getLocalStorageItem as jest.Mock).mockReturnValue({
            rebet: false,
            "1": {
                betInfo: {
                    'choice1': 100,
                    'choice2': 200,
                }
            }
        });
    });

    it('renders component with bet choices', () => {
        render(<Rebet {...mockProps} />);

        expect(screen.getByText('#12345')).toBeInTheDocument();
        expect(screen.getByText('game_name')).toBeInTheDocument();
    });

    it('handles close modal when cancel button is clicked', () => {
        render(<Rebet {...mockProps} />);

        const cancelButton = screen.getByText('common:cancel');
        fireEvent.click(cancelButton);

        expect(mockProps.onCloseModal).toHaveBeenCalled();
    });

    it('handles bet submission when confirm button is clicked', async () => {
        render(<Rebet {...mockProps} />);

        const confirmButton = screen.getByText('common:confirm');
        fireEvent.click(confirmButton);

        expect(mockGameActionContext.placeBet).toHaveBeenCalledTimes(2);
        expect(mockGameActionContext.placeBet).toHaveBeenCalledWith('choice1', 100);
        expect(mockGameActionContext.placeBet).toHaveBeenCalledWith('choice2', 200);
    });

    it('registers and unregisters message handler', () => {
        const { unmount } = render(<Rebet {...mockProps} />);

        expect(mockGameActionContext.registerMessageHandler).toHaveBeenCalledWith(
            'endBet',
            expect.any(Function)
        );

        unmount();

        expect(mockGameActionContext.unsubscribeMessageHandler).toHaveBeenCalledWith('listener-id');
    });

    it('handles successful bet completion', async () => {
        render(<Rebet {...mockProps} />);

        const confirmButton = screen.getByText('common:confirm');
        fireEvent.click(confirmButton);

        // Simulate successful bet completion for both choices
        const endBetHandler = mockGameActionContext.registerMessageHandler.mock.calls[0][1];

        endBetHandler({
            endBet: 100,
            betChoice: 'choice1',
            notice: null,
            apiError: null
        });

        endBetHandler({
            endBet: 200,
            betChoice: 'choice2',
            notice: null,
            apiError: null
        });

        await waitFor(() => {
            expect(mockGameActionContext.finishProcessingBet).toHaveBeenCalled();
            expect(mockGameActionContext.playAcceptedBetAnimation).toHaveBeenCalledWith(300);
            expect(mockProps.onCloseModal).toHaveBeenCalled();
        });
    });
});