import { useEffect, useRef, useState, useCallback } from "react";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Use refs for continuous values to eliminate React re-renders
  const rotRef = useRef({ x: 0, y: 0 });
  const scrollRotRef = useRef(0);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const isDraggingRef = useRef(false);
  const isVisibleRef = useRef(true);

  // Update DOM transform directly without triggering React renders
  const updateTransform = useCallback(() => {
    if (!stageRef.current) return;
    const { x, y } = rotRef.current;
    const scrollRot = scrollRotRef.current;
    stageRef.current.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y + scrollRot}deg) scale(1.02)`;
    if (backdropRef.current) {
      backdropRef.current.style.transform = `translate(${y * 0.5}px, ${x * 0.5}px)`;
    }
  }, []);

  // Viewport Observer: Pause scroll tracking when scrolled past Hero
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "50px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!isVisibleRef.current) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollRotRef.current = (window.scrollY * 0.04) % 360;
          updateTransform();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateTransform]);

  // Mouse move tilt effect when not dragging (direct DOM transform, 0 React re-renders)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rotRef.current = {
      x: -ny * 18,
      y: nx * 24,
    };
    updateTransform();
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      rotRef.current = { x: 0, y: 0 };
      updateTransform();
    }
  };

  // Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotRef.current.x,
      rotY: rotRef.current.y,
    };
  };

  useEffect(() => {
    let ticking = false;

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          const dx = e.clientX - dragStartRef.current.x;
          const dy = e.clientY - dragStartRef.current.y;
          rotRef.current = {
            x: dragStartRef.current.rotX - dy * 0.4,
            y: dragStartRef.current.rotY + dx * 0.4,
          };
          updateTransform();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
      isDraggingRef.current = false;
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [updateTransform]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      className={`relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        perspective: "1000px",
        willChange: "transform",
      }}
    >
      {/* Ambient glowing radial backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 rounded-full opacity-60 filter blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(120, 87, 255, 0.22) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 75%)",
          willChange: "transform",
        }}
      />

      {/* 3D Model Stage */}
      <div
        ref={stageRef}
        className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <img
          src="/assets/hero-headset.png"
          alt="Photorealistic 3D Model"
          className="w-full h-auto max-h-[92%] object-contain drop-shadow-2xl pointer-events-none"
          draggable={false}
          style={{
            filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.18))",
          }}
        />
      </div>

      {/* Interactive Floating Pill */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-white/90 backdrop-blur-md text-gray-800 border border-gray-200/80 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Drag to inspect 360° · Scroll for depth
        </span>
      </div>
    </div>
  );
}
