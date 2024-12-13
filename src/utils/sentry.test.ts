import * as Sentry from "@sentry/nextjs";
import { setUser, setCharacterName } from "./sentry";

// Mock Sentry methods
jest.mock("@sentry/nextjs", () => ({
    configureScope: jest.fn((callback) => callback({ setUser: jest.fn(), setTag: jest.fn() })),
}));

describe("Sentry Utility Functions", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("setUser should configure Sentry scope with user", () => {
        const user = { id: "123", email: "test@example.com" };
        setUser(user);

        // Wait for the timeout to complete
        jest.advanceTimersByTime(5000);

        expect(Sentry.configureScope).toHaveBeenCalledWith(expect.any(Function));
        const scopeCallback = Sentry.configureScope["mock"].calls[0][0];
        const scope = { setUser: jest.fn() };
        scopeCallback(scope);
        expect(scope.setUser).toHaveBeenCalledWith(user);
    });

    test("setCharacterName should set character name tag", () => {
        const name = "Hero";
        setCharacterName(name);

        expect(Sentry.configureScope).toHaveBeenCalledWith(expect.any(Function));
        const scopeCallback = Sentry.configureScope["mock"].calls[0][0];
        const scope = { setTag: jest.fn() };
        scopeCallback(scope);
        expect(scope.setTag).toHaveBeenCalledWith("character-name", name);
    });
}); 