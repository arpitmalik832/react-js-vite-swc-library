/**
 * Unit tests for appSlice.
 * @file This file is saved as `appSlice.test.js`.
 */
import {
  appSlice,
  updateStore,
  setDarkTheme,
  setLightTheme,
} from '../appSlice';
import { THEME } from '../../../enums/app';

describe('appSlice reducers', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      theme: THEME.LIGHT,
    };
  });

  it('should handle initial state', () => {
    expect(appSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      theme: THEME.LIGHT,
    });
  });

  describe('updateStore', () => {
    it('should handle updating existing key', () => {
      const action = {
        key: 'theme',
        value: THEME.DARK,
      };

      const actual = appSlice.reducer(initialState, updateStore(action));
      expect(actual.theme).toBe(THEME.DARK);
    });

    it('should handle adding new key-value pair', () => {
      const action = {
        key: 'newKey',
        value: 'newValue',
      };

      const actual = appSlice.reducer(initialState, updateStore(action));
      expect(actual.newKey).toBe('newValue');
      expect(actual.theme).toBe(THEME.LIGHT); // Original state preserved
    });

    it('should handle updating with null value', () => {
      const action = {
        key: 'theme',
        value: null,
      };

      const actual = appSlice.reducer(initialState, updateStore(action));
      expect(actual).toEqual(initialState);
    });

    it('should handle updating with undefined value', () => {
      const action = {
        key: 'theme',
        value: undefined,
      };

      const actual = appSlice.reducer(initialState, updateStore(action));
      expect(actual).toEqual(initialState);
    });
  });

  describe('theme actions', () => {
    it('should handle setDarkTheme', () => {
      const actual = appSlice.reducer(initialState, setDarkTheme());
      expect(actual.theme).toBe(THEME.DARK);
    });

    it('should handle setLightTheme', () => {
      // Start with dark theme
      const darkState = {
        theme: THEME.DARK,
      };

      const actual = appSlice.reducer(darkState, setLightTheme());
      expect(actual.theme).toBe(THEME.LIGHT);
    });

    it('should preserve other state properties when changing theme', () => {
      // State with additional properties
      const stateWithExtra = {
        theme: THEME.LIGHT,
        someOtherProp: 'value',
      };

      const actualDark = appSlice.reducer(stateWithExtra, setDarkTheme());
      expect(actualDark.theme).toBe(THEME.DARK);
      expect(actualDark.someOtherProp).toBe('value');

      const actualLight = appSlice.reducer(stateWithExtra, setLightTheme());
      expect(actualLight.theme).toBe(THEME.LIGHT);
      expect(actualLight.someOtherProp).toBe('value');
    });
  });

  describe('error cases', () => {
    it('should handle updateStore with missing key', () => {
      const action = {
        value: 'someValue',
      };

      const actual = appSlice.reducer(initialState, updateStore(action));
      expect(actual).toEqual(initialState);
    });

    it('should handle updateStore with missing value', () => {
      const action = {
        key: 'theme',
      };

      const actual = appSlice.reducer(initialState, updateStore(action));
      expect(actual).toEqual(initialState);
    });

    it('should handle updateStore with invalid action payload', () => {
      const actual = appSlice.reducer(initialState, updateStore(null));
      expect(actual).toEqual(initialState);
    });

    it('should handle theme changes with invalid state', () => {
      const invalidState = null;

      const actualDark = appSlice.reducer(invalidState, setDarkTheme());
      expect(actualDark).toEqual({ theme: THEME.DARK });

      const actualLight = appSlice.reducer(invalidState, setLightTheme());
      expect(actualLight).toEqual({ theme: THEME.LIGHT });
    });
  });

  describe('state immutability', () => {
    it('should not mutate original state on updateStore', () => {
      const originalState = { ...initialState };
      const action = {
        key: 'theme',
        value: THEME.DARK,
      };

      appSlice.reducer(initialState, updateStore(action));
      expect(initialState).toEqual(originalState);
    });

    it('should not mutate original state on theme changes', () => {
      const originalState = { ...initialState };

      appSlice.reducer(initialState, setDarkTheme());
      expect(initialState).toEqual(originalState);

      appSlice.reducer(initialState, setLightTheme());
      expect(initialState).toEqual(originalState);
    });
  });

  describe('action creators', () => {
    it('should create updateStore action', () => {
      const action = {
        key: 'theme',
        value: THEME.DARK,
      };

      expect(updateStore(action)).toEqual({
        type: 'app/updateStore',
        payload: action,
      });
    });

    it('should create setDarkTheme action', () => {
      expect(setDarkTheme()).toEqual({
        type: 'app/setDarkTheme',
      });
    });

    it('should create setLightTheme action', () => {
      expect(setLightTheme()).toEqual({
        type: 'app/setLightTheme',
      });
    });
  });
});
