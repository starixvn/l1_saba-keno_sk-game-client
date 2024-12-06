import * as appSettings from "../common/app-settings";
import * as urlHelper from "./url-helper";

describe("Test UrlHelper", () => {
    Object.defineProperty(window, "location", {
        value: { hostname: "www.unittest.com" },
        writable: true,
    });

    const getAppSettingsMock = jest.spyOn(appSettings, "getAppSettings");
    getAppSettingsMock.mockReturnValue({
        socketGatewayPath: "gws",
        proxy: {
            ssl: "true",
            subDomain: "proxy",
            path: "",
        },
        sentry: {
            dsn: "https://c8f93631be824a14b9f114f53e3a2bfc@sentry.lumigame.com/3",
            environment: "LOCAL_1",
        },
        subGuideDomain: "guides",
        enableMsgpackParser: false,
        system: "L1",
        appType: 2,
        googleAnalyticId: "G-X1Q507KDPB",
        serverDomainMapper: [""],
        gameSettings: {},
        subPromotionDomain: "guides",
    });

    describe("Test function getDomainFromHostName", () => {
        test.each`
            hostName              | expectedDomain
            ${"www.lumigame.com"} | ${"lumigame.com"}
            ${"www.sabagame.com"} | ${"sabagame.com"}
            ${"sabagame.com"}     | ${"sabagame.com"}
            ${"www.gamesaba.com"} | ${"gamesaba.com"}
            ${"gamesaba.com"}     | ${"gamesaba.com"}
            ${"www.v-gaming.net"} | ${"v-gaming.net"}
            ${"v-gaming.net"}     | ${"v-gaming.net"}
            ${"vgaming.win"}      | ${"vgaming.win"}
            ${"www.vgaming.win"}  | ${"vgaming.win"}
            ${"w2.vgaming.win"}   | ${"vgaming.win"}
        `("should return domain", ({ hostName, expectedDomain }) => {
            // Arrange
            const actual = urlHelper.extractDomainFromHostName(hostName);

            // Assert
            expect(actual).toEqual(expectedDomain);
        });
    });

    describe("Test function buildGameGuideUrl", () => {
        test("should return guide url", () => {
            //Arrange
            const expected = "https://guides.unittest.com";
            // Act
            const actual = urlHelper.buildGameGuideUrl();
            // Assert

            expect(actual).toEqual(expected);
        });
    });

    describe("Test function buildUrl", () => {
        test("should return url", () => {
            //Arrange
            const expected = `https://proxy.unittest.com/`;
            // Act
            const actual = urlHelper.buildUrl();
            // Assert

            expect(actual).toEqual(expected);
        });

        test("should return url with path", () => {
            //Arrange
            const expected = `https://proxy.unittest.com/path`;
            // Act
            const actual = urlHelper.buildUrl("proxy", "/path");
            // Assert

            expect(actual).toEqual(expected);
        });
    });

    describe("Test function buildSocketGatewayUrl", () => {
        test("should return Socket Gateway Url", () => {
            //Arrange
            const expected = "https://gws.unittest.com";
            // Act
            const actual = urlHelper.buildSocketGatewayUrl();

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe("Test function buildServerUrl", () => {
        test("should return Server Url", () => {
            //Arrange
            const expected = "https://proxy.unittest.com/user/keno";
            // Act
            const actual = urlHelper.buildServerUrl("keno");

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});
