/**
 * Contains constants for Service Worker.
 * @file This file is saved as `sw.js`.
 */
const SW_URL = `/sw.js`;

const LOGS = {
  SUCCESS: 'Service Worker registered successfully',
  SW_READY: 'This web-app is being served cache-first by a service.',
  REGISTRATION_ERROR: 'Error during service worker registration ->',
  NO_INTERNET: 'No internet connection found. App is running in offline mode.',
};

export { SW_URL, LOGS };
