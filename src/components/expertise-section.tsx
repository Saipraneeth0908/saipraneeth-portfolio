"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { InView, Words } from "@/components/motion";
import { expertise } from "@/content/expertise";
import { asset } from "@/lib/site";
import { Chapter } from "@/components/chapter";

/*
 * Chapter 03 — the nature-portfolio archive sphere, re-skinned for skills.
 * Every capability is a 3:2 card on a Fibonacci sphere; the headline sits flat
 * over the sphere origin. Drag to rotate (momentum, no auto-spin), scroll dollies forward,
 * click opens a FLIP lightbox, the 2×2 button flattens it into a grid.
 */

const CARDS = expertise.flatMap((g, gi) => g.items.map((item) => ({ item, gi })));
const N = CARDS.length;
const GA = Math.PI * (3 - Math.sqrt(5));
const SPHERE = CARDS.map((_, i) => {
  const y = 1 - (i / (N - 1)) * 2;
  const rad = Math.sqrt(Math.max(0, 1 - y * y));
  const x = Math.cos(i * GA) * rad;
  const z = Math.sin(i * GA) * rad;
  return { x, y, z, lat: (Math.asin(y) * 180) / Math.PI, lon: (Math.atan2(x, z) * 180) / Math.PI };
});

// Each card shows a different window of the hero's tech-wall illustration,
// skipping the centre band where the portrait sits.
const crop = (i: number, size = "700%"): CSSProperties => {
  const x = (i * 37) % 61;
  return {
    backgroundImage: `url(${asset("/hero/top.png")})`,
    backgroundSize: `${size} auto`,
    backgroundPosition: `${x > 30 ? x + 40 : x}% ${(i * 61) % 101}%`,
  };
};

type Geo = { R: number; cw: number; persp: number; hw: number };

function geometry(): Geo {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const [hr, wr, floor] = w <= 380 ? [0.38, 0.48, 108] : w <= 640 ? [0.42, 0.52, 120] : [0.46, 0.58, 155];
  const R = Math.max(floor, Math.min(480, h * hr, w * wr));
  return {
    R,
    cw: Math.round(Math.max(64, R * 0.32)),
    persp: w <= 380 ? 620 : w <= 640 ? 760 : w <= 900 ? 920 : 1150,
    hw: w <= 380 ? Math.min(w * 0.88, 320) : w <= 640 ? Math.min(w * 0.84, 360) : Math.min(w * 0.56, 640),
  };
}

function GridIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <span aria-hidden="true" className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((k) => (
        <b
          key={k}
          className="h-3 w-3 rounded-[2px] bg-copy-primary transition-transform duration-300 group-hover:scale-[0.86]"
          style={{
            transform: collapsed && k === 0 ? "translate(3px,3px)" : collapsed && k === 3 ? "translate(-3px,-3px)" : undefined,
          }}
        />
      ))}
    </span>
  );
}

function Sphere({ onGrid }: { onGrid: () => void }) {
  const section = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const plate = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [lit, setLit] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [deep, setDeep] = useState(false);
  const litRef = useRef<number | null>(null);
  litRef.current = lit;

  useEffect(() => {
    let last = { w: 0, h: 0 };
    const relayout = (force = false) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!force && Math.abs(w - last.w) < 20 && Math.abs(h - last.h) < 20) return;
      last = { w, h };
      setGeo(geometry());
    };
    relayout(true);
    const onResize = () => relayout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const sec = section.current;
    const w = world.current;
    const hl = headline.current;
    if (!sec || !w || !hl || !geo) return;
    const { R, persp } = geo;
    let spin = 0;
    let tilt = -4;
    let camZ = 0;
    let dragX = 0;
    let dragY = 0;
    let velX = 0;
    let velY = 0;
    let raf = 0;
    let drag: { x: number; y: number; sx: number; sy: number; card: HTMLElement | null; type: string } | null = null;
    const last = new Float32Array(N * 2).fill(-1);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const open = litRef.current !== null;
      if (!drag && !open) {
        dragX += velX;
        dragY += velY;
        velX = Math.abs(velX * 0.94) < 0.002 ? 0 : velX * 0.94;
        velY = Math.abs(velY * 0.94) < 0.002 ? 0 : velY * 0.94;
      }
      dragY = Math.max(-32 - tilt, Math.min(32 - tilt, dragY));

      const r = sec.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      camZ += (p * Math.min(120, R * 0.25) - camZ) * 0.075;

      const sx = tilt + dragY;
      const sy = spin + dragX;
      w.style.transform = `translateZ(${camZ.toFixed(2)}px) rotateY(${sy.toFixed(3)}deg) rotateX(${sx.toFixed(3)}deg)`;
      hl.style.opacity = String(Math.max(0, 1 - p * 0.55));

      const ax = (sx * Math.PI) / 180;
      const ay = (sy * Math.PI) / 180;
      const [cx, snx, cy, sny] = [Math.cos(ax), Math.sin(ax), Math.cos(ay), Math.sin(ay)];
      const near = persp * 0.66;
      const shade = 1 - Math.min(1, p * 1.6);
      for (let i = 0; i < N; i++) {
        const c = cards.current[i];
        if (!c) continue;
        const { x, y, z } = SPHERE[i];
        const Y = -y;
        const z1 = Y * snx + z * cx;
        const zf = -x * sny + z1 * cy;
        const base = 0.14 + 0.86 * ((zf + 1) / 2) ** 0.85;
        let dim = shade * (1 - base);
        const absZ = zf * R + camZ;
        let fade = absZ > near ? Math.max(0, 1 - (absZ - near) / 190) : 1;
        if (open) {
          dim = Math.min(1, dim + 0.78);
          if (i === litRef.current) fade = 0;
        }
        if (last[i * 2] !== dim) c.style.setProperty("--d", dim.toFixed(3));
        if (last[i * 2 + 1] !== fade) c.style.opacity = fade.toFixed(3);
        last[i * 2] = dim;
        last[i * 2 + 1] = fade;
      }
      const d = p > 0.08;
      setDeep((prev) => (prev === d ? prev : d));
    };

    const down = (e: PointerEvent) => {
      if (litRef.current !== null) return;
      drag = {
        x: e.clientX,
        y: e.clientY,
        sx: e.clientX,
        sy: e.clientY,
        card: (e.target as Element).closest<HTMLElement>("[data-idx]"),
        type: e.pointerType,
      };
      velX = velY = 0;
      if (e.pointerType !== "touch") sec.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.x = e.clientX;
      drag.y = e.clientY;
      dragX += dx * 0.13;
      dragY -= dy * 0.13;
      velX = dx * 0.13;
      velY = -dy * 0.13;
    };
    const up = (e: PointerEvent) => {
      if (!drag) return;
      const slop = drag.type === "touch" ? 14 : 6;
      const moved = Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy);
      const card = drag.card;
      drag = null;
      if (moved < slop && card) setLit(Number(card.dataset.idx));
    };
    const cancel = () => {
      drag = null;
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      raf = entry.isIntersecting ? requestAnimationFrame(frame) : 0;
    });
    io.observe(sec);
    sec.addEventListener("pointerdown", down);
    sec.addEventListener("pointermove", move);
    sec.addEventListener("pointerup", up);
    sec.addEventListener("pointercancel", cancel);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      sec.removeEventListener("pointerdown", down);
      sec.removeEventListener("pointermove", move);
      sec.removeEventListener("pointerup", up);
      sec.removeEventListener("pointercancel", cancel);
    };
  }, [geo]);

  // FLIP the plate from the clicked card's rect to centre.
  useLayoutEffect(() => {
    const el = plate.current;
    const card = lit !== null ? cards.current[lit] : null;
    if (!el || !card || closing) return;
    const from = card.getBoundingClientRect();
    const to = el.getBoundingClientRect();
    el.style.transition = "none";
    el.style.transform = `translate(${from.left + from.width / 2 - (to.left + to.width / 2)}px, ${
      from.top + from.height / 2 - (to.top + to.height / 2)
    }px) scale(${Math.max(0.04, from.width / to.width)})`;
    el.style.opacity = "0";
    void el.offsetWidth;
    el.style.transition = "";
    el.style.transform = "";
    el.style.opacity = "";
    document.documentElement.style.overflow = "hidden";
  }, [lit, closing]);

  const close = useCallback(() => {
    const el = plate.current;
    const card = litRef.current !== null ? cards.current[litRef.current] : null;
    if (el && card) {
      const from = el.getBoundingClientRect();
      const to = card.getBoundingClientRect();
      el.style.transform = `translate(${to.left + to.width / 2 - (from.left + from.width / 2)}px, ${
        to.top + to.height / 2 - (from.top + from.height / 2)
      }px) scale(${Math.max(0.04, to.width / from.width)})`;
      el.style.opacity = "0";
    }
    setClosing(true);
    document.documentElement.style.overflow = "";
    setTimeout(() => {
      setLit(null);
      setClosing(false);
    }, 640);
  }, []);

  useEffect(() => {
    if (lit === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lit, close]);

  const card = lit !== null ? CARDS[lit] : null;
  const group = card ? expertise[card.gi] : null;
  const hidden = deep || lit !== null;

  return (
    <div ref={section} className="relative h-[150svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ touchAction: "pan-y" }}>
        {/* Feathered so cards dissolve at the stage edges instead of being sliced off. */}
        <div
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]"
          style={{ perspective: geo ? `${geo.persp}px` : "1150px" }}
        >
        <div
          ref={world}
          className="absolute left-1/2 top-1/2 h-0 w-0 will-change-transform [transform-style:preserve-3d]"
        >
          <div aria-hidden="true" className="absolute left-0 top-0 h-0 w-0 [transform-style:preserve-3d]">
            {geo
              ? CARDS.map((c, i) => {
                  const s = SPHERE[i];
                  return (
                    <button
                      key={`${c.gi}-${c.item}`}
                      type="button"
                      tabIndex={-1}
                      data-idx={i}
                      ref={(node) => {
                        cards.current[i] = node;
                      }}
                      className="sphere-card absolute left-0 top-0 cursor-pointer"
                      style={{
                        width: geo.cw,
                        height: geo.cw / 1.5,
                        marginLeft: -geo.cw / 2,
                        marginTop: -geo.cw / 3,
                        transform: `translate3d(${s.x * geo.R}px, ${-s.y * geo.R}px, ${s.z * geo.R}px) rotateY(${s.lon}deg) rotateX(${s.lat}deg)`,
                      }}
                    >
                      <figure className="relative m-0 h-full w-full overflow-hidden rounded-[3px] bg-[#0b0d13]" style={crop(i)}>
                        <figcaption
                          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-base/95 via-ink-base/60 to-transparent px-2 pb-1.5 pt-5 text-left font-display leading-tight text-copy-primary [backface-visibility:hidden]"
                          style={{ fontSize: Math.max(10, geo.cw * 0.105) }}
                        >
                          {c.item}
                        </figcaption>
                      </figure>
                    </button>
                  );
                })
              : null}
          </div>
        </div>

        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40%] w-[min(70vw,760px)] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(ellipse_at_center,rgba(10,11,15,0.7)_0%,transparent_70%)]"
        />
        {/* Flat over the sphere (not in the 3D world) so no card can ever cut through the title. */}
        <InView className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2
            ref={headline}
            id="expertise-title"
            className="select-none text-center font-display text-[clamp(25px,3.7vw,55px)] font-normal leading-[1.06] tracking-[-0.005em] text-copy-primary [text-shadow:0_2px_34px_rgba(10,11,15,0.9),0_0_80px_rgba(10,11,15,0.9)] max-md:text-[clamp(22px,6.4vw,34px)]"
            style={{ width: geo?.hw ?? 640 }}
          >
            <Words text="Capabilities, grouped by how they're used" emphasis="how they're used" />
          </h2>
        </InView>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 [background:radial-gradient(ellipse_88%_92%_at_50%_50%,transparent_48%,rgba(10,11,15,0.26)_80%,rgba(10,11,15,0.72)_100%)] ${
            lit !== null ? "opacity-0" : ""
          }`}
        />

        <div
          className={`absolute bottom-[clamp(14px,2.6vw,34px)] left-[clamp(14px,2.6vw,34px)] max-w-[min(320px,46vw)] transition-all duration-500 max-sm:max-w-[calc(100vw-28px)] ${
            hidden ? "pointer-events-none translate-y-2.5 opacity-0" : ""
          }`}
        >
          <div className="mb-3.5 flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="h-[52px] w-[52px] shrink-0 rounded-[3px] bg-cover grayscale-[.15] max-sm:h-[42px] max-sm:w-[42px]"
              style={{ backgroundImage: `url(${asset("/hero/bottom.png")})`, backgroundSize: "330% auto", backgroundPosition: "50% 22%" }}
            />
            <Chapter>03 / Expertise</Chapter>
          </div>
          <p className="text-[12.5px] leading-[1.62] text-copy-secondary max-[380px]:hidden">
            Organized by the layer of the system each one belongs to, rather than as a flat keyword list.
          </p>
        </div>

        <div
          className={`absolute bottom-[clamp(14px,2.6vw,34px)] left-1/2 hidden -translate-x-1/2 items-center gap-2.5 whitespace-nowrap text-[10px] uppercase tracking-[0.24em] text-copy-muted transition-opacity duration-500 sm:flex ${
            hidden ? "opacity-0" : ""
          }`}
        >
          <span className="cue-line" />
          Drag to rotate
        </div>

        <div className="absolute bottom-[clamp(14px,2.6vw,34px)] right-[clamp(14px,2.6vw,34px)] flex items-center gap-5">
          <p className="hidden text-[12.5px] text-copy-secondary md:block">
            {expertise.length} layers · {N} capabilities
          </p>
          <button
            type="button"
            onClick={onGrid}
            aria-label="Toggle grid view"
            className="group grid h-11 w-11 place-items-center"
          >
            <GridIcon collapsed={false} />
          </button>
        </div>
      </div>

      {card && group ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lit-title"
          className={`fixed inset-0 z-[90] grid place-items-center px-[clamp(14px,2.6vw,34px)] py-[clamp(56px,8vh,84px)] transition-opacity duration-500 ${
            closing ? "opacity-0" : "opacity-100"
          }`}
        >
          <button type="button" aria-label="Close" tabIndex={-1} className="absolute inset-0 cursor-default" onClick={close} />
          <div
            ref={plate}
            className="relative w-[min(72vw,860px,calc((100vh-230px)*1.5))] transition-[transform,opacity] duration-[620ms] max-md:w-[min(92vw,calc((100dvh-220px)*1.5))]"
          >
            <div
              className="relative aspect-[3/2] w-full rounded-[2px] bg-[#0b0d13] shadow-[0_30px_90px_rgba(0,0,0,0.75)]"
              style={crop(lit!, "260%")}
            >
              <button
                type="button"
                onClick={close}
                autoFocus
                className="absolute right-3.5 top-3 min-h-[44px] rounded-md border border-copy-primary/80 bg-ink-base/35 px-3.5 py-2.5 text-[12.5px] text-copy-primary transition-colors hover:border-white hover:bg-ink-base/55"
              >
                Close
              </button>
            </div>
            <div className="grid gap-[clamp(10px,3.2vw,48px)] pt-4 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
              <div>
                <h3 id="lit-title" className="mb-1.5 font-display text-[clamp(22px,2.15vw,32px)] leading-[1.08] tracking-[-0.01em] text-copy-primary">
                  {card.item}
                </h3>
                <p className="text-[13px] text-copy-secondary">
                  {group.title} · 0{card.gi + 1} / 0{expertise.length}
                </p>
              </div>
              <div>
                <p className="text-[13.5px] leading-[1.55] text-copy-primary/90">{group.blurb}</p>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-copy-muted">
                  {group.items.map((item) => (
                    <li key={item} className={item === card.item ? "text-accent" : undefined}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ExpertiseSection() {
  const [view, setView] = useState<"sphere" | "grid">("sphere");
  const grid = view === "grid";

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative scroll-mt-16 bg-ink-base">
      {grid ? null : <Sphere onGrid={() => setView("grid")} />}

      {/* The flat archive. Always in the HTML; visually hidden while the sphere is shown. */}
      <div className={grid ? "mx-auto max-w-[1680px] px-[clamp(14px,2.6vw,34px)] pb-24 pt-28" : "sr-only"}>
        {grid ? (
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Chapter>03 / Expertise</Chapter>
              <h2 id="expertise-title" className="mt-4 font-display text-4xl text-copy-primary md:text-6xl">
                Capabilities, grouped by <em className="text-accent-soft">how they&apos;re used</em>
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-6 text-copy-secondary">
                Organized by the layer of the system each one belongs to, rather than as a flat keyword list.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setView("sphere")}
              aria-label="Toggle sphere view"
              className="group grid h-11 w-11 place-items-center"
            >
              <GridIcon collapsed />
            </button>
          </div>
        ) : null}
        <div className="grid gap-[clamp(10px,1.4vw,20px)] [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
          {expertise.map((group, gi) => (
            <figure key={group.title} className="group m-0">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[3px] bg-[#0b0d13]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.82] transition duration-[800ms] group-hover:scale-105 group-hover:opacity-100"
                  style={crop(gi * 11, "300%")}
                />
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-base/85 to-transparent px-3.5 pb-3 pt-7 font-display text-xl text-copy-primary">
                  <span className="mr-2 font-mono text-[10px] text-accent">0{gi + 1}</span>
                  {group.title}
                </p>
              </div>
              <figcaption className="pt-3">
                <h3 className="sr-only">{group.title}</h3>
                <p className="text-[13px] leading-6 text-copy-secondary">{group.blurb}</p>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-copy-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
