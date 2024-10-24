/**
 * This file contains utility functions to handle API requests.
 * @file This file is saved as `apiUtils.js`.
 */
import { log, errorLog } from './logsUtils';

/**
 * Handles the API request and returns the response data.
 * @param {Promise} request - The API request promise.
 * @returns {Promise} - A promise that resolves to the response data.
 * @example
 * handleRequest(axios.get('/api/data'))
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
function handleRequest(request) {
  return request
    .then(
      res => res.data, // Successful response
    )
    .catch(error => {
      if (error.response) {
        // Axios API Error Response
      } else if (error.message || error.config) {
        // Network Error Case
      }

      if (error.message === 'canceled') {
        // Handle cancellation gracefully
      } else if (error.response) {
        // Request was made and server responded with an error status
        // Handle different HTTP error statuses (4xx, 5xx) as needed
      } else if (error.request) {
        // Request was made but no response was received
        // Handle network-related errors
      } else {
        // Something else happened
        // Handle unexpected errors
      }
      throw error; // Rethrow the error for further handling
    });
}

/**
 * Adds a request interceptor to the provided Axios instance.
 * @param {object} axiosInstance - The Axios instance to add the interceptor to.
 * @example
 * addRequestInterceptor(axiosInstance);
 */
function addRequestInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use(
    request => {
      log('Starting request -> ', request);
      const newRequest = { ...request };
      newRequest.metadata = { startTime: new Date() };
      return newRequest;
    },
    error => {
      errorLog('Request returned with error -> ', error);
      throw error;
    },
  );
}

/**
 * Adds a response interceptor to the provided Axios instance.
 * @param {object} axiosInstance - The Axios instance to add the interceptor to.
 * @example
 * addResponseInterceptor(axiosInstance);
 */
function addResponseInterceptor(axiosInstance) {
  axiosInstance.interceptors.response.use(
    response => {
      log('Returning response -> ', response);
      const newResponse = { ...response };
      newResponse.config.metadata.endTime = new Date();
      newResponse.responseTime =
        newResponse.config.metadata.endTime -
        newResponse.config.metadata.startTime;
      return newResponse;
    },
    error => {
      const newError = { ...error };
      newError.config.metadata.endTime = new Date();
      newError.responseTime =
        newError.config.metadata.endTime - newError.config.metadata.startTime;
      errorLog('Response returned with error -> ', newError);
      throw newError;
    },
  );
}

export { handleRequest, addRequestInterceptor, addResponseInterceptor };
