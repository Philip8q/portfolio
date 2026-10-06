import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Icon } from "@iconify/react";
import HeroShaderCanvas from "@/components/ui/HeroShaderCanvas";

export default function ShaderPage() {
  const [showCode, setShowCode] = useState(false);
  const [simulatedReducedMotion, setSimulatedReducedMotion] = useState(false);

  return (
    <>
      <Head>
        <title>Signature Shader Hero | Philip Omondi</title>
        <meta
          name="description"
          content="Interactive WebGL GLSL fragment shader featuring fluid aurora flow fields, cursor warping, and responsible performance fallbacks."
        />
        <meta property="og:title" content="Signature Shader Hero | Philip Omondi" />
        <meta
          property="og:description"
          content="Full-screen GLSL fragment shader with domain warping, u_time, u_resolution, and u_mouse uniforms."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className="relative w-screen h-screen overflow-hidden bg-[#0b0f17] text-white select-none">
        {/* Fullscreen GLSL Shader Canvas */}
        <HeroShaderCanvas
          className={`transition-opacity duration-700 ${
            simulatedReducedMotion ? "opacity-20" : "opacity-100"
          }`}
        />

        {/* Fallback gradient simulation when reduced motion is forced */}
        {simulatedReducedMotion && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f17] via-[#0d2232] to-[#161d31] opacity-95 transition-opacity" />
        )}

        {/* Top Floating Header */}
        <header className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-medium tracking-wide uppercase transition-all"
          >
            <Icon icon="mdi:arrow-left" width={16} height={16} />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSimulatedReducedMotion(!simulatedReducedMotion)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all ${
                simulatedReducedMotion
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                  : "bg-white/10 border-white/15 hover:bg-white/20 text-white/80"
              }`}
            >
              {simulatedReducedMotion ? "Reduced Motion: Active (Static)" : "Test Reduced Motion"}
            </button>

            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold backdrop-blur-md transition-all"
            >
              {showCode ? "Hide Shader Code" : "Inspect GLSL"}
            </button>
          </div>
        </header>

        {/* Center Hero Content (Readable, High-Contrast Text) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-3xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              GLSL Fragment Shader · Signature Visual Hero
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 drop-shadow-lg text-white">
              Philip Omondi
            </h1>

            <p className="text-lg sm:text-2xl text-white/85 font-light max-w-xl mx-auto leading-relaxed mb-8 drop-shadow">
              Developer &amp; Automation Engineer. Move your mouse or touch to influence the fluid flow field in real time.
            </p>

            {/* Spec Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-white/70">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm">
                Uniforms: u_time, u_resolution, u_mouse
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm">
                DPR: Capped at 2.0
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm">
                Visibility API: Auto-Pause on Tab Hide
              </span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-sm">
                Passes: Simplex fBm + Film Grain Dithering
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Drawer: GLSL Code Inspector */}
        {showCode && (
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[620px] max-h-[50vh] z-30 bg-[#06080d]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-5 overflow-y-auto text-xs font-mono shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
                GLSL Fragment Shader Source
              </span>
              <button
                type="button"
                onClick={() => setShowCode(false)}
                className="text-white/60 hover:text-white"
              >
                Close
              </button>
            </div>
            <pre className="text-white/80 whitespace-pre-wrap leading-relaxed text-[11px]">
{`// 1. Uniforms
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_reduced_motion;

// 2. Aspect-Corrected Coordinates & Mouse Pull
vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
vec2 mouseNorm = (u_mouse - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
vec2 mouseDelta = st - mouseNorm;
float mousePull = exp(-length(mouseDelta) * 3.5);
st += normalize(mouseDelta + 0.0001) * mousePull * 0.12;

// 3. Nested Domain Warping (Fractal Brownian Motion)
vec2 q = vec2(fbm(st + 0.04 * t), fbm(st + vec2(5.2, 1.3) + 0.05 * t));
vec2 r = vec2(fbm(st + 3.0 * q + 0.08 * t), fbm(st + 3.0 * q + 0.06 * t));
float f = fbm(st + 3.5 * r + 0.02 * t);

// 4. Luxury Aurora Palette (Obsidian + Emerald + Sapphire + Amethyst)
vec3 col = mix(vec3(0.043, 0.059, 0.090), vec3(0.145, 0.388, 0.922), clamp(length(q) * 0.9, 0.0, 1.0));
col = mix(col, vec3(0.063, 0.725, 0.506), clamp(pow(r.x, 2.0) * 1.4, 0.0, 1.0));
col = mix(col, vec3(0.545, 0.361, 0.965), clamp(pow(f, 3.0) * 1.8, 0.0, 1.0));
col += vec3(0.063, 0.725, 0.506) * (mousePull * 0.22);

// 5. Film Grain Dithering + Vignette Contrast Guard
float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + t * 0.01) * 43758.5453) - 0.5) * 0.038;
col += vec3(grain);
col *= mix(0.55, 1.0, smoothstep(1.3, 0.35, length(vUv - 0.5)));

gl_FragColor = vec4(col, 1.0);`}
            </pre>
          </div>
        )}
      </main>
    </>
  );
}
