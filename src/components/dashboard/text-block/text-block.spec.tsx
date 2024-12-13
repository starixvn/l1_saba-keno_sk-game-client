import React from 'react';
import { render } from '@testing-library/react';
import TextBlock from './index';

describe('TextBlock', () => {
    it('renders without crashing', () => {
        render(<TextBlock>Test Content</TextBlock>);
    });

    it('renders children correctly', () => {
        const testContent = 'Test Content';
        const { getByText } = render(<TextBlock>{testContent}</TextBlock>);
        expect(getByText(testContent)).toBeInTheDocument();
    });

    it('applies the correct CSS class', () => {
        const { container } = render(<TextBlock>Test Content</TextBlock>);
        const divElement = container.firstChild as HTMLElement;
        expect(divElement).toHaveClass('welcome');
    });
});