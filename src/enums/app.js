/**
 * Contains constants for App.
 * @file This file is saved as `app.js`.
 */
const ENVS = {
  DEV: 'development',
  STG: 'staging',
  BETA: 'beta',
  PROD: 'production',
};

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

const DEPRECATION_MSG_FOR_REMOVAL =
  'will be deprecated in the next patch release. Please use your own hook for the same.';

const BACK_CLICK = {
  SUCCESS: 'Back button clicked!!!',
  ERROR: 'error while navigating back',
};

const APP_UNMOUNT = '😬 app closed!!';

const API1_TIMEOUT = 15000;

export {
  ENVS,
  THEME,
  API1_TIMEOUT,
  DEPRECATION_MSG_FOR_REMOVAL,
  BACK_CLICK,
  APP_UNMOUNT,
};
