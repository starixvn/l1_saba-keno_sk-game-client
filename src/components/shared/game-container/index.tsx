import React from "react";

import styles from "./game-container.module.scss";

const GameContainer = ({ children }) => {
    return <div className={styles["game-container"]}>{children}</div>;
};

export default GameContainer;
