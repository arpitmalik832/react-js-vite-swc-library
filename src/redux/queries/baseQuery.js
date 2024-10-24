/**
 * Base query for making get requests.
 * @file This file is saved as `baseQuery.js`.
 */
import useApiRequest from '../../hooks/useApiRequest';

const baseQuery =
  () =>
  async ({ axiosInstance, url }) => {
    const { makeGetCall } = useApiRequest();
    try {
      const response = makeGetCall({
        axiosInstance,
        url,
      });
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export default baseQuery;
