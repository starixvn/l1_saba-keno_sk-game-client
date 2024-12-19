import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from '../../../../src/components/bet-settings/chip-slider/chip';
import "@testing-library/jest-dom";

describe('Chip Component', () => {
    const mockProps = {
        value: 100,
        text: '100',
        color: 'red',
        selectedChip: 0,
        onClickChip: jest.fn()
    };

    it('renders chip with correct text', () => {
        render(<Chip {...mockProps} />);
        expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('applies selected class when chip is selected', () => {
        const selectedProps = {
            ...mockProps,
            selectedChip: 100 // Same as value to test selected state
        };
        const { container } = render(<Chip {...selectedProps} />);
        expect(container.firstChild).toHaveClass('selected');
    });

    it('does not apply selected class when chip is not selected', () => {
        const { container } = render(<Chip {...mockProps} />);
        expect(container.firstChild).not.toHaveClass('selected');
    });

    it('calls onClickChip with correct value when clicked', () => {
        render(<Chip {...mockProps} />);
        fireEvent.click(screen.getByText('100'));
        expect(mockProps.onClickChip).toHaveBeenCalledWith(100);
    });

    it('renders ChipImage with correct props', () => {
        const { container } = render(<Chip {...mockProps} />);
        const chipImage = container.querySelector('.chip');
        expect(chipImage).toBeInTheDocument();
        expect(chipImage).toHaveClass('img-fluid');
    });
}); 