import { render } from "@testing-library/react";
import ResultDetail from "./index";
import { useTranslation } from "next-i18next";
import '@testing-library/jest-dom';

jest.mock("next-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe("ResultDetail Component", () => {
    const mockCloseModal = jest.fn();
    const { t } = useTranslation(["bethistory", "gameName"]);

    it("renders without crashing when resultDetail is provided", () => {
        const resultDetail = {
            bet: {
                result: {
                    blue: [3, 6, 8, 13, 14, 15, 18, 19, 26, 27, 32, 39, 43, 46, 49, 54, 59, 60, 75, 78],
                    red: [1, 4, 14, 16, 22, 24, 29, 30, 32, 38, 39, 45, 52, 53, 54, 59, 69, 73, 76, 79],
                },
                settlementResult: {
                    big: false,
                    blue: false,
                    blueBig: false,
                    blueSmall: true,
                    even: false,
                    odd: true,
                    red: true,
                    redBig: false,
                    redSmall: true,
                    small: true,
                    tie: false,
                },
            },
            roundId: 33820,
        };
        const { getByTestId } = render(
            ResultDetail(resultDetail, t, mockCloseModal, "testGame", 1)
        );

        expect(getByTestId("result-details")).toBeInTheDocument();
    });

    it("renders empty when resultDetail is not provided", () => {
        const { container } = render(
            ResultDetail(null, t, mockCloseModal, "testGame", 1)
        );

        expect(container).toBeEmptyDOMElement();
    });
}); 