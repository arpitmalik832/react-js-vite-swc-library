/**
 * Unit tests for useTheme hook.
 * @file The file is saved as `useTheme.test.jsx`.
 */
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import preferredColorScheme from '../../utils/eventListeners/preferredColorScheme';
import { THEME } from '../../enums/app';
import useTheme from '../useTheme';

jest.mock('../../utils/eventListeners/preferredColorScheme', () => ({
  __esModule: true,
  default: {
    subscribe: jest.fn(),
    unSubscribe: jest.fn(),
  },
}));

describe('useAppMount unit tests', () => {
  afterEach(cleanup);

  it('incase of light mode', () => {
    preferredColorScheme.subscribe.mockImplementation(callBackFn =>
      callBackFn({ matches: false }),
    );

    const appSlice = createSlice({
      name: 'app',
      initialState: {
        theme: THEME.LIGHT,
      },
    });

    const store = configureStore({
      reducer: {
        app: appSlice.reducer,
      },
    });

    /**
     * Test component that uses the useTheme hook.
     * @returns {import('react').JSX.Element} The rendered Test Component.
     * @example
     * <TestComponent />
     */
    function TestComponent() {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    }

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of theme changes from dark mode to light mode', () => {
    preferredColorScheme.subscribe.mockImplementation(callBackFn =>
      callBackFn({ matches: true }),
    );

    const appSlice = createSlice({
      name: 'app',
      initialState: {
        theme: THEME.DARK,
      },
    });

    const store = configureStore({
      reducer: {
        app: appSlice.reducer,
      },
    });

    /**
     * Test component that uses the useTheme hook.
     * @returns {import('react').JSX.Element} The rendered Test Component.
     * @example
     * <TestComponent />
     */
    function TestComponent() {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    }

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of theme changes from light mode to dark mode', () => {
    preferredColorScheme.subscribe.mockImplementation(callBackFn =>
      callBackFn({ matches: true }),
    );

    const appSlice = createSlice({
      name: 'app',
      initialState: {
        theme: THEME.LIGHT,
      },
    });

    const store = configureStore({
      reducer: {
        app: appSlice.reducer,
      },
    });

    /**
     * Test component that uses the useTheme hook.
     * @returns {import('react').JSX.Element} The rendered Test Component.
     * @example
     * <TestComponent />
     */
    function TestComponent() {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    }

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of dark mode', () => {
    preferredColorScheme.subscribe.mockImplementation(callBackFn =>
      callBackFn({ matches: false }),
    );

    const appSlice = createSlice({
      name: 'app',
      initialState: {
        theme: THEME.DARK,
      },
    });

    const store = configureStore({
      reducer: {
        app: appSlice.reducer,
      },
    });

    /**
     * Test component that uses the useTheme hook.
     * @returns {import('react').JSX.Element} The rendered Test Component.
     * @example
     * <TestComponent />
     */
    function TestComponent() {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    }

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
