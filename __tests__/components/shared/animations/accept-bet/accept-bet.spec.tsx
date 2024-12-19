import { render } from "@testing-library/react";
import React from "react";

import AcceptBet from "../../../../../src/components/shared/animations/accept-bet";

describe("AcceptBet", () => {
    test("renders AcceptBet component", () => {
        const props = { amount: 1000 };

        const { getByText } = render(<AcceptBet {...props} />);

        expect(getByText("-1,000")).toBeInTheDocument();
    });
});
