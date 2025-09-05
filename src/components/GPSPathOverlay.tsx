import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * GPSPathOverlay.tsx
 *
 * Drop‑in Overlay, das einen stilisierten, animierten „GPS‑Pfad“ zwischen beliebigen Sektionen zeichnet.
 *
 * ✅ Features
 * - Zickzack‑Pfad (wie eine Route auf der Karte), automatisch an die Positionen deiner Module angepasst
 * - Sanfte Kurven (Cubic Bézier), Stroke‑Animation (laufender Dash), optionale Wegpunkte/Marker
 * - Responsiv, Reflow‑sicher (ResizeObserver) und performant (rAF + throttling)
 * - Respektiert prefers‑reduced‑motion
 *
 * 📦 Verwendung
 * 1) Wickle deine Sektionen in <GPSSection> – das setzt automatisch data‑gps‑anchor.
 * 2) Platziere <GPSPathOverlay containerRef={wrapperRef}/> als letztes Kind im gleichen Wrapper.
 * 3) Styling per Tailwind Klassen unten anpassbar.
 */

// ---------- Hilfsfunktionen ----------

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function makeSmoothZigZagPath(points: { x: number; y: number }[]) {
  // Erzeuge weiche Kurven durch die Punkte mit seichten Offsets
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const d: string[] = [];
  d.push(`M ${points[0].x} ${points[0].y}`);

  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const dist = Math.hypot(dx, dy);
    const t = clamp(dist / 400, 0.15, 0.45); // Krümmung abhängig von Abstand

    const c1x = lerp(p0.x, p1.x, t);
    const c2x = lerp(p0.x, p1.x, 1 - t);

    // leichte seitliche Auslenkung um „handgezeichnete Route“ zu imitieren
    const sway = (i % 2 === 0 ? 1 : -1) * Math.min(40, Math.max(12, dist * 0.08));
    const c1y = p0.y + dy * t + sway;
    const c2y = p0.y + dy * (1 - t) - sway;

    d.push(`C ${c1x} ${c1y} ${c2x} ${c2y} ${p1.x} ${p1.y}`);
  }

  return d.join(" ");
}

// ---------- Komponenten ----------

type GPSPathOverlayProps = {
  containerRef: React.RefObject<HTMLElement>;
  /** CSS‑Selector für Anker innerhalb des Containers */
  selector?: string;
  /** Breite der Linie in px */
  strokeWidth?: number;
  /** CSS‑Farbe (Tailwind oder Hex) */
  stroke?: string;
  /** Wegpunkte als Punkte rendern */
  showDots?: boolean;
  /** Marker‑Größe in px */
  dotSize?: number;
  /** Optional: progress (0..1) um den Pfad „wachsen“ zu lassen; wenn undefined → auto mit Scrollpos */
  progress?: number;
  /** Optional: zIndex des Overlays */
  zIndex?: number;
};

export function GPSPathOverlay({
  containerRef,
  selector = '[data-gps-anchor="true"]',
  strokeWidth = 3,
  stroke = "#22c55e", // Tailwind green‑500
  showDots = true,
  dotSize = 9,
  progress,
  zIndex = -10,
}: GPSPathOverlayProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [d, setD] = useState<string>("");
  const [length, setLength] = useState<number>(0);
  const prefersReduced = usePrefersReducedMotion();

  // Punkte aus den Anchor‑Elementen berechnen
  const recompute = useMemo(() => {
    let frame = 0;
    return () => {
      if (frame) return; // throttle per rAF
      frame = requestAnimationFrame(() => {
        frame = 0;
        const container = containerRef.current;
        const svg = svgRef.current;
        if (!container || !svg) return;

        const anchors = Array.from(container.querySelectorAll<HTMLElement>(selector));
        const cRect = container.getBoundingClientRect();

        const pts = anchors.map((el, i) => {
          const r = el.getBoundingClientRect();
          const x = (i % 2 === 0)
            ? (cRect.width * 0.22)
            : (cRect.width * 0.78);
          const y = (r.top + r.bottom) / 2 - cRect.top; // Mittelpunkt der Sektion relativ zum Container
          return { x, y };
        });

        setPoints(pts);
      });
    };
  }, [containerRef, selector]);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(recompute);
    const container = containerRef.current;
    if (container) ro.observe(container);

    // Auch bei Scroll neu ausrichten (Sektionen bewegen sich relativ zum Container)
    const onScroll = () => recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial
    recompute();

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [recompute, containerRef]);

  useEffect(() => {
    const pathData = makeSmoothZigZagPath(points);
    setD(pathData);
  }, [points]);

  // Pfadlänge bestimmen für Dash‑Animation
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const p = svg.querySelector("path.route") as SVGPathElement | null;
    if (!p) return;
    try {
      const len = p.getTotalLength();
      setLength(len);
    } catch {}
  }, [d]);

  // Auto‑Progress basierend auf Scrollposition, falls kein expliziter progress übergeben
  const autoProgress = useScrollProgress(containerRef);
  const effectiveProgress = typeof progress === "number" ? progress : autoProgress;

  const dashArray = `${length} ${length}`;
  const dashOffset = lerp(length, 0, clamp(effectiveProgress, 0, 1));

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ zIndex }}
      aria-hidden
    >
      {/* Hauptpfad */}
      <path
        className="route"
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        style={{
          filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.15))",
          transition: prefersReduced ? "stroke-dashoffset 0.2s linear" : "stroke-dashoffset 0.6s ease-out",
        }}
      />

      {/* Laufender dash Effekt (leicht versetzt) */}
      {!prefersReduced && (
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 14"
          style={{ mixBlendMode: "multiply" }}
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-44" dur="1.6s" repeatCount="indefinite" />
        </path>
      )}

      {/* Wegpunkte */}
      {showDots && points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={dotSize / 2} fill={stroke} opacity={0.95} />
      ))}
    </svg>
  );
}

// Sektion Wrapper – setzt den unsichtbaren Anker
export function GPSSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative py-16 md:py-24 ${className}`}>
      {/* der Anker zur Pfadberechnung */}
      <div data-gps-anchor="true" className="absolute left-0 top-1/2 h-0 w-0" />
      {children}
    </section>
  );
}

// Hook: reduziert Animationen, wenn Nutzer das möchte
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const handler = () => setPrefersReducedMotion(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

// Hook: berechne Fortschritt (0..1) basierend auf sichtbarem Bereich des Containers
function useScrollProgress(containerRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Wenn der Container 1 viewport hoch ist: 0 am oberen Rand – 1 am unteren Rand
      const total = rect.height + vh; // kleiner Trick, damit am Ende 1 erreicht wird
      const scrolled = clamp(vh - rect.top, 0, total);
      setProgress(scrolled / total);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef]);

  return progress;
}

// ---------- Demo‑Wrapper (kannst du löschen) ----------
// Beispiel, wie man den Overlay in einer Landing einsetzt
export default function DemoLandingWithGPSTrail() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef} className="relative mx-auto max-w-5xl px-4">
      {/* Overlay als letztes Kind, damit es oberhalb liegt */}
      <GPSPathOverlay containerRef={wrapperRef} strokeWidth={4} stroke="#16a34a" showDots dotSize={10} zIndex={30} />

      <GPSSection>
        <h2 className="text-3xl md:text-4xl font-extrabold">1 · Tour wählen</h2>
        <p className="mt-3 text-muted-foreground">Finde die perfekte Quest in deiner Nähe.</p>
        <div className="mt-6 h-48 rounded-2xl bg-gradient-to-br from-emerald-100/50 to-emerald-200/40 dark:from-emerald-900/20 dark:to-emerald-800/10" />
      </GPSSection>

      <GPSSection>
        <h2 className="text-3xl md:text-4xl font-extrabold">2 · Rätsel lösen</h2>
        <p className="mt-3 text-muted-foreground">Spiele dich durch die Stadt – Schritt für Schritt.</p>
        <div className="mt-6 h-56 rounded-2xl bg-gradient-to-br from-sky-100/50 to-sky-200/40 dark:from-sky-900/20 dark:to-sky-800/10" />
      </GPSSection>

      <GPSSection>
        <h2 className="text-3xl md:text-4xl font-extrabold">3 · Natur & Kultur entdecken</h2>
        <p className="mt-3 text-muted-foreground">Versteckte Orte, große Aha‑Momente.</p>
        <div className="mt-6 h-64 rounded-2xl bg-gradient-to-br from-amber-100/50 to-amber-200/40 dark:from-amber-900/20 dark:to-amber-800/10" />
      </GPSSection>

      <GPSSection>
        <h2 className="text-3xl md:text-4xl font-extrabold">4 · Los geht’s!</h2>
        <p className="mt-3 text-muted-foreground">App öffnen und Route starten.</p>
        <div className="mt-6 h-40 rounded-2xl bg-gradient-to-br from-fuchsia-100/50 to-fuchsia-200/40 dark:from-fuchsia-900/20 dark:to-fuchsia-800/10" />
      </GPSSection>
    </div>
  );
}
