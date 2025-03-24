window.envConfig = {
    socketGatewayPath: "gateway",
    proxy: {
        ssl: true,
        subDomain: "gnuatproxy-k8s",
        path: "/uat",
    },
    sentry: {
        dsn: "https://a21d7cab68b44eb09600df23903e3d3f@scsentry.sgamesuat.com/302",
        environment: "UAT",
    },
    enableSourceMap: false,
    subGuideDomain: "skuatguides",
    analyticId: "",
    enableMsgpackParser: true,
    system: "SK",
    appType: 1,
};
