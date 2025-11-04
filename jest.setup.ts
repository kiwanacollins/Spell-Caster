/**
 * Jest Setup File
 *
 * This file is run before each test suite.
 * Use it to configure global test utilities, mocks, and setup.
 */

import '@testing-library/jest-dom';

// Mock environment variables for tests
process.env.MONGODB_URI = 'mongodb://localhost:27017/spell-caster-test';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

// Suppress console errors/warnings in tests (optional, can be removed for debugging)
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Warning: useLayoutEffect') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Warning: useLayoutEffect'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Global test timeout
jest.setTimeout(10000);
