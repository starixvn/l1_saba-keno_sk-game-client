import { render, waitFor } from "@testing-library/react";
import React from "react";

import UMPage from "../../../src/components/um-page";

jest.mock("next/router", () => ({
    useRouter: () => {
        return {
            isReady: true,
        };
    },
}));

describe("UMPage", () => {
    test("renders UMPage component", async () => {
        const { getByAltText } = render(<UMPage locale="vi" />);

        await waitFor(() => getByAltText("UM"));
    });
});
