/**
 * Base query for making get requests.
 * @file This file is saved as `baseQuery.js`.
 */
import useApiRequest from '../../hooks/useApiRequest';

const baseQueryFn =
  () =>
  async ({ axiosInstance, url }) => {
    const { makeGetCall } = useApiRequest();
    try {
      const response = makeGetCall(url, axiosInstance);
      return { data: response };
    } catch (err) {
      return { error: err };
    }
  };

export default baseQueryFn;
