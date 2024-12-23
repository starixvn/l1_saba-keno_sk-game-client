import React from 'react';
import { render, screen } from '@testing-library/react';
import { MiniItemNext, ScoreboardItemNext } from '../../../../../src/components/shared/round-history/dot-next/index';

describe('MiniItemNext Component', () => {
    it('should render with correct classes', () => {
        render(<MiniItemNext />);

        const dotElement = screen.getByTestId('mini-item-next');
        expect(dotElement).toHaveClass('dot-next');
        expect(dotElement).toHaveClass('blink');
    });

    it('should render with nested div structure', () => {
        const { container } = render(<MiniItemNext />);

        const outerDiv = container.firstChild;
        const innerDiv = container.querySelector('div > div');

        expect(outerDiv).toBeInTheDocument();
        expect(innerDiv).toBeInTheDocument();
    });
});

describe('ScoreboardItemNext Component', () => {
    const defaultProps = {
        col: 1,
        row: 2,
    };

    it('should render with correct classes', () => {
        render(<ScoreboardItemNext {...defaultProps} />);

        const element = screen.getByTestId('scoreboard-dot-next');
        expect(element).toHaveClass('dot-next');
        expect(element).toHaveClass('blink');
    });

    it('should render with correct grid positioning styles', () => {
        render(<ScoreboardItemNext col={3} row={4} />);

        const element = screen.getByTestId('scoreboard-dot-next');
        expect(element).toHaveStyle({
            gridColumnStart: '3',
            gridRowStart: '4',
        });
    });

    it('should render with zero grid positions', () => {
        render(<ScoreboardItemNext col={0} row={0} />);

        const element = screen.getByTestId('scoreboard-dot-next');
        expect(element).toHaveStyle({
            gridColumnStart: '0',
            gridRowStart: '0',
        });
    });

    it('should handle large grid position numbers', () => {
        render(<ScoreboardItemNext col={999} row={999} />);

        const element = screen.getByTestId('scoreboard-dot-next');
        expect(element).toHaveStyle({
            gridColumnStart: '999',
            gridRowStart: '999',
        });
    });
}); 