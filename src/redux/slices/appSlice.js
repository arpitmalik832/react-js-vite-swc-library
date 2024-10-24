/**
 * Contains the app slice.
 * @file This file is saved as `appSlice.js`.
 */
import { createSlice } from '@reduxjs/toolkit';

import { THEME } from '../../enums/app';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: THEME.LIGHT,
  },
  reducers: {
    updateStore: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    setDarkTheme: state => ({
      ...state,
      theme: THEME.DARK,
    }),
    setLightTheme: state => ({
      ...state,
      theme: THEME.LIGHT,
    }),
  },
});

export { appSlice };
export const { updateStore, setDarkTheme, setLightTheme } = appSlice.actions;
