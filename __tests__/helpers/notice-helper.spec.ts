import { GetLocalizedErrorMessage } from "../../src/helpers/notice-helper";

jest.mock("../../src/common/constants/error-code-dictionary", () => ({
    __esModule: true,
    default: {
        "ERROR_001": "errorCode1",
        "ERROR_002": "errorCode2",
        "ERROR_003": "errorCode3",
    },
    CommonErrorCodeList: ["errorCode1", "errorCode2"],
}));

describe("GetLocalizedErrorMessage", () => {
    it("returns the correct message for a valid error code without placing a bet", () => {
        const result = GetLocalizedErrorMessage("ERROR_001");
        expect(result).toBe("messages:errorCode1");
    });

    it("returns the correct message for a valid error code while placing a bet", () => {
        const result = GetLocalizedErrorMessage("ERROR_001", true);
        expect(result).toBe("messages:errorCode1PlaceBet");
    });

    it("returns the correct message for another valid error code without placing a bet", () => {
        const result = GetLocalizedErrorMessage("ERROR_002");
        expect(result).toBe("messages:errorCode2");
    });

    it("returns the correct message for another valid error code while placing a bet", () => {
        const result = GetLocalizedErrorMessage("ERROR_002", true);
        expect(result).toBe("messages:errorCode2PlaceBet");
    });

    it("returns the correct message for an invalid error code", () => {
        const result = GetLocalizedErrorMessage("INVALID_ERROR_CODE");
        expect(result).toBe("messages:errorOccurred");
    });

    it("returns the correct message for an error code that is not common", () => {
        const result = GetLocalizedErrorMessage("ERROR_003");
        expect(result).toBe("messages:errorCode3");
    });

    it("returns the correct message for an error code that is not common while placing a bet", () => {
        const result = GetLocalizedErrorMessage("ERROR_003", true);
        expect(result).toBe("messages:errorCode3");
    });
}); 