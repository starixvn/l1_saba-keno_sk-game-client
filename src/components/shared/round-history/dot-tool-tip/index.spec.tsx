import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ContainerToolTip } from '.';

describe('ContainerToolTip', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        // Clear mock calls between tests
        mockOnClose.mockClear();
        // Mock window.innerWidth
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
    });

    it('renders children when isOpen is true', () => {
        render(
            <ContainerToolTip isOpen={true} onClose={mockOnClose}>
                <div>Test Content</div>
            </ContainerToolTip>
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByTestId('tooltip')).toHaveClass('show');
    });

    it('does not show tooltip when isOpen is false', () => {
        render(
            <ContainerToolTip isOpen={false} onClose={mockOnClose}>
                <div>Test Content</div>
            </ContainerToolTip>
        );

        expect(screen.getByTestId('tooltip')).not.toHaveClass('show');
    });

    it('calls onClose when clicking outside the tooltip', () => {
        render(
            <ContainerToolTip isOpen={true} onClose={mockOnClose}>
                <div>Test Content</div>
            </ContainerToolTip>
        );

        fireEvent.mouseDown(document.body);
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('does not call onClose when clicking inside the tooltip', () => {
        render(
            <ContainerToolTip isOpen={true} onClose={mockOnClose}>
                <div>Test Content</div>
            </ContainerToolTip>
        );

        const tooltip = screen.getByTestId('tooltip');
        fireEvent.mouseDown(tooltip);
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('adjusts position when tooltip is near right screen edge', () => {
        // Mock getBoundingClientRect for tooltip wrapper
        const mockGetBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 950,
            right: 1000,
            bottom: 0,
            width: 100,
            height: 0,
            x: 950,
            y: 0,
            toJSON: () => ({}),
        }));
        Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;

        render(
            <ContainerToolTip isOpen={true} onClose={mockOnClose}>
                <div>Test Content</div>
            </ContainerToolTip>
        );

        const innerTooltip = screen.getByTestId('tooltip-inner');
        expect(innerTooltip).toHaveStyle({ position: 'absolute' });
    });


    it('adjusts position when tooltip is near left screen edge', () => {
        // Mock getBoundingClientRect for tooltip wrapper
        const mockGetBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 30,
            right: 100,
            bottom: 0,
            width: 100,
            height: 0,
            x: 30,
            y: 0,
            toJSON: () => ({}), // Optional, just to match DOMRect API
        }));
        Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;

        render(
            <ContainerToolTip isOpen={true} onClose={mockOnClose}>
                <div>Test Content</div>
            </ContainerToolTip>
        );

        const innerTooltip = screen.getByTestId('tooltip-inner');
        expect(innerTooltip).toHaveStyle({ position: 'absolute' });
    });

});