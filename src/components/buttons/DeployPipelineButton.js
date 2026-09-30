import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import { motionTokens } from "./motionTokens";
import { BUTTON_STATES } from "./useButtonStateMachine";

export default function DeployPipelineButton({
  stateMachine,
  disabled = false,
  reducedMotionOverride = null,
}) {
  const systemReducedMotion = useReducedMotion();
  const prefersReduced = reducedMotionOverride !== null ? reducedMotionOverride : systemReducedMotion;

  const { state, isLoading, isSuccess, isError, isIdle, trigger } = stateMachine;

  const getThemeClasses = () => {
    if (disabled) {
      return "bg-neutral-300 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed border-transparent";
    }
    switch (state) {
      case BUTTON_STATES.SUCCESS:
        return "bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20";
      case BUTTON_STATES.ERROR:
        return "bg-rose-600 dark:bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20";
      case BUTTON_STATES.LOADING:
        return "bg-neutral-900 dark:bg-neutral-950 text-white border-neutral-700 shadow-md";
      default:
        return "bg-neutral-900 dark:bg-neutral-100 hover:bg-black dark:hover:bg-white text-white dark:text-neutral-900 border-neutral-800 dark:border-neutral-200 shadow-md";
    }
  };

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
                   focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/40 dark:focus-visible:ring-white/40
                   transition-colors duration-200 cursor-pointer ${getThemeClasses()}`}
        style={{ minWidth: "190px" }}
      >
        <AnimatePresence mode="wait">
          {/* 1. LOADING */}
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.85 }}
              transition={{ duration: prefersReduced ? 0.05 : motionTokens.duration.transition }}
              className="flex items-center gap-2.5"
            >
              <motion.div
                animate={prefersReduced ? {} : { rotate: 360 }}
                transition={
                  prefersReduced
                    ? {}
                    : { repeat: Infinity, duration: 0.9, ease: "linear" }
                }
              >
                <Icon icon="mdi:loading" width={20} height={20} className="animate-spin" />
              </motion.div>
              <span>Deploying Pipeline...</span>
            </motion.div>
          )}

          {/* 2. SUCCESS */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
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
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
              >
                <Icon icon="mdi:checkbox-marked-circle" width={22} height={22} />
              </motion.div>
              <span className="font-semibold">Pipeline Active!</span>
            </motion.div>
          )}

          {/* 3. ERROR (No dashes) */}
          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0.05 : 0.2 }}
              className="flex items-center gap-2"
            >
              <Icon icon="mdi:close-octagon" width={22} height={22} />
              <span className="font-medium">Deploy Halted (Tap to Retry)</span>
            </motion.div>
          )}

          {/* 4. IDLE */}
          {isIdle && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0.05 : motionTokens.duration.transition }}
              className="flex items-center gap-2.5"
            >
              <Icon icon="mdi:rocket-launch" width={20} height={20} />
              <span>Deploy n8n Pipeline</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
