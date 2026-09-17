import { useCallback, useEffect, useRef, useState } from "react";

const MATERIALS = [
  {
    name: "Oatmeal bouclé",
    filter: "none",
    swatch: "#d9cfbe",
    glowColor: "rgba(217, 207, 190, 0.45)",
    secondaryGlow: "rgba(240, 230, 215, 0.25)",
    ambientLight: "rgba(235, 222, 202, 0.35)",
  },
  {
    name: "Slate wool",
    filter: "saturate(0.45) hue-rotate(185deg) brightness(0.86)",
    swatch: "#5b6672",
    glowColor: "rgba(91, 102, 114, 0.55)",
    secondaryGlow: "rgba(59, 130, 246, 0.3)",
    ambientLight: "rgba(96, 165, 250, 0.35)",
  },
  {
    name: "Cognac leather",
    filter: "saturate(1.5) hue-rotate(-18deg) brightness(0.92)",
    swatch: "#8c5a33",
    glowColor: "rgba(196, 122, 60, 0.55)",
    secondaryGlow: "rgba(245, 158, 11, 0.3)",
    ambientLight: "rgba(217, 119, 6, 0.35)",
  },
  {
    name: "Ink velvet",
    filter: "saturate(1.3) hue-rotate(215deg) brightness(0.6)",
    swatch: "#2b2f52",
    glowColor: "rgba(120, 87, 255, 0.55)",
    secondaryGlow: "rgba(99, 102, 241, 0.35)",
    ambientLight: "rgba(168, 85, 247, 0.35)",
  },
];

/**
 * Interactive product viewer.
 * Features a transparent sofa cutout with realistic ground contact shadow,
 * dynamic blurred ambient lighting reflecting the selected material,
 * and pointer drag 3D rotation.
 */
export function ProductViewer({ caption }: { caption?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; start: number } | null>(null);
  const [active, setActive] = useState(false);
  const [angle, setAngle] = useState(-14);
  const [material, setMaterial] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(true)),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setActive(true);
      dragRef.current = { x: e.clientX, start: angle };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [angle],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const next = d.start + (e.clientX - d.x) * 0.35;
    setAngle(Math.max(-42, Math.min(42, next)));
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current = null;
  }, []);

  const currentMat = MATERIALS[material];

  return (
    <div ref={wrapRef} className="select-none relative overflow-hidden rounded-2xl">
      {/* Dynamic Ambient Glow & Blurred Gradient Stage (NO STATIC BG) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center transition-all duration-700 ease-out"
        style={{
          transform: `translate(${angle * 0.35}px, 0)`,
        }}
      >
        {/* Core ambient light pool behind the sofa */}
        <div
          className="absolute rounded-full transition-all duration-700 ease-out"
          style={{
            width: "80%",
            height: "70%",
            background: `radial-gradient(ellipse at center, ${currentMat.glowColor} 0%, ${currentMat.secondaryGlow} 45%, transparent 72%)`,
            filter: "blur(55px)",
            opacity: 0.9,
          }}
        />

        {/* Wider atmospheric ambient light diffusion */}
        <div
          className="absolute rounded-full transition-all duration-1000 ease-out"
          style={{
            width: "110%",
            height: "90%",
            background: `radial-gradient(circle at 50% 60%, ${currentMat.ambientLight} 0%, transparent 68%)`,
            filter: "blur(85px)",
            opacity: 0.65,
          }}
        />

        {/* Subtle floor contact glow */}
        <div
          className="absolute -bottom-6 rounded-full transition-all duration-700 ease-out"
          style={{
            width: "90%",
            height: "30%",
            background: `radial-gradient(ellipse at center, ${currentMat.glowColor} 0%, transparent 65%)`,
            filter: "blur(40px)",
            opacity: 0.55,
          }}
        />
      </div>

      {/* Interactive 3D Sofa Area */}
      <div
        className="relative aspect-[4/3] cursor-grab active:cursor-grabbing overflow-visible"
        style={{ perspective: "1400px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        role="img"
        aria-label="Interactive 3D product viewer — modular sofa"
      >
        {/* Transparent Sofa with Studio Contact Shadow */}
        <img
          src="/assets/hero-sofa-studio.png"
          alt="Modular sofa configured in TrueForm"
          width={1408}
          height={1104}
          className="h-full w-full object-contain transition-[filter] duration-500 drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
          style={{
            filter: currentMat.filter,
            transform: `rotateY(${angle * 0.55}deg) scale(1.04)`,
            transformStyle: "preserve-3d",
          }}
        />

        {!active && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20 backdrop-blur-[2px] text-xs tracking-[0.2em] text-white/75 rounded-2xl">
            TAP TO LOAD
          </div>
        )}

        {/* Floating Glass Swatches Bar */}
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex items-center gap-2 sm:gap-2.5 z-10 bg-black/50 backdrop-blur-xl px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-white/15 shadow-xl">
          {MATERIALS.map((m, i) => (
            <button
              key={m.name}
              type="button"
              title={m.name}
              aria-label={m.name}
              aria-pressed={i === material}
              onClick={() => setMaterial(i)}
              className={`h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 transition-all duration-200 hover:scale-115 cursor-pointer ${
                i === material
                  ? "border-white scale-110 shadow-[0_0_14px_rgba(255,255,255,0.7)] ring-2 ring-white/40"
                  : "border-white/35 opacity-80 hover:opacity-100"
              }`}
              style={{ backgroundColor: m.swatch }}
            />
          ))}
        </div>
      </div>

      {caption && (
        <p className="mt-3 text-sm text-white/50">
          {caption} <span className="text-white/85 font-medium transition-colors duration-300">Material: {currentMat.name}.</span>
        </p>
      )}
    </div>
  );
}

export default ProductViewer;
