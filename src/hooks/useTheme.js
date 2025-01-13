/**
 * This hook manages the theme of the application.
 * @file The file is saved as `useTheme.js`.
 */
import { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDarkTheme, setLightTheme } from '../redux/slices/appSlice';
import preferredColorScheme from '../utils/eventListeners/preferredColorScheme';
import { THEME } from '../enums/app';

/**
 * Custom hook to manage the application's theme.
 * @example
 *
 * import useTheme from './useTheme';
 *
 * function App() {
 *   useTheme();
 *   // other logic
 * }
 */
function useTheme() {
  const theme = useSelector(state => state.app.theme);
  const dispatch = useDispatch();

  const updateStore = useCallback(isDark => {
    if (isDark) {
      if (theme !== THEME.DARK) {
        dispatch(setDarkTheme());
      }
    } else if (theme !== THEME.LIGHT) {
      dispatch(setLightTheme());
    }
  }, []);

  useLayoutEffect(() => {
    preferredColorScheme.subscribe(e => {
      updateStore(e.matches);
    });

    return () => {
      preferredColorScheme.unSubscribe();
    };
  }, []);
}

export default useTheme;
