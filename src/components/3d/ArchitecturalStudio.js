import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Preset Color & Material Definitions
const MATERIAL_PRESETS = {
  obsidian: { name: "Obsidian Matte", color: "#1e232a", roughness: 0.85, metalness: 0.15 },
  cedar: { name: "Nordic Cedar", color: "#92633e", roughness: 0.65, metalness: 0.05 },
  terracotta: { name: "Warm Terracotta", color: "#b35436", roughness: 0.8, metalness: 0.05 },
  marble: { name: "Carrara Marble", color: "#e2e8f0", roughness: 0.35, metalness: 0.1 },
  titanium: { name: "Brushed Titanium", color: "#94a3b8", roughness: 0.25, metalness: 0.85 },
  emerald: { name: "Emerald Slate", color: "#064e3b", roughness: 0.45, metalness: 0.2 },
};

const GLASS_TINTS = {
  clear: { name: "Crystal Clear", color: "#ffffff", opacity: 0.35 },
  azure: { name: "Solar Azure", color: "#38bdf8", opacity: 0.45 },
  smoked: { name: "Smoked Obsidian", color: "#0f172a", opacity: 0.65 },
  bronze: { name: "Sunset Bronze", color: "#d97706", opacity: 0.45 },
};

const LIGHTING_PRESETS = {
  golden: {
    name: "Golden Hour",
    bg: 0x181512,
    ambient: { color: 0xffedd5, intensity: 1.2 },
    main: { color: 0xf59e0b, intensity: 2.8, pos: [6, 7, 5] },
    fill: { color: 0xc2410c, intensity: 1.0, pos: [-6, 3, -4] },
    rim: { color: 0xfde68a, intensity: 1.4, pos: [0, 8, -6] }
  },
  studio: {
    name: "Clean Studio",
    bg: 0x111622,
    ambient: { color: 0xe2e8f0, intensity: 1.4 },
    main: { color: 0xffffff, intensity: 2.2, pos: [5, 8, 5] },
    fill: { color: 0x94a3b8, intensity: 0.9, pos: [-5, 4, -4] },
    rim: { color: 0x38bdf8, intensity: 1.2, pos: [0, 7, -6] }
  },
  midnight: {
    name: "Cyber Midnight",
    bg: 0x090d16,
    ambient: { color: 0x1e293b, intensity: 0.8 },
    main: { color: 0x06b6d4, intensity: 2.5, pos: [6, 6, 4] },
    fill: { color: 0xec4899, intensity: 1.8, pos: [-5, 3, -3] },
    rim: { color: 0x818cf8, intensity: 2.0, pos: [0, 8, -5] }
  },
  noon: {
    name: "Architectural Sun",
    bg: 0x171923,
    ambient: { color: 0xffffff, intensity: 1.5 },
    main: { color: 0xfffbeb, intensity: 3.2, pos: [2, 10, 3] },
    fill: { color: 0xdbeafe, intensity: 0.8, pos: [-4, 3, -5] },
    rim: { color: 0xffffff, intensity: 0.7, pos: [0, 5, -5] }
  }
};

const CAMERA_VIEWS = {
  hero: { pos: [6, 4.5, 7], target: [0, 0.8, 0] },
  front: { pos: [0, 2.2, 8.5], target: [0, 0.8, 0] },
  top: { pos: [0, 11, 0.1], target: [0, 0.5, 0] },
  detail: { pos: [3.2, 1.8, 3.2], target: [0.5, 1.0, 0] }
};

export default function ArchitecturalStudio() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameRef = useRef(null);

  // References to dynamic 3D objects
  const rootModelGroupRef = useRef(null);
  const roofSubGroupRef = useRef(null);
  const primaryMaterialsRef = useRef([]);
  const glassMaterialsRef = useRef([]);
  const lightsRef = useRef({});
  const isCustomModelRef = useRef(false);

  // Studio Interactive State
  const [activeMaterial, setActiveMaterial] = useState("obsidian");
  const [roughness, setRoughness] = useState(0.85);
  const [metalness, setMetalness] = useState(0.15);
  const [wireframe, setWireframe] = useState(false);
  const [glassTint, setGlassTint] = useState("azure");
  const [lightingPreset, setLightingPreset] = useState("studio");
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotateSpeed, setRotateSpeed] = useState(1.0);
  const [explodedView, setExplodedView] = useState(false);
  const [activeCameraView, setActiveCameraView] = useState("hero");
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [modelName, setModelName] = useState("Pavilion Horizon (Procedural 3D)");

  // FE-10 Performance Telemetry State
  const [fps, setFps] = useState(60);
  const [drawCalls, setDrawCalls] = useState(0);
  const [triangleCount, setTriangleCount] = useState(0);
  const [dpr, setDpr] = useState(1.0);

  // Build the Procedural Modern Architectural Pavilion
  const buildProceduralPavilion = useCallback(() => {
    const root = new THREE.Group();
    root.name = "ArchitecturalPavilion";

    // 1. Primary Facade Wall Material
    const preset = MATERIAL_PRESETS[activeMaterial];
    const wallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(preset.color),
      roughness: roughness,
      metalness: metalness,
      wireframe: wireframe,
    });
    primaryMaterialsRef.current = [wallMat];

    // 2. Glass Material
    const tint = GLASS_TINTS[glassTint];
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(tint.color),
      transparent: true,
      opacity: tint.opacity,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.5,
      wireframe: wireframe,
    });
    glassMaterialsRef.current = [glassMat];

    // 3. Foundation / Podium Base (Dark Terrazzo / Basalt)
    const baseGeo = new THREE.BoxGeometry(6.8, 0.4, 5.2);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      roughness: 0.9,
      metalness: 0.1,
      wireframe: wireframe,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.2;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    root.add(baseMesh);

    // 4. Sunken Reflective Infinity Pool
    const poolGeo = new THREE.BoxGeometry(2.4, 0.1, 1.8);
    const poolMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.1,
      metalness: 0.8,
    });
    const poolMesh = new THREE.Mesh(poolGeo, poolMat);
    poolMesh.position.set(1.9, 0.36, 1.3);
    root.add(poolMesh);

    // 5. Main Architectural Rear & Side Walls
    const backWallGeo = new THREE.BoxGeometry(5.2, 2.2, 0.3);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(-0.4, 1.5, -1.8);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    root.add(backWall);

    const sideWallGeo = new THREE.BoxGeometry(0.3, 2.2, 3.8);
    const sideWall = new THREE.Mesh(sideWallGeo, wallMat);
    sideWall.position.set(-2.85, 1.5, -0.05);
    sideWall.castShadow = true;
    sideWall.receiveShadow = true;
    root.add(sideWall);

    // 6. Architectural Vertical Slats / Brise-Soleil
    const slatMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.6,
      metalness: 0.3,
      wireframe: wireframe,
    });
    for (let i = 0; i < 7; i++) {
      const slatGeo = new THREE.BoxGeometry(0.08, 2.2, 0.15);
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(-2.2 + i * 0.45, 1.5, 1.8);
      slat.castShadow = true;
      root.add(slat);
    }

    // 7. Interior Living Accent & Hearth Core
    const coreGeo = new THREE.BoxGeometry(1.6, 2.0, 1.4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.7,
      metalness: 0.2,
      wireframe: wireframe,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(-0.8, 1.4, -0.2);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    root.add(coreMesh);

    // 8. Structural Cantilever Pillars (Brushed Titanium Bronze)
    const pillarGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.2, 16);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0xca8a04,
      roughness: 0.3,
      metalness: 0.8,
    });
    const p1 = new THREE.Mesh(pillarGeo, pillarMat);
    p1.position.set(2.4, 1.5, 1.8);
    p1.castShadow = true;
    root.add(p1);

    const p2 = new THREE.Mesh(pillarGeo, pillarMat);
    p2.position.set(2.4, 1.5, -1.8);
    p2.castShadow = true;
    root.add(p2);

    // 9. Floating Cantilever Roof + Panoramic Glass Curtain (Separate group for Exploded Inspection View!)
    const roofGroup = new THREE.Group();
    roofGroup.name = "RoofInspectionGroup";

    // Roof Slab
    const roofGeo = new THREE.BoxGeometry(7.2, 0.3, 5.6);
    const roofMesh = new THREE.Mesh(roofGeo, wallMat);
    roofMesh.position.set(0, 2.75, 0);
    roofMesh.castShadow = true;
    roofMesh.receiveShadow = true;
    roofGroup.add(roofMesh);

    // Cantilever Overhang Trim
    const trimGeo = new THREE.BoxGeometry(7.3, 0.08, 5.7);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.4,
      metalness: 0.6,
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.position.set(0, 2.88, 0);
    roofGroup.add(trimMesh);

    // Panoramic Front Glass Wall
    const frontGlassGeo = new THREE.BoxGeometry(3.6, 2.1, 0.05);
    const frontGlass = new THREE.Mesh(frontGlassGeo, glassMat);
    frontGlass.position.set(0.6, 1.48, 1.8);
    frontGlass.castShadow = false;
    roofGroup.add(frontGlass);

    // Panoramic Right Glass Wall
    const rightGlassGeo = new THREE.BoxGeometry(0.05, 2.1, 3.6);
    const rightGlass = new THREE.Mesh(rightGlassGeo, glassMat);
    rightGlass.position.set(2.4, 1.48, 0);
    rightGlass.castShadow = false;
    roofGroup.add(rightGlass);

    root.add(roofGroup);
    roofSubGroupRef.current = roofGroup;

    return root;
  }, [activeMaterial, roughness, metalness, wireframe, glassTint]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect user reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setAutoRotate(false);
      setLowPowerMode(true);
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    const activeLightCfg = LIGHTING_PRESETS[lightingPreset];
    scene.background = new THREE.Color(activeLightCfg.bg);
    scene.fog = new THREE.FogExp2(activeLightCfg.bg, 0.045);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const defaultCam = CAMERA_VIEWS.hero;
    camera.position.set(...defaultCam.pos);
    cameraRef.current = camera;

    // 3. Renderer with Clamped DPR (FE-10 performance budget)
    const clampedDpr = Math.min(window.devicePixelRatio || 1, 1.75);
    setDpr(clampedDpr);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(clampedDpr);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // Clean previous canvases if any
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = "none";

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(...defaultCam.target);
    controls.maxPolarAngle = Math.PI / 2 + 0.02; // Prevent underground camera
    controls.minDistance = 2.5;
    controls.maxDistance = 24;
    controls.autoRotate = autoRotate && !prefersReducedMotion;
    controls.autoRotateSpeed = rotateSpeed * 1.5;
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      activeLightCfg.ambient.color,
      activeLightCfg.ambient.intensity
    );
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(
      activeLightCfg.main.color,
      activeLightCfg.main.intensity
    );
    mainLight.position.set(...activeLightCfg.main.pos);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 25;
    mainLight.shadow.camera.left = -6;
    mainLight.shadow.camera.right = 6;
    mainLight.shadow.camera.top = 6;
    mainLight.shadow.camera.bottom = -6;
    mainLight.shadow.bias = -0.0005;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(
      activeLightCfg.fill.color,
      activeLightCfg.fill.intensity
    );
    fillLight.position.set(...activeLightCfg.fill.pos);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(
      activeLightCfg.rim.color,
      activeLightCfg.rim.intensity
    );
    rimLight.position.set(...activeLightCfg.rim.pos);
    scene.add(rimLight);

    lightsRef.current = { ambient: ambientLight, main: mainLight, fill: fillLight, rim: rimLight };

    // 6. Ground Shadow Receiver & Grid Disc
    const groundGeo = new THREE.PlaneGeometry(28, 28);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x12151c,
      roughness: 0.95,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(24, 24, 0x334155, 0x1e293b);
    grid.position.y = 0.005;
    scene.add(grid);

    // 7. Load Default Procedural Model
    const pavilion = buildProceduralPavilion();
    scene.add(pavilion);
    rootModelGroupRef.current = pavilion;
    isCustomModelRef.current = false;

    // 8. Animation & Telemetry Loop
    let lastTime = performance.now();
    let frameCounter = 0;
    let fpsTimer = performance.now();

    const animate = (time) => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Frame Rate calculation (averaged every 500ms)
      frameCounter++;
      if (time - fpsTimer >= 500) {
        setFps(Math.round((frameCounter * 1000) / (time - fpsTimer)));
        frameCounter = 0;
        fpsTimer = time;
      }

      // Smooth Exploded View Interpolation
      if (roofSubGroupRef.current && !isCustomModelRef.current) {
        const targetY = explodedView ? 2.2 : 0.0;
        roofSubGroupRef.current.position.y += (targetY - roofSubGroupRef.current.position.y) * 0.08;
      }

      controls.update();
      renderer.render(scene, camera);

      // Capture Render Info
      setDrawCalls(renderer.info.render.calls);
      setTriangleCount(renderer.info.render.triangles);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // 9. Resize Listener
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 10. Cleanup on Unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      // Dispose all scene objects to prevent memory leaks
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      controls.dispose();
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, [buildProceduralPavilion]);

  // Update Materials Dynamically when state changes
  useEffect(() => {
    const preset = MATERIAL_PRESETS[activeMaterial];
    primaryMaterialsRef.current.forEach((mat) => {
      if (preset && mat.color) mat.color.set(preset.color);
      mat.roughness = roughness;
      mat.metalness = metalness;
      mat.wireframe = wireframe;
      mat.needsUpdate = true;
    });

    const tint = GLASS_TINTS[glassTint];
    glassMaterialsRef.current.forEach((mat) => {
      if (tint && mat.color) mat.color.set(tint.color);
      mat.opacity = tint.opacity;
      mat.wireframe = wireframe;
      mat.needsUpdate = true;
    });
  }, [activeMaterial, roughness, metalness, wireframe, glassTint]);

  // Update Lighting Preset Dynamically
  useEffect(() => {
    if (!sceneRef.current || !lightsRef.current.main) return;
    const cfg = LIGHTING_PRESETS[lightingPreset];

    sceneRef.current.background = new THREE.Color(cfg.bg);
    if (sceneRef.current.fog) {
      sceneRef.current.fog.color = new THREE.Color(cfg.bg);
    }

    lightsRef.current.ambient.color.set(cfg.ambient.color);
    lightsRef.current.ambient.intensity = cfg.ambient.intensity;

    lightsRef.current.main.color.set(cfg.main.color);
    lightsRef.current.main.intensity = cfg.main.intensity;
    lightsRef.current.main.position.set(...cfg.main.pos);

    lightsRef.current.fill.color.set(cfg.fill.color);
    lightsRef.current.fill.intensity = cfg.fill.intensity;
    lightsRef.current.fill.position.set(...cfg.fill.pos);

    lightsRef.current.rim.color.set(cfg.rim.color);
    lightsRef.current.rim.intensity = cfg.rim.intensity;
    lightsRef.current.rim.position.set(...cfg.rim.pos);
  }, [lightingPreset]);

  // Update Auto-Rotate and Speed
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = rotateSpeed * 1.5;
    }
  }, [autoRotate, rotateSpeed]);

  // Camera View Transition
  const switchCameraView = (viewKey) => {
    setActiveCameraView(viewKey);
    const view = CAMERA_VIEWS[viewKey];
    if (!view || !cameraRef.current || !controlsRef.current) return;

    // Smoothly animate camera position
    const startPos = cameraRef.current.position.clone();
    const endPos = new THREE.Vector3(...view.pos);
    const startTarget = controlsRef.current.target.clone();
    const endTarget = new THREE.Vector3(...view.target);

    let progress = 0;
    const duration = 25; // frames

    const stepTransition = () => {
      progress += 1;
      const t = progress / duration;
      const ease = 0.5 - Math.cos(t * Math.PI) / 2; // Ease in-out

      cameraRef.current.position.lerpVectors(startPos, endPos, ease);
      controlsRef.current.target.lerpVectors(startTarget, endTarget, ease);
      controlsRef.current.update();

      if (progress < duration) {
        requestAnimationFrame(stepTransition);
      }
    };
    requestAnimationFrame(stepTransition);
  };

  // Reset Camera to Default
  const resetCamera = () => {
    switchCameraView("hero");
  };

  // Handle Drag-and-Drop GLB/GLTF Upload
  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);

    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".glb") && !fileName.endsWith(".gltf")) {
      alert("Please upload a .glb or .gltf 3D model.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target.result;
      const loader = new GLTFLoader();

      loader.parse(
        buffer,
        "",
        (gltf) => {
          if (!sceneRef.current) return;

          // Remove previous model
          if (rootModelGroupRef.current) {
            sceneRef.current.remove(rootModelGroupRef.current);
          }

          const model = gltf.scene;
          model.name = "CustomUploadedModel";

          // Calculate bounding box and normalize scale & center
          const box = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          // Auto-scale to fit roughly 4 units
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const targetScale = 4.0 / maxDim;
          model.scale.setScalar(targetScale);

          // Center at ground level
          model.position.x = -center.x * targetScale;
          model.position.y = -box.min.y * targetScale;
          model.position.z = -center.z * targetScale;

          // Enable shadows and collect materials for configurator
          const collectedMats = [];
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                if (Array.isArray(child.material)) {
                  collectedMats.push(...child.material);
                } else {
                  collectedMats.push(child.material);
                }
              }
            }
          });

          primaryMaterialsRef.current = collectedMats;
          isCustomModelRef.current = true;
          rootModelGroupRef.current = model;
          sceneRef.current.add(model);

          setModelName(file.name);
          resetCamera();
        },
        (error) => {
          console.error("Error parsing GLB file:", error);
          alert("Failed to parse 3D GLB model.");
        }
      );
    };

    reader.readAsArrayBuffer(file);
  };

  // Restore Default Procedural Architecture
  const restoreDefaultModel = () => {
    if (!sceneRef.current) return;
    if (rootModelGroupRef.current) {
      sceneRef.current.remove(rootModelGroupRef.current);
    }
    const defaultModel = buildProceduralPavilion();
    sceneRef.current.add(defaultModel);
    rootModelGroupRef.current = defaultModel;
    isCustomModelRef.current = false;
    setModelName("Pavilion Horizon (Procedural 3D)");
    resetCamera();
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 3D Canvas Viewport Container */}
      <div
        className={`relative w-full h-[520px] sm:h-[620px] lg:h-[720px] rounded-2xl overflow-hidden border transition-all ${
          isDraggingFile
            ? "border-light-accent dark:border-dark-accent ring-4 ring-light-accent/20"
            : "border-light-border dark:border-dark-border"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingFile(true);
        }}
        onDragLeave={() => setIsDraggingFile(false)}
        onDrop={handleFileDrop}
      >
        {/* WebGL Canvas Mount */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Drag & Drop Overlay Prompt */}
        {isDraggingFile && (
          <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none z-30">
            <div className="w-16 h-16 rounded-full bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg flex items-center justify-center mb-4 animate-bounce">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-lg font-bold text-white">Drop .GLB or .GLTF to Stage Model</p>
            <p className="text-sm text-gray-300">Auto Centered · Scaled to Frustum · Shadows Enabled</p>
          </div>
        )}

        {/* Top Left: Model Badge and Staging Info */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-light-bg/85 dark:bg-dark-bg/85 backdrop-blur-md border border-light-border/60 dark:border-dark-border/60 shadow-sm pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-light-text dark:text-dark-text max-w-[200px] sm:max-w-xs truncate">
              {modelName}
            </span>
            {isCustomModelRef.current && (
              <button
                onClick={restoreDefaultModel}
                className="text-[10px] font-bold uppercase tracking-wider text-light-accent dark:text-dark-accent hover:underline ml-1"
              >
                Reset Default
              </button>
            )}
          </div>
          <div className="text-[10px] font-mono text-gray-400 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg w-fit">
            Drag and Drop any .GLB onto canvas
          </div>
        </div>

        {/* Top Right: FE10 Performance Telemetry HUD */}
        <div className="absolute top-4 right-4 z-20 pointer-events-auto">
          <div className="p-3 rounded-xl bg-dark-bg/90 backdrop-blur-md border border-dark-border text-xs font-mono text-gray-300 shadow-xl flex flex-col gap-1 min-w-[155px]">
            <div className="flex items-center justify-between border-b border-dark-border/60 pb-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-dark-accent">
                FE10 Perf HUD
              </span>
              <span className={`font-bold ${fps >= 55 ? "text-emerald-400" : fps >= 30 ? "text-amber-400" : "text-rose-400"}`}>
                {fps} FPS
              </span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-400">Draw Calls:</span>
              <span className="font-semibold text-white">{drawCalls}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-400">Polygons:</span>
              <span className="font-semibold text-white">{triangleCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-400">Clamped DPR:</span>
              <span className="font-semibold text-white">{dpr.toFixed(2)}x</span>
            </div>
            <div className="flex justify-between text-[11px] pt-1 border-t border-dark-border/40">
              <span className="text-gray-400">Memory Load:</span>
              <span className="font-semibold text-emerald-400">Optimized</span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Bar: View Presets and Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Camera View Selector */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md border border-light-border dark:border-dark-border shadow-lg pointer-events-auto">
            <span className="text-[11px] font-semibold px-2 text-light-secondary dark:text-dark-secondary hidden sm:inline">
              Camera:
            </span>
            {[
              { id: "hero", label: "Perspective" },
              { id: "front", label: "Elevation" },
              { id: "top", label: "Floorplan" },
              { id: "detail", label: "Closeup" },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => switchCameraView(v.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeCameraView === v.id
                    ? "bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg font-semibold shadow-sm"
                    : "text-light-secondary dark:text-dark-secondary hover:text-light-text dark:hover:text-dark-text"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Quick Actions (Exploded View, Auto Rotate, Reset) */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {!isCustomModelRef.current && (
              <button
                onClick={() => setExplodedView(!explodedView)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold backdrop-blur-md border transition-all ${
                  explodedView
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300 ring-2 ring-amber-500/30"
                    : "bg-light-bg/90 dark:bg-dark-bg/90 border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-light-accent"
                }`}
                title="Explode Cantilever Roof to Inspect Interior Floorplan"
              >
                {explodedView ? "Collapse Roof" : "Inspect Interior"}
              </button>
            )}

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold backdrop-blur-md border transition-all ${
                autoRotate
                  ? "bg-light-accent/20 dark:bg-dark-accent/20 border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent"
                  : "bg-light-bg/90 dark:bg-dark-bg/90 border-light-border dark:border-dark-border text-light-secondary dark:text-dark-secondary"
              }`}
            >
              {autoRotate ? "Rotate ON" : "Rotate OFF"}
            </button>

            <button
              onClick={resetCamera}
              className="p-2 rounded-xl bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-light-accent transition-colors"
              title="Reset Camera Target"
              aria-label="Reset Camera"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Configurator Control Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-light-surface/60 dark:bg-dark-surface/60 backdrop-blur-md border border-light-border dark:border-dark-border">
        {/* Module 1: Architectural Facade Material Finishes */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-light-text dark:text-dark-text flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-light-accent dark:bg-dark-accent" />
            Facade Material
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(MATERIAL_PRESETS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveMaterial(key);
                  setRoughness(item.roughness);
                  setMetalness(item.metalness);
                }}
                className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                  activeMaterial === key
                    ? "border-light-accent dark:border-dark-accent bg-light-accent/10 dark:bg-dark-accent/10 ring-1 ring-light-accent/40"
                    : "border-light-border dark:border-dark-border hover:border-light-secondary"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-white/20 mb-1 shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] font-medium text-light-text dark:text-dark-text truncate w-full">
                  {item.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Module 2: Lighting & Staging Environment */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-light-text dark:text-dark-text flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Staging Lighting
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(LIGHTING_PRESETS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setLightingPreset(key)}
                className={`px-3 py-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  lightingPreset === key
                    ? "border-amber-400 bg-amber-400/10 text-light-text dark:text-dark-text font-semibold ring-1 ring-amber-400/30"
                    : "border-light-border dark:border-dark-border text-light-secondary dark:text-dark-secondary hover:text-light-text dark:hover:text-dark-text"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Module 3: Panoramic Glass Tint */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-light-text dark:text-dark-text flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Glass Curtain Tint
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(GLASS_TINTS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setGlassTint(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left text-xs font-medium transition-all ${
                  glassTint === key
                    ? "border-sky-400 bg-sky-400/10 text-light-text dark:text-dark-text font-semibold ring-1 ring-sky-400/30"
                    : "border-light-border dark:border-dark-border text-light-secondary dark:text-dark-secondary hover:text-light-text dark:hover:text-dark-text"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Module 4: Fine Surface Tuning & Wireframe */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-light-text dark:text-dark-text flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Surface Tuning
            </span>
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                wireframe ? "bg-purple-500 text-white" : "bg-light-border dark:bg-dark-border text-gray-400"
              }`}
            >
              Wireframe
            </button>
          </label>

          {/* Roughness Slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-light-secondary dark:text-dark-secondary">
              <span>Roughness</span>
              <span className="font-mono font-medium">{roughness.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={roughness}
              onChange={(e) => setRoughness(parseFloat(e.target.value))}
              className="w-full accent-light-accent dark:accent-dark-accent h-1.5 bg-light-border dark:bg-dark-border rounded-lg cursor-pointer"
            />
          </div>

          {/* Metalness Slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-light-secondary dark:text-dark-secondary">
              <span>Metalness</span>
              <span className="font-mono font-medium">{metalness.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={metalness}
              onChange={(e) => setMetalness(parseFloat(e.target.value))}
              className="w-full accent-light-accent dark:accent-dark-accent h-1.5 bg-light-border dark:bg-dark-border rounded-lg cursor-pointer"
            />
          </div>

          {/* Rotate Speed Slider */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-light-secondary dark:text-dark-secondary">
              <span>Turntable Speed</span>
              <span className="font-mono font-medium">{rotateSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.2"
              value={rotateSpeed}
              onChange={(e) => setRotateSpeed(parseFloat(e.target.value))}
              className="w-full accent-light-accent dark:accent-dark-accent h-1.5 bg-light-border dark:bg-dark-border rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
