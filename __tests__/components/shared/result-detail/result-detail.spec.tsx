import React from 'react';
import { render, act } from '@testing-library/react';
import ResultDetail, { HidingAnimationDurationInSecond } from '../../../../src/components/shared/result-detail';

jest.useFakeTimers();

describe('ResultDetail', () => {
    const mockRenderSettlementInfo = jest.fn(() => <div>Test Settlement Info</div>);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render settlement info initially without hide animation class', () => {
        const { container } = render(
            <ResultDetail
                renderSettlementInfo={mockRenderSettlementInfo}
                timeToShowInSecond={5}
            />
        );

        expect(mockRenderSettlementInfo).toHaveBeenCalledTimes(1);
        expect(container.firstChild).toHaveClass('result-detail-container');
        expect(container.firstChild).not.toHaveClass('hide-result-animation');
    });

    it('should add hide animation class after specified time', () => {
        const timeToShow = 5;
        const { container } = render(
            <ResultDetail
                renderSettlementInfo={mockRenderSettlementInfo}
                timeToShowInSecond={timeToShow}
            />
        );

        act(() => {
            jest.advanceTimersByTime((timeToShow - HidingAnimationDurationInSecond) * 1000);
        });

        expect(container.firstChild).toHaveClass('hide-result-animation');
    });

    it('should clean up timeout on unmount', () => {
        jest.spyOn(global, 'clearTimeout');
        const { unmount } = render(
            <ResultDetail
                renderSettlementInfo={mockRenderSettlementInfo}
                timeToShowInSecond={5}
            />
        );

        unmount();

        expect(clearTimeout).toHaveBeenCalled();
    });
});