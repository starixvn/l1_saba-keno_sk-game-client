import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
    ModalContextProvider,
    useModalContext,
    useModalDispatch,
    ModalEventActionType,
    modalContextInitialValues
} from '../index';

// Test component to access context values
const TestComponent = () => {
    const modalContext = useModalContext();
    const dispatch = useModalDispatch();

    return (
        <div>
            <div data-testid="promotion-status">
                {modalContext.enabledPromotionTournament?.toString()}
            </div>
            <button
                onClick={() => dispatch({
                    type: ModalEventActionType.TogglePromotionTournamentModal,
                    payload: true
                })}
                data-testid="toggle-button"
            >
                Toggle
            </button>
        </div>
    );
};

describe('ModalContext', () => {
    it('should provide initial values', () => {
        render(
            <ModalContextProvider>
                <TestComponent />
            </ModalContextProvider>
        );

        expect(screen.getByTestId('promotion-status').textContent)
            .toBe(modalContextInitialValues.enabledPromotionTournament.toString());
    });

    it('should update promotion tournament status when dispatched', () => {
        render(
            <ModalContextProvider>
                <TestComponent />
            </ModalContextProvider>
        );

        // Initial state should be false
        expect(screen.getByTestId('promotion-status').textContent).toBe('false');

        // Click button to dispatch toggle action
        act(() => {
            screen.getByTestId('toggle-button').click();
        });

        // State should be updated to true
        expect(screen.getByTestId('promotion-status').textContent).toBe('true');
    });

    it('should maintain state for unknown action types', () => {
        let testDispatch: any;

        const TestComponentWithUnknownAction = () => {
            const dispatch = useModalDispatch();
            testDispatch = dispatch;
            return null;
        };

        render(
            <ModalContextProvider>
                <TestComponentWithUnknownAction />
                <TestComponent />
            </ModalContextProvider>
        );

        // Dispatch an unknown action type
        act(() => {
            testDispatch({ type: 'UNKNOWN_ACTION' as ModalEventActionType, payload: true });
        });

        // State should remain unchanged
        expect(screen.getByTestId('promotion-status').textContent).toBe('false');
    });
}); 