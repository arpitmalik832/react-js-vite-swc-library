/**
 * Unit test for apiUtils.
 * @file This file is saved as `apiUtils.test.js`.
 */
import '@testing-library/jest-dom';

import {
  addRequestInterceptor,
  addResponseInterceptor,
  handleRequest,
} from '../apiUtils';
import { log } from '../logsUtils';

jest.mock('../commonUtils', () => ({
  __esModule: true,
  log: jest.fn(),
  errorLog: jest.fn(),
}));

describe('apiUtils unit test', () => {
  it('test function with proper response', async () => {
    const mockData = { data: 'test data' };

    const request = Promise.resolve({ data: mockData });
    const result = await handleRequest(request);

    expect(result).toEqual(mockData);
  });

  it('should handle Axios API error response', async () => {
    const mockError = {
      response: {
        status: 404,
        data: 'Not Found',
      },
    };

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('should handle Network Error Case', async () => {
    const mockError = {
      message: 'Not Found',
      request: {
        url: 'https://example.com/',
      },
    };

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('should handle Network Error Case', async () => {
    const mockError = {
      config: {
        mock: 'Not Found',
      },
    };

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('should handle canceled request Case', async () => {
    const mockError = { message: 'canceled' };

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('should handle Network Error Case', async () => {
    const mockError = {};

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('test addRequestInterceptor', () => {
    const axiosInstance = {
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
    };

    addRequestInterceptor(axiosInstance);

    axiosInstance.interceptors.request.use.mock.calls[0][0]({
      metadata: {
        startTime: 1,
      },
    });
    try {
      axiosInstance.interceptors.request.use.mock.calls[0][1]({
        metadata: {
          startTime: 1,
        },
      });
    } catch (r) {
      log(r);
    }
  });

  it('test addResponseInterceptor', () => {
    const axiosInstance = {
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    };

    addResponseInterceptor(axiosInstance);

    axiosInstance.interceptors.response.use.mock.calls[0][0]({
      config: {
        metadata: {
          startTime: 1,
        },
      },
    });
    try {
      axiosInstance.interceptors.response.use.mock.calls[0][1]({
        config: {
          metadata: {
            startTime: 1,
          },
        },
      });
    } catch (r) {
      log(r);
    }
  });
});
