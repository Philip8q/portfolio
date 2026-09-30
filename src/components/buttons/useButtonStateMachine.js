import { useState, useRef, useEffect, useCallback } from "react";
import { motionTokens } from "./motionTokens";

export const BUTTON_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

/**
 * Robust Finite State Machine for Button Micro-interactions
 * Ensures transitions follow a strict lifecycle and prevents spam clicks/race conditions.
 */
export function useButtonStateMachine({
  onAction,
  resetDelay = motionTokens.duration.feedbackHold * 1000,
  disabled = false,
} = {}) {
  const [state, setState] = useState(BUTTON_STATES.IDLE);
  const resetTimerRef = useRef(null);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearResetTimer();
  }, [clearResetTimer]);

  const scheduleReset = useCallback(() => {
    clearResetTimer();
    resetTimerRef.current = setTimeout(() => {
      setState(BUTTON_STATES.IDLE);
    }, resetDelay);
  }, [clearResetTimer, resetDelay]);

  // Execute an async action safely
  const trigger = useCallback(
    async (overrideResult) => {
      if (disabled || state === BUTTON_STATES.LOADING) return;

      clearResetTimer();
      setState(BUTTON_STATES.LOADING);

      try {
        let outcome;
        if (overrideResult !== undefined) {
          // Simulated delay for forced result
          await new Promise((r) => setTimeout(r, 900));
          outcome = overrideResult;
        } else if (onAction) {
          outcome = await onAction();
        } else {
          // Default: 1.2s delay with 20% random failure
          await new Promise((r) => setTimeout(r, 1100));
          outcome = Math.random() >= 0.20; // 80% success, 20% fail
        }

        if (outcome) {
          setState(BUTTON_STATES.SUCCESS);
        } else {
          setState(BUTTON_STATES.ERROR);
        }
        scheduleReset();
      } catch (err) {
        setState(BUTTON_STATES.ERROR);
        scheduleReset();
      }
    },
    [disabled, state, onAction, clearResetTimer, scheduleReset]
  );

  const forceSuccess = useCallback(() => trigger(true), [trigger]);
  const forceError = useCallback(() => trigger(false), [trigger]);
  const reset = useCallback(() => {
    clearResetTimer();
    setState(BUTTON_STATES.IDLE);
  }, [clearResetTimer]);

  return {
    state,
    isIdle: state === BUTTON_STATES.IDLE,
    isLoading: state === BUTTON_STATES.LOADING,
    isSuccess: state === BUTTON_STATES.SUCCESS,
    isError: state === BUTTON_STATES.ERROR,
    trigger,
    forceSuccess,
    forceError,
    reset,
  };
}
