# State Choreography Studio: Motion Engineering and Microinteractions

**Author:** Philip Omondi  
**Live Demo:** [https://philipomondi.netlify.app/buttons](https://philipomondi.netlify.app/buttons)  
**Repository:** [https://github.com/Philip8q/portfolio](https://github.com/Philip8q/portfolio)  

---

## 1. Architecture and Component Design

Rather than abrupt CSS or conditional state swaps, this system choreographs component lifecycles through continuous, GPU accelerated motion:

`idle` to `hover/focus` to `active press` to `loading` to `success / error` to `idle`

The implementation includes two coordinated components:
1. **`LeadQualifyButton` (Flagship Action):** Built for the LeadFlow capstone AI pipeline with sleek black styling, label slide up, spinner entrance, checkmark spring pop on success, and horizontal error shake.
2. **`DeployPipelineButton` (System Component):** Demonstrates that the motion language is a unified system, sharing the exact same timing tokens, spring parameters, and accessibility hooks.

---

## 2. Duration and Easing Engineering Choices

| Phase | Duration | Easing / Spring | Rationale |
| :--- | :---: | :--- | :--- |
| **Tactile Press (`active`)** | `120ms` | `{ stiffness: 500, damping: 30 }` | Micro response providing immediate mechanical confirmation without latency. |
| **Hover / Focus Enter** | `200ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Decelerating curve that feels responsive yet soft to user intent. |
| **State Swap (Label to Spinner)** | `280ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard curve preventing visual flicker while keeping transitions crisp. |
| **Success Checkmark Morph** | `380ms` | `{ stiffness: 400, damping: 20 }` | Spring bounce communicates a rewarding, confirmed action. |
| **Error Shake** | `450ms` | `[-7, 7, -5, 5, -2, 2, 0]` | Damped 7 step horizontal harmonic oscillation signaling failure unmistakably. |
| **Feedback Hold** | `1800ms` | Linear hold before auto reset | Gives the user adequate cognitive time to parse the outcome before returning to idle. |

---

## 3. Compositor Only and Layout Integrity

- **Compositor Properties:** Strictly limited to `transform` (scale, translation, rotation) and `opacity`.
- **Layout Thrash Prevention:** Component dimensions use min width containers to ensure text swaps and spinners never cause surrounding elements or the component boundary to jump or shift.

---

## 4. Accessibility and Robust State Guards

- **Reduced Motion Support:** Fully honors `@media (prefers-reduced-motion: reduce)`. In reduced motion mode, physical transforms (shakes, rotations, scale jumps) are disabled while preserving essential color and opacity feedback. The live demo includes a manual **Reduced: ON/OFF** toggle for browser evaluation.
- **Screen Reader Support:** Configured with `aria-busy={isLoading}`, `aria-disabled={disabled}`, and `aria-live="polite"` for non visual announcements.
- **Interruptibility:** Powered by a finite state machine (`useButtonStateMachine.js`). Rapid spam clicking or hover events during active loading or feedback phases are safely ignored, eliminating race conditions.
