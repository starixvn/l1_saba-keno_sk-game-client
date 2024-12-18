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
        <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${analyticId}`}></Script>
            <Script
                dangerouslySetInnerHTML={{
                    __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${analyticId}', {
                            page_path: window.location.pathname,
                            });
                        `,
                }}
            />
        </>
    ) : (
        <></>
    );
};

export default AnalyticTool;
