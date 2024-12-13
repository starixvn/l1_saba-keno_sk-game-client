import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HistoryModal } from './index';
import { GameIds } from '../../../common/constants/gameIds';
import "@testing-library/jest-dom";

// Mock the translation hook
jest.mock('next-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: { [key: string]: string } = {
                'popupTitleHistory': 'History',
                'common:game': 'Game'
            };
            return translations[key] || key;
        }
    })
}));

// Mock the child components
jest.mock('../../keno/bet-history', () => {
    return function MockKenoBetHistory() {
        return <div data-testid="keno-bet-history">Keno Bet History</div>;
    };
});

jest.mock('../../games/keno-pro-max/bet-history', () => {
    return function MockKenoProMaxBetHistory() {
        return <div data-testid="keno-pro-max-bet-history">Keno Pro Max Bet History</div>;
    };
});

jest.mock('../../shared/game-selector', () => {
    return function MockGameSelector({ onChangeGame }: { onChangeGame: (gameId: number) => void }) {
        return (
            <select data-testid="game-selector" onChange={(e) => onChangeGame(Number(e.target.value))}>
                <option value={GameIds.MegaKeno}>MegaKeno</option>
                <option value={GameIds.KenoSoccer}>KenoSoccer</option>
            </select>
        );
    };
});

describe('HistoryModal', () => {
    const mockOnCloseModal = jest.fn();
    const defaultProps = {
        onCloseModal: mockOnCloseModal,
        offerGames: [GameIds.MegaKeno, GameIds.KenoSoccer],
        fractionalOddsFormat: false
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the history modal with title', () => {
        render(<HistoryModal {...defaultProps} />);
        expect(screen.getByText('History')).toBeInTheDocument();
    });

    it('closes modal when close icon is clicked', () => {
        render(<HistoryModal {...defaultProps} />);
        const closeIcon = screen.getByTestId('icon-close');
        fireEvent.click(closeIcon);
        expect(mockOnCloseModal).toHaveBeenCalled();
    });

    it('renders KenoProMaxBetHistory for MegaKeno game', () => {
        render(<HistoryModal {...defaultProps} />);
        expect(screen.getByTestId('keno-pro-max-bet-history')).toBeInTheDocument();
    });

    it('renders KenoBetHistory when switching to KenoSoccer game', () => {
        render(<HistoryModal {...defaultProps} />);

        const gameSelector = screen.getByTestId('game-selector');
        fireEvent.change(gameSelector, { target: { value: GameIds.KenoSoccer } });

        expect(screen.getByTestId('keno-bet-history')).toBeInTheDocument();
    });

    it('sets initial selected game from offerGames', () => {
        const customProps = {
            ...defaultProps,
            offerGames: [GameIds.KenoSoccer]
        };
        render(<HistoryModal {...customProps} />);
        expect(screen.getByTestId('keno-bet-history')).toBeInTheDocument();
    });

    it('handles empty offerGames array', () => {
        const customProps = {
            ...defaultProps,
            offerGames: []
        };
        render(<HistoryModal {...customProps} />);
        expect(screen.queryByTestId('keno-bet-history')).not.toBeInTheDocument();
        expect(screen.queryByTestId('keno-pro-max-bet-history')).not.toBeInTheDocument();
    });
});
