import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

import { HistoryModal } from ".";
import { AuthContextProvider } from "../../../contexts/auth";
import { authContextValue, offerGames } from "../__test__/test-helper";

jest.mock("axios");
jest.mock("../../../common/constants", () => ({
    systemName: () => {
        "sk";
    },
}));
describe("HistoryModal", () => {
    test("should render correctly", async () => {
        // Act
        const { getByTestId, getAllByTestId } = render(
            <AuthContextProvider value={authContextValue}>
                <HistoryModal onCloseModal={jest.fn} offerGames={offerGames} />
            </AuthContextProvider>
        );
        fireEvent.click(getByTestId("icon-close"));

        // Assert

        await waitFor(() => expect(document.querySelector(".history-content")).toBeTruthy());
    });

    test.each`
        optionOrder | expectedResult
        ${0}        | ${"vipsedie:game_name"}
        ${1}        | ${"sedie:game_name"}
        ${2}        | ${"minisedie:game_name"}
        ${3}        | ${"bigsmall:game_name"}
        ${4}        | ${"txturbo:game_name"}
        ${5}        | ${"kenopromax:game_name"}
        ${6}        | ${"specialsedie:game_name"}
        ${7}        | ${"fishprawncrab:game_name"}
        ${8}        | ${"dragontiger:game_name"}
        ${9}        | ${"vipbaccarat:game_name"}
        ${10}       | ${"baccarat:game_name"}
        ${11}       | ${"threecards:game_name"}
        ${12}       | ${"kenosoccer:game_name"}
        ${13}       | ${"kenosoccer2:game_name"}
    `("render each Component History when selected game selector", async ({ optionOrder, expectedResult }) => {
        // Act
        const { getByTestId, getAllByTestId } = render(
            <AuthContextProvider value={authContextValue}>
                <HistoryModal onCloseModal={jest.fn} offerGames={offerGames} />
            </AuthContextProvider>
        );
        fireEvent.click(getByTestId("selected-item"));
        const dropdownGameName = getAllByTestId("dropdown-item");
        fireEvent.click(dropdownGameName[optionOrder]);

        // Assert
        await waitFor(() => {
            expect(getByTestId("selected-item")).toHaveTextContent(expectedResult);
        });
    });
});
