/**
 * Motion Tokens & Easing Curves
 * Designed for 60fps GPU-accelerated compositor-only transitions (transform, opacity).
 */

export const motionTokens = {
  duration: {
    press: 0.12,     // 120ms: Immediate tactile press response
    hover: 0.2,      // 200ms: Snappy hover/focus enter
    transition: 0.28,// 280ms: State swap (label out, spinner in)
    morph: 0.38,     // 380ms: Icon/shape morph (spinner to checkmark)
    shake: 0.45,     // 450ms: Controlled alert shake on error
    feedbackHold: 1.8 // 1800ms: Graceful pause to read outcome before reset
  },

  ease: {
    // Deceleration curve for natural entrance
    enter: [0.16, 1, 0.3, 1],
    // Acceleration curve for quick exits
    exit: [0.7, 0, 0.84, 0],
    // Smooth standard easing for color & opacity fades
    standard: [0.4, 0, 0.2, 1],
    // Spring physics for organic tactile feedback
    springPress: { type: "spring", stiffness: 500, damping: 30 },
    springSuccess: { type: "spring", stiffness: 400, damping: 20 },
    shakeKeyframes: [-7, 7, -5, 5, -2, 2, 0]
  }
};
