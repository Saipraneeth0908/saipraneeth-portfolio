"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero backdrop: `top` covers everything; dragging the cursor (or a
 * finger) scratches it away with a procedural dry brush, revealing `bottom`.
 * The mask is rebuilt every frame from short-lived stamps that shrink (never
 * fade) to nothing over LIFE seconds.
 */

const LIFE = 2.7;
const SAMPLES = 48;
const MAX_STAMPS = 900; // ponytail: hard cap keeps a frantic scribble at 60fps

type Stamp = {
  x: number;
  y: number;
  r: number;
  angle: number;
  stretch: number;
  born: number;
  seed: number;
  holes: boolean;
};

type Pt = [number, number];

const hash = (n: number) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

// Closed Catmull-Rom through pts, emitted as cubic Béziers into the current path.
function smoothClosed(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  const n = pts.length;
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    ctx.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
      p2[0],
      p2[1],
    );
  }
  ctx.closePath();
}

function brushShape(s: Stamp, radius: number, t: number): Pt[] {
  const cos = Math.cos(s.angle);
  const sin = Math.sin(s.angle);
  const pts: Pt[] = [];
  for (let i = 0; i < SAMPLES; i++) {
    const a = (i / SAMPLES) * Math.PI * 2;
    let m =
      1 +
      0.085 * Math.sin(3 * a + t + s.seed) +
      0.048 * Math.sin(5 * a - t * 1.15 + s.seed * 2.1) +
      0.022 * Math.sin(9 * a + t * 0.6 + s.seed * 3.7);
    m += 0.05 * (hash(s.seed * 100 + i) - 0.5); // fine grit
    if (hash(s.seed * 31 + i) > 0.93) m += 0.1; // bristle protrusion
    if (hash(s.seed * 53 + Math.floor(i / 4)) > 0.86) m -= 0.12; // torn section
    const lx = Math.cos(a) * radius * m * (1 + s.stretch);
    const ly = Math.sin(a) * radius * m * (1 - s.stretch * 0.6);
    pts.push([s.x + lx * cos - ly * sin, s.y + lx * sin + ly * cos]);
  }
  return pts;
}

// Two or three thin irregular streaks along the stroke direction: dry-brush gaps.
function holeShapes(s: Stamp, radius: number): Pt[][] {
  const cos = Math.cos(s.angle);
  const sin = Math.sin(s.angle);
  const count = 2 + Math.floor(hash(s.seed * 7) * 2);
  const shapes: Pt[][] = [];
  for (let h = 0; h < count; h++) {
    const along = (hash(s.seed * 11 + h) - 0.5) * radius * 0.9;
    const across = (hash(s.seed * 13 + h) - 0.5) * radius * 1.1;
    const len = radius * (0.1 + hash(s.seed * 17 + h) * 0.14);
    const wid = radius * (0.018 + hash(s.seed * 19 + h) * 0.025);
    const tilt = (hash(s.seed * 23 + h) - 0.5) * 0.35;
    const tc = Math.cos(tilt);
    const ts = Math.sin(tilt);
    const pts: Pt[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const j = 0.75 + hash(s.seed * 29 + h * 12 + i) * 0.5;
      const ex = Math.cos(a) * len * j;
      const ey = Math.sin(a) * wid * j;
      const lx = along + ex * tc - ey * ts;
      const ly = across + ex * ts + ey * tc;
      pts.push([s.x + lx * cos - ly * sin, s.y + lx * sin + ly * cos]);
    }
    shapes.push(pts);
  }
  return shapes;
}

export function ScratchReveal({
  top,
  bottom,
  className,
  children,
}: {
  top: string;
  bottom: string;
  className?: string;
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const addStampRef = useRef<(x: number, y: number) => void>(() => {});
  const state = useRef({
    active: false,
    tx: 0,
    ty: 0,
    sx: 0,
    sy: 0,
    lx: 0,
    ly: 0,
    dx: 1,
    dy: 0,
    speed: 0,
    stamps: [] as Stamp[],
    now: 0,
  });

  useEffect(() => {
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const st = state.current;
    const img = new Image();
    let loaded = false;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let needsClean = true;
    let last = performance.now() / 1000;
    let raf = 0;

    const drawCover = () => {
      // Same math as object-fit: cover + object-position: 50% 25% on the <img> below
      // (biased up so a wide viewport crops the table, not the head under the nav).
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) * 0.25, dw, dh);
    };

    const resize = () => {
      const r = section.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      needsClean = true;
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      drawCover();
      if (!st.stamps.length) return;

      const holes: Pt[][] = [];
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      for (const s of st.stamps) {
        const life = Math.max(0, 1 - (t - s.born) / LIFE);
        const radius = s.r * Math.pow(life, 0.85);
        if (radius < 0.5) continue;
        smoothClosed(ctx, brushShape(s, radius, t));
        if (s.holes) holes.push(...holeShapes(s, radius));
      }
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      if (holes.length) {
        ctx.save();
        ctx.beginPath();
        for (const h of holes) smoothClosed(ctx, h);
        ctx.clip();
        drawCover();
        ctx.restore();
      }
    };

    const frame = (nowMs: number) => {
      const t = nowMs / 1000;
      const dt = Math.min(0.05, Math.max(0.001, t - last));
      last = t;
      st.now = t;

      if (st.active) {
        const k = 1 - Math.pow(1 - 0.17, dt * 60);
        const px = st.sx;
        const py = st.sy;
        st.sx += (st.tx - st.sx) * k;
        st.sy += (st.ty - st.sy) * k;
        const vx = st.sx - px;
        const vy = st.sy - py;
        const v = Math.hypot(vx, vy);
        st.speed += (v / dt - st.speed) * 0.2;
        if (v > 0.01) {
          st.dx += (vx / v - st.dx) * 0.25;
          st.dy += (vy / v - st.dy) * 0.25;
        }

        const brushR = Math.min(W, H) * 0.175;
        const spacing = brushR * 0.09;
        const angle = Math.atan2(st.dy, st.dx);
        const stretch = Math.min(0.18, st.speed / (brushR * 20));
        let gx = st.sx - st.lx;
        let gy = st.sy - st.ly;
        let gap = Math.hypot(gx, gy);
        while (gap >= spacing) {
          st.lx += (gx / gap) * spacing;
          st.ly += (gy / gap) * spacing;
          addStamp(st.lx, st.ly, brushR, angle, stretch, t);
          gx = st.sx - st.lx;
          gy = st.sy - st.ly;
          gap = Math.hypot(gx, gy);
        }
      }

      st.stamps = st.stamps.filter((s) => t - s.born < LIFE);
      if (loaded && (st.stamps.length || needsClean)) {
        draw(t);
        needsClean = st.stamps.length > 0; // one clean redraw after the last stamp dies
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const addStamp = (x: number, y: number, r: number, angle: number, stretch: number, t: number) => {
      const seed = Math.random() * 10;
      st.stamps.push({
        x,
        y,
        r: r * (0.92 + hash(seed) * 0.16),
        angle,
        stretch,
        born: t,
        seed,
        holes: hash(seed * 3) < 0.12,
      });
      if (st.stamps.length > MAX_STAMPS) st.stamps.shift();
    };
    addStampRef.current = (x, y) =>
      addStamp(x, y, Math.min(W, H) * 0.175, Math.atan2(st.dy, st.dx), 0, st.now || last);

    // Decode off the main thread so the first drawImage doesn't stall.
    img.src = top;
    img
      .decode()
      .catch(() => {})
      .then(() => {
        loaded = true;
        needsClean = true;
        setReady(true);
      });

    // Only animate while the hero is on screen.
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now() / 1000;
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(section);

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [top]);

  const onMove = (e: React.PointerEvent) => {
    const st = state.current;
    const r = sectionRef.current!.getBoundingClientRect();
    st.tx = e.clientX - r.left;
    st.ty = e.clientY - r.top;
    if (!st.active) {
      // Fresh entry: snap follower so no stroke links back to the old position.
      st.active = true;
      st.sx = st.lx = st.tx;
      st.sy = st.ly = st.ty;
      st.speed = 0;
      addStampRef.current(st.tx, st.ty);
    }
  };
  const stop = () => {
    state.current.active = false;
  };

  return (
    <section
      ref={sectionRef}
      className={className}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={stop}
      onPointerUp={(e) => e.pointerType !== "mouse" && stop()}
      onPointerCancel={stop}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bottom}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover object-[50%_25%] ${ready ? "" : "invisible"}`}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      {children}
    </section>
  );
}
