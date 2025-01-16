/**
 * Unit tests for useBackPress hook.
 * @file The file is saved as `useBackPress.test.jsx`.
 */
import { renderHook, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux';

import useBackPress from '../useBackPress';
import {
  clearStack,
  popStack,
  pushStack,
} from '../../redux/slices/navigationSlice';

jest.mock('react-router', () => ({
  __esModule: true,
  useNavigate: () => {
    const rand = Math.random();
    if (rand < 0.3) {
      return jest.fn(() => Promise.resolve());
    }
    if (rand < 0.6) {
      return jest.fn(() => Promise.reject(new Error('an error')));
    }
    return jest.fn();
  },
}));

jest.mock('react-redux', () => ({
  __esModule: true,
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/slices/navigationSlice', () => ({
  __esModule: true,
  clearStack: jest.fn(),
  popStack: jest.fn(),
  pushStack: jest.fn(),
}));

jest.mock('../../utils/eventListeners/beforeUnload', () => ({
  __esModule: true,
  default: {
    subscribe: e => e({}),
    unSubscribe: jest.fn(),
  },
}));

jest.mock('../../utils/logsUtils', () => ({
  __esModule: true,
  log: jest.fn(),
  errorLog: jest.fn(),
}));

describe('useBackPress unit tests', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    reactRedux.useSelector.mockImplementation(selector =>
      selector({
        navigation: {
          stack: [],
        },
      }),
    );
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('snapshot test', () => {
    const { result } = renderHook(() => useBackPress());

    expect(result.current).toMatchSnapshot();
  });

  it('testing push function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.push();
    expect(pushStack).toHaveBeenCalledTimes(1);
  });

  it('testing pop function', () => {
    reactRedux.useSelector.mockImplementation(selector =>
      selector({
        navigation: {
          stack: [() => jest.fn()],
        },
      }),
    );
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(1);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing pop function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.pop();
    expect(popStack).toHaveBeenCalledTimes(0);
  });

  it('testing clear function', () => {
    const { result } = renderHook(() => useBackPress());

    result.current.clear();
    expect(clearStack).toHaveBeenCalledTimes(0);
  });

  it('testing clear function', () => {
    reactRedux.useSelector.mockImplementation(selector =>
      selector({
        navigation: {
          stack: [() => jest.fn()],
        },
      }),
    );
    const { result } = renderHook(() => useBackPress());

    result.current.clear();
    expect(clearStack).toHaveBeenCalledTimes(1);
  });
});
