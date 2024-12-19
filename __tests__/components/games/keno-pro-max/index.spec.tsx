import { render } from "@testing-library/react";
import React from "react";
import { KenoProMax } from "../../../../src/components/games/keno-pro-max";
import { GameState, ViewMode } from "../../../../src/components/shared/game-base/type";
import { AuthContextProvider } from "../../../../src/contexts/auth";
import { SystemContextProvider } from "../../../../src/contexts/system";
import { GameContextProvider } from "../../../../src/contexts/game-context/game-context";
import { DefaultGameContext, AuthContextValueDefault, SystemContextValue } from "./keno-pro-max-test-helper";

jest.mock("next-i18next", () => ({
    withTranslation: () => (Component: any) => {
        Component.defaultProps = {
            ...Component.defaultProps,
            t: (key: string) => key,
        };
        return Component;
    },
}));

jest.mock("next/router", () => ({
    withRouter: (Component: any) => {
        Component.defaultProps = {
            ...Component.defaultProps,
            router: { query: {} },
        };
        return Component;
    },
}));

const mockGatewayGameBaseProps = {
    id: 1,
    gameName: "Mock Game",
    serviceName: "Mock Service",
    socketInfo: {
        namespace: "localhost",
        path: "test",
    },
    durations: {
        wholeRound: 40,
        placingBets: 30,
        lockingBet: 5,
        showResult: 9,
        resultAnimation: 4,
        beforeStartRound: 0,
    },
    notifyWinStreak: jest.fn(),
    playPlaceBetSound: jest.fn(),
    viewMode: ViewMode.full,
    setApiErrorMessage: jest.fn(),
    supportMD5: true,
    userStakeLevel: {
        minBet: 1,
        maxBet: 1000,
    },
    updateUserStakeLevel: jest.fn(),
    registerGlobalMessageEvent: jest.fn(),
    unsubscribeGlobalMessageEvent: jest.fn(),
    finishJoinGame: jest.fn(),
    isJoinedGame: false
} as any;


describe("KenoProMax", () => {
    it("renders without crashing", () => {
        render(<AuthContextProvider value={AuthContextValueDefault as any}>
            <SystemContextProvider value={SystemContextValue}>
                <GameContextProvider value={DefaultGameContext as any}>
                    <KenoProMax {...mockGatewayGameBaseProps} />
                </GameContextProvider>
            </SystemContextProvider>
        </AuthContextProvider>);
    });

    it("should have correct default result", () => {
        const component = new KenoProMax(mockGatewayGameBaseProps);
        expect(component.defaultResult).toEqual(Array(20).fill(0));
    });

    it("should have correct default tooltip messages", () => {
        const component = new KenoProMax(mockGatewayGameBaseProps);
        expect(component.tooltipMessageFollowChoiceProps).toEqual({
            big: "[811~1410]",
            small: "[210~810]",
            gold: "[210~695]",
            wood: "[696~763]",
            water: "[764~855]",
            fire: "[856~923]",
            earth: "[924~1410]",
        });
    });

    it("should return correct main options", () => {
        const component = new KenoProMax(mockGatewayGameBaseProps);
        expect(component.getMainOptions()).toEqual(["big", "small", "odd", "even"]);
    });

    it("should render fake result when no actual result exists", () => {
        const component = new KenoProMax(mockGatewayGameBaseProps);
        const fakeResult = component.getFakeResult();
        expect(fakeResult).toEqual([
            7, 9, 11, 15, 20, 22, 28, 30, 32, 34,
            37, 47, 49, 53, 64, 67, 68, 70, 78, 79
        ]);
    });

    it("should show start round animation in correct state", () => {
        const component = new KenoProMax(mockGatewayGameBaseProps);
        component.state = {
            ...component.state,
            gameState: GameState.BeforeStartRound,
        };
        expect(component.isShowStartRoundAnimation).toBeTruthy();
    });

    it("should have pool stake enabled", () => {
        const component = new KenoProMax(mockGatewayGameBaseProps);
        expect(component.isShowPoolStake).toBeTruthy();
    });

    it("should have correct winning animation duration", () => {
        const component = new KenoProMax(mockGatewayGameBaseProps);
        expect(component.winningAnimationWaitingTimeInSecond).toBe(9000);
    });
});