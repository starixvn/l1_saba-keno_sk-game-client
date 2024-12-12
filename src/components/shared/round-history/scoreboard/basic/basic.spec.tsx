import { render } from "@testing-library/react";
import React from "react";

import ScoreboardBasic from ".";
import { GameState } from "../../../../shared/game-base/type";
import { roundHistory } from "../../__tests__/test-helper";

describe('ScoreboardBasic', () => {
    const mockGetDotDetails = (round: any, roundId: number) => (
        <div data-testid={`dot-${roundId}`}>
            Value: {round.value}
        </div>
    );

    it('renders without crashing', () => {
        render(
            <ScoreboardBasic
                roundHistory={roundHistory}
                getDotDetails={mockGetDotDetails}
                gameState={GameState.InRound}
            />
        );
    });

    it('renders empty scoreboard when no rounds', () => {
        const { container } = render(
            <ScoreboardBasic
                roundHistory={[]}
                getDotDetails={mockGetDotDetails}
                gameState={GameState.InRound}
            />
        );

        expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('applies correct CSS class', () => {
        const { container } = render(
            <ScoreboardBasic
                roundHistory={roundHistory}
                getDotDetails={mockGetDotDetails}
                gameState={GameState.InRound}
            />
        );

        expect(container.firstChild).toHaveClass('score-board-container');
    });
});

