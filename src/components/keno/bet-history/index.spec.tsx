import { render } from "@testing-library/react";
import React from "react";

import { authContextValue } from "../__tests__/test-helper";
import KenoMatchBetHistory from "./";
import { AuthContextProvider } from "../../../contexts/auth";

describe("KenoSoccer BetHistory", () => {
    test("should render correctly", () => {
        // Arrange
        const resource = {
            gameId: 36,
            isRefund: false,
            renderResultDetail: null,
            closeModal: null,
            renderBetLogsDetail: null,
            nameHeaderOnTable: ["roundTime", "round", "totalStake", "onlyRefund", "win"],
        };

        // Act
        const { getByTestId } = render(
            <AuthContextProvider value={authContextValue}>
                <KenoMatchBetHistory {...resource}></KenoMatchBetHistory>
            </AuthContextProvider>
        );

        // Assert
        expect(getByTestId("bet-history-loading")).toBeInTheDocument();
    });
});
