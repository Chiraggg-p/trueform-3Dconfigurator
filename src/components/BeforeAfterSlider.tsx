import { useState, useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  className?: string;
}

export default function BeforeAfterSlider({ className = "" }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl select-none cursor-ew-resize shadow-2xl ${className}`}
      style={{
        maxHeight: "560px",
        aspectRatio: "16 / 9",
        background: "#111520",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Background full image: The photoreal render */}
      <img
        src="/assets/slider-card.png"
        alt="Photorealistic 3D Render"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Top clipped image: The wireframe/clay view */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          width: `${sliderPos}%`,
          borderRight: "2px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: containerRef.current?.offsetWidth || "100%",
            height: "100%",
          }}
        >
          <img
            src="/assets/slider-card.png"
            alt="Wireframe Topology"
            className="w-full h-full object-cover pointer-events-none"
            style={{
              filter: "grayscale(1) contrast(1.15) brightness(0.95)",
            }}
            draggable={false}
          />
          {/* Wireframe grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(120, 87, 255, 0.18) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(120, 87, 255, 0.18) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Badge Left */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/80 backdrop-blur-md text-white border border-white/10 shadow-lg">
            3D Topology & Wireframe
          </span>
        </div>
      </div>

      {/* Badge Right */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-600/90 backdrop-blur-md text-white border border-white/20 shadow-lg">
          Photoreal PBR Render
        </span>
      </div>

      {/* Center Draggable Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
        style={{
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white text-black shadow-2xl flex items-center justify-center cursor-ew-resize border border-white/40 pointer-events-auto transform transition-transform hover:scale-110 active:scale-95">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Drag instruction pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-black/70 backdrop-blur-md text-white/90 border border-white/10">
          ⇄ Drag slider to inspect 3D geometry vs render
        </span>
      </div>
    </div>
  );
}
