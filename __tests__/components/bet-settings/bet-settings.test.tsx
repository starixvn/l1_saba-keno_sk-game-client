import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSystemContext } from "../../../src/contexts/system";
import { User } from "sc-user-service-client/dist/auth";
import BetSettings from "../../../src/components/bet-settings/index";
import { UserInfo } from "../../../src/components/user-info";


jest.mock("../../../src/contexts/system", () => ({
    useSystemContext: jest.fn(),
}));

jest.mock("../../../src/components/bet-settings/chip-slider", () => {
    return {
        ChipSlider: jest.fn(({ updateBetValue }) => (
            <button onClick={() => updateBetValue(10)}>Mocked ChipSlider</button>
        )),
    };
});

jest.mock("../../../src/components/user-info", () => {
    return {
        UserInfo: jest.fn(({ user }) => <div>{user.name}</div>),
    };
});

jest.mock("../../../src/components/bet-settings/chip-slider/chip-image", () => {
    return {
        ChipImage: jest.fn(({ color }) => <div style={{ backgroundColor: color }}>Mocked ChipImage</div>),
    };
});

jest.mock("react-device-detect", () => ({
    isMobileOnly: true,
    isIOS: false,
}));

const mockUser: User = {
    UID: 1,
    avatarId: 1,
    currency: "USD",
    name: "testUser",
    red: 0,
    settings: {
        quickBet: true,
        theme: "light",
    },
    isSignedInSM: true,
    offerGames: [],
    enabledGameIds: [1, 2, 3],
    availSpins: 10,
    scoins: 100,
    fractionalOddsFormat: true,
    isDisplayPlayerCurrency: true,
    currencyGroup: "group1",
};

const mockUpdateBetValue = jest.fn();
const mockToggleSlidingChip = jest.fn();
const mockToggleAnnouncementModal = jest.fn();

const defaultProps = {
    updateBetValue: mockUpdateBetValue,
    user: mockUser,
    toggleSlidingChip: mockToggleSlidingChip,
    isShowSlidingChip: false,
    toggleAnnouncementModal: mockToggleAnnouncementModal,
    isNewPromotion: false,
    isShowToolbarGuide: false,
};

describe("BetSettings Component", () => {
    beforeEach(() => {
        (useSystemContext as jest.Mock).mockReturnValue({
            chipSettings: { chipColors: [{ value: 1, color: "red", text: "Red" }] },
            betValue: 1,
        });
    });

    it("renders without crashing", () => {
        render(<BetSettings {...defaultProps} />);
        expect(screen.getByText("Mocked ChipSlider")).toBeInTheDocument();
    });

    it("calls updateBetValue when ChipSlider button is clicked", () => {
        render(<BetSettings {...defaultProps} />);
        fireEvent.click(screen.getByText("Mocked ChipSlider"));
        expect(mockUpdateBetValue).toHaveBeenCalledWith(10);
    });

    // it("toggles announcement modal when promotion image is clicked", () => {
    //     render(<BetSettings {...defaultProps} isNewPromotion={true} />);
    //     fireEvent.click(screen.getByTestId("promotion"));
    //     expect(mockToggleAnnouncementModal).toHaveBeenCalled();
    // });

    it("toggles sliding chip when chip container is clicked", () => {
        render(<BetSettings {...defaultProps} />);
        fireEvent.click(screen.getByTestId("chip-container"));
        expect(mockToggleSlidingChip).toHaveBeenCalled();
    });
});