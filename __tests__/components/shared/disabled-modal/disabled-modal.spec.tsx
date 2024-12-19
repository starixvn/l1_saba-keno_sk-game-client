import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";

import DisabledModal from "../../../../src/components/shared/disabled-modal";
import { ViewMode } from "../../../../src/components/shared/game-base/type";

test("should render correctly", () => {
    // arrange
    const disableMessage = "Game was disabled";

    // act
    const { getByTestId } = render(<DisabledModal disabledMessage={disableMessage} viewMode={ViewMode.full} />);

    // assert
    expect(getByTestId("disable-message")).toHaveTextContent(disableMessage);
});

test("when view mode js collapse, should add class collapse to disabled-modal", () => {
    // arrange
    const disableMessage = "Game was disabled";

    // act
    const { getByTestId } = render(<DisabledModal disabledMessage={disableMessage} viewMode={ViewMode.collapse} />);

    // assert
    expect(getByTestId("disabled-modal")).toHaveClass("collapse");
});
