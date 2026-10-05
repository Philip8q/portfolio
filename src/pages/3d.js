import Head from "next/head";
import Link from "next/link";
import StudioWrapper from "@/components/3d/StudioWrapper";
import { siteConfig } from "@/data/siteConfig";

export default function ThreeDStudioPage() {
  return (
    <>
      <Head>
        <title>3D Architectural Studio | {siteConfig.name}</title>
        <meta
          name="description"
          content="Interactive 3D Architectural Model and Asset Configurator by Philip Omondi. Built with Three.js, WebGL, custom staging lighting, drag and drop GLB support, and FE10 performance budget."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`3D Architectural Studio | ${siteConfig.name}`} />
        <meta
          property="og:description"
          content="Interactive 3D Architectural Model and Asset Configurator by Philip Omondi. Explore materials, lighting, and interior floorplans."
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <div className="pt-28 pb-20 px-6 sm:px-8 max-w-[1400px] mx-auto">
        {/* Header Breadcrumbs & Title */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-light-accent dark:text-dark-accent">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Week 7 Experience</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light-text dark:text-dark-text">
                Ardhia 3D Architectural Studio
              </h1>
              <p className="mt-2 text-sm sm:text-base text-light-secondary dark:text-dark-secondary max-w-2xl">
                Interactive real time 3D model configurator for Kenyan real estate brokerages and architectural assets. Test materials, lighting environments, camera elevations, or drop your own <code className="px-1.5 py-0.5 rounded bg-light-surface dark:bg-dark-surface font-mono text-xs">.glb</code> file onto the canvas.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                FE10 Verified · 60 FPS
              </span>
            </div>
          </div>
        </div>

        {/* Main 3D Experience Canvas & Configurator Deck */}
        <StudioWrapper />

        {/* Technical Explainer & FE10 Lens Specifications */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-light-border dark:border-dark-border">
          {/* Card 1: The Loop */}
          <div className="p-6 rounded-2xl bg-light-surface/40 dark:bg-dark-surface/40 border border-light-border dark:border-dark-border flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-light-text dark:text-dark-text">
              The 3D Web Loop
            </h3>
            <p className="text-xs text-light-secondary dark:text-dark-secondary leading-relaxed">
              Engineered using raw Three.js primitives for zero overhead performance. Includes procedural architectural geometry (Villa Horizon), 3 point staged lighting, PCF soft shadows, ACES Filmic tone mapping, and a full drag and drop GLTFLoader parser.
            </p>
          </div>

          {/* Card 2: Meaningful Interactions */}
          <div className="p-6 rounded-2xl bg-light-surface/40 dark:bg-dark-surface/40 border border-light-border dark:border-dark-border flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-light-text dark:text-dark-text">
              Beyond Orbiting
            </h3>
            <p className="text-xs text-light-secondary dark:text-dark-secondary leading-relaxed">
              Features live material switching (Obsidian, Cedar, Terracotta, Marble), roughness and metalness fine tuning, wireframe toggles, 4 lighting environments, camera transitions, and an animated Exploded Inspection View that lifts the cantilevered roof to reveal the interior floorplan.
            </p>
          </div>

          {/* Card 3: FE10 Performance Budget */}
          <div className="p-6 rounded-2xl bg-light-surface/40 dark:bg-dark-surface/40 border border-light-border dark:border-dark-border flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-light-text dark:text-dark-text">
              Responsible Loading (FE10)
            </h3>
            <p className="text-xs text-light-secondary dark:text-dark-secondary leading-relaxed">
              Code split with Next.js dynamic imports (<code className="font-mono">ssr: false</code>). Clamped Device Pixel Ratio (<code className="font-mono">max 1.75x</code>) prevents GPU overheating on mobile retina screens. Includes automatic <code className="font-mono">prefers-reduced-motion</code> detection and a static fallback mode.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
