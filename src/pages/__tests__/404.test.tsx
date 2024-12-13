import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Custom404 from '../404';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

// Mock the required modules
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next-themes', () => ({
    useTheme: jest.fn(),
}));

jest.mock('next-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, params?: any) => {
            if (key === 'errorOccurred') {
                return `Error ${params.errorCode} occurred`;
            }
            return key;
        },
    }),
    Trans: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Custom404', () => {
    beforeEach(() => {
        // Setup default mocks
        (useRouter as jest.Mock).mockImplementation(() => ({
            isReady: true,
        }));

        (useTheme as jest.Mock).mockImplementation(() => ({
            theme: 'light',
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders error page immediately', () => {
        const { container } = render(<Custom404 />);
        expect(container.querySelector('.error-page')).toBeInTheDocument();
        expect(container.querySelector('.info')).toHaveTextContent('Error 404 occurred');
    });

    it('renders error page with correct theme image', async () => {
        (useTheme as jest.Mock).mockImplementation(() => ({
            theme: 'dark',
        }));

        render(<Custom404 />);

        await waitFor(() => {
            const image = screen.getByAltText('error');
            expect(image).toHaveAttribute('src', '/static/images/error-dark.svg');
        });
    });

    it('displays error message with correct error code', async () => {
        render(<Custom404 />);

        await waitFor(() => {
            const errorMessage = screen.getByText('Error 404 occurred');
            expect(errorMessage).toBeInTheDocument();
        });
    });
}); 