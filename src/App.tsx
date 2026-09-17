import { useState, useEffect, useRef } from "react";
import Configurator3D from "./components/Configurator3D";
import Hero3DCanvas from "./components/Hero3DCanvas";
import { ProductViewer } from "./components/ProductViewer";

// ─── TOKENS ────────────────────────────────────────────────────────────────
const ACCENT = "#7857FF";
const DARK = "#0B0E14";

// ─── NAV ────────────────────────────────────────────────────────────────────
// ─── NAV (FIGMA CAPSULE WITH RESPONSIVE MOBILE DRAWER) ───────────────────────
function Nav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCaseStudiesOpen, setMobileCaseStudiesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          width: "calc(100% - 24px)",
          maxWidth: 1259,
          height: 54,
          boxSizing: "border-box",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "0.893939px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0px 10.7273px 28.6061px -14.303px rgba(15, 23, 42, 0.1), 0px 8px 7.5px rgba(0, 0, 0, 0.08)",
          borderRadius: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px 0 16px",
        }}
      >
        {/* Left: Logo */}
        <a
          href="#"
          onClick={closeMobileMenu}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            height: 34,
          }}
        >
          <img
            src="/assets/nav-logo.png"
            alt="Abhiwan"
            style={{
              height: 30,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </a>

        {/* Center: List of Navigation Items (Desktop Only >= 1024px) */}
        <nav
          className="hidden lg:flex"
          style={{
            alignItems: "center",
            gap: "1.75rem",
            fontFamily: "'Inter Tight', 'Inter', sans-serif",
            fontSize: "14px",
            lineHeight: "18px",
            letterSpacing: "-0.157px",
            color: "#0E1729",
          }}
        >
          {/* 1. Home */}
          <a
            href="#"
            style={{
              color: "#0E1729",
              textDecoration: "none",
              fontWeight: 500,
              padding: "6px 4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#3952FC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0E1729")}
          >
            Home
          </a>

          {/* 2. Services (with dropdown) */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: activeDropdown === "services" ? "#3952FC" : "#0E1729",
                fontFamily: "'Inter Tight', 'Inter', sans-serif",
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: 400,
                letterSpacing: "-0.157px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 4px",
                transition: "color 0.2s",
              }}
            >
              Services
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.2s", transform: activeDropdown === "services" ? "rotate(180deg)" : "none" }}>
                <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="#0E1729" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Services Dropdown */}
            {activeDropdown === "services" && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 14px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 280,
                  background: "#FFFFFF",
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  borderRadius: 16,
                  padding: "1rem",
                  boxShadow: "0px 20px 40px -10px rgba(15, 23, 42, 0.15), 0px 8px 16px -4px rgba(0, 0, 0, 0.06)",
                }}
              >
                {[
                  { title: "3D Product Modelling", desc: "Photoreal PBR industrial models & assets", href: "#demos" },
                  { title: "3D Configurator Development", desc: "Interactive WebGL engines & real-time UI", href: "#demos" },
                  { title: "AR / VR Solutions", desc: "WebAR scene viewer & true-scale preview", href: "#ar" },
                  { title: "Game Art & Digital Twins", desc: "Asset pipelines & simulation workflows", href: "#what-you-get" },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: "block",
                      padding: "0.6rem 0.75rem",
                      borderRadius: 10,
                      textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#F8FAFC")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
                  >
                    <p style={{ color: "#0F172A", fontSize: "0.85rem", fontWeight: 600, margin: 0, fontFamily: "'Inter Tight', sans-serif" }}>
                      {item.title}
                    </p>
                    <p style={{ color: "#64748B", fontSize: "0.72rem", margin: "2px 0 0 0", fontFamily: "'Inter', sans-serif" }}>
                      {item.desc}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 3. Products (with product scroll down and product name TrueForm) */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => handleMouseEnter("products")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: activeDropdown === "products" ? "#3952FC" : "#0E1729",
                fontFamily: "'Inter Tight', 'Inter', sans-serif",
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: 600,
                letterSpacing: "-0.157px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 4px",
                transition: "color 0.2s",
              }}
            >
              Products
              <span
                style={{
                  background: "linear-gradient(135deg, #3952FC 0%, #7857FF 100%)",
                  color: "#FFFFFF",
                  fontSize: "9px",
                  fontWeight: 700,
                  padding: "1px 6px",
                  borderRadius: 100,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                TrueForm
              </span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.2s", transform: activeDropdown === "products" ? "rotate(180deg)" : "none" }}>
                <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="#0E1729" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Products Scroll-Down Card with Product Details */}
            {activeDropdown === "products" && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 14px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 380,
                  background: "#FFFFFF",
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  borderRadius: 18,
                  padding: "1.25rem",
                  boxShadow: "0px 24px 50px -12px rgba(15, 23, 42, 0.18), 0px 8px 18px -4px rgba(0, 0, 0, 0.06)",
                }}
              >
                {/* Product Name Header */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)",
                    borderRadius: 12,
                    padding: "1rem",
                    marginBottom: "1rem",
                    color: "white",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", color: "#A5B4FC", textTransform: "uppercase", fontFamily: "'Inter Tight', sans-serif" }}>
                      Featured Product
                    </span>
                  </div>
                  <h4 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem 0", color: "#FFFFFF" }}>
                    TrueForm — 3D Configurator
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", lineHeight: 1.45, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                    Enterprise real-time 3D configurator, WebAR viewer, and 3D catalog cloud from one team. No transaction fees.
                  </p>
                </div>

                {/* Product Section Scroll-Down Quick Links */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {[
                    { label: "⚡ Live 3D Studio", desc: "Interactive 360° demo", href: "#demos" },
                    { label: "📦 What You Get", desc: "Configurator + AR + Catalog", href: "#what-you-get" },
                    { label: "🚀 6-Week Roadmap", desc: "From photos to live", href: "#roadmap" },
                    { label: "🏷️ Pricing Plans", desc: "Launch, Growth & Scale", href: "#plans" },
                    { label: "📱 WebAR Viewer", desc: "True scale in room", href: "#ar" },
                    { label: "📊 Catalog Cloud", desc: "Admin CMS dashboard", href: "#admin" },
                  ].map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        padding: "0.55rem 0.65rem",
                        borderRadius: 10,
                        textDecoration: "none",
                        background: "#F8FAFC",
                        border: "1px solid rgba(15, 23, 42, 0.04)",
                        transition: "background 0.15s, border-color 0.15s, transform 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#EFF6FF";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#93C5FD";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#F8FAFC";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(15, 23, 42, 0.04)";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                      }}
                    >
                      <p style={{ color: "#0F172A", fontSize: "0.78rem", fontWeight: 600, margin: 0, fontFamily: "'Inter Tight', sans-serif" }}>
                        {sub.label}
                      </p>
                      <p style={{ color: "#64748B", fontSize: "0.68rem", margin: "2px 0 0 0", fontFamily: "'Inter', sans-serif" }}>
                        {sub.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Case Study (with dropdown) */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => handleMouseEnter("casestudy")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: activeDropdown === "casestudy" ? "#3952FC" : "#0E1729",
                fontFamily: "'Inter Tight', 'Inter', sans-serif",
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: 400,
                letterSpacing: "-0.157px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 4px",
                transition: "color 0.2s",
              }}
            >
              Case Study
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.2s", transform: activeDropdown === "casestudy" ? "rotate(180deg)" : "none" }}>
                <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="#0E1729" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Case Studies Dropdown */}
            {activeDropdown === "casestudy" && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 14px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 290,
                  background: "#FFFFFF",
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  borderRadius: 16,
                  padding: "1rem",
                  boxShadow: "0px 20px 40px -10px rgba(15, 23, 42, 0.15), 0px 8px 16px -4px rgba(0, 0, 0, 0.06)",
                }}
              >
                {[
                  { title: "Savills Commercial Real Estate", desc: "Interactive 3D space planning & tour", href: "#credentials" },
                  { title: "Philips Precision Electronics", desc: "Exploded view mechanical configurator", href: "#demos" },
                  { title: "Luxury Jewelry & Timepieces", desc: "Diamond refraction & real-time PBR", href: "#demos" },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      display: "block",
                      padding: "0.6rem 0.75rem",
                      borderRadius: 10,
                      textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#F8FAFC")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
                  >
                    <p style={{ color: "#0F172A", fontSize: "0.85rem", fontWeight: 600, margin: 0, fontFamily: "'Inter Tight', sans-serif" }}>
                      {item.title}
                    </p>
                    <p style={{ color: "#64748B", fontSize: "0.72rem", margin: "2px 0 0 0", fontFamily: "'Inter', sans-serif" }}>
                      {item.desc}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 5. Portfolio */}
          <a
            href="#demos"
            style={{
              color: "#0E1729",
              textDecoration: "none",
              fontWeight: 400,
              padding: "6px 4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#3952FC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0E1729")}
          >
            Portfolio
          </a>

          {/* 6. About Us */}
          <a
            href="#credentials"
            style={{
              color: "#0E1729",
              textDecoration: "none",
              fontWeight: 400,
              padding: "6px 4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#3952FC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0E1729")}
          >
            About Us
          </a>

          {/* 7. Contact Us */}
          <a
            href="#contact"
            style={{
              color: "#0E1729",
              textDecoration: "none",
              fontWeight: 400,
              padding: "6px 4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#3952FC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0E1729")}
          >
            Contact Us
          </a>
        </nav>

        {/* Right Section: Desktop CTA + Mobile Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* CTA Button */}
          <a
            href="#contact"
            onClick={closeMobileMenu}
            style={{
              height: 32,
              padding: "0 14px",
              boxSizing: "border-box",
              background: "#0F172A",
              borderRadius: 9999,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              textDecoration: "none",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "12.5px",
              lineHeight: "18px",
              color: "#FFFFFF",
              transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.15)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#3952FC";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 12px rgba(57, 82, 252, 0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#0F172A";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.15)";
            }}
          >
            <span>Start a project</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col pt-20 px-3 pb-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 shadow-2xl border border-slate-200/90 overflow-y-auto max-h-[82vh] space-y-4">
            {/* Quick Link: Home */}
            <a
              href="#"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 font-semibold text-slate-900 no-underline text-base border-b border-slate-100"
            >
              <span>Home</span>
              <span className="text-slate-400">→</span>
            </a>

            {/* Accordion: Services */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-left font-semibold text-slate-900 cursor-pointer"
              >
                <span>Services</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {mobileServicesOpen && (
                <div className="mt-1 pl-3 space-y-1.5 bg-slate-50 rounded-2xl p-2.5">
                  {[
                    { title: "3D Product Modelling", href: "#demos" },
                    { title: "3D Configurator Development", href: "#demos" },
                    { title: "AR / VR Solutions", href: "#ar" },
                    { title: "Game Art & Digital Twins", href: "#what-you-get" },
                  ].map((s) => (
                    <a
                      key={s.title}
                      href={s.href}
                      onClick={closeMobileMenu}
                      className="block py-1.5 px-2 text-sm text-slate-700 hover:text-indigo-600 no-underline"
                    >
                      • {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion: TrueForm Products */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-left font-semibold text-slate-900 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>Products</span>
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    TrueForm
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {mobileProductsOpen && (
                <div className="mt-1 pl-3 space-y-1.5 bg-violet-50/60 rounded-2xl p-2.5">
                  {[
                    { label: "⚡ Live 3D Studio", href: "#demos" },
                    { label: "📦 What You Get", href: "#what-you-get" },
                    { label: "🚀 6-Week Roadmap", href: "#roadmap" },
                    { label: "🏷️ Pricing Plans", href: "#plans" },
                    { label: "📱 WebAR Viewer", href: "#ar" },
                    { label: "📊 Catalog Cloud", href: "#admin" },
                  ].map((p) => (
                    <a
                      key={p.label}
                      href={p.href}
                      onClick={closeMobileMenu}
                      className="block py-1.5 px-2 text-sm font-medium text-slate-800 hover:text-purple-600 no-underline"
                    >
                      {p.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion: Case Studies */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-left font-semibold text-slate-900 cursor-pointer"
              >
                <span>Case Studies</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${mobileCaseStudiesOpen ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {mobileCaseStudiesOpen && (
                <div className="mt-1 pl-3 space-y-1.5 bg-slate-50 rounded-2xl p-2.5">
                  {[
                    { title: "Savills Commercial Real Estate", href: "#credentials" },
                    { title: "Philips Precision Electronics", href: "#demos" },
                    { title: "Luxury Jewelry & Timepieces", href: "#demos" },
                  ].map((c) => (
                    <a
                      key={c.title}
                      href={c.href}
                      onClick={closeMobileMenu}
                      className="block py-1.5 px-2 text-sm text-slate-700 hover:text-indigo-600 no-underline"
                    >
                      • {c.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <a
              href="#demos"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-slate-50 font-semibold text-slate-900 no-underline text-base border-b border-slate-100"
            >
              <span>Portfolio</span>
              <span className="text-slate-400">→</span>
            </a>
            <a
              href="#credentials"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-slate-50 font-semibold text-slate-900 no-underline text-base border-b border-slate-100"
            >
              <span>About Us</span>
              <span className="text-slate-400">→</span>
            </a>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-slate-50 font-semibold text-slate-900 no-underline text-base"
            >
              <span>Contact Us</span>
              <span className="text-slate-400">→</span>
            </a>

            {/* Mobile Actions */}
            <div className="pt-3 flex flex-col gap-2">
              <a
                href="#demos"
                onClick={closeMobileMenu}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-semibold text-sm shadow-md no-underline"
              >
                ⚡ Try Live 3D Configurator
              </a>
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="w-full py-3 rounded-xl bg-slate-900 text-white text-center font-semibold text-sm shadow-md no-underline"
              >
                Start a project ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Right-Edge Tab: Get a Free Quote (Desktop / Tablet only) */}
      <a
        href="#contact"
        className="hidden md:block"
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
          background: "#0B0E14",
          color: "white",
          padding: "1.1rem 0.65rem",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          textDecoration: "none",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "background 0.2s, padding-right 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACCENT)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#0B0E14")}
      >
        Get a Free Quote
      </a>
    </>
  );
}

// ─── STICKY BAR ─────────────────────────────────────────────────────────────
function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastVisible = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollable > 0) {
            const nextVisible = window.scrollY / scrollable > 0.6;
            if (nextVisible !== lastVisible) {
              lastVisible = nextVisible;
              setVisible(nextVisible);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-bar ${visible ? "visible" : ""}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-bold text-white text-xs sm:text-sm truncate" style={{ fontFamily: "var(--font-display)" }}>
            TrueForm — 3D Configurator Platform
          </p>
          <p className="text-white/50 text-[11px] sm:text-xs truncate">
            Plans from Rs 35,000 / $449/mo · 3D models included · 0% fee
          </p>
        </div>
        <a
          href="#contact"
          className="flex-shrink-0 bg-[#7857FF] hover:bg-[#6845EE] text-white px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors no-underline whitespace-nowrap shadow-md"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Book a demo →
        </a>
      </div>
    </div>
  );
}

// ─── 1. HERO (TRUEFORM BY ABHIWAN TECHNOLOGIES WITH SOFA 3D VIEWER) ─────────
function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-ink pt-24 pb-12 sm:pt-32 sm:pb-16 min-h-[calc(100vh-20px)] flex items-center"
      style={{
        position: "relative",
        background: "var(--ink)",
      }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 tf-glow opacity-45 pointer-events-none" aria-hidden />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 lg:gap-12 px-4 sm:px-6 lg:px-12 lg:grid-cols-[45fr_55fr] w-full">
        {/* Left Column — Copy & CTAs */}
        <div>
          <p
            className="mb-3 sm:mb-4 text-[11px] font-semibold tracking-[0.28em] text-accent-violet-soft uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TRUEFORM BY ABHIWAN TECHNOLOGIES
          </p>

          <h1
            className="max-w-xl text-3xl sm:text-4xl lg:text-[3.2rem] font-bold leading-[1.08] text-white"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}
          >
            Let your customers build the product before they buy it.
          </h1>

          <p
            className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-base text-white/65 lg:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Real-time 3D configurator, AR preview, and the 3D catalog to run it — from one team.
            No transaction fees.
          </p>

          <div className="mt-7 sm:mt-9 flex flex-wrap gap-3 sm:gap-3.5">
            <a
              href="#demos"
              className="rounded-full bg-accent-violet hover:bg-[#6845EE] px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition-all shadow-lg hover:shadow-purple-500/25 cursor-pointer no-underline inline-block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Try a live demo
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/25 hover:bg-white/10 px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition-colors cursor-pointer no-underline inline-block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Book a 20-min walkthrough
            </a>
          </div>

          <p
            className="mt-8 sm:mt-10 text-xs sm:text-sm text-white/40"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Coca-Cola, ISKCON, DP World, Nilkamal, Abu Dhabi Police.
          </p>
        </div>

        {/* Right Column — Interactive 3D Sofa Product Viewer */}
        <div className="relative w-full">
          <ProductViewer caption="Running live on this page. Drag to rotate." />
        </div>
      </div>

      {/* Vertical Edge Tab: SCROLL TO EXPLORE */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 border-l border-white/10 px-3 py-6 text-[10px] tracking-[0.3em] text-white/35 lg:flex select-none"
        style={{ writingMode: "vertical-rl" }}
      >
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}

// ─── 2. BRANDS THAT TRUST US SECTION ─────────────────────────────────────────
function CredentialStrip() {
  const brandLogos = [
    { name: "Bajaj Finserv", src: "/assets/brands/Bjaj.png", h: 34 },
    { name: "Vaseline", src: "/assets/brands/Vaseline.png", h: 30 },
    { name: "Philips", src: "/assets/brands/Philips.png", h: 32 },
    { name: "Coca Cola", src: "/assets/brands/coca cola.png", h: 32 },
    { name: "ISKCON", src: "/assets/brands/isckone.png", h: 38 },
    { name: "Ogilvy", src: "/assets/brands/ogilvy.png", h: 30 },
    { name: "Dainik", src: "/assets/brands/dianik.png", h: 30 },
    { name: "Stripto", src: "/assets/brands/stripto.png", h: 34 },
  ];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: 120,
        background: "#081123",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        isolation: "isolate",
        borderTop: "1px solid rgba(255, 255, 255, 0.07)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
      }}
    >
      {/* Figma Gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(50% 40% at 20% 20%, rgba(18, 146, 192, 0.25) 0%, rgba(18, 146, 192, 0) 70%), radial-gradient(45% 40% at 90% 80%, rgba(203, 70, 255, 0.18) 0%, rgba(232, 127, 37, 0) 70%), linear-gradient(180deg, #171635 0%, #12112D 100%)",
          opacity: 0.8,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto py-5 sm:py-8 px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-9">
        {/* Left Label: Brands that trust us */}
        <div className="flex-shrink-0 w-auto sm:min-w-[104px] sm:pr-6 sm:border-r border-white/12 text-center sm:text-left">
          <p
            style={{
              fontFamily: "'Inter Tight', var(--font-body), sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Brands that trust us
          </p>
        </div>

        {/* Infinite Logo Marquee Animation (Dual-Track Hardware-Accelerated) */}
        <div
          className="marquee-container"
          style={{
            flex: 1,
            width: "100%",
            overflow: "hidden",
            display: "flex",
            position: "relative",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          {/* Track 1 */}
          <div className="animate-marquee-track">
            {brandLogos.map((logo, idx) => (
              <div
                key={`t1-${idx}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  opacity: 0.85,
                  transition: "opacity 0.2s, transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = "1";
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    height: logo.h,
                    width: "auto",
                    maxHeight: 46,
                    maxWidth: 160,
                    objectFit: "contain",
                    filter: "brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Track 2 (Cloned for 100% seamless, mathematically stutter-free loop) */}
          <div className="animate-marquee-track" aria-hidden="true">
            {brandLogos.map((logo, idx) => (
              <div
                key={`t2-${idx}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  opacity: 0.85,
                  transition: "opacity 0.2s, transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = "1";
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    height: logo.h,
                    width: "auto",
                    maxHeight: 46,
                    maxWidth: 160,
                    objectFit: "contain",
                    filter: "brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. THE PROBLEM ──────────────────────────────────────────────────────────
function TheProblem() {
  return (
    <section className="section-light py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
              lineHeight: 1.1,
            }}
          >
            Shoppers cannot touch it,
            <br />so they hesitate.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", fontFamily: "var(--font-body)" }}>
            The conversion gap is not a marketing problem. It is a product experience problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {[
            {
              num: "01",
              head: "They cannot picture it",
              body: "A flat photo cannot show oak legs against grey fabric, or how a sofa arm reads in a bright room. Shoppers leave when confidence fails.",
            },
            {
              num: "02",
              head: "So they do not decide",
              body: "Carts are abandoned when confidence runs out. The customer did not change their mind — they never fully made it up.",
            },
            {
              num: "03",
              head: "Building 3D is hard",
              body: "You need WebGL engineers, a pipeline, and 3D artists. Brands stall at 'someday' because the path from product photos to live configurator is not obvious.",
            },
          ].map((item) => (
            <div key={item.num} className="bg-white/60 md:bg-transparent p-6 md:p-0 rounded-2xl border md:border-0 border-slate-200/60 shadow-sm md:shadow-none">
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  fontWeight: 900,
                  color: "rgba(120,87,255,0.2)",
                  lineHeight: 1,
                  marginBottom: "1rem",
                  letterSpacing: "-2px",
                }}
              >
                {item.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: DARK,
                  margin: "0 0 0.65rem 0",
                  letterSpacing: "-0.02em",
                }}
              >
                {item.head}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.65, fontFamily: "var(--font-body)", margin: 0 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. WHAT YOU GET ─────────────────────────────────────────────────────────
function WhatYouGet() {
  const rows = [
    {
      num: "01",
      head: "The Configurator",
      body: "Real-time 3D, materials, components, modular layouts, live price and BOM. One script tag. Works on Shopify, WooCommerce, Odoo, or any custom stack.",
      img: "/assets/step-configure.jpg",
      imgAlt: "3D furniture configurator running in browser",
      tag: "Core platform",
    },
    {
      num: "02",
      head: "AR in the customer's room",
      body: "True scale, no app download required. Works on iOS and Android through the browser. The Eyewear Try-On and furniture AR reduce returns by over 30%.",
      img: "/assets/ar-phone.jpg",
      imgAlt: "Augmented reality product view in living room",
      tag: "AR preview",
      reversed: true,
    },
    {
      num: "03",
      head: "Your 3D catalog, produced by us",
      body: "The part everyone else leaves to you. We model, optimize, and maintain every SKU. Draco-compressed GLBs under 2MB, CDN-served, auto-updated when specs change.",
      img: "/assets/kitchen-catalog.png",
      imgAlt: "Photoreal 3D modular kitchen and catalog produced by Abhiwan Technology",
      tag: "The differentiator",
      accent: true,
    },
  ];

  return (
    <section className="section-white py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
              lineHeight: 1.1,
            }}
          >
            One platform. Three things you would
            <br />otherwise buy separately.
          </h2>
        </div>

        <div className="flex flex-col gap-12 sm:gap-20">
          {rows.map((row) => (
            <div
              key={row.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Text side */}
              <div className={`lg:col-span-6 ${row.reversed ? "lg:order-2" : "lg:order-1"}`}>
                <span
                  className="tag"
                  style={{
                    background: row.accent ? ACCENT : "rgba(120,87,255,0.1)",
                    color: row.accent ? "white" : ACCENT,
                    marginBottom: "1rem",
                  }}
                >
                  {row.tag}
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3rem, 5vw, 5rem)",
                    fontWeight: 900,
                    color: "rgba(120,87,255,0.12)",
                    lineHeight: 1,
                    letterSpacing: "-3px",
                    margin: "0.25rem 0",
                  }}
                >
                  {row.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                    fontWeight: 800,
                    color: DARK,
                    letterSpacing: "-0.03em",
                    margin: "0.5rem 0 1rem 0",
                    lineHeight: 1.15,
                  }}
                >
                  {row.head}
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.98rem",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-body)",
                    margin: "0 0 1.5rem 0",
                  }}
                >
                  {row.body}
                </p>
                <a
                  href="#contact"
                  style={{
                    color: ACCENT,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontFamily: "var(--font-display)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  See it in action →
                </a>
              </div>

              {/* Image side */}
              <div
                className={`lg:col-span-6 rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-[400px] relative bg-[#1A1D28] shadow-lg ${
                  row.reversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <img
                  src={row.img}
                  alt={row.imgAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {row.accent && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(120,87,255,0.15) 0%, transparent 60%)",
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. PRODUCT ROADMAP ──────────────────────────────────────────────────────
function ProductRoadmap() {
  const steps = [
    {
      num: "01",
      head: "Share",
      body: "Photos, CAD, spec sheets — whatever you have. Our intake process is designed for brands who are not 3D-native.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=280&fit=crop&auto=format",
    },
    {
      num: "02",
      head: "We model",
      body: "Our studio builds web-optimised 3D models. Two review checkpoints: grey stage, then textured. First model in 7 days.",
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=280&fit=crop&auto=format",
    },
    {
      num: "03",
      head: "We configure",
      body: "We define options, rules, materials, and pricing logic in the platform. You review a staging link before anything goes live.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=280&fit=crop&auto=format",
    },
    {
      num: "04",
      head: "You go live",
      body: "One script tag. Works on Shopify, WooCommerce, Odoo, or custom. Should take under 30 minutes to integrate.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=280&fit=crop&auto=format",
    },
  ];

  return (
    <section className="section-dark py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.85rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
              lineHeight: 1.15,
            }}
          >
            From your product photos to live on your site —
            <br />
            <span style={{ color: ACCENT }}>in 3 to 6 weeks.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative"
            >
              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-[2.2rem] -right-3 w-6 h-[1px] z-10"
                  style={{
                    background: "linear-gradient(90deg, rgba(120,87,255,0.4), rgba(120,87,255,0.1))",
                  }}
                />
              )}

              <div className="step-num">{step.num}</div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "white",
                  margin: "0.5rem 0 0.5rem 0",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.head}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-body)",
                  margin: "0 0 1.25rem 0",
                }}
              >
                {step.body}
              </p>

              <div
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  height: 160,
                  background: "#111520",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <img
                  src={step.img}
                  alt={step.head}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* SLA strip */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/6 border border-white/6 rounded-xl overflow-hidden">
          {[
            { label: "Scope lock", val: "4 working days" },
            { label: "First model review", val: "7 days" },
            { label: "Go live", val: "3–6 weeks" },
            { label: "New model turnaround", val: "5 working days" },
          ].map((sla) => (
            <div
              key={sla.label}
              className="p-4 sm:p-6 bg-white/[0.02]"
            >
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.35rem 0", fontFamily: "var(--font-display)" }}>
                {sla.label}
              </p>
              <p style={{ color: "white", fontSize: "0.95rem", sm: { fontSize: "1.05rem" }, fontWeight: 700, margin: 0, fontFamily: "var(--font-display)" }}>
                {sla.val}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. LIVE DEMO GALLERY ────────────────────────────────────────────────────
function DemoGallery() {
  const demos = [
    { label: "Modular Sofa Planner", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=360&fit=crop&auto=format", featured: true },
    { label: "Trolley Suitcase", img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=280&fit=crop&auto=format" },
    { label: "Automotive Showroom", img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=280&fit=crop&auto=format" },
    { label: "Sneaker Configurator", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=280&fit=crop&auto=format" },
    { label: "Watch Builder", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=280&fit=crop&auto=format" },
    { label: "Eyewear Try-On", img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=280&fit=crop&auto=format" },
    { label: "Kitchen Configurator", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=280&fit=crop&auto=format" },
    { label: "360° Product Viewer", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=280&fit=crop&auto=format" },
  ];

  return (
    <section id="demos" className="section-dark py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 sm:mb-14">
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.85rem, 3.5vw, 3rem)",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.03em",
                margin: "0 0 0.75rem 0",
                lineHeight: 1.15,
              }}
            >
              Built for the brands
              <br />defining their categories.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", fontFamily: "var(--font-body)", margin: 0 }}>
              Do not take our word for it. Try it yourself.
            </p>
          </div>
          <a
            href="#"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              padding: "0.65rem 1.25rem",
              borderRadius: 8,
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              whiteSpace: "nowrap",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)")}
          >
            Open the full demo gallery →
          </a>
        </div>

        {/* Flagship Real-Time 3D Configurator Studio */}
        <div className="mb-12 sm:mb-16">
          <Configurator3D />
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Featured large card */}
          <div
            className="grid-card sm:col-span-2 sm:row-span-2 rounded-xl overflow-hidden h-72 sm:h-96 lg:h-[500px]"
          >
            <img
              src={demos[0].img}
              alt={demos[0].label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="overlay">
              <span
                style={{
                  background: ACCENT,
                  color: "white",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 100,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                  display: "inline-block",
                  fontFamily: "var(--font-display)",
                }}
              >
                Live Interactive
              </span>
              <p style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", margin: "0.3rem 0 0 0", letterSpacing: "-0.02em" }}>
                {demos[0].label}
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", margin: "0.25rem 0 0 0", fontFamily: "var(--font-body)" }}>
                Drag to rotate · Tap to configure
              </p>
            </div>
          </div>

          {/* 6 smaller cards */}
          {demos.slice(1, 7).map((demo) => (
            <div
              key={demo.label}
              className="grid-card rounded-xl overflow-hidden h-48 sm:h-56 lg:h-60 cursor-pointer"
            >
              <img
                src={demo.img}
                alt={demo.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="overlay">
                <p style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", margin: 0, letterSpacing: "-0.01em" }}>
                  {demo.label}
                </p>
              </div>
            </div>
          ))}

          {/* Last card with all demos link */}
          <div
            className="grid-card rounded-xl h-48 sm:h-56 lg:h-60 flex items-center justify-center border border-white/8 flex-col gap-3 cursor-pointer transition-colors hover:border-[#7857FF]/40"
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: `1px solid ${ACCENT}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: ACCENT, fontSize: "1.25rem" }}>→</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontFamily: "var(--font-display)", fontWeight: 600, margin: 0, textAlign: "center" }}>
              {demos[7].label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 7. AR DEMO ───────────────────────────────────────────────────────────────
function ARDemo() {
  return (
    <section className="section-light py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span
            style={{
              color: ACCENT,
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.85rem",
              fontFamily: "var(--font-body)",
            }}
          >
            AR Preview
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.2vw, 3rem)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.035em",
              margin: "0 0 1.25rem 0",
              lineHeight: 1.15,
            }}
          >
            See it in your
            <br />own space.
          </h2>
          <p
            style={{
              color: "#475569",
              fontSize: "1rem",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
              margin: "0 0 2rem 0",
              maxWidth: 480,
            }}
          >
            True scale, in your customer's room, on their own phone. No app download. iOS Quick Look and Android Scene Viewer — works from any product page.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, color: "#7857FF" }} fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                    <path d="M12 18h.01"/>
                  </svg>
                ),
                title: "No app install",
                desc: "Works seamlessly from Safari (iOS) and Chrome (Android)",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, color: "#7857FF" }} fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                ),
                title: "True 1:1 scale",
                desc: "Life-size real dimensions projected into physical rooms",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, color: "#7857FF" }} fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
                    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
                  </svg>
                ),
                title: "USDZ & GLB formats",
                desc: "Quick Look for Apple iOS · Scene Viewer for Google Android",
              },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "0.9rem" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(120, 87, 255, 0.08)",
                    border: "1px solid rgba(120, 87, 255, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "0.98rem",
                      color: "#0F172A",
                      margin: "0 0 0.15rem 0",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      color: "#64748B",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* QR card */}
          <div className="mt-8 sm:mt-10 inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div
              style={{
                width: 56,
                height: 56,
                background: DARK,
                borderRadius: 8,
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 2,
                padding: 6,
                flexShrink: 0,
              }}
            >
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: [0,1,2,5,10,14,15,16,20,22,24].includes(i) ? "white" : "transparent",
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: DARK, margin: "0 0 0.2rem 0" }}>
                Try AR on your phone
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontFamily: "var(--font-body)", margin: 0 }}>
                Scan with your camera · No app needed
              </p>
            </div>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center">
          <div
            className="w-64 h-[500px] sm:w-[280px] sm:h-[560px] relative overflow-hidden"
            style={{
              background: DARK,
              borderRadius: 36,
              border: "8px solid #1A1D28",
              boxShadow: "0 40px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 20,
                background: DARK,
                borderRadius: 100,
                zIndex: 10,
              }}
            />

            {/* AR view */}
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=600&fit=crop&auto=format"
              alt="AR eyewear try-on in browser"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* AR overlay UI */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              {["Rose Gold", "Black", "Tortoise"].map((c) => (
                <div
                  key={c}
                  style={{
                    background: "rgba(11,14,20,0.8)",
                    color: "white",
                    fontSize: "0.6rem",
                    padding: "4px 8px",
                    borderRadius: 100,
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    border: c === "Rose Gold" ? `1px solid ${ACCENT}` : "1px solid transparent",
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 8. SUBSCRIPTION PLANS ───────────────────────────────────────────────────
function Plans() {
  const plans = [
    {
      name: "Launch",
      price: "Rs 35,000",
      usd: "$449",
      skus: "25",
      models: "3 / month",
      configAR: "Yes",
      embedding: "Script tag",
      support: "Email",
      fee: "None",
    },
    {
      name: "Growth",
      price: "Rs 75,000",
      usd: "$899",
      skus: "100",
      models: "8 / month",
      configAR: "Yes",
      embedding: "+ API / SDK",
      support: "Priority + named contact",
      fee: "None",
      featured: true,
    },
    {
      name: "Scale",
      price: "Rs 1,50,000",
      usd: "$1,799",
      skus: "400",
      models: "20 / month",
      configAR: "Yes",
      embedding: "+ Shopify, Woo, Odoo",
      support: "Dedicated manager",
      fee: "None",
    },
  ];

  const rows: { key: keyof (typeof plans)[0]; label: string }[] = [
    { key: "skus", label: "SKUs live" },
    { key: "models", label: "3D models included" },
    { key: "configAR", label: "Configurator + AR" },
    { key: "embedding", label: "Embedding" },
    { key: "support", label: "Support" },
    { key: "fee", label: "Transaction fee" },
  ];

  return (
    <section id="plans" className="section-light py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.85rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
              lineHeight: 1.15,
            }}
          >
            Plans that include the 3D work,
            <br />not just the software.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", sm: { fontSize: "1.05rem" }, fontFamily: "var(--font-body)", margin: 0 }}>
            Annual plans · 12-month minimum · Plans start from Rs 35,000 / $449 per month
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-hover p-6 sm:p-8 lg:p-10 rounded-2xl relative ${
                plan.featured ? "lg:-translate-y-3" : ""
              }`}
              style={{
                background: plan.featured ? DARK : "white",
                border: plan.featured ? `2px solid ${ACCENT}` : "1px solid var(--border-light)",
                boxShadow: plan.featured
                  ? `0 30px 60px rgba(120,87,255,0.2), 0 0 0 1px ${ACCENT}`
                  : "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              {plan.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: ACCENT,
                    color: "white",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "4px 14px",
                    borderRadius: 100,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-display)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Chosen
                </div>
              )}

              <div style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: plan.featured ? "rgba(255,255,255,0.6)" : "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  {plan.name}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: plan.featured ? "white" : DARK,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ color: plan.featured ? "rgba(255,255,255,0.4)" : "var(--text-muted)", fontSize: "0.85rem" }}>
                    / {plan.usd} · /month
                  </span>
                </div>
              </div>

              {/* Feature rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {rows.map((row, i) => (
                  <div
                    key={row.key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.75rem 0",
                      borderBottom: i < rows.length - 1
                        ? `1px solid ${plan.featured ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`
                        : "none",
                    }}
                  >
                    <span
                      style={{
                        color: plan.featured ? "rgba(255,255,255,0.5)" : "var(--text-muted)",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{
                        color:
                          row.key === "fee"
                            ? ACCENT
                            : plan.featured
                            ? "white"
                            : DARK,
                        fontSize: "0.875rem",
                        fontWeight: row.key === "fee" ? 800 : 600,
                        fontFamily: "var(--font-display)",
                        textAlign: "right",
                        maxWidth: "55%",
                      }}
                    >
                      {plan[row.key] as string}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                style={{
                  display: "block",
                  marginTop: "2rem",
                  background: plan.featured ? ACCENT : "transparent",
                  border: `1px solid ${plan.featured ? ACCENT : "rgba(0,0,0,0.12)"}`,
                  color: plan.featured ? "white" : DARK,
                  padding: "0.85rem",
                  borderRadius: 10,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontFamily: "var(--font-display)",
                  textAlign: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!plan.featured) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!plan.featured) (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                Get a quote for your catalog
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9. WHY TRUEFORM ─────────────────────────────────────────────────────────
function WhyTrueForm() {
  const rows = [
    {
      attr: "3D models",
      inhouse: "You hire or outsource",
      saas: "You source them yourself",
      tf: "Included in plan",
    },
    {
      attr: "Time to live",
      inhouse: "6–18 months",
      saas: "Weeks — if you have assets",
      tf: "3–6 weeks, assets or not",
    },
    {
      attr: "Transaction fee",
      inhouse: "None",
      saas: "1.5–1.95% per order",
      tf: "None. Ever.",
      tfAccent: true,
    },
    {
      attr: "Cost at scale",
      inhouse: "Engineering + ops",
      saas: "Fee compounds with revenue",
      tf: "Flat monthly, predictable",
    },
    {
      attr: "Who fixes issues",
      inhouse: "Your team",
      saas: "Support ticket",
      tf: "Named contact, same day",
    },
    {
      attr: "Custom configurator logic",
      inhouse: "Yes, expensive",
      saas: "No — off-the-shelf rules",
      tf: "Yes — delivered on platform",
    },
  ];

  return (
    <section className="section-white py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.85rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
              lineHeight: 1.15,
            }}
          >
            Three ways to get a configurator.
            <br />Here is the honest comparison.
          </h2>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
          <table
            className="compare-table min-w-[640px]"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-body)",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 600, color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)", width: "22%" }}>
                  Comparison point
                </th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 700, color: DARK, fontSize: "0.9rem", fontFamily: "var(--font-display)", width: "26%", borderRadius: "12px 12px 0 0", background: "#F7F8FA" }}>
                  Build in-house
                </th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: 700, color: DARK, fontSize: "0.9rem", fontFamily: "var(--font-display)", width: "26%", background: "#F7F8FA", borderLeft: "1px solid #EAECF0" }}>
                  Global SaaS tools
                </th>
                <th
                  className="col-tf"
                  style={{
                    padding: "1rem 1.25rem",
                    fontWeight: 700,
                    color: ACCENT,
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-display)",
                    width: "26%",
                    borderRadius: "12px 12px 0 0",
                    textAlign: "center",
                  }}
                >
                  TrueForm ✦
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.attr}
                  style={{
                    borderTop: "1px solid #EAECF0",
                    background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
                  }}
                >
                  <td
                    style={{
                      padding: "1rem 1.25rem",
                      fontWeight: 600,
                      color: DARK,
                      fontSize: "0.9rem",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.attr}
                  </td>
                  <td style={{ padding: "1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.875rem", verticalAlign: "middle" }}>
                    {row.inhouse}
                  </td>
                  <td style={{ padding: "1rem 1.25rem", color: "var(--text-muted)", fontSize: "0.875rem", verticalAlign: "middle", borderLeft: "1px solid #EAECF0" }}>
                    {row.saas}
                  </td>
                  <td
                    className="col-tf"
                    style={{
                      padding: "1rem 1.25rem",
                      fontSize: "0.875rem",
                      verticalAlign: "middle",
                      textAlign: "center",
                      fontWeight: row.tfAccent ? 800 : 600,
                      color: row.tfAccent ? ACCENT : DARK,
                    }}
                  >
                    {row.tf}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key benefits — two column checklist matching demo */}
        <div className="mt-12 sm:mt-16 grid gap-x-8 lg:gap-x-14 gap-y-7 md:grid-cols-2">
          {[
            {
              h: "One team, one invoice",
              p: "Modelling studio and platform in the same contract. No vendor hand-offs when a texture is wrong.",
            },
            {
              h: "No transaction fees, ever",
              p: "You pay a flat subscription. Your conversion upside stays yours as volume grows.",
            },
            {
              h: "Real production capacity",
              p: "50+ specialists across India, UAE and the USA — 500+ shipped projects behind every model.",
            },
            {
              h: "Built for page speed",
              p: "Compressed GLBs, lazy canvases and a single active WebGL context. Core Web Vitals hold.",
            },
            {
              h: "You own the models",
              p: "Every asset we build is delivered to you as source files. Leaving the platform does not strip your catalog.",
            },
            {
              h: "Category depth",
              p: "Furniture, footwear, eyewear, automotive, kitchens and packaging — configurators we have already solved.",
            },
          ].map((b) => (
            <div key={b.h} className="flex gap-4 items-start">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#7857FF]/10 text-[#7857FF]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>
                  {b.h}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                  {b.p}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 10. ROUTING SECTION ─────────────────────────────────────────────────────
function RoutingSection() {
  const routes = [
    {
      head: "3D Product Modelling Services",
      body: "Just the assets — game-ready or render-grade models of your catalog, delivered as source files.",
      href: "#contact",
    },
    {
      head: "AR/VR App Development",
      body: "Native and WebXR experiences for retail, training and industrial use cases.",
      href: "#contact",
    },
    {
      head: "3D Configurator Development",
      body: "A bespoke configurator built into your own stack, licensed rather than subscribed.",
      href: "#contact",
    },
    {
      head: "Talk to us",
      body: "Not sure which piece you need? A 20-minute call with a producer, not a sales rep.",
      href: "#contact",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-slate-200/80 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="text-slate-900 font-bold tracking-tight text-[1.6rem] sm:text-[2rem] lg:text-[2.4rem]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Need only part of this?
        </h2>

        <div className="mt-8 sm:mt-12 grid gap-x-12 lg:gap-x-16 gap-y-8 md:grid-cols-2">
          {routes.map((s) => (
            <a
              key={s.head}
              href={s.href}
              className="group block border-t border-slate-200/90 pt-5 sm:pt-6 no-underline"
            >
              <h3
                className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#7857FF] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.head}
                <span className="ml-2 inline-block text-[#7857FF] transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </h3>
              <p
                className="mt-2 max-w-md text-sm leading-relaxed text-slate-500"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {s.body}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 11. ADMIN DASHBOARD PREVIEW ─────────────────────────────────────────────
function AdminPreview() {
  return (
    <section className="section-white py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span
            className="tag"
            style={{
              background: "rgba(120,87,255,0.1)",
              color: ACCENT,
              marginBottom: "1.25rem",
            }}
          >
            Preview — coming soon
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.85rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
              lineHeight: 1.15,
            }}
          >
            Manage your whole catalog
            <br />from one place.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", sm: { fontSize: "1.05rem" }, fontFamily: "var(--font-body)", margin: 0 }}>
            Upload a model, define options and rules, set pricing logic, review analytics — all in one dashboard.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div
          className="rounded-2xl border border-white/6 overflow-hidden relative shadow-2xl"
          style={{ background: "#0D1020" }}
        >
          {/* Top bar */}
          <div
            className="p-4 sm:p-5 bg-white/[0.03] border-b border-white/6 flex items-center gap-4 sm:gap-6 overflow-x-auto"
          >
            <div className="flex gap-2 shrink-0">
              {["#EF4444", "#F59E0B", "#10B981"].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div className="flex gap-4 sm:gap-6 shrink-0">
              {["Catalog", "Configure", "Analytics", "Settings"].map((tab, i) => (
                <span
                  key={tab}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: i === 0 ? "white" : "rgba(255,255,255,0.4)",
                    fontWeight: i === 0 ? 600 : 400,
                    cursor: "pointer",
                    borderBottom: i === 0 ? `2px solid ${ACCENT}` : "2px solid transparent",
                    paddingBottom: "0.25rem",
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          {/* Dashboard body container */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[200px_1fr] sm:grid-cols-[220px_1fr] min-w-[680px] lg:min-w-0 min-h-[440px]">
              {/* Sidebar */}
              <div
                style={{
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  padding: "1.5rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {[
                  { icon: "📦", label: "Models", active: true },
                  { icon: "⚙️", label: "Options" },
                  { icon: "💰", label: "Pricing" },
                  { icon: "📊", label: "Analytics" },
                  { icon: "🔗", label: "Embed" },
                  { icon: "👤", label: "Account" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.6rem 0.75rem",
                      borderRadius: 8,
                      background: item.active ? "rgba(120,87,255,0.15)" : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        color: item.active ? "white" : "rgba(255,255,255,0.45)",
                        fontWeight: item.active ? 600 : 400,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {[
                    { label: "SKUs live", val: "24", sub: "of 25 plan" },
                    { label: "Models this month", val: "3", sub: "of 3 included" },
                    { label: "Configurator opens", val: "2,840", sub: "+18% vs last month" },
                    { label: "Avg session", val: "3m 42s", sub: "↑ engagement" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 sm:p-4 bg-white/[0.03] border border-white/6 rounded-xl"
                    >
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.35rem 0", fontFamily: "var(--font-display)" }}>
                        {stat.label}
                      </p>
                      <p style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", margin: "0 0 0.2rem 0", letterSpacing: "-0.03em" }}>
                        {stat.val}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", margin: 0, fontFamily: "var(--font-body)" }}>
                        {stat.sub}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Model list */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "0.875rem 1.25rem",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    {["Model", "Status", "Options", "Variants"].map((h) => (
                      <span key={h} style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
                        {h}
                      </span>
                    ))}
                  </div>
                  {[
                    { name: "Modular 3-Seat Sofa", status: "Live", options: "Fabric, Legs, Config", variants: 48 },
                    { name: "Modular Ottoman", status: "Live", options: "Fabric, Size", variants: 12 },
                    { name: "Armchair v2", status: "In review", options: "Fabric, Color", variants: 8 },
                    { name: "Dining Table", status: "Modeling", options: "—", variants: "—" },
                  ].map((row) => (
                    <div
                      key={row.name}
                      style={{
                        padding: "0.875rem 1.25rem",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "white", fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                        {row.name}
                      </span>
                      <span
                        style={{
                          color: row.status === "Live" ? "#10B981" : row.status === "In review" ? "#F59E0B" : "rgba(255,255,255,0.4)",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        ● {row.status}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>
                        {row.options}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>
                        {row.variants}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 12. RECENT WORK ─────────────────────────────────────────────────────────
function RecentWork() {
  return (
    <section className="section-light py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-14">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.85rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.03em",
              margin: "0 0 0.75rem 0",
              lineHeight: 1.15,
            }}
          >
            Built by a studio,
            <br />not a startup.
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", sm: { fontSize: "1.05rem" }, fontFamily: "var(--font-body)", margin: 0 }}>
            A glimpse of what we've shipped.
          </p>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 sm:gap-4 mb-12 sm:mb-16">
          {/* Main image */}
          <div className="rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-[480px] relative bg-[#111]">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format"
              alt="Kitchen configurator — Abhiwan case study"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1.5rem 2rem",
                background: "linear-gradient(0deg, rgba(11,14,20,0.85) 0%, transparent 100%)",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.35rem 0", fontFamily: "var(--font-display)" }}>
                Kitchen Configurator
              </p>
              <p style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", margin: 0 }}>
                Full modular kitchen — materials, layout, and pricing
              </p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {[
              {
                img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=220&fit=crop&auto=format",
                label: "SKYLRK 3D Shoe",
                sub: "Material + colorway configurator",
              },
              {
                img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=220&fit=crop&auto=format",
                label: "Nilkamal Modular Sofa",
                sub: "Fabric, module, and layout builder",
              },
            ].map((t) => (
              <div
                key={t.label}
                className="rounded-xl overflow-hidden h-48 sm:h-56 lg:h-auto lg:flex-1 relative bg-[#111]"
              >
                <img
                  src={t.img}
                  alt={t.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1.25rem",
                    background: "linear-gradient(0deg, rgba(11,14,20,0.8) 0%, transparent 100%)",
                  }}
                >
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.2rem 0", fontFamily: "var(--font-display)" }}>
                    {t.sub}
                  </p>
                  <p style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", margin: 0 }}>
                    {t.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-6 sm:p-10 lg:p-12 rounded-2xl"
          style={{
            background: DARK,
          }}
        >
          {[
            { val: "8+", label: "Years in production 3D" },
            { val: "50+", label: "In-house specialists" },
            { val: "500+", label: "Projects shipped" },
            { val: "3", label: "Countries — India, UAE, USA" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                  fontWeight: 900,
                  color: "white",
                  letterSpacing: "-0.04em",
                  margin: "0 0 0.4rem 0",
                  lineHeight: 1,
                }}
              >
                {stat.val}
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.4 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 13. FAQ ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What exactly is a 3D product configurator?",
    a: "A 3D configurator is an interactive tool that lets your customers customise a product in real time — changing materials, colors, components, or dimensions — and see the exact result before they buy. TrueForm runs this in the browser, directly on your product page, with no app download required.",
  },
  {
    q: "Do I need to have 3D models already?",
    a: "No. Producing your 3D models is part of the subscription. Send us product photos, CAD files, or spec sheets — whatever you have — and we build web-optimised GLB models from scratch. This is the core difference between TrueForm and every global SaaS competitor.",
  },
  {
    q: "How much does it cost, and what is actually included?",
    a: "Plans start from Rs 35,000 / $449 per month on a 12-month minimum. Every plan includes a set number of 3D models per month, the configurator and AR viewer, and embedding via script tag. There is no transaction fee on any plan. Full pricing is on this page — use the 'Get a quote' button for your specific catalog size.",
  },
  {
    q: "Which platforms does TrueForm work with?",
    a: "Anywhere you can paste a script tag: Shopify, WooCommerce, Odoo, Magento, or a custom stack. The Growth plan adds an API and SDK. Shopify and WooCommerce plugins are on the Phase 3 roadmap, triggered by paying client demand.",
  },
  {
    q: "Will the configurator slow down my product page?",
    a: "No — the canvas lazy-loads on viewport entry and only one WebGL context runs at a time. All GLB files are Draco-compressed, CDN-served, and under 2MB. On mobile, the canvas loads on tap so it never blocks your LCP.",
  },
  {
    q: "Is there a transaction fee?",
    a: "None. Not at launch pricing, not at scale, not ever. This is a locked company decision, not a promotional offer. The current market leaders charge 1.5–1.95% per order — that compounds fast at any real revenue number. TrueForm is a flat subscription.",
  },
  {
    q: "Who owns the 3D models we produce for you?",
    a: "You do. The moment a model is delivered and the corresponding subscription period is active, the asset belongs to your brand. You can export GLB files at any time.",
  },
  {
    q: "How long does onboarding actually take?",
    a: "Scope lock in 4 working days from kickoff. First model ready for review in 7 days from asset intake. Live on your site in 3 to 6 weeks depending on catalog size. New model turnaround on an ongoing basis is 5 working days.",
  },
  {
    q: "What happens if I want to leave the platform?",
    a: "You keep your GLB files — they are standard open-format assets. The configurator script stops rendering if the subscription lapses, but your product models are yours. The 12-month minimum is the only contractual lock-in.",
  },
  {
    q: "Can TrueForm handle large catalogs — 1,000+ SKUs?",
    a: "Yes, but we recommend starting with your highest-impact SKUs (typically 25–100) and expanding from there. Scale plan supports 400 live SKUs with 20 models per month included; beyond that, extra models are priced by complexity band. Talk to us if you need a custom volume plan.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-white py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-24 items-start">
        {/* Left */}
        <div className="lg:sticky lg:top-24">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.85rem, 3vw, 2.75rem)",
              fontWeight: 800,
              color: DARK,
              letterSpacing: "-0.03em",
              margin: "0 0 1.25rem 0",
              lineHeight: 1.15,
            }}
          >
            Frequently Asked
            <br />Questions
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", sm: { fontSize: "1rem" }, fontFamily: "var(--font-body)", lineHeight: 1.65, margin: "0 0 2rem 0" }}>
            Everything you need to know before signing. If your question is not here, the answer is one email away.
          </p>
          <a
            href="#contact"
            style={{
              color: ACCENT,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Ask us directly →
          </a>
        </div>

        {/* Accordion right */}
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #EAECF0",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.25rem 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: DARK,
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    color: ACCENT,
                    fontSize: "1.25rem",
                    flexShrink: 0,
                    transition: "transform 0.25s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>

              <div
                className={`faq-answer ${open === i ? "open" : "closed"}`}
                aria-hidden={open !== i}
              >
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-body)",
                    margin: "0 0 1.25rem 0",
                    paddingRight: "1.5rem",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// ─── 14. CONTACT CTA ─────────────────────────────────────────────────────────
function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    timeline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="section-dark cta-glow py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Violet glow — top left corner, exactly as reference */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 700,
          height: 700,
          background: "radial-gradient(ellipse at center, rgba(120,87,255,0.22) 0%, rgba(120,87,255,0.08) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 400,
          height: 400,
          background: "radial-gradient(ellipse at center, rgba(60,80,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.85rem, 4vw, 3.25rem)",
            fontWeight: 900,
            color: "white",
            letterSpacing: "-0.03em",
            margin: "0 0 1.25rem 0",
            lineHeight: 1.1,
          }}
        >
          See your own product in 3D before you commit.
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "1rem",
            lineHeight: 1.65,
            fontFamily: "var(--font-body)",
            margin: "0 0 2.5rem 0",
          }}
        >
          Send us one product. We will model it, configure it, and show you a working demo — no charge, no obligation.
        </p>

        {submitted ? (
          <div
            className="p-8 sm:p-10 rounded-2xl"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10B981",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            ✓ Received. Expect a response within one business day.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-8 lg:p-10 rounded-2xl text-left flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "name", placeholder: "Your name", label: "Name" },
                { key: "company", placeholder: "Company name", label: "Company" },
                { key: "email", placeholder: "Work email", label: "Email", type: "email" },
                { key: "phone", placeholder: "+91 or +1", label: "Phone" },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      marginBottom: "0.4rem",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      padding: "0.75rem 1rem",
                      color: "white",
                      fontSize: "0.9rem",
                      fontFamily: "var(--font-body)",
                      outline: "none",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.4rem", fontFamily: "var(--font-display)" }}>
                  Product category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: "0.75rem 1rem",
                    color: form.category ? "white" : "rgba(255,255,255,0.4)",
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-body)",
                    outline: "none",
                  }}
                >
                  <option value="" disabled>Select category</option>
                  {["Furniture", "Footwear", "Eyewear", "Automotive", "Jewellery", "Electronics", "Kitchen", "Fashion", "Industrial", "Other"].map((c) => (
                    <option key={c} value={c} style={{ background: DARK }}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.4rem", fontFamily: "var(--font-display)" }}>
                  Launch timeline
                </label>
                <select
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: "0.75rem 1rem",
                    color: form.timeline ? "white" : "rgba(255,255,255,0.4)",
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-body)",
                    outline: "none",
                  }}
                >
                  <option value="" disabled>Select timeline</option>
                  {["ASAP — within 2 weeks", "1–2 months", "3–6 months", "Just exploring"].map((t) => (
                    <option key={t} value={t} style={{ background: DARK }}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: ACCENT,
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "0.9rem 1.5rem",
                fontSize: "0.95rem",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                cursor: "pointer",
                marginTop: "0.5rem",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#6644EE";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = ACCENT;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Request your free pilot model →
            </button>

            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", textAlign: "center", margin: "0.25rem 0 0 0", fontFamily: "var(--font-body)" }}>
              3–5 day turnaround · No charge · No obligation
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── 15. FOOTER (EXACT REFERENCE IMPLEMENTATION) ────────────────────────────
function Footer() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <footer
        className="pt-16 pb-8 px-4 sm:pt-20 sm:pb-10 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          background: "#060714",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color: "white",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Giant ABHIWAN Wordmark */}
          <div className="text-center mb-6 sm:mb-8 overflow-hidden px-2">
            <img
              src="/assets/footer-abhiwan-gradient.png"
              alt="ABHIWAN"
              className="inline-block max-w-full w-[980px] h-auto"
              style={{
                filter: "drop-shadow(0 0 50px rgba(120,87,255,0.25))",
              }}
            />
          </div>

          {/* Subtitle: OUR GLOBAL PRESENCE */}
          <p
            className="text-center text-blue-500 font-bold tracking-[0.18em] uppercase text-xs sm:text-sm mb-10 sm:mb-14"
            style={{ fontFamily: "var(--font-display)" }}
          >
            OUR GLOBAL PRESENCE
          </p>

          {/* Five Global Presence Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 mb-12 sm:mb-16">
            {/* 1. INDIA */}
            <div className="px-4 text-center lg:border-r border-white/8 pb-6 lg:pb-0 border-b sm:border-b-0 border-white/8">
              <img
                src="/assets/landmark-india.png"
                alt="India"
                style={{ height: 48, width: "auto", margin: "0 auto 1.25rem", display: "block", objectFit: "contain" }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "0.05em",
                  margin: "0 0 0.5rem 0",
                  textTransform: "uppercase",
                }}
              >
                INDIA
              </h4>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                301, Syadwad Business Park, H32,<br />
                Sector 63, Noida.<br />
                <strong style={{ color: "white", fontWeight: 600 }}>(Head Office)</strong>
              </p>
            </div>

            {/* 2. UNITED STATES */}
            <div className="px-4 text-center lg:border-r border-white/8 pb-6 lg:pb-0 border-b sm:border-b-0 border-white/8">
              <img
                src="/assets/landmark-usa.png"
                alt="United States"
                style={{ height: 48, width: "auto", margin: "0 auto 1.25rem", display: "block", objectFit: "contain" }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "0.05em",
                  margin: "0 0 0.5rem 0",
                  textTransform: "uppercase",
                }}
              >
                UNITED STATES
              </h4>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                711 S Glendora Ave, West Covina,<br />
                CA
              </p>
            </div>

            {/* 3. UNITED KINGDOM */}
            <div className="px-4 text-center lg:border-r border-white/8 pb-6 lg:pb-0 border-b sm:border-b-0 border-white/8">
              <img
                src="/assets/landmark-uk.png"
                alt="United Kingdom"
                style={{ height: 48, width: "auto", margin: "0 auto 1.25rem", display: "block", objectFit: "contain" }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "0.05em",
                  margin: "0 0 0.5rem 0",
                  textTransform: "uppercase",
                }}
              >
                UNITED KINGDOM
              </h4>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                86-90, Paul Street, London, EC2A<br />
                4NE, England
              </p>
            </div>

            {/* 4. UAE */}
            <div className="px-4 text-center lg:border-r border-white/8 pb-6 lg:pb-0 border-b sm:border-b-0 border-white/8">
              <img
                src="/assets/landmark-uae.png"
                alt="UAE"
                style={{ height: 48, width: "auto", margin: "0 auto 1.25rem", display: "block", objectFit: "contain" }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "0.05em",
                  margin: "0 0 0.5rem 0",
                  textTransform: "uppercase",
                }}
              >
                UAE
              </h4>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                Ontario Tower, Dubai, UAE
              </p>
            </div>

            {/* 5. CANADA */}
            <div className="px-4 text-center">
              <img
                src="/assets/landmark-canada.png"
                alt="Canada"
                style={{ height: 48, width: "auto", margin: "0 auto 1.25rem", display: "block", objectFit: "contain" }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "0.05em",
                  margin: "0 0 0.5rem 0",
                  textTransform: "uppercase",
                }}
              >
                CANADA
              </h4>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                7168 179 St, Surrey BC, V3S 8C5
              </p>
            </div>
          </div>

          {/* Navigation & Contact Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
            {/* Column 1: OUR COMPANY */}
            <div>
              <h4
                style={{
                  color: "#3B82F6",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  margin: "0 0 1rem 0",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                }}
              >
                OUR COMPANY
              </h4>
              {[
                "Home",
                "Services",
                "Portfolio",
                "Blogs",
                "About Us",
                "Contact Us",
                "Careers ↗",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.825rem",
                    textDecoration: "none",
                    marginBottom: "0.55rem",
                    fontFamily: "var(--font-body)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)")}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Column 2: SERVICES (Set 1) */}
            <div>
              <h4
                style={{
                  color: "#3B82F6",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  margin: "0 0 1rem 0",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                }}
              >
                SERVICES
              </h4>
              {[
                "3D Product Modelling",
                "Educational Games",
                "Adver Gaming",
                "3D Game Art",
                "Digital Twin",
                "Augmented Reality",
                "Virtual Reality",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.825rem",
                    textDecoration: "none",
                    marginBottom: "0.55rem",
                    fontFamily: "var(--font-body)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)")}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Column 3: SERVICES (Set 2) */}
            <div>
              <h4
                style={{
                  color: "#3B82F6",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  margin: "0 0 1rem 0",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                }}
              >
                SERVICES
              </h4>
              {[
                "MVP Prototyping",
                "Blockchain Development",
                "Industrial Training & Simulation",
                "Custom AI/ML Development",
                "3D Product Configurator",
                "White Labeling",
                "Learning and Educational XR",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.825rem",
                    textDecoration: "none",
                    marginBottom: "0.55rem",
                    fontFamily: "var(--font-body)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)")}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Column 4: FOLLOW US ON */}
            <div>
              <h4
                style={{
                  color: "#3B82F6",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  margin: "0 0 1rem 0",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                }}
              >
                FOLLOW US ON
              </h4>

              {/* Facebook Button */}
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "0.5rem 0.8rem",
                  color: "white",
                  fontSize: "0.825rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  marginBottom: "0.55rem",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(59,130,246,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#3B82F6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </a>

              {/* Instagram Button */}
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "0.5rem 0.8rem",
                  color: "white",
                  fontSize: "0.825rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  marginBottom: "0.55rem",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(59,130,246,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#3B82F6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </a>

              {/* X (Twitter) Button */}
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "0.5rem 0.8rem",
                  color: "white",
                  fontSize: "0.825rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  marginBottom: "0.55rem",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(59,130,246,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#3B82F6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </a>

              {/* LinkedIn Button */}
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "0.5rem 0.8rem",
                  color: "white",
                  fontSize: "0.825rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(59,130,246,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#3B82F6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37z" />
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Column 5: CONTACT US */}
            <div>
              <h4
                style={{
                  color: "#3B82F6",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  margin: "0 0 1rem 0",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                }}
              >
                CONTACT US
              </h4>

              {/* For Sales */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.85rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>
                  For Sales :{" "}
                  <a href="tel:+919599145805" style={{ color: "white", textDecoration: "none", fontWeight: 600 }}>
                    +91 - 9599145805
                  </a>
                </div>
              </div>

              {/* For HR */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.85rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>
                  For HR :{" "}
                  <a href="tel:+919910655805" style={{ color: "white", textDecoration: "none", fontWeight: 600 }}>
                    +91 - 9910655805
                  </a>
                </div>
              </div>

              {/* Mail Us */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>
                  Mail Us :{" "}
                  <a href="mailto:sales@abhiwan.com" style={{ color: "white", textDecoration: "none", fontWeight: 600 }}>
                    sales@abhiwan.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Privacy / Terms & Copyright */}
          <div className="border-t border-white/6 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="flex gap-6">
              <a
                href="#"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
              >
                Privacy Policy ↗
              </a>
              <a
                href="#"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
              >
                Terms & Conditions ↗
              </a>
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                margin: 0,
              }}
            >
              © 2026 All Rights Reserved by Abhiwan Technology
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Bottom-Right Expert Widget Matching Attached Image */}
      <div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-row items-center gap-2 sm:gap-3"
      >
        {/* Overlay+Border (Pill) */}
        <div
          onClick={() => setChatOpen(!chatOpen)}
          className="hidden xs:flex flex-row items-center cursor-pointer transition-transform duration-200"
          style={{
            boxSizing: "border-box",
            padding: "10px 14px",
            height: "56px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "0.8px solid rgba(15, 23, 42, 0.08)",
            borderRadius: "28.8px",
            boxShadow: "0px 8px 32px -9.6px rgba(15, 23, 42, 0.12), 0px 1.6px 6.4px -1.6px rgba(15, 23, 42, 0.06)",
            gap: "9.6px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          }}
        >
          {/* Headset Icon circle */}
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "#171635",
              borderRadius: "22.4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
            </svg>
          </div>

          {/* Texts Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: 0,
              width: "98px",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter Tight', var(--font-body), sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "16px",
                color: "#0E1729",
                margin: 0,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Talk to our expert
            </p>
            <p
              style={{
                fontFamily: "'Inter Tight', var(--font-body), sans-serif",
                fontWeight: 400,
                fontSize: "11px",
                lineHeight: "13px",
                color: "#687280",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              Reply within 1 hour
            </p>
          </div>

          {/* Arrow Button Circle */}
          <div
            style={{
              width: "26px",
              height: "26px",
              background: "#171635",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F5F8FB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
        </div>

        {/* Circular Avatar Beside Pill */}
        <div
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            position: "relative",
            width: "56px",
            height: "56px",
            flex: "none",
            cursor: "pointer",
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: "drop-shadow(0px 8px 16px rgba(15, 23, 42, 0.12)) drop-shadow(0px 1.6px 6.4px rgba(15, 23, 42, 0.06))",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
          }}
        >
          {/* Background circle */}
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              width: "56px",
              height: "56px",
              left: 0,
              top: 0,
              background: "rgba(255, 255, 255, 0.85)",
              border: "0.8px solid rgba(15, 23, 42, 0.08)",
              borderRadius: "28px",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          />

          {/* image 175 with user's exact ChatBot Image */}
          <div
            style={{
              position: "absolute",
              width: "52px",
              height: "52px",
              left: "2px",
              top: "2px",
              borderRadius: "26px",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <img
              src="/assets/chatbot-avatar.png"
              alt="ChatBot Expert"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Online green indicator badge */}
          <span
            style={{
              position: "absolute",
              bottom: "2px",
              right: "2px",
              width: "12px",
              height: "12px",
              background: "#10B981",
              borderRadius: "50%",
              border: "2px solid #0E1729",
              display: "block",
              zIndex: 2,
            }}
          />
        </div>

        {/* Quick Inquiry Popover */}
        {chatOpen && (
          <div
            className="w-[calc(100vw-32px)] max-w-sm sm:w-80"
            style={{
              position: "absolute",
              bottom: 70,
              right: 0,
              background: "#0F121C",
              border: "1px solid rgba(120,87,255,0.3)",
              borderRadius: 16,
              padding: "1.25rem sm:1.5rem",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <img
                  src="/assets/chatbot-avatar.png"
                  alt="Expert Support"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1.5px solid #7857FF",
                  }}
                />
                <div>
                  <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 700, fontFamily: "var(--font-display)", display: "block", lineHeight: 1.2 }}>
                    ConfigKit Expert
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", color: "#22C55E", fontFamily: "var(--font-body)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                    Online now
                  </span>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1rem" }}
              >
                ✕
              </button>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.825rem", lineHeight: 1.5, margin: "0 0 1rem 0", fontFamily: "var(--font-body)" }}>
              Have a 3D product or configurator project in mind? Let us know your requirements.
            </p>
            <a
              href="#contact"
              onClick={() => setChatOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                background: "#7857FF",
                color: "white",
                padding: "0.65rem 1rem",
                borderRadius: 8,
                fontSize: "0.825rem",
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "var(--font-display)",
              }}
            >
              Request 3D Pilot Model →
            </a>
          </div>
        )}
      </div>
    </>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: DARK }}>
      <Nav />
      <StickyBar />
      <Hero />
      <CredentialStrip />
      <TheProblem />
      <WhatYouGet />
      <ProductRoadmap />
      <DemoGallery />
      <ARDemo />
      <Plans />
      <WhyTrueForm />
      <RoutingSection />
      <AdminPreview />
      <RecentWork />
      <FAQSection />
      <ContactCTA />
      <Footer />
    </div>
  );
}
