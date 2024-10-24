/**
 * Contains the navigation slice.
 * @file This file is saved as `navigationSlice.js`.
 */
import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    stack: [],
  },
  reducers: {
    pushStack: (state, action) => {
      state.stack.push(action.payload);
      return state;
    },
    popStack: state => {
      state.stack.pop()();
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
