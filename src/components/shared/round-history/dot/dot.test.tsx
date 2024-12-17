import React from 'react';
import { render } from '@testing-library/react';
import { RoundDot, RoundDotGrid } from './index';

describe('RoundDot Component', () => {
    it('renders with default props', () => {
        const { getByTestId } = render(<RoundDot />);
        const dot = getByTestId('round-dot');
        expect(dot).toBeInTheDocument();
        expect(dot).toHaveClass('dot-even');
        expect(dot).not.toHaveClass('highlight-current-result');
    });

    it('renders with custom props', () => {
        const { getByTestId } = render(<RoundDot choice="odd" value="Test" highlight={true} size="large" gameName="game1" />);
        const dot = getByTestId('round-dot');
        expect(dot).toHaveClass('dot-odd');
        expect(dot).toHaveClass('highlight-current-result');
        expect(dot).toHaveClass('large');
        expect(dot).toHaveClass('game1');
        expect(dot).toHaveTextContent('Test');
    });
});

describe('RoundDotGrid Component', () => {
    it('renders with default props', () => {
        const { getByTestId } = render(<RoundDotGrid col={1} row={2} />);
        const dotGrid = getByTestId('round-dot-grid');
        expect(dotGrid).toBeInTheDocument();
        expect(dotGrid).toHaveClass('dot-grid-even');
    });

    it('renders with custom props', () => {
        const { getByTestId } = render(<RoundDotGrid choice="odd" value="Grid Test" col={1} row={2} gameName="game2" />);
        const dotGrid = getByTestId('round-dot-grid');
        expect(dotGrid).toHaveClass('dot-grid-odd');
        expect(dotGrid).toHaveTextContent('Grid Test');
        expect(dotGrid).toHaveStyle('grid-column-start: 1');
        expect(dotGrid).toHaveStyle('grid-row-start: 2');
        expect(dotGrid).toHaveClass('game2');
    });
}); 