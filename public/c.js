window.envConfig = {
    serverDomainMapper: {
        localhost: "lumigame.com",
        "10.5.10.17": "lumigame.com",
    },
    subSocketGatewayDomain: "l1-gw",
    proxy: {
        ssl: true,
        subDomain: "l1-proxy",
        path: "",
    },
    sentry: {
        dsn: "https://c8f93631be824a14b9f114f53e3a2bfc@sentry.lumigame.com/32",
        environment: "LOCAL_1",
    },
    enableSourceMap: true,
    subGuideDomain: "l1-guide",
    enableMsgpackParser: false,
    system: "L1",
    appType: 4,
};
