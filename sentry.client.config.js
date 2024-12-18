import * as Sentry from "@sentry/nextjs";

if (window.envConfig) {
    Sentry.init({ ...window.envConfig.sentry, ignoreErrors: ["Network Error"] });
}
