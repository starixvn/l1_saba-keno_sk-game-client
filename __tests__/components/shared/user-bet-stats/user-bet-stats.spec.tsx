import { render } from "@testing-library/react";
import React from "react";

import UserBetStats from "../../../../src/components/shared/user-bet-stats";

describe("UserBetStats", () => {
    test.each`
        value        | expectResult
        ${10}        | ${`10%`}
        ${0}         | ${`0%`}
        ${undefined} | ${`0%`}
        ${null}      | ${`0%`}
    `("should render UserBetStats component", ({ value, expectResult }) => {
        // Act
        render(<UserBetStats value={value} />);

        // Assert
        const numberElement = document.querySelector(".number");
        expect(numberElement?.textContent).toBe(expectResult);
    });
});
