// import '@testing-library/jest-dom';
import { fireEvent, render } from "@testing-library/react";
import React from "react";

import ProfilePicture from "../../../src/components/profile-picture";

describe("Profile picture", () => {
    it("should render default when invalid avatarId", () => {
        const { getAllByTestId } = render(<ProfilePicture avatarId={0} />);

        expect(getAllByTestId("default-avatar").length).toEqual(1);
    });

    it("should render correct avatar when avatarId is valid", () => {
        const { getByAltText } = render(<ProfilePicture avatarId={1} />);

        expect(getByAltText("Avatar")).toBeInTheDocument();
    });

    it("should render edit icon  when editable", () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<ProfilePicture avatarId={1} isEditable onClick={onClick} />);

        fireEvent.click(getByTestId("profile-picture"));

        expect(getByTestId("edit-icon")).toBeInTheDocument();
        expect(onClick).toHaveBeenCalled();
    });
});
