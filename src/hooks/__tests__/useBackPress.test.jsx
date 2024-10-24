/**
 * Unit tests for useBackPress hook.
 * @file The file is saved as `useBackPress.test.jsx`.
 */
import { useEffect } from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import useBackPress from '../useBackPress';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('../../utils/eventListeners/beforeUnload.js', () => ({
  __esModule: true,
  default: {
    subscribe: e => e(),
    unSubscribe: jest.fn(),
  },
}));

jest.mock('../../utils/commonUtils', () => ({
  __esModule: true,
  log: jest.fn(),
}));

describe('useBackPress unit tests', () => {
  it('snapshot test', () => {
    const navigationSlice = createSlice({
      name: 'navigation',
      initialState: { stack: [] },
    });

    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    /**
     * Temporary component to test the useBackPress hook.
     * @returns {import('react').JSX.Element} The rendered component.
     * @example
     * // Example usage:
     * <TempComponent />
     */
    function TempComponent() {
      useBackPress();

      return <div data-testid="temp-component" />;
    }

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('testing functions', () => {
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

    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    /**
     * Temporary component to test the useBackPress hook.
     * @returns {import('react').JSX.Element} The rendered component.
     * @example
     * // Example usage:
     * <TempComponent />
     */
    function TempComponent() {
      const { push, pop } = useBackPress();

      useEffect(() => {
        push(jest.fn());
      }, []);

      return (
        <div data-testid="temp-component">
          <button type="button" data-testid="temp-btn" onClick={pop}>
            temp btn
          </button>
        </div>
      );
    }

    const { getByTestId } = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(getByTestId('temp-btn'));
    fireEvent.click(getByTestId('temp-btn'));
  });

  it('testing functions', () => {
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

    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    /**
     * Temporary component to test the useBackPress hook.
     * @returns {import('react').JSX.Element} The rendered component.
     * @example
     * // Example usage:
     * <TempComponent />
     */
    function TempComponent() {
      const { push, clear } = useBackPress();

      useEffect(() => {
        push(jest.fn());
      }, []);

      return (
        <div data-testid="temp-component">
          <button type="button" data-testid="temp-btn" onClick={clear}>
            temp btn
          </button>
        </div>
      );
    }

    const { getByTestId } = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(getByTestId('temp-btn'));
    fireEvent.click(getByTestId('temp-btn'));
  });
});
