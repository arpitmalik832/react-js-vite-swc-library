/**
 * Unit tests for navigationSlice.
 * @file This file is saved as `navigationSlice.test.js`.
 */
import {
  navigationSlice,
  pushStack,
  popStack,
  clearStack,
} from '../navigationSlice';

jest.mock('../../../utils/logsUtils', () => ({
  errorLog: jest.fn(),
}));

describe('navigationSlice reducers', () => {
  let initialState;
  let mockCallback;

  beforeEach(() => {
    mockCallback = jest.fn();
    initialState = {
      stack: [],
    };
  });

  it('should handle initial state', () => {
    expect(navigationSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      stack: [],
    });
  });

  describe('pushStack', () => {
    it('should add callback to empty stack', () => {
      const actual = navigationSlice.reducer(
        initialState,
        pushStack(mockCallback),
      );
      expect(actual.stack).toHaveLength(1);
      expect(actual.stack[0]).toBe(mockCallback);
    });

    it('should add multiple callbacks to stack', () => {
      const mockCallback2 = jest.fn();
      let state = navigationSlice.reducer(
        initialState,
        pushStack(mockCallback),
      );
      state = navigationSlice.reducer(state, pushStack(mockCallback2));

      expect(state.stack).toHaveLength(2);
      expect(state.stack[0]).toBe(mockCallback);
      expect(state.stack[1]).toBe(mockCallback2);
    });

    it('should preserve existing callbacks when pushing new one', () => {
      const existingState = {
        stack: [jest.fn()],
      };

      const actual = navigationSlice.reducer(
        existingState,
        pushStack(mockCallback),
      );
      expect(actual.stack).toHaveLength(2);
      expect(actual.stack[1]).toBe(mockCallback);
    });
  });

  describe('popStack', () => {
    it('should execute and remove last callback from stack', () => {
      // Setup initial state with a callback
      const state = navigationSlice.reducer(
        initialState,
        pushStack(mockCallback),
      );

      // Pop the callback
      const actual = navigationSlice.reducer(state, popStack());

      expect(actual.stack).toHaveLength(0);
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should handle empty stack', () => {
      const actual = navigationSlice.reducer(initialState, popStack());
      expect(actual.stack).toHaveLength(0);
    });

    it('should handle multiple pops', () => {
      const mockCallback2 = jest.fn();
      let state = navigationSlice.reducer(
        initialState,
        pushStack(mockCallback),
      );
      state = navigationSlice.reducer(state, pushStack(mockCallback2));

      // Pop first callback
      state = navigationSlice.reducer(state, popStack());
      expect(state.stack).toHaveLength(1);
      expect(mockCallback2).toHaveBeenCalled();

      // Pop second callback
      state = navigationSlice.reducer(state, popStack());
      expect(state.stack).toHaveLength(0);
      expect(mockCallback).toHaveBeenCalled();
    });
  });

  describe('clearStack', () => {
    it('should clear all callbacks from stack', () => {
      // Setup initial state with multiple callbacks
      let state = navigationSlice.reducer(
        initialState,
        pushStack(mockCallback),
      );
      state = navigationSlice.reducer(state, pushStack(jest.fn()));

      const actual = navigationSlice.reducer(state, clearStack());
      expect(actual.stack).toHaveLength(0);
    });

    it('should handle clearing empty stack', () => {
      const actual = navigationSlice.reducer(initialState, clearStack());
      expect(actual.stack).toHaveLength(0);
    });

    it('should not execute callbacks when clearing', () => {
      // Setup initial state with a callback
      const state = navigationSlice.reducer(
        initialState,
        pushStack(mockCallback),
      );

      // Clear the stack
      navigationSlice.reducer(state, clearStack());
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe('error cases', () => {
    it('should handle non-function callbacks in pushStack', () => {
      const invalidCallback = 'not a function';
      const actual = navigationSlice.reducer(
        initialState,
        pushStack(invalidCallback),
      );
      expect(actual.stack.length).toBe(0);
    });

    it('should handle undefined callback in pushStack', () => {
      const actual = navigationSlice.reducer(
        initialState,
        pushStack(undefined),
      );
      expect(actual.stack.length).toBe(0);
    });

    it('should handle error in callback execution', () => {
      const errorCallback = jest.fn(() => {
        throw new Error('Callback error');
      });

      // Setup state with error callback
      const state = navigationSlice.reducer(
        initialState,
        pushStack(errorCallback),
      );

      // Pop should not throw
      expect(() => {
        navigationSlice.reducer(state, popStack());
      }).not.toThrow();
    });
  });

  describe('state immutability', () => {
    it('should not mutate original state on pushStack', () => {
      const originalState = { ...initialState };
      navigationSlice.reducer(initialState, pushStack(mockCallback));
      expect(initialState).toEqual(originalState);
    });

    it('should not mutate original state on popStack', () => {
      const state = {
        stack: [mockCallback],
      };
      const originalState = { ...state };

      navigationSlice.reducer(state, popStack());
      expect(state).toEqual(originalState);
    });

    it('should not mutate original state on clearStack', () => {
      const state = {
        stack: [mockCallback],
      };
      const originalState = { ...state };

      navigationSlice.reducer(state, clearStack());
      expect(state).toEqual(originalState);
    });
  });

  describe('action creators', () => {
    it('should create pushStack action', () => {
      expect(pushStack(mockCallback)).toEqual({
        type: 'navigation/pushStack',
        payload: mockCallback,
      });
    });

    it('should create popStack action', () => {
      expect(popStack()).toEqual({
        type: 'navigation/popStack',
      });
    });

    it('should create clearStack action', () => {
      expect(clearStack()).toEqual({
        type: 'navigation/clearStack',
      });
    });
  });
});
