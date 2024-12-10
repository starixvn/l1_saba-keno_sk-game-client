import React, { useEffect, useState } from "react";
import { getAppSettings } from "../../../../common/app-settings";
import Script from "next/script";

const AnalyticTool = () => {
    const [shouldRender, setShouldRender] = useState(false);
    const analyticId = getAppSettings().analyticId;

    useEffect(() => {
        if (getAppSettings().enableAnalyticTool) {
            setShouldRender(true);
        }
    }, [analyticId]);

    return shouldRender ? (
        <Script data-project={analyticId} src="https://cdn.jsdelivr.net/gh/litlyx/litlyx-js/browser/litlyx.js"></Script>
    ) : (
        <></>
    );
};

export default AnalyticTool;
