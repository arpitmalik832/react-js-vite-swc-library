/**
 * Unit tests for SWRegistration service.
 * @file This file is saved as `SWRegistration.test.js`.
 */
import '@testing-library/jest-dom';

import SWRegistration from '../SWRegistration';
import { isLocalhost } from '../../utils/commonUtils';
import fetchMock from '../../__tests__/__mocks__/fetchMock';
import { ENVS } from '../../enums/app';

jest.mock('../../enums/sw', () => ({
  __esModule: true,
  SW_URL: `/sw.js`,
  LOGS: {
    SUCCESS: 'Service Worker registered successfully',
    SW_READY: 'This web-app is being served cache-first by a service.',
    REGISTRATION_ERROR: 'Error during service worker registration ->',
    NO_INTERNET:
      'No internet connection found. App is running in offline mode.',
  },
}));

jest.mock('../../utils/commonUtils', () => ({
  __esModule: true,
  log: jest.fn(),
  errorLog: jest.fn(),
  isLocalhost: jest.fn(),
}));

jest.mock('../../utils/eventListeners/load', () => ({
  __esModule: true,
  default: {
    subscribe: e => e(),
    unSubscribe: jest.fn(),
  },
}));

describe('SWRegistration unit tests', () => {
  const originalNodeEnv = process.env.APP_ENV;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.APP_ENV = originalNodeEnv;
  });

  it('SWRegistration functions test', () => {
    process.env.APP_ENV = ENVS.PROD;
    SWRegistration.register();
    SWRegistration.unregister();
  });

  it('SWRegistration functions test', () => {
    process.env.APP_ENV = ENVS.PROD;
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: jest.fn(() => Promise.resolve('xyz')),
        ready: Promise.resolve({
          unregister: jest.fn(),
        }),
      },
      editable: true,
      configurable: true,
    });

    SWRegistration.register();
    SWRegistration.unregister();
  });

  it('SWRegistration functions test with rejecting ready state', async () => {
    process.env.APP_ENV = ENVS.PROD;
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: jest.fn(() => Promise.resolve('xyz')),
        ready: Promise.reject(new Error('test')),
      },
      editable: true,
      configurable: true,
    });

    SWRegistration.register();
    SWRegistration.unregister();
  });

  it('SWRegistration functions test in case of localhost', () => {
    process.env.APP_ENV = ENVS.PROD;
    delete window.location;
    window.location = {
      hostname: 'localhost',
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
    };
    window.fetch = fetchMock({
      headers: {
        get: () => 'text/javascript',
      },
    });
    isLocalhost.mockImplementation(() => true);
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: jest.fn(() => Promise.reject(new Error('xyz'))),
        ready: Promise.resolve('test'),
      },
      editable: true,
      configurable: true,
    });

    SWRegistration.register();
  });

  it('SWRegistration functions test in case of localhost when fetch is throwing error', () => {
    process.env.APP_ENV = ENVS.PROD;
    delete window.location;
    window.location = {
      hostname: 'localhost',
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
    };
    window.fetch = fetchMock(
      {
        headers: {
          get: () => 'text/javascript',
        },
      },
      true,
    );
    isLocalhost.mockImplementation(() => true);
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: jest.fn(() => Promise.reject(new Error('xyz'))),
        ready: Promise.resolve('test'),
      },
      editable: true,
      configurable: true,
    });

    SWRegistration.register();
  });

  it('SWRegistration functions test in case of localhost when service worker is not loaded', () => {
    process.env.APP_ENV = ENVS.PROD;
    delete window.location;
    window.location = {
      hostname: 'localhost',
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
      reload: jest.fn(),
    };
    window.fetch = fetchMock({
      headers: {
        get: () => 'text/json',
      },
    });
    isLocalhost.mockImplementation(() => true);
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: jest.fn(() => Promise.reject(new Error('xyz'))),
        ready: Promise.resolve({
          unregister: () => Promise.resolve(true),
        }),
      },
      editable: true,
      configurable: true,
    });

    SWRegistration.register();
  });

  it('SWRegistration functions test in case of localhost with different origin', () => {
    process.env.APP_ENV = ENVS.PROD;
    delete window.location;
    window.location = {
      hostname: 'localhost',
      href: 'http://localhost:3000',
      origin: 'http://example.com',
    };
    window.fetch = fetchMock({
      headers: {
        get: () => 'text/javascript',
      },
    });
    isLocalhost.mockImplementation(() => true);
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: jest.fn(() => Promise.reject(new Error('xyz'))),
        ready: Promise.resolve('test'),
      },
      editable: true,
      configurable: true,
    });

    SWRegistration.register();
  });
});
