import { useDispatch } from "react-redux";
import { useCallback } from "react";

/**
 * React hook for creating redux action.
 *
 * Accepts a action creator and returns a function that will call
 * the action creator.
 *
 * Note that the return type of the returned function is not accurate.
 * The return type should be unknown.
 */
export function useAction<F extends (...args: any[]) => RootActions>(
  creator: F
): F {
  const dispatch = useDispatch();
  return useCallback(
    (...args: any[]) => {
      const action = creator(...args);
      dispatch(action);
    },
    [creator, dispatch]
  ) as F;
}
