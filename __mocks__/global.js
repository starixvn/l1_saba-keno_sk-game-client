import React from "react";
// import '@testing-library/jest-dom/jest-globals';
// import "@testing-library/jest-dom";

const hasChildren = (node) => node && (node.children || (node.props && node.props.children));

const getChildren = (node) => (node && node.children ? node.children : node.props && node.props.children);
const renderNodes = (reactNodes) => {
    if (typeof reactNodes === "string") {
        return reactNodes;
    }

    return Object.keys(reactNodes).map((key, i) => {
        const child = reactNodes[key];
        const isElement = React.isValidElement(child);

        if (typeof child === "string") {
            return child;
        }
        if (hasChildren(child)) {
            const inner = renderNodes(getChildren(child));
            return React.cloneElement(child, { ...child.props, key: i }, inner);
        }
        if (typeof child === "object" && !isElement) {
            return Object.keys(child).reduce((str, childKey) => `${str}${child[childKey]}`, "");
        }

        return child;
    });
};

jest.mock("next-i18next", () => ({
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                t: (str) => str,
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    withTranslation: () => (Componenti18n) => {
        Componenti18n.defaultProps = { ...Componenti18n.defaultProps, t: () => "" };
        return Componenti18n;
    },
    Trans: ({ children }) => {
        return Array.isArray(children) ? renderNodes(children) : renderNodes([children]);
    },
}));

jest.mock("next/config", () => () => ({
    publicRuntimeConfig: {
        proxy: {
            ssl: false,
            uri: "localhost",
            path: "",
        },
        gameSettings:{
            "1501": {
                "id": 1501,
                "gameName": "MegaKeno",
                "serviceName": "mini-keno",
                "supportMD5": true,
                "socketInfo": {
                    "namespace": "megakeno",
                    "path": "minikeno"
                },
                "durations": {
                    "wholeRound": 59,
                    "placingBets": 45,
                    "lockingBet": 5,
                    "showResult": 10,
                    "resultAnimation": 7,
                    "beforeStartRound": 0
                }
            },
            "1502": {
                "id": 1502,
                "gameName": "MegaKeno2",
                "serviceName": "mini-keno",
                "supportMD5": true,
                "socketInfo": {
                    "namespace": "megakeno2",
                    "path": "minikeno"
                },
                "durations": {
                    "wholeRound": 44,
                    "placingBets": 30,
                    "lockingBet": 5,
                    "showResult": 10,
                    "resultAnimation": 7,
                    "beforeStartRound": 0
                }
            },
            "1503": {
                "id": 1503,
                "gameName": "KenoMini",
                "serviceName": "mini-keno",
                "supportMD5": true,
                "socketInfo": {
                    "namespace": "kenomini",
                    "path": "minikeno"
                },
                "durations": {
                    "wholeRound": 52,
                    "placingBets": 40,
                    "lockingBet": 5,
                    "showResult": 8,
                    "resultAnimation": 5,
                    "beforeStartRound": 0
                }
            },
            "1504": {
                "id": 1504,
                "gameName": "KenoMini2",
                "serviceName": "mini-keno",
                "supportMD5": true,
                "socketInfo": {
                    "namespace": "kenomini2",
                    "path": "minikeno"
                },
                "durations": {
                    "wholeRound": 42,
                    "placingBets": 30,
                    "lockingBet": 5,
                    "showResult": 8,
                    "resultAnimation": 5,
                    "beforeStartRound": 0
                }
            },
            "1505": {
                "id": 1505,
                "gameName": "KenoEast",
                "serviceName": "mini-keno",
                "supportMD5": true,
                "socketInfo": {
                    "namespace": "kenoeast",
                    "path": "minikeno"
                },
                "durations": {
                    "wholeRound": 44,
                    "placingBets": 30,
                    "lockingBet": 5,
                    "showResult": 10,
                    "resultAnimation": 7,
                    "beforeStartRound": 0
                }
            },
            "1506": {
                "id": 1506,
                "gameName": "KenoWest",
                "serviceName": "mini-keno",
                "supportMD5": true,
                "socketInfo": {
                    "namespace": "kenowest",
                    "path": "minikeno"
                },
                "durations": {
                    "wholeRound": 44,
                    "placingBets": 30,
                    "lockingBet": 5,
                    "showResult": 10,
                    "resultAnimation": 7,
                    "beforeStartRound": 0
                }
            },
            "1507": {
                "id": 1507,
                "gameName": "KenoSouth",
                "serviceName": "mini-keno",
                "supportMD5": true,
                "socketInfo": {
                    "namespace": "kenosouth",
                    "path": "minikeno"
                },
                "durations": {
                    "wholeRound": 44,
                    "placingBets": 30,
                    "lockingBet": 5,
                    "showResult": 10,
                    "resultAnimation": 7,
                    "beforeStartRound": 0
                }
            },
            "1508": {
                "id": 1508,
                "gameName": "KenoNorth",
                "serviceName": "mini-keno",
                "supportMD5": true,
                "socketInfo": {
                    "namespace": "kenonorth",
                    "path": "minikeno"
                },
                "durations": {
                    "wholeRound": 44,
                    "placingBets": 30,
                    "lockingBet": 5,
                    "showResult": 10,
                    "resultAnimation": 7,
                    "beforeStartRound": 0
                }
            },
            "1509": {
                "id": 1509,
                "gameName": "KenoPower",
                "socketInfo": {
                    "namespace": "kenopower",
                    "path": "kenopower"
                },
                "supportMD5": true,
                "durations": {
                    "wholeRound": 51,
                    "placingBets": 42,
                    "lockingBet": 5,
                    "showResult": 8,
                    "resultAnimation": 4,
                    "beforeStartRound": 0
                }
            },
            "1510": {
                "id": 1510,
                "gameName": "KenoPower2",
                "socketInfo": {
                    "namespace": "kenopower2",
                    "path": "kenopower"
                },
                "supportMD5": true,
                "durations": {
                    "wholeRound": 55,
                    "placingBets": 42,
                    "lockingBet": 5,
                    "showResult": 12,
                    "resultAnimation": 4,
                    "beforeStartRound": 0
                }
            },
            "1511": {
                "id": 1511,
                "gameName": "KenoSoccer",
                "socketInfo": {
                    "namespace": "kenosoccer",
                    "path": "kenosoccer"
                },
                "supportMD5": true,
                "durations": {
                    "wholeRound": 78,
                    "showFullTimeSettlementResult": 73,
                    "halfTimePlacingBets": 69,
                    "halfTimeLockingBet": 39,
                    "showHalfTimeResult": 34,
                    "showHalfTimeSettlementResult": 30,
                    "beforeStartFullTimePlacingBet": 26,
                    "fullTimePlacingBets": 25,
                    "fullTimeLockingBet": 5,
                    "showFullTimeResult": 0,
                    "showResult": 6,
                    "halfTimeDuration": 35,
                    "fullTimeDuration": 25,
                    "resultAnimation": 8,
                    "settlementWinning": 6
                }
            },
            "1512": {
                "id": 1512,
                "gameName": "KenoSoccer2",
                "socketInfo": {
                    "namespace": "kenosoccer2",
                    "path": "kenosoccer"
                },
                "supportMD5": true,
                "durations": {
                    "wholeRound": 86,
                    "showFullTimeSettlementResult": 81,
                    "halfTimePlacingBets": 73,
                    "halfTimeLockingBet": 43,
                    "showHalfTimeResult": 38,
                    "showHalfTimeSettlementResult": 34,
                    "beforeStartFullTimePlacingBet": 26,
                    "fullTimePlacingBets": 25,
                    "fullTimeLockingBet": 5,
                    "showFullTimeResult": 0,
                    "showResult": 6,
                    "halfTimeDuration": 35,
                    "fullTimeDuration": 25,
                    "resultAnimation": 8,
                    "settlementWinning": 6
                }
            }
        },
        guideUrl: "https://l1-guide.lumigame.com",
        appType: 1,
        system: "sk",
    },
}));

const localStorageMock = (() => {
    return {
        getItem: () => "{}",
        setItem: () => {},
        clear: () => {},
        removeItem: () => {},
    };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
