import React, { useState } from "react";
import dynamic from "next/dynamic";
import StudioFallback from "./StudioFallback";

const DynamicStudio = dynamic(() => import("./ArchitecturalStudio"), {
  ssr: false,
  loading: () => <StudioFallback message="Initializing Three.js WebGL Engine and Shader Cache..." />,
});

export default function StudioWrapper() {
  const [staticFallbackMode, setStaticFallbackMode] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Mode Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-light-secondary dark:text-dark-secondary">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-light-text dark:text-dark-text">
            WebGL 2.0 Accelerated Canvas
          </span>
          <span className="hidden sm:inline text-light-secondary dark:text-dark-secondary">
            · 60 FPS Target · 1.75x Clamped DPR
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStaticFallbackMode(!staticFallbackMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border hover:border-light-accent dark:hover:border-dark-accent text-light-text dark:text-dark-text transition-colors"
            title="Toggle between Interactive WebGL Canvas and Lightweight Static Fallback"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${staticFallbackMode ? "bg-amber-400" : "bg-emerald-400"}`} />
            {staticFallbackMode ? "Switch to 3D Canvas" : "Test Static Fallback Mode"}
          </button>
        </div>
      </div>

      {/* Main Studio Render */}
      {staticFallbackMode ? (
        <StudioFallback
          message="Static Low Power Fallback Active (Zero GPU Overhead for Low Battery or Reduced Motion Clients)"
          onRetry={() => setStaticFallbackMode(false)}
        />
      ) : (
        <DynamicStudio />
      )}
    </div>
  );
}
