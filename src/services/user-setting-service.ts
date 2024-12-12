import { SSOResponse } from "sc-user-service-client/dist/auth";
import { UserClientCommunication } from "./user-client-communication";
import { Themes } from "../common/constants";

const userClientInstance = UserClientCommunication?.getUserClientInstance();
const userSettingsService = userClientInstance?.userSettings;
const chipSettings = userClientInstance?.setting;

export const updateThemeSetting = async (userSession: SSOResponse, theme = Themes.light) => {
    return userSettingsService.updateUserThemeSetting(userSession.ss, userSession.username, theme);
};

export const updateSignInSMStatus = async (userSession: SSOResponse) => {
    return userSettingsService.updateSignInSMStatus(userSession.ss, userSession.username);
};

export const getChipSettings = async (userSession: SSOResponse, offeredGameIds: number[]) => {
    const gameSettings = await chipSettings?.getGameSettingsByCurrencyGroup(userSession.ss, userSession.username, offeredGameIds);
    const chipColors = (await chipSettings?.getSettings(userSession.ss, userSession.username))?.chips;
    return { chipColors, ...gameSettings };
};
