import '@testing-library/jest-dom/jest-globals';
import "@testing-library/jest-dom";

import { jest } from '@jest/globals';

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        route: '/',
        pathname: '/',
        query: {},
        asPath: '/',
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
    })),
}));
