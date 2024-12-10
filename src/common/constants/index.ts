import { getAppSettings } from "../app-settings";

export const systemName = getAppSettings().system.toLocaleLowerCase();

export const locales = { en: "en", vi: "vi", th: "th", id: "id", zh_cn: "zh_cn", zh_tw: "zh_tw" };

export const languageMapper = { "en-US": "en", "vi-VN": "vi", "th-TH": "th", "id-ID": "id", "zh-CN": "zh_cn", "zh-TW": "zh_tw" };

export const LanguageLocaleMapper = {
    en: "en-US",
    vi: "vi-VN",
    th: "th-TH",
    id: "id-ID",
    zh_cn: "zh-CN",
    zh_tw: "zh-TW",
};

export const languageNameMapper = { en: "English", vi: "Tiếng Việt" };

export const Themes = {
    light: "light",
};

export const sabaMobileName = "Saba.mobi";
export const sabaClubName = "Saba.games";
export const vGamingMobileName = "Vgaming Mobi";
export const vGamingName = "Vgaming";

export const sabaKenoName = "Saba Keno";

export const buildVersion = process.env.buildVersion;
export const AppTypes = {
    mobile: 2,
    megaKeno: 4,
};
export const maximumAvatarId = 172;
