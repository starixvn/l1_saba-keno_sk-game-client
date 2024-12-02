import React from "react";

import Styles from "./text-block.module.scss";

const TextBlock = ({ children }) => {
    return <div className={Styles["welcome"]}>{children}</div>;
};

export default TextBlock;
