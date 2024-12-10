import React, { useEffect, useState } from "react";
import { getAppSettings } from "../../../../common/app-settings";

const AnalyticTool = () => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (getAppSettings().enableAnalyticTool) {
            setShouldRender(true);
        }
    }, []);

    return shouldRender ? (
        <script
            defer
            data-project={getAppSettings().analyticId}
            src="https://cdn.jsdelivr.net/gh/litlyx/litlyx-js/browser/litlyx.js"
        ></script>
    ) : (
        <div id="no-script"></div>
    );
};

export default AnalyticTool;
