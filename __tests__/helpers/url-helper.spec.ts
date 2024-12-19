import { buildUrl, getRootDomain, extractDomainFromHostName, buildGameGuideUrl, buildServerUrl, buildUrlWithPath } from "../../src/helpers/url-helper";
import { getAppSettings } from "../../src/common/app-settings";

// Mock the app-settings module
jest.mock("../../src/common/app-settings", () => ({
    getAppSettings: jest.fn(),
}));

describe("url-helper", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Default mock implementation
        (getAppSettings as jest.Mock).mockReturnValue({
            proxy: {
                ssl: true,
                subDomain: "test",
            },
            serverDomainMapper: {
                "test.example.com": "example.com"
            },
            subGuideDomain: "guide"
        });

        // Mock window.location
        Object.defineProperty(window, "location", {
            value: {
                hostname: "test.example.com"
            },
            writable: true
        });
    });

    describe("buildUrl", () => {
        test("should build URL with default parameters", () => {
            const result = buildUrl();
            expect(result).toBe("https://test.example.com/");
        });

        test("should build URL with custom subdomain and path", () => {
            const result = buildUrl("custom", "/path");
            expect(result).toBe("https://custom.example.com/path");
        });

        test("should build URL with empty subdomain", () => {
            const result = buildUrl("");
            expect(result).toBe("https://example.com/");
        });

        test("should use http when ssl is false", () => {
            (getAppSettings as jest.Mock).mockReturnValue({
                proxy: { ssl: false, subDomain: "test" }
            });
            const result = buildUrl();
            expect(result).toBe("http://test.example.com/");
        });
    });

    describe("getRootDomain", () => {
        test("should return domain when available", () => {
            const result = getRootDomain();
            expect(result).toBe("example.com");
        });

        test("should extract domain when no mapping exists", () => {
            (getAppSettings as jest.Mock).mockReturnValue({
                proxy: { ssl: true, subDomain: "test" },
                serverDomainMapper: {}
            });
            const result = getRootDomain();
            expect(result).toBe("example.com");
        });

        test("should return empty string when window is undefined", () => {
            // @ts-ignore
            delete window.location;
            const result = getRootDomain();
            expect(result).toBe("");
        });
    });

    describe("extractDomainFromHostName", () => {
        test("should extract domain correctly", () => {
            const result = extractDomainFromHostName("sub.example.com");
            expect(result).toBe("example.com");
        });

        test("should handle domain with multiple subdomains", () => {
            const result = extractDomainFromHostName("a.b.example.com");
            expect(result).toBe("example.com");
        });
    });

    describe("buildGameGuideUrl", () => {
        test("should build game guide URL", () => {
            const result = buildGameGuideUrl();
            expect(result).toBe("https://guide.example.com");
        });
    });

    describe("buildServerUrl", () => {
        test("should build server URL with path", () => {
            const result = buildServerUrl("profile");
            expect(result).toBe("https://test.example.com/user/profile");
        });
    });

    describe("buildUrlWithPath", () => {
        test("should build URL with custom path", () => {
            const result = buildUrlWithPath("/custom/path");
            expect(result).toBe("https://test.example.com/custom/path");
        });
    });
});