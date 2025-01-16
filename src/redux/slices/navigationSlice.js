/**
 * Contains the navigation slice.
 * @file This file is saved as `navigationSlice.js`.
 */
import { createSlice } from '@reduxjs/toolkit';
import { errorLog } from '../../utils/logsUtils';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    stack: [],
  },
  reducers: {
    pushStack: (state, action) => {
      if (!action.payload || typeof action.payload !== 'function') {
        return state;
      }
      state.stack.push(action.payload);
      return state;
    },
    popStack: state => {
      const top = state.stack.pop();
      if (top && typeof top === 'function') {
        try {
          top();
        } catch (error) {
          errorLog('Error executing callback:', error);
        }
      }
      return state;
    },
    clearStack: state => ({
      ...state,
      stack: [],
    }),
  },
});

export { navigationSlice };
export const { pushStack, popStack, clearStack } = navigationSlice.actions;
