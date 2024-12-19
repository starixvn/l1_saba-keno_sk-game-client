import { render } from "@testing-library/react";
import React from "react";
import FirstLoginContainer from "../../../../src/components/dashboard/container";
import '@testing-library/jest-dom';

jest.mock('react-device-detect', () => ({
    isMobileOnly: true,
}));

jest.mock('../../../../src/common/constants', () => ({
    buildVersion: '1.0.0',
}));

describe('FirstLoginContainer', () => {
    const children = <div data-testid="children">Hello World!</div>;

    it('renders with correct class names', () => {
        const { getByTestId } = render(<FirstLoginContainer dataTestid="container" >{children}</FirstLoginContainer>);
        expect(getByTestId('container')).toHaveClass('wrapper');
    });

    it('renders logo image with correct source', () => {
        const { getByAltText } = render(<FirstLoginContainer >{children}</FirstLoginContainer>);
        expect(getByAltText('logo')).toHaveAttribute('src', '/static/images/logo-saba-keno.svg?v=1.0.0');
    });

    it('renders children correctly', () => {
        const { getByTestId } = render(<FirstLoginContainer>{children}</FirstLoginContainer>);
        expect(getByTestId('children')).toBeInTheDocument();
    });

    it('renders with correct class names when isMobileOnly is true', () => {
        jest.mock('react-device-detect', () => ({
            isMobileOnly: true,
        }));
        const { getByTestId } = render(<FirstLoginContainer dataTestid="container">{children}</FirstLoginContainer>);
        expect(getByTestId('container')).toHaveClass('wrapper mobile');
    });

    it('renders with correct class names when isMobileOnly is false', () => {
        jest.mock('react-device-detect', () => ({
            isMobileOnly: false,
        }));
        const { getByTestId } = render(<FirstLoginContainer dataTestid="container" >{children}</FirstLoginContainer>);
        expect(getByTestId('container')).toHaveClass('wrapper');
    });
});
