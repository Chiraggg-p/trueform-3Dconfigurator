import { useEffect, useRef, useState, useCallback, Component, type ReactNode } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import QRCode from "qrcode";
import {
  RotateCcw,
  Layers,
  Eye,
  Camera,
  QrCode,
  Sparkles,
  Sun,
  Moon,
  Zap,
  Check,
  Loader2,
  Smartphone,
  Copy,
  ExternalLink,
  LayoutGrid,
  ChevronUp,
  ChevronRight,
  SportShoe,
  Luggage,
  Watch,
  Glasses,
  Headphones,
} from "lucide-react";

// ─── Product Model Registry ──────────────────────────────────────────────────
const PRODUCT_MODELS = [
  {
    id: "headphones",
    label: "Headphones",
    emoji: "🎧",
    glb: null as string | null,
    usdz: null as string | null,
    hasAR: false,
    isFaceTryOn: false,
    hasCustomMaterials: true,
    productName: "Studio Pro Wireless",
    productDesc: "40mm Beryllium drivers, active noise cancellation, custom PBR material pipeline.",
    price: "$249.00",
    category: "Audio",
  },
  {
    id: "shoes",
    label: "Shoes",
    emoji: "👟",
    glb: "/models/Shoes.glb",
    usdz: null as string | null,
    hasAR: true,
    isFaceTryOn: false,
    productName: "Urban Street Classic",
    productDesc: "Vulcanized rubber sole, high-density canvas upper, waffle tread traction.",
    price: "$149.00",
    category: "Footwear",
  },
  {
    id: "suitcase",
    label: "Suitcase",
    emoji: "🧳",
    glb: "/models/Suitcase.glb",
    usdz: null as string | null,
    hasAR: true,
    isFaceTryOn: false,
    productName: "Hardshell Travel Case",
    productDesc: "Premium polycarbonate shell, 360° spinner wheels, TSA-approved locking system.",
    price: "$189.00",
    category: "Travel",
  },
  {
    id: "watch",
    label: "Watch",
    emoji: "⌚",
    glb: "/models/Watch.glb",
    usdz: null as string | null,
    hasAR: true,
    isFaceTryOn: false,
    productName: "Chronos Elite",
    productDesc: "Swiss-grade movement, sapphire crystal glass, 316L surgical steel case & strap.",
    price: "$399.00",
    category: "Timepiece",
  },
  {
    id: "eyeglasses",
    label: "Eyeglasses",
    emoji: "👓",
    glb: "/models/Eyeglasses.glb",
    usdz: "/models/Eyeglasses.usdz",
    hasAR: true,
    isFaceTryOn: true,
    productName: "Frame Studio AR",
    productDesc: "Premium acetate frames with live AR face try-on. Scan or point your phone to try on live in 3D.",
    price: "$128.00",
    category: "Eyewear",
  },
] as const;

type ModelId = (typeof PRODUCT_MODELS)[number]["id"];

const PRODUCT_ICON_MAP: Record<ModelId, React.ComponentType<{ size?: number; className?: string }>> = {
  headphones: Headphones,
  shoes: SportShoe,
  suitcase: Luggage,
  watch: Watch,
  eyeglasses: Glasses,
};

// ─── Headphone Colorway Presets ──────────────────────────────────────────────
const SHELL_COLORS = [
  { name: "Obsidian Matte", hex: "#1e2128", metalness: 0.1, roughness: 0.6 },
  { name: "Cyber Silver", hex: "#e2e8f0", metalness: 0.85, roughness: 0.18 },
  { name: "Royal Indigo", hex: "#3952fc", metalness: 0.35, roughness: 0.4 },
  { name: "Crimson Core", hex: "#b91c1c", metalness: 0.4, roughness: 0.35 },
];
const ACCENT_FINISHES = [
  { name: "Brushed Chrome", hex: "#cbd5e1", metalness: 0.95, roughness: 0.15 },
  { name: "Champagne Gold", hex: "#d97706", metalness: 0.92, roughness: 0.2 },
  { name: "Rose Copper", hex: "#fb7185", metalness: 0.88, roughness: 0.2 },
];
const CUSHION_MATERIALS = [
  { name: "Perforated Nappa", hex: "#1e293b", roughness: 0.8 },
  { name: "Slate Heather", hex: "#475569", roughness: 0.95 },
  { name: "Alpine Chalk", hex: "#e2e8f0", roughness: 0.75 },
];
const LIGHTING_MODES = [
  { id: "studio", name: "Studio Pro", icon: Sun },
  { id: "cyber", name: "Cyber Neon", icon: Zap },
  { id: "dark", name: "Moody Dark", icon: Moon },
];

// ─── Shoes Material Options (Synchronized pair with preserved texture & contrast) ───
const SHOES_COLORWAYS = [
  {
    name: "Classic Canvas",
    hex: "#ffffff",
    roughness: 0.85,
    metalness: 0.0,
    swatch: "#f8fafc",
    desc: "Original factory white canvas & sole",
  },
  {
    name: "Stealth Charcoal",
    hex: "#454a54",
    roughness: 0.8,
    metalness: 0.02,
    swatch: "#334155",
    desc: "Tactical dark canvas with visible weave & white sole contrast",
  },
  {
    name: "Heritage Navy",
    hex: "#263e5c",
    roughness: 0.85,
    metalness: 0.0,
    swatch: "#1e3a5f",
    desc: "Iconic skate navy with crisp contrast stitching",
  },
  {
    name: "Crimson Blaze",
    hex: "#992634",
    roughness: 0.85,
    metalness: 0.0,
    swatch: "#991b1b",
    desc: "Vivid skate red with high-contrast sidewalls",
  },
  {
    name: "Olive Trail",
    hex: "#4d563c",
    roughness: 0.85,
    metalness: 0.0,
    swatch: "#3f4730",
    desc: "Earthy tactical moss green",
  },
];

// ─── Suitcase Material Options ────────────────────────────────────────────────
const SUITCASE_SHELL_COLORS = [
  { name: "Champagne Gold", hex: "#a77302", desc: "Warm metallic bronze shimmer" },
  { name: "Ocean Navy", hex: "#1d4ed8", desc: "Deep gloss aero blue" },
  { name: "Obsidian Black", hex: "#1e2229", desc: "Stealth matte polycarbonate" },
  { name: "Arctic Pearl", hex: "#f1f5f9", desc: "Clean satin white" },
];
const SUITCASE_HARDWARE = [
  { name: "Polished Silver", hex: "#cbd5e1", metalness: 0.96, roughness: 0.12 },
  { name: "Brushed Gold", hex: "#d97706", metalness: 0.92, roughness: 0.2 },
  { name: "Dark Titanium", hex: "#334155", metalness: 0.9, roughness: 0.25 },
];

// ─── Watch Material Options ────────────────────────────────────────────────────
const WATCH_CASE_FINISHES = [
  { name: "316L Surgical Steel", hex: "#b0bec5", metalness: 0.96, roughness: 0.12, swatch: "#94a3b8" },
  { name: "Rose Gold", hex: "#c58269", metalness: 0.96, roughness: 0.12, swatch: "#fb7185" },
  { name: "Midnight PVD", hex: "#262a33", metalness: 0.92, roughness: 0.18, swatch: "#1e293b" },
  { name: "Champagne Gold", hex: "#c8960c", metalness: 0.96, roughness: 0.12, swatch: "#f59e0b" },
];
const WATCH_DIAL_COLORS = [
  { name: "Arctic White", hex: "#f8fafc", swatch: "#ffffff" },
  { name: "Sunburst Blue", hex: "#284e7a", swatch: "#2563eb" },
  { name: "Obsidian Noir", hex: "#20242c", swatch: "#0f172a" },
];

// ─── Eyeglasses Material Options ──────────────────────────────────────────────
const EYEGLASSES_FRAME_COLORS = [
  { name: "Tortoise Havana", hex: "#734320", roughness: 0.25, metalness: 0.02, swatch: "#78350f" },
  { name: "Onyx Black", hex: "#1a1d24", roughness: 0.2, metalness: 0.02, swatch: "#0f172a" },
  { name: "Crystal Clear", hex: "#e2e8f0", roughness: 0.1, metalness: 0.0, swatch: "#f1f5f9" },
  { name: "Burgundy Wine", hex: "#731c24", roughness: 0.25, metalness: 0.02, swatch: "#881337" },
];
const EYEGLASSES_LENS_TINTS = [
  { name: "Optical Clear", hex: "#e2e8f0", opacity: 0.08, swatch: "#f8fafc", desc: "98% Light Transmission" },
  { name: "Smoke Sun", hex: "#262a33", opacity: 0.65, swatch: "#334155", desc: "UV400 Category 3 Protection" },
  { name: "Blue Light Cut", hex: "#2563eb", opacity: 0.22, swatch: "#3b82f6", desc: "Digital Screen Eye Comfort" },
  { name: "Amber Contrast", hex: "#b45309", opacity: 0.45, swatch: "#d97706", desc: "Enhanced Depth & Glare Reduction" },
];

// ─── Utility: Perfectly Center and Fit 3D Model in Viewport ─────────────────
function centerAndFitModel(
  group: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  controls: { zoom: number },
  shadowMesh?: THREE.Mesh | null,
  modelId: ModelId = "headphones"
) {
  // Reset local transforms first
  group.position.set(0, 0, 0);
  group.scale.set(1, 1, 1);
  group.rotation.set(0, 0, 0);
  group.updateMatrixWorld(true);

  // Compute bounding box
  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);

  if (maxDim === 0) return;

  // Calibrated size scale for each product so they look natural and spacious
  let targetSize = 2.45;
  if (modelId === "headphones") targetSize = 2.3;
  else if (modelId === "shoes") targetSize = 2.35;
  else if (modelId === "suitcase") targetSize = 2.5;
  else if (modelId === "watch") targetSize = 2.25;
  else if (modelId === "eyeglasses") targetSize = 2.35;

  const scale = targetSize / maxDim;
  group.scale.setScalar(scale);

  // Center object geometry EXACTLY at (0, 0, 0)
  group.position.x = -center.x * scale;
  group.position.y = -center.y * scale;
  group.position.z = -center.z * scale;
  group.updateMatrixWorld(true);

  // Position ground contact shadow right at the bottom of the object
  if (shadowMesh) {
    const bottomY = -(size.y * scale) / 2;
    shadowMesh.position.y = bottomY - 0.03;
    const shadowScale = Math.max(size.x, size.z) * scale * 1.5;
    shadowMesh.scale.set(shadowScale, shadowScale, 1);
  }

  // Set camera distance so object has balanced padding
  const fov = camera.fov * (Math.PI / 180);
  const targetZ = (targetSize / 2 / Math.tan(fov / 2)) * 1.4;
  controls.zoom = Math.max(4.5, Math.min(10, targetZ));
  camera.position.set(0, 0, controls.zoom);
  camera.lookAt(0, 0, 0);
}


// ─── Utility: Dispose THREE object & textures recursively ────────────────────
function disposeGroup(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.geometry?.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        if (!m) return;
        const mat = m as THREE.MeshStandardMaterial;
        mat.map?.dispose();
        mat.normalMap?.dispose();
        mat.roughnessMap?.dispose();
        mat.metalnessMap?.dispose();
        mat.emissiveMap?.dispose();
        mat.aoMap?.dispose();
        mat.dispose();
      });
    }
  });
}

// ─── Component Inner ────────────────────────────────────────────────────────
function Configurator3DInner() {
  const mountRef = useRef<HTMLDivElement>(null);
  const fpsBadgeRef = useRef<HTMLSpanElement>(null);

  // ── Active model ────────────────────────────────────────────────────────
  const [activeModel, setActiveModel] = useState<ModelId>("headphones");
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [hasWebGlError, setHasWebGlError] = useState(false);
  const isMountedRef = useRef(false);

  // ── Headphone material state ─────────────────────────────────────────────
  const [activeShell, setActiveShell] = useState(SHELL_COLORS[2]);
  const [activeAccent, setActiveAccent] = useState(ACCENT_FINISHES[0]);
  const [activeCushion, setActiveCushion] = useState(CUSHION_MATERIALS[0]);
  const [lightingMode, setLightingMode] = useState<"studio" | "cyber" | "dark">("studio");
  const [isExploded, setIsExploded] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showArModal, setShowArModal] = useState(false);
  const [arQrDataUrl, setArQrDataUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [arModalTab, setArModalTab] = useState<"ios" | "android">("ios");

  // ── Suitcase material state ──────────────────────────────────────────────
  const [suitcaseShell, setSuitcaseShell] = useState(SUITCASE_SHELL_COLORS[0]);
  const [suitcaseHardware, setSuitcaseHardware] = useState(SUITCASE_HARDWARE[0]);

  // ── Shoes material state (Synchronized pair) ─────────────────────────────
  const [shoesColorway, setShoesColorway] = useState(SHOES_COLORWAYS[0]);

  // ── Watch material state ─────────────────────────────────────────────────
  const [watchCase, setWatchCase] = useState(WATCH_CASE_FINISHES[0]);
  const [watchDial, setWatchDial] = useState(WATCH_DIAL_COLORS[0]);

  // ── Eyeglasses material state ────────────────────────────────────────────
  const [glassesFrame, setGlassesFrame] = useState(EYEGLASSES_FRAME_COLORS[0]);
  const [glassesLens, setGlassesLens] = useState(EYEGLASSES_LENS_TINTS[0]);

  // ── Product Drop-Up Menu State ────────────────────────────────────────────
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(e.target as Node)) {
        setIsProductMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProductMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ── Refs to avoid stale closures ────────────────────────────────────────
  const isAutoRotateRef = useRef(isAutoRotate);
  isAutoRotateRef.current = isAutoRotate;
  const isExplodedRef = useRef(isExploded);
  isExplodedRef.current = isExploded;
  const isWireframeRef = useRef(isWireframe);
  isWireframeRef.current = isWireframe;

  // Headphones
  const activeShellRef = useRef(activeShell);
  activeShellRef.current = activeShell;
  const activeAccentRef = useRef(activeAccent);
  activeAccentRef.current = activeAccent;
  const activeCushionRef = useRef(activeCushion);
  activeCushionRef.current = activeCushion;

  // Suitcase
  const suitcaseShellRef = useRef(suitcaseShell);
  suitcaseShellRef.current = suitcaseShell;
  const suitcaseHardwareRef = useRef(suitcaseHardware);
  suitcaseHardwareRef.current = suitcaseHardware;

  // Shoes
  const shoesColorwayRef = useRef(shoesColorway);
  shoesColorwayRef.current = shoesColorway;

  // Watch
  const watchCaseRef = useRef(watchCase);
  watchCaseRef.current = watchCase;
  const watchDialRef = useRef(watchDial);
  watchDialRef.current = watchDial;

  // Eyeglasses
  const glassesFrameRef = useRef(glassesFrame);
  glassesFrameRef.current = glassesFrame;
  const glassesLensRef = useRef(glassesLens);
  glassesLensRef.current = glassesLens;

  // ── loadModel function ref ───────────────────────────────────────────────
  const loadModelRef = useRef<((id: ModelId) => void) | null>(null);

  // ── Three.js state ref ───────────────────────────────────────────────────
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    modelGroup: THREE.Group;
    shadowMesh: THREE.Mesh;
    parts: Record<string, THREE.Object3D | undefined>;
    materials: {
      shell: THREE.MeshStandardMaterial;
      accent: THREE.MeshStandardMaterial;
      cushion: THREE.MeshStandardMaterial;
      headband: THREE.MeshStandardMaterial;
      led: THREE.MeshBasicMaterial;
    } | null;
    glbMaterials: Record<string, THREE.MeshStandardMaterial>;
    lights: {
      key: THREE.DirectionalLight;
      fill: THREE.DirectionalLight;
      rim: THREE.DirectionalLight;
      ambient: THREE.AmbientLight;
    };
    controls: {
      isMouseDown: boolean;
      prevMousePos: { x: number; y: number };
      rotation: { x: number; y: number };
      targetRotation: { x: number; y: number };
      zoom: number;
    };
    explodedProgress: number;
    currentModelId: ModelId;
  } | null>(null);

  // ────────────────────────────────────────────────────────────────────────────
  // Three.js Scene Setup
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F8FAFC");

    // Camera — centered directly along Z-axis looking at (0, 0, 0)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    let pmremGenerator: THREE.PMREMGenerator | null = null;
    let roomEnvironment: RoomEnvironment | null = null;
    let envMap: THREE.Texture | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.replaceChildren(renderer.domElement);

      // ── HDR RoomEnvironment (Image-Based Studio Lighting) ──
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      roomEnvironment = new RoomEnvironment();
      envMap = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
      scene.environment = envMap;
    } catch (err) {
      console.warn("WebGL initialization paused by browser context:", err);
      setHasWebGlError(true);
      return;
    }

    // 3-Point Studio Lights Rig
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(5, 7, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xe2e8f0, 1.0);
    fill.position.set(-6, 4, 4);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x7857ff, 1.2);
    rim.position.set(0, 5, -6);
    scene.add(rim);

    // Ground & Soft Studio Contact Shadow
    const groundGeo = new THREE.CircleGeometry(4.8, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.95,
      metalness: 0.02,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.2;
    scene.add(ground);

    // Soft circular radial contact shadow texture
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.40)");
      gradient.addColorStop(0.3, "rgba(15, 23, 42, 0.20)");
      gradient.addColorStop(0.65, "rgba(15, 23, 42, 0.06)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6.5, 6.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.19;
    scene.add(shadowMesh);

    // Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const controls = {
      isMouseDown: false,
      prevMousePos: { x: 0, y: 0 },
      rotation: { x: 0.15, y: -0.4 },
      targetRotation: { x: 0.15, y: -0.4 },
      zoom: 7.5,
    };

    threeRef.current = {
      scene,
      camera,
      renderer,
      modelGroup,
      shadowMesh,
      parts: {},
      materials: null,
      glbMaterials: {},
      lights: { key, fill, rim, ambient },
      controls,
      explodedProgress: 0,
      currentModelId: "headphones",
    };

    // ── Event Handlers ──────────────────────────────────────────────────────
    const dom = renderer.domElement;
    const onMouseDown = (e: MouseEvent) => {
      controls.isMouseDown = true;
      controls.prevMousePos = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!controls.isMouseDown) return;
      const dx = e.clientX - controls.prevMousePos.x;
      const dy = e.clientY - controls.prevMousePos.y;
      controls.targetRotation.y += dx * 0.008;
      controls.targetRotation.x += dy * 0.008;
      controls.targetRotation.x = Math.max(-0.8, Math.min(0.8, controls.targetRotation.x));
      controls.prevMousePos = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      controls.isMouseDown = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      controls.zoom += e.deltaY * 0.004;
      controls.zoom = Math.max(4.5, Math.min(12, controls.zoom));
    };
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("wheel", onWheel, { passive: false });

    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        controls.isMouseDown = true;
        controls.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && controls.isMouseDown) {
        const dx = e.touches[0].clientX - controls.prevMousePos.x;
        const dy = e.touches[0].clientY - controls.prevMousePos.y;
        controls.targetRotation.y += dx * 0.008;
        controls.targetRotation.x += dy * 0.008;
        controls.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        controls.zoom += (touchStartDist - dist) * 0.01;
        controls.zoom = Math.max(4.5, Math.min(12, controls.zoom));
        touchStartDist = dist;
      }
    };
    const onTouchEnd = () => {
      controls.isMouseDown = false;
    };
    dom.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Animation Loop ──────────────────────────────────────────────────────
    let frameCount = 0;
    let fpsTimer = performance.now();
    let isVisible = false;
    let animId: number | null = null;

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }
      const now = performance.now();
      frameCount++;
      if (now - fpsTimer >= 1000) {
        const measuredFps = Math.round((frameCount * 1000) / (now - fpsTimer));
        if (fpsBadgeRef.current) fpsBadgeRef.current.textContent = `${measuredFps} FPS`;
        frameCount = 0;
        fpsTimer = now;
      }
      controls.rotation.x += (controls.targetRotation.x - controls.rotation.x) * 0.1;
      controls.rotation.y += (controls.targetRotation.y - controls.rotation.y) * 0.1;
      if (isAutoRotateRef.current && !controls.isMouseDown) {
        controls.targetRotation.y += 0.0035;
      }
      camera.position.z += (controls.zoom - camera.position.z) * 0.1;
      camera.position.y += (0 - camera.position.y) * 0.1;
      camera.position.x += (0 - camera.position.x) * 0.1;
      camera.lookAt(0, 0, 0);
      modelGroup.rotation.x = controls.rotation.x;
      modelGroup.rotation.y = controls.rotation.y;

      // Exploded view — headphones only
      if (threeRef.current?.currentModelId === "headphones") {
        const targetExplode = isExplodedRef.current ? 1 : 0;
        threeRef.current.explodedProgress += (targetExplode - threeRef.current.explodedProgress) * 0.08;
        const p = threeRef.current.explodedProgress;
        const { parts } = threeRef.current;
        if (parts.headband) parts.headband.position.y = p * 0.45;
        if (parts.accent) parts.accent.scale.set(1 + p * 0.16, 1, 1 + p * 0.16);
        if (parts.cushion) parts.cushion.position.y = -p * 0.22;
        if (parts.shell) parts.shell.scale.set(1 + p * 0.08, 1 + p * 0.08, 1 + p * 0.08);
      }
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          fpsTimer = performance.now();
          frameCount = 0;
          if (!animId) animId = requestAnimationFrame(animate);
        }
      },
      { rootMargin: "150px" }
    );
    observer.observe(container);

    // ── loadModel ────────────────────────────────────────────────────────────
    const loadModel = (modelId: ModelId) => {
      if (!threeRef.current) return;
      setIsLoadingModel(true);

      // Clear current model
      const mg = threeRef.current.modelGroup;
      while (mg.children.length > 0) {
        const child = mg.children[0];
        disposeGroup(child);
        mg.remove(child);
      }
      threeRef.current.parts = {};
      threeRef.current.materials = null;
      threeRef.current.glbMaterials = {};
      threeRef.current.currentModelId = modelId;
      threeRef.current.explodedProgress = 0;

      if (modelId === "headphones") {
        const shellMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(activeShellRef.current.hex),
          metalness: activeShellRef.current.metalness,
          roughness: activeShellRef.current.roughness,
          wireframe: isWireframeRef.current,
        });
        const accentMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(activeAccentRef.current.hex),
          metalness: activeAccentRef.current.metalness,
          roughness: activeAccentRef.current.roughness,
          wireframe: isWireframeRef.current,
        });
        const cushionMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(activeCushionRef.current.hex),
          roughness: activeCushionRef.current.roughness,
          metalness: 0.05,
          wireframe: isWireframeRef.current,
        });
        const headbandMat = new THREE.MeshStandardMaterial({
          color: 0x1e2229,
          roughness: 0.65,
          metalness: 0.15,
          wireframe: isWireframeRef.current,
        });
        const ledMat = new THREE.MeshBasicMaterial({ color: 0x7857ff });
        threeRef.current.materials = {
          shell: shellMat,
          accent: accentMat,
          cushion: cushionMat,
          headband: headbandMat,
          led: ledMat,
        };

        const partsMap: Record<string, THREE.Object3D> = {};
        const objLoader = new OBJLoader();
        objLoader.load(
          "/models/wireless-headphones-segmented.obj",
          (obj) => {
            obj.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh;
                m.castShadow = true;
                m.receiveShadow = true;
                if (!m.geometry.attributes.normal) {
                  m.geometry.computeVertexNormals();
                }
                if (m.name.includes("Headband")) {
                  m.material = headbandMat;
                  partsMap.headband = m;
                } else if (m.name.includes("Ear_Cushions")) {
                  m.material = cushionMat;
                  partsMap.cushion = m;
                } else if (m.name.includes("Accent_Trim")) {
                  m.material = accentMat;
                  partsMap.accent = m;
                } else {
                  m.material = shellMat;
                  partsMap.shell = m;
                }
              }
            });
            if (threeRef.current) {
              threeRef.current.parts = partsMap;
              centerAndFitModel(obj, camera, controls, threeRef.current.shadowMesh, "headphones");
              threeRef.current.modelGroup.add(obj);
            }
            setIsLoadingModel(false);
          },
          undefined,
          () => setIsLoadingModel(false)
        );
      } else {
        const modelConfig = PRODUCT_MODELS.find((m) => m.id === modelId);
        if (!modelConfig?.glb) {
          setIsLoadingModel(false);
          return;
        }

        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
          modelConfig.glb,
          (gltf) => {
            const model = gltf.scene;

            // Index all materials by name
            const matMap: Record<string, THREE.MeshStandardMaterial> = {};
            model.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                mats.forEach((m) => {
                  if (m && m.name) matMap[m.name] = m as THREE.MeshStandardMaterial;
                });
              }
            });
            if (threeRef.current) threeRef.current.glbMaterials = matMap;

            // Apply current options using refs
            if (modelId === "suitcase") {
              if (matMap["suitcase.001"]) {
                matMap["suitcase.001"].color.set(suitcaseShellRef.current.hex);
                matMap["suitcase.001"].roughness = 0.35;
                matMap["suitcase.001"].metalness = 0.15;
              }
              if (matMap["metall"]) {
                matMap["metall"].color.set(suitcaseHardwareRef.current.hex);
                matMap["metall"].metalness = suitcaseHardwareRef.current.metalness;
                matMap["metall"].roughness = suitcaseHardwareRef.current.roughness;
              }
              // Clean graphite for rubber trims & wheels
              if (matMap["grey.001"]) matMap["grey.001"].color.set("#2e323b");
              if (matMap["Grey.002"]) matMap["Grey.002"].color.set("#262930");
            } else if (modelId === "shoes") {
              // Synchronize BOTH shoes (primitives 0 and 1) simultaneously
              ["VansShoeMaterial", "VansShoeMaterial.001"].forEach((name) => {
                if (matMap[name]) {
                  matMap[name].color.set(shoesColorwayRef.current.hex);
                  matMap[name].roughness = shoesColorwayRef.current.roughness;
                  matMap[name].metalness = shoesColorwayRef.current.metalness;
                  matMap[name].needsUpdate = true;
                }
              });
            } else if (modelId === "watch") {
              ["shiny_metal", "rough_metal", "rough_metal_engraving"].forEach((name) => {
                if (matMap[name]) {
                  matMap[name].color.set(watchCaseRef.current.hex);
                  matMap[name].metalness = watchCaseRef.current.metalness;
                  matMap[name].roughness = watchCaseRef.current.roughness;
                  matMap[name].needsUpdate = true;
                }
              });
              if (matMap["clock_face"]) {
                matMap["clock_face"].color.set(watchDialRef.current.hex);
                matMap["clock_face"].roughness = 0.45;
                matMap["clock_face"].needsUpdate = true;
              }
              if (matMap["glass"]) {
                matMap["glass"].color.set("#d0e2ec");
                matMap["glass"].roughness = 0.04;
                matMap["glass"].metalness = 0.05;
                matMap["glass"].transparent = true;
                matMap["glass"].opacity = 0.15;
                matMap["glass"].depthWrite = false;
                matMap["glass"].needsUpdate = true;
              }
            } else if (modelId === "eyeglasses") {
              if (matMap["Material.005"]) {
                matMap["Material.005"].color.set(glassesFrameRef.current.hex);
                matMap["Material.005"].roughness = glassesFrameRef.current.roughness;
                matMap["Material.005"].metalness = glassesFrameRef.current.metalness;
                matMap["Material.005"].needsUpdate = true;
              }
              if (matMap["Material.004"]) {
                matMap["Material.004"].color.set(glassesLensRef.current.hex);
                matMap["Material.004"].transparent = true;
                matMap["Material.004"].opacity = glassesLensRef.current.opacity;
                matMap["Material.004"].roughness = 0.05;
                matMap["Material.004"].depthWrite = false;
                matMap["Material.004"].needsUpdate = true;
              }
            }

            // Apply wireframe if enabled
            if (isWireframeRef.current) {
              model.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;
                  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                  mats.forEach((mat) => {
                    if (mat) (mat as THREE.MeshStandardMaterial).wireframe = true;
                  });
                }
              });
            }

            if (threeRef.current) {
              centerAndFitModel(model, camera, controls, threeRef.current.shadowMesh, modelId);
              threeRef.current.modelGroup.add(model);
            }
            setIsLoadingModel(false);
          },
          undefined,
          (err) => {
            console.warn("GLB load failed:", err);
            setIsLoadingModel(false);
          }
        );
      }
    };

    loadModelRef.current = loadModel;
    loadModel("headphones");

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("wheel", onWheel);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      try {
        if (pmremGenerator) pmremGenerator.dispose();
        if (envMap) envMap.dispose();
        if (roomEnvironment) roomEnvironment.dispose();
        disposeGroup(modelGroup);
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
          const gl = renderer.getContext();
          if (gl) {
            const loseExt = gl.getExtension("WEBGL_lose_context");
            if (loseExt) loseExt.loseContext();
          }
          if (renderer.domElement && renderer.domElement.parentElement) {
            renderer.domElement.parentElement.removeChild(renderer.domElement);
          }
        }
      } catch (e) {
        // ignore disposal errors
      }
    };
  }, []);

  // ── Model Switching Effect ────────────────────────────────────────────────
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    if (!loadModelRef.current) return;
    if (threeRef.current) {
      threeRef.current.controls.targetRotation = { x: 0.15, y: -0.4 };
      threeRef.current.controls.rotation = { x: 0.15, y: -0.4 };
      threeRef.current.explodedProgress = 0;
    }
    setIsExploded(false);
    setIsWireframe(false);
    loadModelRef.current(activeModel);
  }, [activeModel]);

  // ── Headphone Material Effects ────────────────────────────────────────────
  useEffect(() => {
    if (!threeRef.current?.materials) return;
    const { materials } = threeRef.current;
    materials.shell.color.set(activeShell.hex);
    materials.shell.metalness = activeShell.metalness;
    materials.shell.roughness = activeShell.roughness;
    materials.accent.color.set(activeAccent.hex);
    materials.accent.metalness = activeAccent.metalness;
    materials.accent.roughness = activeAccent.roughness;
    materials.cushion.color.set(activeCushion.hex);
    materials.cushion.roughness = activeCushion.roughness;
    materials.led.color.set(activeAccent.hex);
  }, [activeShell, activeAccent, activeCushion]);

  // ── Wireframe Effect ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!threeRef.current) return;
    if (threeRef.current.materials) {
      const { materials } = threeRef.current;
      materials.shell.wireframe = isWireframe;
      materials.accent.wireframe = isWireframe;
      materials.cushion.wireframe = isWireframe;
      materials.headband.wireframe = isWireframe;
    } else {
      threeRef.current.modelGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            if (m && (m as THREE.MeshStandardMaterial).wireframe !== undefined)
              (m as THREE.MeshStandardMaterial).wireframe = isWireframe;
          });
        }
      });
    }
  }, [isWireframe]);

  // ── Lighting Mode Effect ──────────────────────────────────────────────────
  useEffect(() => {
    if (!threeRef.current) return;
    const { lights, scene } = threeRef.current;
    if (lightingMode === "studio") {
      scene.background = new THREE.Color("#F8FAFC");
      lights.key.color.set(0xffffff);
      lights.key.intensity = 1.8;
      lights.fill.color.set(0xe2e8f0);
      lights.fill.intensity = 1.0;
      lights.rim.color.set(0x7857ff);
      lights.rim.intensity = 1.2;
      lights.ambient.intensity = 1.2;
    } else if (lightingMode === "cyber") {
      scene.background = new THREE.Color("#0b0f19");
      lights.key.color.set(0x06b6d4);
      lights.key.intensity = 2.4;
      lights.fill.color.set(0xd946ef);
      lights.fill.intensity = 1.8;
      lights.rim.color.set(0x3b82f6);
      lights.rim.intensity = 2.2;
      lights.ambient.intensity = 0.8;
    } else {
      scene.background = new THREE.Color("#0f172a");
      lights.key.color.set(0xffedd5);
      lights.key.intensity = 1.8;
      lights.fill.color.set(0x475569);
      lights.fill.intensity = 0.8;
      lights.rim.color.set(0x7857ff);
      lights.rim.intensity = 1.5;
      lights.ambient.intensity = 0.6;
    }
  }, [lightingMode]);

  // ── Suitcase Material Effects ─────────────────────────────────────────────
  useEffect(() => {
    const mats = threeRef.current?.glbMaterials;
    if (!mats || activeModel !== "suitcase") return;
    if (mats["suitcase.001"]) {
      mats["suitcase.001"].color.set(suitcaseShell.hex);
      mats["suitcase.001"].roughness = 0.35;
      mats["suitcase.001"].metalness = 0.15;
    }
  }, [suitcaseShell, activeModel]);

  useEffect(() => {
    const mats = threeRef.current?.glbMaterials;
    if (!mats || activeModel !== "suitcase") return;
    if (mats["metall"]) {
      mats["metall"].color.set(suitcaseHardware.hex);
      mats["metall"].metalness = suitcaseHardware.metalness;
      mats["metall"].roughness = suitcaseHardware.roughness;
    }
  }, [suitcaseHardware, activeModel]);

  // ── Shoes Material Effects (Synchronized pair with preserved texture) ──────
  useEffect(() => {
    const mats = threeRef.current?.glbMaterials;
    if (!mats || activeModel !== "shoes") return;
    ["VansShoeMaterial", "VansShoeMaterial.001"].forEach((name) => {
      if (mats[name]) {
        mats[name].color.set(shoesColorway.hex);
        mats[name].roughness = shoesColorway.roughness;
        mats[name].metalness = shoesColorway.metalness;
        mats[name].needsUpdate = true;
      }
    });
  }, [shoesColorway, activeModel]);

  // ── Watch Material Effects ────────────────────────────────────────────────
  useEffect(() => {
    const mats = threeRef.current?.glbMaterials;
    if (!mats || activeModel !== "watch") return;
    ["shiny_metal", "rough_metal", "rough_metal_engraving"].forEach((name) => {
      if (mats[name]) {
        mats[name].color.set(watchCase.hex);
        mats[name].metalness = watchCase.metalness;
        mats[name].roughness = watchCase.roughness;
        mats[name].needsUpdate = true;
      }
    });
  }, [watchCase, activeModel]);

  useEffect(() => {
    const mats = threeRef.current?.glbMaterials;
    if (!mats || activeModel !== "watch") return;
    if (mats["clock_face"]) {
      mats["clock_face"].color.set(watchDial.hex);
      mats["clock_face"].needsUpdate = true;
    }
  }, [watchDial, activeModel]);

  // ── Eyeglasses Material Effects ───────────────────────────────────────────
  useEffect(() => {
    const mats = threeRef.current?.glbMaterials;
    if (!mats || activeModel !== "eyeglasses") return;
    if (mats["Material.005"]) {
      mats["Material.005"].color.set(glassesFrame.hex);
      mats["Material.005"].roughness = glassesFrame.roughness;
      mats["Material.005"].metalness = glassesFrame.metalness;
      mats["Material.005"].needsUpdate = true;
    }
  }, [glassesFrame, activeModel]);

  useEffect(() => {
    const mats = threeRef.current?.glbMaterials;
    if (!mats || activeModel !== "eyeglasses") return;
    if (mats["Material.004"]) {
      mats["Material.004"].color.set(glassesLens.hex);
      mats["Material.004"].transparent = true;
      mats["Material.004"].opacity = glassesLens.opacity;
      mats["Material.004"].needsUpdate = true;
    }
  }, [glassesLens, activeModel]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleResetCamera = useCallback(() => {
    if (!threeRef.current) return;
    threeRef.current.controls.targetRotation = { x: 0.15, y: -0.4 };
    threeRef.current.controls.rotation = { x: 0.15, y: -0.4 };
    const currentModel = threeRef.current.currentModelId;
    let defaultZoom = 6.2;
    if (currentModel === "headphones") defaultZoom = 5.8;
    else if (currentModel === "shoes") defaultZoom = 6.0;
    else if (currentModel === "suitcase") defaultZoom = 6.2;
    else if (currentModel === "watch") defaultZoom = 5.8;
    else if (currentModel === "eyeglasses") defaultZoom = 6.0;
    threeRef.current.controls.zoom = defaultZoom;
    threeRef.current.camera.position.set(0, 0, defaultZoom);
    threeRef.current.camera.lookAt(0, 0, 0);
  }, []);

  const handleTakeSnapshot = useCallback(() => {
    if (!threeRef.current) return;
    const dataUrl = threeRef.current.renderer.domElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `TrueForm_${activeModel}_Render.png`;
    link.href = dataUrl;
    link.click();
  }, [activeModel]);

  // ── URL Search Params Auto-Select & AR Auto-Trigger ───────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const modelParam = params.get("model") as ModelId | null;
    const isAr = params.get("ar") === "true";

    if (modelParam && PRODUCT_MODELS.some((m) => m.id === modelParam)) {
      setActiveModel(modelParam);
    }

    if (isAr) {
      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as Record<string, unknown>).MSStream;
      const isAndroid = /Android/.test(ua);
      const targetModel = modelParam || "eyeglasses";
      const cfg = PRODUCT_MODELS.find((m) => m.id === targetModel);
      const origin =
        window.location.origin && !window.location.origin.includes("localhost")
          ? window.location.origin
          : "https://trueform-3d-configurator.netlify.app";

      if (isIOS && cfg?.usdz) {
        const link = document.createElement("a");
        link.setAttribute("href", cfg.usdz);
        link.setAttribute("rel", "ar");
        const img = document.createElement("img");
        img.src = "";
        link.appendChild(img);
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          if (document.body.contains(link)) document.body.removeChild(link);
        }, 150);
      } else if (isAndroid && cfg?.glb) {
        const glbUrl = encodeURIComponent(`${origin}${cfg.glb}`);
        const fallback = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(cfg.productName);
        window.location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${glbUrl}&title=${title}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${fallback};end;`;
      } else {
        setShowArModal(true);
      }
    }
  }, []);

  // ── Client-side Offline QR Code Generation ────────────────────────────────
  useEffect(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("localhost")
        ? window.location.origin
        : "https://trueform-3d-configurator.netlify.app";
    const targetUrl = `${origin}/?model=${activeModel}&ar=true`;

    QRCode.toDataURL(targetUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => setArQrDataUrl(url))
      .catch((err) => {
        console.error("QR Code generation error:", err);
      });
  }, [activeModel]);

  const handleCopyArLink = useCallback(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("localhost")
        ? window.location.origin
        : "https://trueform-3d-configurator.netlify.app";
    const targetUrl = `${origin}/?model=${activeModel}&ar=true`;
    navigator.clipboard.writeText(targetUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  }, [activeModel]);

  const handleARClick = useCallback(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as Record<string, unknown>).MSStream;
    const isAndroid = /Android/.test(ua);
    const origin =
      typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("localhost")
        ? window.location.origin
        : "https://trueform-3d-configurator.netlify.app";

    const cfg = PRODUCT_MODELS.find((m) => m.id === activeModel);

    if (cfg?.usdz && isIOS) {
      const link = document.createElement("a");
      link.setAttribute("href", cfg.usdz);
      link.setAttribute("rel", "ar");
      const img = document.createElement("img");
      img.src = "";
      link.appendChild(img);
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) document.body.removeChild(link);
      }, 150);
      return;
    }

    if (cfg?.glb && isAndroid) {
      const glbUrl = encodeURIComponent(`${origin}${cfg.glb}`);
      const fallback = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(cfg.productName);
      window.location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${glbUrl}&title=${title}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${fallback};end;`;
      return;
    }

    setShowArModal(true);
  }, [activeModel]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const activeModelConfig = PRODUCT_MODELS.find((m) => m.id === activeModel)!;
  const isHeadphones = activeModel === "headphones";
  const isEyeglasses = activeModel === "eyeglasses";

  // ── Reusable swatch button ────────────────────────────────────────────────
  const ColorSwatch = ({
    hex,
    isSelected,
    onClick,
    title,
  }: {
    hex: string;
    isSelected: boolean;
    onClick: () => void;
    title: string;
  }) => {
    const isLightColor = [
      "#f8fafc",
      "#f1f5f9",
      "#e2e8f0",
      "#fef9f0",
      "#ffffff",
      "#cccccc",
      "#cbd5e1",
    ].includes(hex.toLowerCase());

    return (
      <button
        type="button"
        onClick={onClick}
        title={title}
        className={`h-11 sm:h-12 w-full rounded-xl transition-all duration-150 relative flex items-center justify-center border cursor-pointer ${
          isSelected
            ? "border-transparent ring-2 ring-[#7857FF] ring-offset-2 ring-offset-white shadow-sm"
            : "border-slate-200/90 hover:border-slate-400 shadow-2xs"
        }`}
        style={{ backgroundColor: hex }}
      >
        {isSelected && (
          <Check
            size={16}
            strokeWidth={2.8}
            className={`transition-transform duration-150 ${
              isLightColor ? "text-slate-800" : "text-white drop-shadow-xs"
            }`}
          />
        )}
      </button>
    );
  };

  const PillButton = ({
    name,
    isSelected,
    onClick,
    color,
  }: {
    name: string;
    isSelected: boolean;
    onClick: () => void;
    color?: string;
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
        isSelected
          ? "bg-purple-50 border-purple-500 text-purple-700 font-semibold shadow-sm"
          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {color && (
        <span
          className="w-3 h-3 rounded-full border border-slate-300 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      {name}
    </button>
  );

  // ────────────────────────────────────────────────────────────────────────────
  // JSX
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] flex flex-col">
      {/* ── Canvas + Sidebar ─────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row">
        {/* 3D WebGL Canvas */}
        <div className="relative flex-1 h-[380px] sm:h-[480px] lg:h-[620px] overflow-hidden cursor-grab active:cursor-grabbing bg-[#F8FAFC]">
          <div ref={mountRef} className="w-full h-full" />

          {/* Loading Overlay */}
          {isLoadingModel && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20">
              <div className="text-center space-y-3">
                <div className="text-3xl">{activeModelConfig.emoji}</div>
                <Loader2 className="animate-spin mx-auto text-purple-600" size={28} />
                <p className="text-sm font-semibold text-slate-700">
                  Loading {activeModelConfig.label}&hellip;
                </p>
                <p className="text-xs text-slate-400">Rendering HDR Studio Mesh</p>
              </div>
            </div>
          )}

          {/* WebGL Error / Context Recovery Overlay */}
          {hasWebGlError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/95 backdrop-blur-sm p-6 text-center z-30">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3 shadow-xs">
                <RotateCcw size={24} />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">WebGL 3D Context Paused</h4>
              <p className="text-xs text-slate-500 max-w-xs mb-4 leading-relaxed">
                The browser paused the 3D graphics context after hot reloads. Click below to resume the interactive studio.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#7857FF] hover:bg-purple-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-500/25 transition-all cursor-pointer"
              >
                Reload 3D Engine
              </button>
            </div>
          )}

          {/* Top Badge Bar */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10 gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">PBR HDR Studio</span>
                <span className="sm:hidden">Studio 3D</span>
              </span>
              <span
                ref={fpsBadgeRef}
                className="hidden md:inline-flex px-2.5 py-1 rounded-full text-xs font-mono text-purple-700 bg-purple-50 border border-purple-200 font-semibold"
              >
                60 FPS
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
              <button
                onClick={handleResetCamera}
                title="Reset Camera"
                className="p-1.5 sm:p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm transition-colors backdrop-blur-md cursor-pointer"
              >
                <RotateCcw size={14} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-colors backdrop-blur-md cursor-pointer shadow-sm ${
                  isAutoRotate
                    ? "bg-purple-50 text-purple-700 border-purple-300 font-semibold"
                    : "bg-white/90 text-slate-600 border-slate-200 hover:text-slate-900"
                }`}
              >
                360° {isAutoRotate ? "On" : "Off"}
              </button>
            </div>
          </div>

          {/* Bottom Floating Controls */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-10">
            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
              {isHeadphones && (
                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-medium border backdrop-blur-md transition-all cursor-pointer ${
                    isExploded
                      ? "bg-[#7857FF] text-white border-transparent shadow-md shadow-purple-500/25"
                      : "bg-white/95 text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <Layers size={13} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden xs:inline">
                    {isExploded ? "Assembly View" : "Exploded View"}
                  </span>
                  <span className="xs:hidden">{isExploded ? "Assembly" : "Explode"}</span>
                </button>
              )}
              <button
                onClick={() => setIsWireframe(!isWireframe)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-medium border backdrop-blur-md transition-all cursor-pointer ${
                  isWireframe
                    ? "bg-purple-50 text-purple-700 border-purple-300 shadow-sm font-semibold"
                    : "bg-white/95 text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm"
                }`}
              >
                <Eye size={13} className="sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">{isWireframe ? "Solid Mesh" : "Wireframe"}</span>
                <span className="xs:hidden">{isWireframe ? "Solid" : "Wire"}</span>
              </button>

              {/* ── Product Drop-Up Selector Menu (Matches Reference) ──────── */}
              <div ref={productMenuRef} className="relative">
                {/* Popover Drop-Up Card (Opens Upwards) */}
                {isProductMenuOpen && (
                  <div className="absolute bottom-full mb-3 left-0 z-50 w-56 sm:w-60 bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.18)] p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    {/* Downward pointer caret arrow */}
                    <div className="absolute -bottom-1.5 left-6 w-3.5 h-3.5 bg-white border-r border-b border-slate-200/90 rotate-45 transform pointer-events-none" />

                    <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Select 3D Model
                      </span>
                      <span className="text-[10px] font-mono text-purple-600 font-semibold bg-purple-50 px-1.5 py-0.5 rounded">
                        {PRODUCT_MODELS.length} Models
                      </span>
                    </div>

                    {PRODUCT_MODELS.map((model) => {
                      const isActive = activeModel === model.id;
                      const IconComp = PRODUCT_ICON_MAP[model.id] || LayoutGrid;
                      return (
                        <button
                          key={model.id}
                          onClick={() => {
                            setActiveModel(model.id);
                            setIsProductMenuOpen(false);
                          }}
                          disabled={isLoadingModel}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            isActive
                              ? "bg-purple-50 text-purple-700 font-bold border border-purple-200/80 shadow-xs"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                                isActive
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <IconComp size={15} />
                            </span>
                            <span className={isActive ? "font-bold text-purple-700" : "font-medium text-slate-800"}>
                              {model.label}
                            </span>
                            {model.hasAR && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                                  isActive
                                    ? "bg-purple-200/80 text-purple-800"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                AR
                              </span>
                            )}
                          </div>
                          <ChevronRight
                            size={14}
                            className={`transition-transform ${
                              isActive ? "text-purple-600 translate-x-0.5" : "text-slate-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Drop-Up Trigger Group */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={() => setIsProductMenuOpen((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold border backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                      isProductMenuOpen
                        ? "bg-purple-50 text-purple-700 border-purple-300 ring-2 ring-purple-400/20"
                        : "bg-white/95 text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <LayoutGrid size={13} className={`sm:w-3.5 sm:h-3.5 ${isProductMenuOpen ? "text-purple-600" : "text-slate-600"}`} />
                    <span>Product</span>
                    <ChevronUp
                      size={13}
                      className={`sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                        isProductMenuOpen ? "rotate-180 text-purple-600" : "text-slate-500"
                      }`}
                    />
                  </button>

                  {/* Active Product Avatar Indicator matching Image 1 */}
                  <button
                    type="button"
                    onClick={() => setIsProductMenuOpen((prev) => !prev)}
                    title={`Current Product: ${activeModelConfig.label} (Click to change)`}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-sm border border-purple-400/50 transition-all cursor-pointer active:scale-95"
                  >
                    {(() => {
                      const ActiveIcon = PRODUCT_ICON_MAP[activeModelConfig.id] || LayoutGrid;
                      return <ActiveIcon size={14} className="sm:w-4 sm:h-4" />;
                    })()}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
              <button
                onClick={handleTakeSnapshot}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-medium bg-white/95 text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm transition-all backdrop-blur-md cursor-pointer"
              >
                <Camera size={13} className="sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">4K Snapshot</span>
                <span className="xs:hidden">Snap</span>
              </button>

              {activeModelConfig.hasAR && (
                <button
                  onClick={handleARClick}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer"
                >
                  {isEyeglasses ? (
                    <>
                      <Smartphone size={13} className="sm:w-3.5 sm:h-3.5" />
                      <span>Try AR Now</span>
                    </>
                  ) : (
                    <>
                      <QrCode size={13} className="sm:w-3.5 sm:h-3.5" />
                      <span>View in AR</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Configuration Sidebar ────────────────────────────────────────── */}
        <div className="w-full lg:w-[420px] p-4 sm:p-5 lg:p-6 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-slate-200/90 space-y-5">
          <div className="space-y-5 overflow-y-auto max-h-[520px] lg:max-h-[560px] pr-1.5">
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest">
                  {activeModelConfig.category} Configurator
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                  SKU #{activeModelConfig.id.toUpperCase()}-2026
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeModelConfig.productName}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {activeModelConfig.productDesc}
              </p>
            </div>

            {/* ── HEADPHONES CONTROLS ─────────────────────────────────────── */}
            {isHeadphones && (
              <>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Earcup Shell Finish
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {activeShell.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                    {SHELL_COLORS.map((color) => (
                      <ColorSwatch
                        key={color.name}
                        hex={color.hex}
                        isSelected={activeShell.name === color.name}
                        onClick={() => setActiveShell(color)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Metal Accent &amp; Slider
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {activeAccent.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {ACCENT_FINISHES.map((accent) => (
                      <ColorSwatch
                        key={accent.name}
                        hex={accent.hex}
                        isSelected={activeAccent.name === accent.name}
                        onClick={() => setActiveAccent(accent)}
                        title={accent.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Cushion &amp; Headband Fabric
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {activeCushion.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {CUSHION_MATERIALS.map((mat) => (
                      <ColorSwatch
                        key={mat.name}
                        hex={mat.hex}
                        isSelected={activeCushion.name === mat.name}
                        onClick={() => setActiveCushion(mat)}
                        title={mat.name}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── SHOES CONTROLS (Synchronized Pair & Preserved Textures) ─── */}
            {activeModel === "shoes" && (
              <>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Colorway Preset (Pair)
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {shoesColorway.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {SHOES_COLORWAYS.map((c) => (
                      <ColorSwatch
                        key={c.name}
                        hex={c.swatch}
                        isSelected={shoesColorway.name === c.name}
                        onClick={() => setShoesColorway(c)}
                        title={c.name}
                      />
                    ))}
                  </div>
                  {shoesColorway.desc && (
                    <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span>{shoesColorway.desc}</span>
                    </p>
                  )}
                </div>
              </>
            )}

            {/* ── SUITCASE CONTROLS ──────────────────────────────────────── */}
            {activeModel === "suitcase" && (
              <>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Polycarbonate Shell
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {suitcaseShell.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                    {SUITCASE_SHELL_COLORS.map((c) => (
                      <ColorSwatch
                        key={c.name}
                        hex={c.hex}
                        isSelected={suitcaseShell.name === c.name}
                        onClick={() => setSuitcaseShell(c)}
                        title={c.name}
                      />
                    ))}
                  </div>
                  {suitcaseShell.desc && (
                    <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span>{suitcaseShell.desc}</span>
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Anodized Hardware
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {suitcaseHardware.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {SUITCASE_HARDWARE.map((h) => (
                      <ColorSwatch
                        key={h.name}
                        hex={h.hex}
                        isSelected={suitcaseHardware.name === h.name}
                        onClick={() => setSuitcaseHardware(h)}
                        title={h.name}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── WATCH CONTROLS ─────────────────────────────────────────── */}
            {activeModel === "watch" && (
              <>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Case &amp; Bracelet Metal
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {watchCase.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                    {WATCH_CASE_FINISHES.map((c) => (
                      <ColorSwatch
                        key={c.name}
                        hex={c.swatch}
                        isSelected={watchCase.name === c.name}
                        onClick={() => setWatchCase(c)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Dial Complication Tone
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {watchDial.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {WATCH_DIAL_COLORS.map((c) => (
                      <ColorSwatch
                        key={c.name}
                        hex={c.swatch}
                        isSelected={watchDial.name === c.name}
                        onClick={() => setWatchDial(c)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── EYEGLASSES CONTROLS ────────────────────────────────────── */}
            {activeModel === "eyeglasses" && (
              <>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Acetate Frame
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {glassesFrame.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                    {EYEGLASSES_FRAME_COLORS.map((c) => (
                      <ColorSwatch
                        key={c.name}
                        hex={c.swatch}
                        isSelected={glassesFrame.name === c.name}
                        onClick={() => setGlassesFrame(c)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                      Lens Filter
                    </span>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0 max-w-[55%] truncate text-right">
                      {glassesLens.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                    {EYEGLASSES_LENS_TINTS.map((l) => (
                      <ColorSwatch
                        key={l.name}
                        hex={l.swatch}
                        isSelected={glassesLens.name === l.name}
                        onClick={() => setGlassesLens(l)}
                        title={l.name}
                      />
                    ))}
                  </div>
                  {glassesLens.desc && (
                    <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span>{glassesLens.desc}</span>
                    </p>
                  )}
                </div>
              </>
            )}

            {/* ── LIGHTING — always visible ──────────────────────────────── */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider truncate">
                  Studio Environment Lighting
                </span>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-lg shrink-0">
                  {LIGHTING_MODES.find((m) => m.id === lightingMode)?.name}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {LIGHTING_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = lightingMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setLightingMode(mode.id as "studio" | "cyber" | "dark")}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#7857FF] text-white border-transparent shadow-md shadow-purple-500/20 font-semibold"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon size={13} />
                      <span className="truncate">{mode.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="pt-4 border-t border-slate-200/90 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                  Est. Production Cost
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {activeModelConfig.price}{" "}
                  <span className="text-xs font-normal text-slate-400">/ SKU unit</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-600 uppercase tracking-wider block font-semibold">
                  Catalog Status
                </span>
                <span className="text-xs font-medium text-slate-700">Ready to Deploy</span>
              </div>
            </div>
            <button
              onClick={() =>
                alert(
                  "Custom configuration saved! We can deploy this exact 3D configurator on your Shopify, WooCommerce, or custom site."
                )
              }
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} />
              Integrate This Configurator
            </button>
          </div>
        </div>
      </div>


      {/* ── AR Modal ────────────────────────────────────────────────────── */}
      {showArModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowArModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 border border-violet-200 flex items-center justify-center mx-auto shadow-sm text-2xl">
              {isEyeglasses ? "👓" : <QrCode size={24} />}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-50 text-violet-700 border border-violet-200 mb-1.5">
                <Smartphone size={10} />
                {isEyeglasses ? "Face AR Try-On" : "3D Spatial AR"}
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                {isEyeglasses
                  ? "Try Eyeglasses Live in AR"
                  : `View ${activeModelConfig.label} in AR`}
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xs mx-auto">
                {isEyeglasses
                  ? "Scan this QR code with your phone camera to try on these frames in real-time AR on your face — zero app installation required."
                  : "Scan this QR code with your iPhone or Android to view this 3D model in your physical room at 100% true-to-life scale."}
              </p>
            </div>

            {/* QR Code Container */}
            <div className="relative w-52 h-52 mx-auto bg-white border border-slate-200 p-2.5 rounded-2xl flex items-center justify-center shadow-inner">
              {arQrDataUrl ? (
                <img
                  src={arQrDataUrl}
                  alt="AR QR Code"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Loader2 className="animate-spin text-purple-600" size={24} />
                  <span className="text-xs">Generating QR...</span>
                </div>
              )}
            </div>

            {/* Platform Instructions Selector */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-left space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                <div className="flex gap-1">
                  <button
                    onClick={() => setArModalTab("ios")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      arModalTab === "ios"
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    🍎 iPhone / iPad
                  </button>
                  <button
                    onClick={() => setArModalTab("android")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      arModalTab === "android"
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    🤖 Android
                  </button>
                </div>
                <button
                  onClick={handleCopyArLink}
                  className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 cursor-pointer bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-md transition-colors"
                >
                  {copiedLink ? (
                    <Check size={12} className="text-emerald-600" />
                  ) : (
                    <Copy size={12} />
                  )}
                  <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>

              {arModalTab === "ios" ? (
                <div className="text-[11px] text-slate-600 space-y-1">
                  <p>
                    1. Open your <strong>iOS Camera app</strong> and point at the QR code.
                  </p>
                  <p>
                    2. Tap the yellow <strong>Safari link banner</strong> that appears.
                  </p>
                  <p>
                    3. Apple QuickLook AR will instantly launch your live camera try-on.
                  </p>
                </div>
              ) : (
                <div className="text-[11px] text-slate-600 space-y-1">
                  <p>
                    1. Open <strong>Google Lens</strong> or your phone camera.
                  </p>
                  <p>
                    2. Tap the link to open in <strong>Google Chrome</strong>.
                  </p>
                  <p>
                    3. Google Scene Viewer automatically renders the interactive 3D AR space.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Action Links */}
            <div className="flex gap-2">
              {activeModelConfig.usdz && (
                <a
                  href={activeModelConfig.usdz}
                  rel="ar"
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>🍎</span> Apple QuickLook
                </a>
              )}
              {activeModelConfig.glb && (
                <a
                  href={activeModelConfig.glb}
                  download
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>📦</span> Download 3D GLB
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Resilient Error Boundary ────────────────────────────────────────────────
class ConfiguratorErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("Configurator3D caught WebGL or render exception:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[420px] rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center p-8 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
            <RotateCcw size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-800">Interactive 3D Studio Ready to Load</h3>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            The 3D graphics context was refreshed after hot-module reloads. Click below to re-initialize the studio.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-500/25 transition-all cursor-pointer"
          >
            Launch 3D Studio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Configurator3D() {
  return (
    <ConfiguratorErrorBoundary>
      <Configurator3DInner />
    </ConfiguratorErrorBoundary>
  );
}
