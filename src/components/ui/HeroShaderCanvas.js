import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Vertex shader: Fullscreen quad covering normalized device coordinates (-1 to 1)
const VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

// Fragment shader: Interactive Aurora Flow Field with Domain Warping & Film Grain
const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_reduced_motion;

varying vec2 vUv;

// --- Section 1: Procedural Noise Utilities (Simplex / Hash) ---
// Hash without sine to prevent floating-point precision artefacts on mobile GPUs
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// 2D Value/Gradient Noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Fractal Brownian Motion (4 octaves) for organic fluid filaments
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  // --- Section 2: Coordinate Normalization & Aspect Ratio Correction ---
  vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  
  // Aspect-normalized mouse coordinates
  vec2 mouseNorm = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // --- Section 3: Interactive Mouse Influence ---
  // Mouse proximity creates a gentle gravitational warp on the flow field
  vec2 mouseDelta = st - mouseNorm;
  float distToMouse = length(mouseDelta);
  float mousePull = exp(-distToMouse * 3.5);
  st += normalize(mouseDelta + 0.0001) * mousePull * 0.12;

  // Time evolution factor (freeze if reduced motion preferred)
  float t = u_time * (1.0 - u_reduced_motion * 0.98);

  // --- Section 4: Domain Warping (Nested fbm for Fluid Ribbons) ---
  vec2 q = vec2(
    fbm(st + vec2(0.0, 0.0) + 0.04 * t),
    fbm(st + vec2(5.2, 1.3) + 0.05 * t)
  );

  vec2 r = vec2(
    fbm(st + 3.0 * q + vec2(1.7, 9.2) + 0.08 * t),
    fbm(st + 3.0 * q + vec2(8.3, 2.8) + 0.06 * t)
  );

  float f = fbm(st + 3.5 * r + 0.02 * t);

  // --- Section 5: Signature Luxury Aurora Palette ---
  // Deep obsidian base: #0b0f17
  vec3 bgCol = vec3(0.043, 0.059, 0.090);
  
  // Emerald glow (Philip brand accent): #10b981
  vec3 emerald = vec3(0.063, 0.725, 0.506);
  
  // Deep sapphire indigo: #2563eb
  vec3 sapphire = vec3(0.145, 0.388, 0.922);
  
  // Radiant amethyst highlight: #8b5cf6
  vec3 amethyst = vec3(0.545, 0.361, 0.965);

  // Mix layers based on nested fbm values
  vec3 col = mix(bgCol, sapphire, clamp(length(q) * 0.9, 0.0, 1.0));
  col = mix(col, emerald, clamp(pow(r.x, 2.0) * 1.4, 0.0, 1.0));
  col = mix(col, amethyst, clamp(pow(f, 3.0) * 1.8, 0.0, 1.0));

  // Subtle luminous core near cursor
  col += emerald * (mousePull * 0.22);

  // --- Section 6: Film Grain & Dithering Pass ---
  // High-frequency pseudo-random noise prevents 8-bit banding across soft gradients
  float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + t * 0.01) * 43758.5453) - 0.5) * 0.038;
  col += vec3(grain);

  // --- Section 7: Radial Vignette & Contrast Guard ---
  // Keeps edges softly darkened and ensures text layered on top remains WCAG readable
  float vignette = smoothstep(1.3, 0.35, length(vUv - 0.5));
  col *= mix(0.55, 1.0, vignette);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroShaderCanvas({ className = "" }) {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check system prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Capped Device Pixel Ratio for mobile GPU safety
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      alpha: true,
      stencil: false,
      depth: false,
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Dynamic Uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
      u_mouse: { value: new THREE.Vector2(width * 0.5 * dpr, height * 0.5 * dpr) },
      u_reduced_motion: { value: mediaQuery.matches ? 1.0 : 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Smooth Mouse Damping (Lerp)
    let targetMouseX = width * 0.5 * dpr;
    let targetMouseY = height * 0.5 * dpr;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (rect.height - (e.clientY - rect.top)) * dpr; // Invert Y for GLSL
      targetMouseX = x;
      targetMouseY = y;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        targetMouseX = (touch.clientX - rect.left) * dpr;
        targetMouseY = (rect.height - (touch.clientY - rect.top)) * dpr;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Window Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w * dpr, h * dpr);
    };
    window.addEventListener("resize", handleResize);

    // Visibility Observer (Pause animation when tab is inactive)
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause rendering when tab hidden

      const elapsedTime = clock.getElapsedTime();
      uniforms.u_time.value = elapsedTime;

      // Mouse lerp damping (0.05 speed for smooth organic glide)
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup Lifecycle on Component Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      mediaQuery.removeEventListener("change", handleMediaChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {reducedMotion && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f17] via-[#0e2a38] to-[#141d2e] opacity-90" />
      )}
    </div>
  );
}
