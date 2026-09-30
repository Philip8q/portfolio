import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import { motionTokens } from "./motionTokens";
import { BUTTON_STATES } from "./useButtonStateMachine";

export default function LeadQualifyButton({
  stateMachine,
  disabled = false,
  reducedMotionOverride = null,
}) {
  const systemReducedMotion = useReducedMotion();
  const prefersReduced = reducedMotionOverride !== null ? reducedMotionOverride : systemReducedMotion;

  const { state, isLoading, isSuccess, isError, isIdle, trigger } = stateMachine;

  // Background and border styling per state
  const getThemeClasses = () => {
    if (disabled) {
      return "bg-neutral-300 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed border-transparent shadow-none";
    }
    switch (state) {
      case BUTTON_STATES.SUCCESS:
        return "bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25";
      case BUTTON_STATES.ERROR:
        return "bg-rose-600 dark:bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/25";
      case BUTTON_STATES.LOADING:
        return "bg-indigo-700 dark:bg-indigo-600 text-white border-indigo-500 shadow-md";
      default:
        return "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white border-indigo-400/30 shadow-md shadow-indigo-500/20";
    }
  };

  // Error shake animation (disabled if user prefers reduced motion)
  const shakeAnimation =
    isError && !prefersReduced
      ? {
          x: motionTokens.ease.shakeKeyframes,
          transition: { duration: motionTokens.duration.shake, ease: "easeInOut" },
        }
      : { x: 0 };

  return (
    <div className="relative inline-flex flex-col items-center">
      <motion.button
        type="button"
        onClick={() => trigger()}
        disabled={disabled || isLoading}
        animate={shakeAnimation}
        whileHover={
          !disabled && isIdle && !prefersReduced
            ? { scale: 1.025, transition: { duration: motionTokens.duration.hover } }
            : {}
        }
        whileTap={
          !disabled && isIdle && !prefersReduced
            ? { scale: 0.96, transition: motionTokens.ease.springPress }
            : {}
        }
        transition={{ duration: prefersReduced ? 0.05 : motionTokens.duration.transition }}
        aria-busy={isLoading}
        aria-disabled={disabled}
        aria-live="polite"
        className={`relative h-13 px-7 rounded-xl font-medium tracking-wide text-sm sm:text-base
                   border flex items-center justify-center gap-3 overflow-hidden select-none
                   focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/50
                   transition-colors duration-200 cursor-pointer ${getThemeClasses()}`}
        style={{ minWidth: "190px" }}
      >
        <AnimatePresence mode="wait">
          {/* 1. LOADING STATE */}
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.8 }}
              transition={{ duration: prefersReduced ? 0.05 : motionTokens.duration.transition }}
              className="flex items-center gap-2.5"
            >
              <motion.div
                animate={prefersReduced ? {} : { rotate: 360 }}
                transition={
                  prefersReduced
                    ? {}
                    : { repeat: Infinity, duration: 0.85, ease: "linear" }
                }
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>Qualifying Lead...</span>
            </motion.div>
          )}

          {/* 2. SUCCESS STATE */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{
                opacity: 0,
                y: prefersReduced ? 0 : 8,
                scale: prefersReduced ? 1 : 0.9,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
              transition={
                prefersReduced
                  ? { duration: 0.05 }
                  : motionTokens.ease.springSuccess
              }
              className="flex items-center gap-2"
            >
              <motion.div
                initial={{ scale: prefersReduced ? 1 : 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 18,
                  delay: 0.05,
                }}
              >
                <Icon icon="mdi:check-circle" width={22} height={22} />
              </motion.div>
              <span className="font-semibold">Lead Qualified!</span>
            </motion.div>
          )}

          {/* 3. ERROR STATE */}
          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0.05 : 0.2 }}
              className="flex items-center gap-2"
            >
              <Icon icon="mdi:alert-circle" width={22} height={22} />
              <span className="font-medium">Failed &mdash; Retry</span>
            </motion.div>
          )}

          {/* 4. IDLE / DEFAULT STATE */}
          {isIdle && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
              transition={{ duration: prefersReduced ? 0.05 : motionTokens.duration.transition }}
              className="flex items-center gap-2.5"
            >
              <Icon
                icon="mdi:creation"
                width={20}
                height={20}
                className="text-indigo-200"
              />
              <span>Qualify Inbound Lead</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
