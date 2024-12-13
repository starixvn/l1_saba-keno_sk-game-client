import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { GameHeader } from '.';

import { useGameContext } from '../../../contexts/game-context/game-context';
import { useSystemContext } from '../../../contexts/system';
import { useGameActionContext } from '../../../contexts/game-actions-context';
import { ViewMode } from '../game-base/type';
import { isMobileOnly } from 'react-device-detect';

// Mock the hooks and dependencies
jest.mock('../../../contexts/game-context/game-context');
jest.mock('../../../contexts/system');
jest.mock('../../../contexts/game-actions-context');
jest.mock('react-device-detect', () => ({
    isMobileOnly: false
}));
jest.mock('next-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key })
}));

describe('GameHeader', () => {
    const mockGameContext = {
        roundId: 123,
        gameSetting: {
            id: 'game1',
            gameName: 'TestGame'
        },
        viewMode: ViewMode.full,
        gameState: 'BETTING',
        ownBets: {}
    };

    const mockSystemContext = {
        favoriteGames: ['game2'],
        setFavorite: jest.fn()
    };

    const mockGameActionContext = {
        updateViewMode: jest.fn(),
        renderResultCollapse: jest.fn(),
        updateStatusShowResult: jest.fn(),
        openPopup: jest.fn()
    };

    beforeEach(() => {
        (useGameContext as jest.Mock).mockReturnValue(mockGameContext);
        (useSystemContext as jest.Mock).mockReturnValue(mockSystemContext);
        (useGameActionContext as jest.Mock).mockReturnValue(mockGameActionContext);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders game header with correct round ID', () => {
        render(
            <GameHeader
                isShowCollapse={false}
                isUpdateDisableRebet={false}
                countdownTimerComponent={<div>Timer</div>}
            />
        );

        expect(screen.getByText('#123')).toBeInTheDocument();
    });

    it('handles favorite button click', () => {
        render(
            <GameHeader
                isShowCollapse={false}
                isUpdateDisableRebet={false}
                countdownTimerComponent={<div>Timer</div>}
            />
        );

        const favoriteBtn = screen.getByTestId('favorite-btn');
        fireEvent.click(favoriteBtn);

        expect(mockSystemContext.setFavorite).toHaveBeenCalledWith('game1', true);
    });

    it('handles mobile view mode toggle', () => {
        (isMobileOnly as boolean) = true;

        render(
            <GameHeader
                isShowCollapse={false}
                isUpdateDisableRebet={false}
                countdownTimerComponent={<div>Timer</div>}
            />
        );

        const header = screen.getByTestId('header');
        fireEvent.click(header);

        expect(mockGameActionContext.updateViewMode).toHaveBeenCalledWith(ViewMode.collapse);
        expect(mockGameActionContext.updateStatusShowResult).toHaveBeenCalled();
    });

    it('renders rebet button in full view mode', () => {
        render(
            <GameHeader
                isShowCollapse={false}
                isUpdateDisableRebet={false}
                countdownTimerComponent={<div>Timer</div>}
            />
        );

        expect(screen.getByTestId('rebet-btn')).toBeInTheDocument();
    });

    it('does not render rebet button in collapse view mode', () => {
        (useGameContext as jest.Mock).mockReturnValue({
            ...mockGameContext,
            viewMode: ViewMode.collapse
        });

        render(
            <GameHeader
                isShowCollapse={false}
                isUpdateDisableRebet={false}
                countdownTimerComponent={<div>Timer</div>}
            />
        );

        expect(screen.queryByTestId('rebet-btn')).not.toBeInTheDocument();
    });
});