import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { isIOS, isMobileOnly } from "react-device-detect";
import { io, Socket } from "socket.io-client";
import useSound from "use-sound";
import MsgpackParser from "socket.io-msgpack-parser";
import { getAppSettings } from "../../common/app-settings";
import { SocketState } from "../../types";
import { FavoriteGuide } from "../favorite-guide";
import { GameCategory } from "../game-category";
import { GameCategoryType, GamesInOnePage, GetGameCategoryConfig, favoriteGameIdIgnore } from "../../helpers/category-helper";
import { ViewMode } from "../shared/game-base/type";
import { WinningStreak } from "../winning-streak";
import { WinningStreakItem } from "../winning-streak/winning-streak.type";

import styles from "./games.module.scss";
import KenoMatch from "./keno-match";
import KenoPower from "./keno-power";

import MiniKeno from "./mini-keno";
import { KenoMatchProps } from "../games/keno-match/type";
import { Props } from "./type";
import messageTransmitter from "../../helpers/message-transmitter";
import { AppTypes } from "../../common/constants";
import { buildSocketGatewayUrl } from "../../helpers/url-helper";
import { useAuthContext } from "../../contexts/auth";

let gamesOrder = [];
const getRenderGames = (
    currencyGroup: string,
    selectedCategory: GameCategoryType,
    selectedPage: number,
    favoriteGames: number[],
    userOfferGames: number[]
) => {
    const gameCategoryConfig = GetGameCategoryConfig(currencyGroup);
    const gamesInCategory =
        selectedCategory !== GameCategoryType.favorite ? gameCategoryConfig[GameCategoryType[selectedCategory]] : favoriteGames;
    const favoriteGamesInCategory = favoriteGames.filter((gameId) => gamesInCategory.includes(gameId));
    const unfavoriteGamesInCategory = gamesInCategory.filter((gameId) => !favoriteGames.includes(gameId));

    gamesOrder = favoriteGamesInCategory.concat(unfavoriteGamesInCategory);
    const startIndex = gamesOrder.length > (selectedPage - 1) * GamesInOnePage ? (selectedPage - 1) * GamesInOnePage : 0;

    return gamesOrder.filter((game) => userOfferGames.includes(game)).slice(startIndex, startIndex + GamesInOnePage);
};

const getCategoryByGameId = (gameId: number, currencyGroup: string) => {
    const categories = GetGameCategoryConfig(currencyGroup);
    return Object.keys(categories).find((category) => categories[category].includes(gameId)) ?? getDefaultCategory();
};

const getDefaultCategory = () => {
    return getAppSettings().appType === AppTypes.mobile ? "hot" : "megakeno";
};

const getCategoryByQueryGameId = (gameId: number, currencyGroup: string) => {
    const categories = GetGameCategoryConfig(currencyGroup);
    return Object.keys(categories).find((category) => category !== "hot" && categories[category].includes(gameId)) ?? getDefaultCategory();
};

const getCategoryHashTag = (category: string, pageIndex: number) => {
    return pageIndex > 1 ? `${category}_${pageIndex - 1}` : category;
};

const GlobalMessageTransmitter = messageTransmitter();

const registerGlobalMessageEvent = (messageKey: string, handler: Function) => {
    GlobalMessageTransmitter.register(messageKey, handler);
};

const unsubscribeGlobalMessageEvent = (listenerId: string) => {
    GlobalMessageTransmitter.unsubscribe(listenerId);
};

export const Games: React.FC<Props> = ({
    enabledWinningStreakNotification,
    enabledPlaySound,
    setApiErrorMessage,
    userStakeLevel,
    updateUserStakeLevel,
    favoriteGames,
    queryGame,
    userOfferGames,
    isShowSlidingChip,
    isJoinGame,
    updateQueryGames,
    openGameId,
}) => {
    const { currencyGroup } = useAuthContext();
    const [playPlaceBetSound] = useSound("./static/sounds/place-bet.mp3");
    const urlHashtag = window.location.hash.replace("#", "").split("_");
    const queryCategory = isJoinGame
        ? getCategoryByQueryGameId(queryGame, currencyGroup)
        : urlHashtag[0] || getCategoryByGameId(queryGame, currencyGroup);
    const [selectedCategory, setSelectedCategory] = useState<GameCategoryType>(GameCategoryType[queryCategory]);
    const [selectedPage, setSelectedPage] = useState(+urlHashtag[1] + 1 || 1);
    const winningStreakRef = useRef(null);
    const { theme } = useTheme();
    location.hash = `#${getCategoryHashTag(queryCategory, selectedPage)}`;
    const socketGatewayRef = useRef<Socket>(null);
    const [socketState, setSocketState] = useState<SocketState>(SocketState.None);
    const [isJoinedGame, setIsJoinedGame] = useState(false);

    const renderListGames = () => {
        const renderGames = getRenderGames(
            currencyGroup,
            selectedCategory,
            selectedPage,
            favoriteGames.filter((game) => !favoriteGameIdIgnore.includes(game)),
            userOfferGames
        );

        return renderGames.length === 0 && selectedCategory === GameCategoryType.favorite ? (
            <FavoriteGuide />
        ) : (
            renderGames.map((gameId, index) => getGameComponentById(gameId, index))
        );
    };

    const getGameComponentById = (gameId: number, index: number) => {
        const { gameSettings } = getAppSettings();
        let viewMode = isMobileOnly && index !== 0 ? ViewMode.collapse : ViewMode.full;
        if (openGameId && isMobileOnly) {
            viewMode = gameId === openGameId ? ViewMode.full : ViewMode.collapse;
        }

        const gameProps = {
            ...gameSettings[gameId],
            viewMode,
            notifyWinStreak: (winningStreak: WinningStreakItem) =>
                enabledWinningStreakNotification && winningStreakRef?.current && winningStreakRef.current.addWinningStreak(winningStreak),
            playPlaceBetSound: () => enabledPlaySound && playPlaceBetSound(),
            setApiErrorMessage: setApiErrorMessage,
            theme,
            userStakeLevel,
            updateUserStakeLevel,
            socketGateway: socketGatewayRef.current,
            socketGatewayState: socketState,
            retryConnectSocket: connectSocket,
            registerGlobalMessageEvent: registerGlobalMessageEvent,
            unsubscribeGlobalMessageEvent: unsubscribeGlobalMessageEvent,
            finishJoinGame: () => setIsJoinedGame(true),
            isJoinedGame: isJoinedGame,
        };

        switch (gameId) {
            case 36:
            case 37:
                return <KenoMatch key={`game-${gameId}`} {...(gameProps as KenoMatchProps)} />;
            case 40:
            case 41:
                return <KenoPower key={`game-${gameId}`} {...gameProps}></KenoPower>;
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 52:
            case 53:
                return <MiniKeno key={`game-${gameId}`} {...gameProps}></MiniKeno>;
            default:
                return null;
        }
    };

    const selectCategoryPage = (category: string, pageIndex: number, isClearOpenGame = false) => {
        updateQueryGames(NaN, false, isClearOpenGame);
        setSelectedCategory(GameCategoryType[category]);
        setSelectedPage(pageIndex);
        history.pushState(null, "", `#${getCategoryHashTag(category, pageIndex)}`);
    };

    const connectSocket = () => {
        const { enableMsgpackParser } = getAppSettings();
        const socketGatewayUrl = buildSocketGatewayUrl();
        const socket = io(socketGatewayUrl, {
            forceNew: true,
            transports: ["websocket"],
            upgrade: false,
            parser: enableMsgpackParser ? MsgpackParser : undefined,
        });

        socket.on("connect", () => {
            setSocketState(SocketState.Connected);
        });
        socket.on("connect_error", () => {
            setSocketState(SocketState.Error);
        });
        socket.on("disconnect", (reason) => {
            setSocketState(SocketState.Disconnected);
            console.log(reason);
        });

        socket.on("message", (message) => {
            GlobalMessageTransmitter.broadcast(message);
        });

        socketGatewayRef.current = socket;
    };

    useEffect(() => {
        setIsJoinedGame(false);
    }, [openGameId, isJoinGame]);

    useEffect(() => {
        connectSocket();

        return () => {
            socketGatewayRef.current.close();
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        selectCategoryPage(queryCategory, 1);
    }, [queryGame]);

    return (
        <div
            className={`game-container ${!isMobileOnly ? "game-wrapper" : "game-wapper-mobile"} ${isShowSlidingChip ? styles["open-chips"] : styles["close-chips"]
                }`}
        >
            {enabledWinningStreakNotification && <WinningStreak ref={winningStreakRef}></WinningStreak>}
            <GameCategory
                favoriteGames={favoriteGames}
                selectedPage={selectedPage}
                selectCategoryPage={selectCategoryPage}
                selectedCategory={selectedCategory}
            />
            <div className={`${styles["game-list"]} ${isMobileOnly ? styles[isIOS ? "ios-device" : "android-device"] : ""}`}>
                {renderListGames()}
            </div>
        </div>
    );
};

export default Games;
