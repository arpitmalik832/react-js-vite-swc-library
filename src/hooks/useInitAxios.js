/**
 * Hook to initialize axios instances.
 * @file The file is saved as `useInitAxios.js`.
 */
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { updateApi1AxiosInstance } from '../redux/slices/apisSlice';
import { API1_TIMEOUT } from '../enums/app';
import {
  addRequestInterceptor,
  addResponseInterceptor,
} from '../utils/apiUtils';

/**
 * Custom hook to initialize axios instances with the provided API configuration.
 * @example
 *
 * import useInitAxios from './useInitAxios';
 *
 * function App() {
 *   useInitAxios();
 *   // other logic
 * }
 */
function useInitAxios() {
  const apis = useSelector(state => state.apis);
  const dispatch = useDispatch();

  useEffect(() => {
    if (apis.api1Host && apis.api1Headers) {
      const axiosInstance = axios.create({
        baseURL: apis.api1Host,
        timeout: API1_TIMEOUT,
        headers: {
          common: {
            ...apis.api1Headers,
          },
        },
      });

      addRequestInterceptor(axiosInstance);
      addResponseInterceptor(axiosInstance);

      dispatch(updateApi1AxiosInstance(axiosInstance));
    }
  }, [apis.api1Headers, apis.api1Host]);
}

export default useInitAxios;
