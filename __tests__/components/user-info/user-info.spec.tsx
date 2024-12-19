import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";
import * as rdd from "react-device-detect";

import { UserInfo } from "../../../src/components/user-info";

describe('ModalContext', () => {
    test("load user info", () => {
        // arrange
        const user = {
            UID: 1,
            avatarId: 1,
            currency: "USD",
            name: "abc",
            red: 2000,
            settings: { theme: "light" },
            isSignedInSM: true,
            offerGames: [22, 2, 9, 1, 4, 8],
            isDisplayPlayerCurrency: true,
        } as any;

        // act
        const { getByTestId } = render(<UserInfo user={user} />);

        // assert
        expect(getByTestId("user-name")).toHaveTextContent("abc");
    });

    [null, undefined].forEach((red) => {
        test(`when red of user is ${red}, should 0 with player currency`, () => {
            // arrange
            const user = {
                UID: 1,
                avatarId: 1,
                currency: "USD",
                name: "abc",
                red,
                settings: { theme: "light" },
                isSignedInSM: true,
                offerGames: [22, 2, 9, 1, 4, 8],
                isDisplayPlayerCurrency: true,
            } as any;

            // act
            const { getByTestId } = render(<UserInfo user={user} />);

            // assert
            expect(getByTestId("balance")).toHaveTextContent("0 USD");
        });

        test(`don't show player currency, should 0 as default`, () => {
            // arrange
            const user = {
                UID: 1,
                avatarId: 1,
                currency: "USD",
                name: "abc",
                red,
                settings: { theme: "light" },
                isSignedInSM: true,
                offerGames: [22, 2, 9, 1, 4, 8],
                isDisplayPlayerCurrency: false,
            } as any;

            // act
            const { getByTestId } = render(<UserInfo user={user} />);

            // assert
            expect(getByTestId("balance")).toHaveTextContent("0");
        });
    });

    [0, 173, 1000].forEach((avatarId) => {
        test("when avatarId invalid, should render default avatar", () => {
            // arrange
            const user = {
                UID: 1,
                avatarId,
                currency: "USD",
                name: "abc",
                red: 2000,
                settings: { theme: "light" },
                isSignedInSM: true,
                offerGames: [22, 2, 9, 1, 4, 8],
                isDisplayPlayerCurrency: true,
            } as any;

            // act
            const { getByTestId } = render(<UserInfo user={user} />);

            // assert
            expect(getByTestId("icon-user")).toBeTruthy();
        });
    });

    test.each`
        isMobile | isIOS    | className
        ${true}  | ${true}  | ${".ios-device"}
        ${true}  | ${false} | ${".android-device"}
        ${false} | ${false} | ${".user"}
    `("should render class follow devices", ({ isMobile, isIOS, className }) => {
        // Arrange
        const user = {
            UID: 1,
            avatarId: 1,
            currency: "USD",
            name: "abc",
            red: 2000,
            settings: { theme: "light" },
            isSignedInSM: true,
            offerGames: [22, 2, 9, 1, 4, 8],
        } as any;
        // @ts-ignore
        rdd.isIOS = isIOS;
        // @ts-ignore
        rdd.isMobileOnly = isMobile;

        // Act
        render(<UserInfo user={user} />);

        // Assert
        expect(document.querySelector(className)).toBeTruthy();
    });

});
