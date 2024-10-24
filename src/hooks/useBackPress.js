/**
 * This hook handles back press in the application.
 * @file It is saved as `useBackPress.js`.
 */
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  clearStack,
  popStack,
  pushStack,
} from '../redux/slices/navigationSlice';
import beforeUnload from '../utils/eventListeners/beforeUnload';
import { log } from '../utils/logsUtils';

/**
 * Custom hook to handle back press events in the application.
 * @returns {object} An object containing the stack and methods to manipulate it.
 * @example
 * const { stack, push, pop, clear } = useBackPress();
 */
function useBackPress() {
  const { stack } = useSelector(state => state.navigation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackPress = useCallback(() => {
    if (stack.length) {
      dispatch(popStack());
    } else {
      navigate(-1);
    }
  }, [stack]);

  window.backPress = handleBackPress;

  useEffect(() => {
    beforeUnload.subscribe(() => {
      log('😬 user back clicked!!');
    });

    return () => {
      beforeUnload.unSubscribe();
    };
  }, []);

  /**
   * Pushes a callback onto the stack.
   * @param {Function} callback - The callback to push onto the stack.
   * @example
   * push(() => console.log('Callback executed'));
   */
  function push(callback) {
    dispatch(pushStack(callback));
  }

  /**
   * Pops the last item from the stack and handles back press.
   * @example
   * const { pop } = useBackPress();
   * pop();
   */
  function pop() {
    handleBackPress();
  }

  const clear = useCallback(() => {
    if (stack.length) {
      dispatch(clearStack());
    }
  }, [stack]);

  return { stack, push, pop, clear };
}

export default useBackPress;
