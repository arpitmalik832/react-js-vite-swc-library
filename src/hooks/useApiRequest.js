/**
 * This file contains hooks for making API requests.
 * @file It is saved as `useApiRequest.js`.
 */
import { handleRequest } from '../utils/apiUtils';

/**
 * Custom hook for making API requests with support for aborting requests.
 * @returns {object} An object containing methods for making GET, POST, PUT, DELETE requests and canceling them.
 * @example
 * const { makeGetCall, cancelRequest } = useApiRequest();
 * makeGetCall({ axiosInstance, url: '/api/data' });
 */
function useApiRequest() {
  let abortControllers = {};

  /**
   * Creates an AbortController for the given key if it doesn't already exist.
   * @param {string} key - The key to identify the AbortController.
   * @returns {AbortController} The AbortController instance.
   * @example
   * const controller = createAbortController('requestKey');
   */
  function createAbortController(key) {
    if (!abortControllers[key]) {
      abortControllers[key] = new AbortController();
    }

    return abortControllers[key];
  }

  /**
   * Makes a GET request using the provided axios instance.
   * @param {string} url - The URL for the GET request.
   * @param {import('axios').AxiosInstance} axiosInstance - The axios instance to use for the request.
   * @param {import('axios').AxiosRequestConfig} [config] - Optional configuration for the request.
   * @returns {Promise} A promise that resolves to the response of the GET request.
   * @example
   * const response = await makeGetCall({ axiosInstance, url: '/api/data' });
   */
  function makeGetCall(url, axiosInstance, config) {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest(
      axiosInstance.get(url, {
        ...config,
        signal,
      }),
    );
  }

  /**
   * Makes a POST request using the provided axios instance.
   * @param {string} url - The URL for the POST request.
   * @param {object} body - The body of the POST request.
   * @param {import('axios').AxiosInstance} axiosInstance - The axios instance to use for the request.
   * @param {import('axios').AxiosRequestConfig} [config] - Optional configuration for the request.
   * @returns {Promise} A promise that resolves to the response of the POST request.
   * @example
   * const response = await makePostCall({ axiosInstance, url: '/api/data', body: { key: 'value' } });
   */
  function makePostCall(url, body, axiosInstance, config) {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest(
      axiosInstance.post(url, body, {
        ...config,
        signal,
      }),
    );
  }

  /**
   * Makes a PUT request using the provided axios instance.
   * @param {string} url - The URL for the PUT request.
   * @param {object} body - The body of the PUT request.
   * @param {import('axios').AxiosInstance} axiosInstance - The axios instance to use for the request.
   * @param {import('axios').AxiosRequestConfig} [config] - Optional configuration for the request.
   * @returns {Promise} A promise that resolves to the response of the PUT request.
   * @example
   * const response = await makePutCall({ axiosInstance, url: '/api/data', body: { key: 'value' } });
   */
  function makePutCall(url, body, axiosInstance, config) {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest(
      axiosInstance.put(url, body, {
        ...config,
        signal,
      }),
    );
  }

  /**
   * Makes a DELETE request using the provided axios instance.
   * @param {string} url - The URL for the DELETE request.
   * @param {object} axiosInstance - The axios instance to use for the request.
   * @param {object} [config] - Optional configuration for the request.
   * @returns {Promise} A promise that resolves to the response of the DELETE request.
   * @example
   * const response = await makeDeleteCall({ axiosInstance, url: '/api/data' });
   */
  function makeDeleteCall(url, axiosInstance, config) {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest(
      axiosInstance.delete(url, {
        ...config,
        signal,
      }),
    );
  }

  /**
   * Cancels the request associated with the given key.
   * @param {string} key - The key to identify the request to cancel.
   * @example
   * cancelRequest('requestKey');
   */
  function cancelRequest(key) {
    if (abortControllers[JSON.stringify(key)]) {
      abortControllers[JSON.stringify(key)].abort();
      delete abortControllers[JSON.stringify(key)];
    }
  }

  /**
   * Cancels all ongoing requests.
   * @example
   * cancelAllRequests();
   */
  function cancelAllRequests() {
    Object.keys(abortControllers).forEach(key => {
      abortControllers[key].abort();
    });
    abortControllers = {};
  }

  return {
    makeGetCall,
    makePostCall,
    makePutCall,
    makeDeleteCall,
    cancelRequest,
    cancelAllRequests,
  };
}

export default useApiRequest;
