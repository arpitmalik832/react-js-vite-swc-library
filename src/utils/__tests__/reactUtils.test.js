/**
 * Unit tests for reactUtils.
 * @file This file is saved as `reactUtils.test.js`.
 */
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useDebounce, useThrottle } from '../reactUtils';

jest.mock('react', () => ({
  _esModule: true,
  ...jest.requireActual('react'),
}));

describe('reactUtils unit tests', () => {
  const mockFunc = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('useDebounce unit test with default timeout', () => {
    jest.useFakeTimers();
    useDebounce(mockFunc)({ persist: jest.fn(), nativeEvent: true });
    expect(mockFunc).not.toHaveBeenCalled();
    jest.advanceTimersByTime(250);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('useDebounce unit test with custom timeout', () => {
    jest.useFakeTimers();
    useDebounce(mockFunc, 500)();
    expect(mockFunc).not.toHaveBeenCalled();
    jest.advanceTimersByTime(600);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('useThrottle unit test with custom time period', () => {
    jest.useFakeTimers();
    const result = renderHook(() => useThrottle(mockFunc, 500));

    result.result.current();
    expect(mockFunc).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(600);

    result.result.current();
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it('useThrottle unit test with default time period', () => {
    jest.useFakeTimers();
    const result = renderHook(() => useThrottle(mockFunc));

    result.result.current();
    expect(mockFunc).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(250);

    result.result.current();
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });
});
