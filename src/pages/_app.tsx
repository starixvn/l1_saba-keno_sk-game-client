import "../assets/errors.scss";
import "../assets/main.scss";

import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import App, { AppProps } from "next/app";
import Head from "next/head";

import { buildVersion, systemName, Themes } from "../common/constants";
import AnalyticTool from "../components/shared/tools/analytic-tool";

interface KenoSoccerAppProps extends AppProps {
    err: any;
}

class SabaMobiApp extends App<KenoSoccerAppProps> {
    render() {
        const { Component, pageProps, err } = this.props;

        return (
            <ThemeProvider defaultTheme={Themes.light}>
                <AppTilte />
                <Component {...pageProps} err={err} />
                <AnalyticTool />
            </ThemeProvider>
        );
    }
}

export const AppTilte = () => {
    return (
        <Head>
            <title>SABA Keno</title>
            <link rel="shortcut icon" href={`/favicon-${systemName}.ico?v=${buildVersion}`} />
        </Head>
    );
};

export default appWithTranslation(SabaMobiApp);
