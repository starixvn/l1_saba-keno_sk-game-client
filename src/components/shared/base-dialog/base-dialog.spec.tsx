import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BaseDialog from '.';
import { isMobileOnly } from 'react-device-detect';

// Mock react-device-detect
jest.mock('react-device-detect', () => ({
    isMobileOnly: false,
    isIOS: false,
}));

describe('BaseDialog Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        // Clear mock calls between tests
        mockOnClose.mockClear();
        // Reset body classes
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll-html');
    });

    it('renders children correctly', () => {
        render(
            <BaseDialog isOpen={true}>
                <div data-testid="test-child">Test Content</div>
            </BaseDialog>
        );

        expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('adds no-scroll class when enableBackdrop is true', () => {
        render(<BaseDialog enableBackdrop={true} />);

        expect(document.body.classList.contains('no-scroll')).toBe(true);
    });

    it('removes no-scroll class on unmount', () => {
        const { unmount } = render(<BaseDialog enableBackdrop={true} />);

        unmount();
        expect(document.body.classList.contains('no-scroll')).toBe(false);
    });

    it('calls onCloseModal when clicking outside', () => {
        render(
            <BaseDialog isOpen={true} onCloseModal={mockOnClose}>
                <div>Content</div>
            </BaseDialog>
        );

        fireEvent.mouseDown(document.body);
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('does not call onCloseModal when clicking inside', () => {
        render(
            <BaseDialog isOpen={true} onCloseModal={mockOnClose}>
                <div>Content</div>
            </BaseDialog>
        );

        const dialog = screen.getByTestId('base-dialog');
        fireEvent.mouseDown(dialog);
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('applies correct styles based on betContainerPosition', () => {
        const betContainerPosition = 100;
        window.innerHeight = 1000;

        const { container } = render(
            <BaseDialog betContainerPosition={betContainerPosition}>
                <div>Content</div>
            </BaseDialog>
        );

        const popup = container.querySelector(`.popup`);
        expect(popup).toHaveStyle({ top: '100px' });
    });

    it('renders overlay when enableBackdrop is true and not mobile', () => {
        const { container } = render(<BaseDialog enableBackdrop={true} />);

        expect(container.querySelector('.overlay-mask')).toBeInTheDocument();
    });

    it('applies mobile classes when isMobileOnly is true', () => {
        // Mock isMobileOnly as true for this test
        (isMobileOnly as boolean) = true;

        const { container } = render(<BaseDialog />);
        const popup = container.querySelector(`.popup`);

        expect(popup).toHaveClass('isMobile');
    });
});