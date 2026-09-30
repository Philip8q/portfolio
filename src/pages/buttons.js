import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import LeadQualifyButton from "@/components/buttons/LeadQualifyButton";
import DeployPipelineButton from "@/components/buttons/DeployPipelineButton";
import { useButtonStateMachine, BUTTON_STATES } from "@/components/buttons/useButtonStateMachine";
import { motionTokens } from "@/components/buttons/motionTokens";

export default function ButtonsDemoPage() {
  const [disabledToggle, setDisabledToggle] = useState(false);
  const [reducedMotionOverride, setReducedMotionOverride] = useState(false);

  // State machines for both buttons
  const leadStateMachine = useButtonStateMachine({ disabled: disabledToggle });
  const deployStateMachine = useButtonStateMachine({ disabled: disabledToggle });

  return (
    <>
      <Head>
        <title>Buttons with a Brain: Motion & State Micro-interactions  Philip Omondi</title>
        <meta
          name="description"
          content="Interactive stateful button micro-interactions demonstrating choreographed transitions, compositor-only animations, and accessibility."
        />
      </Head>

      <main className="min-h-screen pt-28 pb-20 px-6 max-w-[1200px] mx-auto text-light-text dark:text-dark-text">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-light-secondary dark:text-dark-secondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
          >
            <Icon icon="mdi:arrow-left" width={18} height={18} />
            Back to Portfolio
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase">
            <Icon icon="mdi:animation-play" width={16} height={16} />
            FlyRank Assignment Showcase
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Buttons with a Brain
          </h1>
          <p className="text-lg text-light-secondary dark:text-dark-secondary leading-relaxed">
            Stateful micro-interactions choreographed across full lifecycles.
            Zero layout thrashing, 100% interruptible, compositor-friendly, and accessible.
          </p>
        </div>

        {/* Global Control Deck */}
        <section className="mb-14 p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-card/60 dark:bg-dark-card/60 backdrop-blur-sm">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-light-secondary dark:text-dark-secondary mb-4 flex items-center gap-2">
            <Icon icon="mdi:tune-vertical" width={18} height={18} />
            Evaluation Controls &amp; Simulation Deck
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => {
                leadStateMachine.trigger();
                deployStateMachine.trigger();
              }}
              disabled={disabledToggle}
              className="px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Icon icon="mdi:dice-multiple" width={18} height={18} className="text-indigo-500" />
              Simulate Network (20% Fail)
            </button>

            <button
              type="button"
              onClick={() => {
                leadStateMachine.forceSuccess();
                deployStateMachine.forceSuccess();
              }}
              disabled={disabledToggle}
              className="px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Icon icon="mdi:check-bold" width={18} height={18} />
              Force Success
            </button>

            <button
              type="button"
              onClick={() => {
                leadStateMachine.forceError();
                deployStateMachine.forceError();
              }}
              disabled={disabledToggle}
              className="px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Icon icon="mdi:alert-octagon" width={18} height={18} />
              Force Error (Shake)
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDisabledToggle(!disabledToggle)}
                className={`flex-1 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  disabledToggle
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-700 dark:text-amber-300"
                    : "border-light-border dark:border-dark-border hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon icon="mdi:cancel" width={16} height={16} />
                Disabled: {disabledToggle ? "ON" : "OFF"}
              </button>

              <button
                type="button"
                onClick={() => setReducedMotionOverride(!reducedMotionOverride)}
                className={`flex-1 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  reducedMotionOverride
                    ? "bg-purple-500/20 border-purple-500/50 text-purple-700 dark:text-purple-300"
                    : "border-light-border dark:border-dark-border hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
                title="Emulate prefers-reduced-motion without altering OS settings"
              >
                <Icon icon="mdi:speedometer-slow" width={16} height={16} />
                Reduced: {reducedMotionOverride ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Buttons Showcase Area */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Button 1: Lead Qualify Button */}
          <div className="p-8 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                  Component 01  Action
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800">
                  State: {leadStateMachine.state.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Lead Qualification Button</h3>
              <p className="text-sm text-light-secondary dark:text-dark-secondary mb-8">
                Designed for LeadFlow capstone. Features label slide-up, spinner entrance, checkmark pop on success, and horizontal error shake.
              </p>
            </div>

            <div className="py-10 flex flex-col items-center justify-center border border-dashed border-light-border dark:border-dark-border rounded-xl bg-light-bg/50 dark:bg-dark-bg/50">
              <LeadQualifyButton
                stateMachine={leadStateMachine}
                disabled={disabledToggle}
                reducedMotionOverride={reducedMotionOverride}
              />
              <span className="text-xs text-light-secondary dark:text-dark-secondary mt-4">
                Click button directly to test live interaction
              </span>
            </div>
          </div>

          {/* Button 2: Deploy Pipeline Button */}
          <div className="p-8 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-500/10 px-2.5 py-1 rounded-md">
                  Component 02  System Flex
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800">
                  State: {deployStateMachine.state.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Deploy Automation Button</h3>
              <p className="text-sm text-light-secondary dark:text-dark-secondary mb-8">
                Demonstrates that both buttons belong to a unified motion system, sharing exact duration curves, easing springs, and state guards.
              </p>
            </div>

            <div className="py-10 flex flex-col items-center justify-center border border-dashed border-light-border dark:border-dark-border rounded-xl bg-light-bg/50 dark:bg-dark-bg/50">
              <DeployPipelineButton
                stateMachine={deployStateMachine}
                disabled={disabledToggle}
                reducedMotionOverride={reducedMotionOverride}
              />
              <span className="text-xs text-light-secondary dark:text-dark-secondary mt-4">
                Click button directly to test live interaction
              </span>
            </div>
          </div>
        </section>

        {/* Written Technical Note: Duration & Easing Rationale (Assignment Deliverable) */}
        <section className="p-8 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card space-y-6">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:book-open-page-variant" width={24} height={24} className="text-indigo-500" />
            <h2 className="text-2xl font-bold">Duration &amp; Easing Engineering Rationale</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-bg/40 dark:bg-dark-bg/40">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Icon icon="mdi:timer-outline" width={18} height={18} className="text-emerald-500" />
                1. Intentional Timing Windows
              </h4>
              <p className="text-xs text-light-secondary dark:text-dark-secondary leading-relaxed">
                <strong>Press (120ms):</strong> Instant tactile feedback so the user feels immediate mechanical response.<br />
                <strong>State Swap (280ms):</strong> Prevents visual flash while keeping the UI responsive.<br />
                <strong>Success Pop (380ms):</strong> Spring physics give satisfying confirmation.<br />
                <strong>Error Shake (450ms):</strong> 7-step damped oscillation gives unmistakable feedback.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-bg/40 dark:bg-dark-bg/40">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Icon icon="mdi:chart-bell-curve" width={18} height={18} className="text-indigo-500" />
                2. Compositor-Only Curves
              </h4>
              <p className="text-xs text-light-secondary dark:text-dark-secondary leading-relaxed">
                All animations target <code>transform</code> (scale, translation) and <code>opacity</code>. We avoid animating <code>width</code> or <code>height</code> to eliminate browser layout thrashing and maintain 60 FPS performance on low-power mobile devices.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-bg/40 dark:bg-dark-bg/40">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Icon icon="mdi:human" width={18} height={18} className="text-purple-500" />
                3. Accessibility &amp; State Guards
              </h4>
              <p className="text-xs text-light-secondary dark:text-dark-secondary leading-relaxed">
                Under <code>prefers-reduced-motion</code>, transforms and shakes are disabled while keeping opacity and color cues so vestibular safety is honored without losing feedback. Spam clicks during active transitions are safely locked out.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
