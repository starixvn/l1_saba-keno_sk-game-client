import { sso, verifySession, clearSession, reCheckIn, createNickname, authorize, getBalance, getSettingGames } from "../../src/services/auth-service";
import { UserClientCommunication } from "../../src/services/user-client-communication";
import { SSOResponse } from "sc-user-service-client/dist/auth";
import { getLocalStorageItem, storeLocalStorageItem, removeLocalStorageItem } from "../../src/common/local-storage";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

jest.mock("../../src/services/user-client-communication");
jest.mock("../../src/common/local-storage");
jest.mock("@fingerprintjs/fingerprintjs");

jest.mock("../../src/services/user-client-communication", () => ({
    UserClientCommunication: {
        getUserClientInstance: jest.fn().mockReturnValue({
            auth: {
                sso: jest.fn(),
                verifySession: jest.fn(),
                reCheckIn: jest.fn(),
                signName: jest.fn(),
                authorize: jest.fn(),
                getBalance: jest.fn(),
                getSettingGames: jest.fn(),
            },
        }),
    },
}));

const mockUserSession: SSOResponse = {
    ss: "session-string",
    username: "testUser",
    isAuthenticated: true,
    isUM: false,
    umInfo: { startTime: new Date(), endTime: new Date(), operatorId: "123" },
    language: "en",
    memberName: "testMember",
    system: 1,
};

describe("Auth Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully log in and track player", async () => {
        (UserClientCommunication.getUserClientInstance()?.auth.sso as jest.Mock).mockResolvedValue(mockUserSession);
        (FingerprintJS.load as jest.Mock).mockResolvedValue({
            get: jest.fn().mockResolvedValue({ visitorId: "visitor-id" }),
        });

        await sso("token", 1);

        expect(storeLocalStorageItem).toHaveBeenCalledWith("localhost.auth-data.1", mockUserSession);
        expect(removeLocalStorageItem).toHaveBeenCalledWith("localhost.is_tournament_popup_auto_opened.1");
    });

    it("should not track player if not authenticated", async () => {
        const unauthenticatedSession = { ...mockUserSession, isAuthenticated: false };
        (UserClientCommunication.getUserClientInstance()?.auth.sso as jest.Mock).mockResolvedValue(unauthenticatedSession);

        await sso("token", 1);

        expect(storeLocalStorageItem).not.toHaveBeenCalled();
        expect(removeLocalStorageItem).not.toHaveBeenCalled();
    });

    it("should verify session successfully", async () => {
        (getLocalStorageItem as jest.Mock).mockReturnValue(mockUserSession);
        (UserClientCommunication.getUserClientInstance()?.auth.verifySession as jest.Mock).mockResolvedValue({ isSuccessful: true });

        const result = await verifySession();

        expect(result).toEqual(mockUserSession);
        expect(storeLocalStorageItem).toHaveBeenCalledWith("localhost.auth-data.1", mockUserSession);
    });

    it("should return null if no session is found", async () => {
        (getLocalStorageItem as jest.Mock).mockReturnValue(null);

        const result = await verifySession();

        expect(result).toBeNull();
    });

    it("should clear session", () => {
        clearSession();
        expect(removeLocalStorageItem).toHaveBeenCalledWith("localhost.auth-data.1");
    });

    it("should re-check in successfully", async () => {
        (UserClientCommunication.getUserClientInstance()?.auth.reCheckIn as jest.Mock).mockResolvedValue(true);

        const result = await reCheckIn(mockUserSession);

        expect(result).toBe(true);
    });

    it("should create nickname successfully", async () => {
        (UserClientCommunication.getUserClientInstance()?.auth.signName as jest.Mock).mockResolvedValue(true);

        const result = await createNickname(mockUserSession, "nickname", 1);

        expect(result).toBe(true);
    });

    it("should authorize successfully", async () => {
        (UserClientCommunication.getUserClientInstance()?.auth.authorize as jest.Mock).mockResolvedValue(true);

        const result = await authorize(mockUserSession);

        expect(result).toBe(true);
    });

    it("should get balance successfully", async () => {
        (UserClientCommunication.getUserClientInstance()?.auth.getBalance as jest.Mock).mockResolvedValue(100);

        const result = await getBalance(mockUserSession);

        expect(result).toBe(100);
    });

    it("should get setting games successfully", async () => {
        (UserClientCommunication.getUserClientInstance()?.auth.getSettingGames as jest.Mock).mockResolvedValue([]);

        const result = await getSettingGames(mockUserSession);

        expect(result).toEqual([]);
    });
});