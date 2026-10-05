import React from "react";

export default function StudioFallback({ message = "Initializing 3D WebGL Pipeline...", onRetry }) {
  return (
    <div className="w-full h-full min-h-[550px] lg:min-h-[680px] rounded-2xl border border-light-border dark:border-dark-border bg-gradient-to-br from-light-surface/80 to-light-bg dark:from-dark-surface/80 dark:to-dark-bg flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background blueprint grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Decorative architectural wireframe badge */}
      <div className="relative z-10 w-24 h-24 mb-6 rounded-2xl bg-light-accent/10 dark:bg-dark-accent/10 border border-light-accent/30 dark:border-dark-accent/30 flex items-center justify-center shadow-lg shadow-light-accent/5">
        <svg 
          className="w-12 h-12 text-light-accent dark:text-dark-accent animate-pulse" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      </div>

      <div className="relative z-10 max-w-md">
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">
          Ardhia 3D Architectural Studio
        </h3>
        <p className="text-sm text-light-secondary dark:text-dark-secondary mb-6">
          {message}
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-mono text-light-secondary dark:text-dark-secondary">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>GPU Budget Checked · FE10 Staging Ready</span>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 px-5 py-2.5 rounded-xl bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg font-semibold text-xs tracking-wide uppercase hover:opacity-90 transition-opacity"
          >
            Launch WebGL Scene
          </button>
        )}
      </div>
    </div>
  );
}
