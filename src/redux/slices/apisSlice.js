/**
 * Contains the apis slice.
 * @file This file is saved as `apisSlice.js`.
 */
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../../enums/redux';

const apisSlice = createSlice({
  name: SLICE_NAMES.APIS,
  initialState: [],
  reducers: {
    addNewApiData: (state, action) => [...state, action.payload],
    updateApiHostByValue: (state, action) => {
      const newState = state;
      const oldApi = action.payload.oldValue;

      const item = newState.find(i => i.host === oldApi);
      if (item) {
        const index = newState.indexOf(item);
        if (index !== -1) {
          newState[index] = {
            ...item,
            host: action.payload.newValue,
          };
        }
      }
      return newState;
    },
    updateApiHostByIndex: (state, action) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.length) {
        newState[index] = {
          ...newState[index],
          host: action.payload.newValue,
        };
      }
      return newState;
    },
    updateApiHeadersByHost: (state, action) => {
      const newState = state;
      const { host } = action.payload;

      const item = newState.find(i => i.host === host);
      if (item) {
        const index = newState.indexOf(item);
        if (index !== -1) {
          newState[index] = {
            ...item,
            headers: action.payload.newHeaders,
          };
        }
      }
      return newState;
    },
    updateApiHeadersByIndex: (state, action) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.length) {
        newState[index] = {
          ...state[index],
          headers: action.payload.newHeaders,
        };
      }
      return newState;
    },
    addToApiHeadersByHost: (state, action) => {
      const newState = state;
      const { host } = action.payload;

      const item = newState.find(i => i.host === host);
      if (item) {
        const index = newState.indexOf(item);
        if (index !== -1) {
          newState[index] = {
            ...item,
            headers: {
              ...item.headers,
              [action.payload.newHeader.key]: action.payload.newHeader.value,
            },
          };
        }
      }
      return state;
    },
    addToApiHeadersByIndex: (state, action) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= state.length) {
        newState[index] = {
          ...newState[index],
          headers: {
            ...newState[index].headers,
            [action.payload.newHeader.key]: action.payload.newHeader.value,
          },
        };
      }
      return state;
    },
    updateApiAxiosInstanceByHost: (state, action) => {
      const newState = state;
      const { host } = action.payload;

      const item = newState.find(i => i.host === host);
      if (item) {
        const index = newState.indexOf(item);
        if (index !== -1) {
          newState[index] = {
            ...item,
            axiosInstance: action.payload.axiosInstance,
          };
        }
      }
      return newState;
    },
    updateApiAxiosInstanceByIndex: (state, action) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.length) {
        newState[index] = {
          ...newState[index],
          axiosInstance: action.payload.axiosInstance,
        };
      }
      return newState;
    },
  },
});

export { apisSlice };
export const {
  updateApi1Host,
  updateApi1Headers,
  addToApi1Headers,
  updateApi1AxiosInstance,
} = apisSlice.actions;
