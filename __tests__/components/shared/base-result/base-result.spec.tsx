import React from 'react';
import { render, act } from '@testing-library/react';
import BaseResult, { HidingAnimationTimeInSecond } from "../../../../src/components/shared/base-result";

describe('BaseResult', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders children correctly', () => {
        const { getByText } = render(
            <BaseResult showResultTimeInSecond={2}>
                <div>Test Content</div>
            </BaseResult>
        );

        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('starts without hide-result-animation class', () => {
        const { container } = render(
            <BaseResult showResultTimeInSecond={2}>
                <div>Test Content</div>
            </BaseResult>
        );

        expect(container.firstChild).not.toHaveClass('hide-result-animation');
    });

    it('adds hide-result-animation class after specified time', () => {
        const showTime = 2;
        const { container } = render(
            <BaseResult showResultTimeInSecond={showTime}>
                <div>Test Content</div>
            </BaseResult>
        );

        // Calculate when the animation should start
        const timeUntilHiding = (showTime - HidingAnimationTimeInSecond) * 1000;

        // Fast-forward time just before the animation should start
        act(() => {
            jest.advanceTimersByTime(timeUntilHiding - 1);
        });
        expect(container.firstChild).not.toHaveClass('hide-result-animation');

        // Fast-forward time to when the animation should start
        act(() => {
            jest.advanceTimersByTime(1);
        });
        expect(container.firstChild).toHaveClass('hide-result-animation');
    });

    it('cleans up timeout on unmount', () => {
        jest.spyOn(global, 'clearTimeout');
        const { unmount } = render(
            <BaseResult showResultTimeInSecond={2}>
                <div>Test Content</div>
            </BaseResult>
        );

        unmount();

        // Ensure setTimeout was cleared
        expect(clearTimeout).toHaveBeenCalled();
    });
});