import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const TimeOut = () => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { theme } = useTheme();

    if (!router.isReady) {
        return null;
    }

    return (
        <div className="error-page">
            <img alt="SessionTimeout" className="error-background" src={`/static/images/error-session-${theme}.svg`} />
            <p className="session-timeout-title">
                {t("sessionTimeout-1")} <br />
                {t("sessionTimeout-2")}
            </p>
        </div>
    );
};

export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
};

export default TimeOut;
