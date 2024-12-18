import React, { useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { isMobileOnly } from "react-device-detect";

import { GameCategoryType, GamesInOnePage, GetGameCategoryConfig } from "../../helpers/category-helper";
import styles from "./game-category.module.scss";
import { useAuthContext } from "../../contexts/auth";

const renderPagingCategory = (
    category: string,
    numOfPages: number,
    selectedCategory: GameCategoryType,
    selectedPage: number,
    onSelectPage: Function
) => {
    const result = [];

    for (let i = 0; i < numOfPages; i++) {
        result.push(
            <span
                onClick={() => onSelectPage(category, i + 1)}
                className={`${styles["category-page"]} ${GameCategoryType[category] === selectedCategory && selectedPage - 1 === i ? styles["selected"] : ""
                    }`}
                key={i}
            >
                {i + 1}
            </span>
        );
    }

    return result;
};

export const GameCategory: React.FC<{
    selectedCategory: GameCategoryType;
    selectedPage: number;
    selectCategoryPage: Function;
    favoriteGames: number[];
}> = ({ selectedCategory, selectCategoryPage, favoriteGames, selectedPage }) => {
    const { t } = useTranslation();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { currencyGroup } = useAuthContext();
    const gameCategoryConfigs = GetGameCategoryConfig(currencyGroup);
    const categoryPage = Object.keys(gameCategoryConfigs).reduce((result, category) => {
        const categoryLength = category !== "favorite" ? gameCategoryConfigs[category].length : favoriteGames.length;

        result[category] = Math.ceil(categoryLength / GamesInOnePage);

        return result;
    }, {});

    const appTypeClass = "MK";

    useEffect(() => {
        if (wrapperRef?.current) {
            wrapperRef.current.scrollLeft =
                Object.keys(gameCategoryConfigs).findIndex((cat) => cat === GameCategoryType[selectedCategory]) * 100 - 100;
        }
    }, [wrapperRef?.current, selectedCategory]);

    return (
        <div ref={wrapperRef} className={`${styles["category-container"]} ${isMobileOnly ? styles["mobile"] : ""}`}>
            <ul className={`${styles["category-list"]} ${styles[appTypeClass]}`}>
                {Object.keys(gameCategoryConfigs).map((categoryKey) => (
                    <li
                        data-testid={categoryKey}
                        className={`${styles["category-item"]} 
                            ${selectedCategory === GameCategoryType[categoryKey] ? styles["selected"] : ""}
                        `}
                        key={categoryKey}
                    >
                        <div className="d-flex">
                            <div className={styles["category-text"]} onClick={() => selectCategoryPage(categoryKey, 1, true)}>
                                {t(`category-${categoryKey}`)}
                            </div>
                            {categoryPage[categoryKey] > 1 && (
                                <div className={styles["paging-container"]}>
                                    {renderPagingCategory(
                                        categoryKey,
                                        categoryPage[categoryKey],
                                        selectedCategory,
                                        selectedPage,
                                        selectCategoryPage
                                    )}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
