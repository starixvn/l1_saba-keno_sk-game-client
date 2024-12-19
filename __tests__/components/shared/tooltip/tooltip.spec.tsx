import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { Tooltip } from "../../../../src/components/shared/tooltip";

// Mock react-device-detect
jest.mock('react-device-detect', () => ({
    isDesktop: true
}));

describe('Tooltip Component', () => {
    let hoverWrapper: React.MutableRefObject<HTMLDivElement>;

    beforeEach(() => {
        // Create a div element and set it as the hoverWrapper ref
        const div = document.createElement('div');
        hoverWrapper = { current: div };
        document.body.appendChild(div);
    });

    afterEach(() => {
        // Clean up
        if (hoverWrapper.current) {
            document.body.removeChild(hoverWrapper.current);
        }
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <Tooltip
                message="Test tooltip"
                hoverWrapper={hoverWrapper}
            />
        );
        expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });

    it('shows tooltip on mouse enter and hides on mouse leave', () => {
        render(
            <Tooltip
                message="Test tooltip"
                hoverWrapper={hoverWrapper}
            />
        );

        const tooltipElement = screen.getByText('Test tooltip').parentElement;

        // Initially tooltip should not have 'show' class
        expect(tooltipElement).not.toHaveClass('show');

        // Trigger mouseenter
        fireEvent.mouseEnter(hoverWrapper.current);
        expect(tooltipElement).toHaveClass('show');

        // Trigger mouseleave
        fireEvent.mouseLeave(hoverWrapper.current);
        expect(tooltipElement).not.toHaveClass('show');
    });

    it('hides tooltip on document mousedown', () => {
        render(
            <Tooltip
                message="Test tooltip"
                hoverWrapper={hoverWrapper}
            />
        );

        // Show tooltip
        fireEvent.mouseEnter(hoverWrapper.current);
        expect(screen.getByText('Test tooltip').parentElement).toHaveClass('show');

        // Click anywhere in the document
        fireEvent.mouseDown(document);
        expect(screen.getByText('Test tooltip').parentElement).not.toHaveClass('show');
    });

    it('updates position when isShowAtHoverPosition is true', () => {
        jest.useFakeTimers();

        const { container } = render(
            <Tooltip
                message="Test tooltip"
                hoverWrapper={hoverWrapper}
                isShowAtHoverPosition={true}
            />
        );

        // Trigger mouseenter and mousemove
        fireEvent.mouseEnter(hoverWrapper.current);
        fireEvent.mouseMove(document, { clientX: 100, clientY: 100 });

        // Fast-forward timers
        act(() => {
            jest.advanceTimersByTime(500);
        });

        const tooltipInner = container.querySelector('.tooltip-inner');
        expect(tooltipInner).toHaveStyle({ position: 'fixed' });

        jest.useRealTimers();
    });

    it('adjusts position when tooltip is off-screen', () => {
        const getBoundingClientRectMock = jest.fn(() => ({
            x: -10,
            left: -10,
            width: 100,
            top: 0,
            right: 90,
            bottom: 0,
            height: 0,
            y: 0,
            toJSON: () => ({}),
        }));


        Element.prototype.getBoundingClientRect = getBoundingClientRectMock;


        const { container } = render(
            <Tooltip
                message="Test tooltip"
                hoverWrapper={hoverWrapper}
            />
        );

        const tooltipInner = container.querySelector('.tooltip-inner');

        expect(tooltipInner).toHaveStyle({ left: '-60px', right: 'auto' });
    });

});