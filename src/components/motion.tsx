"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";

/** Sets data-in once the block scrolls into view; CSS in globals.css does the rest. */
export function InView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.in = "";
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-inview="" className={className}>
      {children}
    </div>
  );
}

/** Splits text into `.w` word spans; a trailing `emphasis` phrase renders as accent italic. */
export function Words({ text, emphasis }: { text: string; emphasis?: string }) {
  const hasTail = Boolean(emphasis) && text.endsWith(emphasis!) && text !== emphasis;
  const head = hasTail ? text.slice(0, -emphasis!.length).trimEnd() : text;
  const headCount = head.split(" ").length;
  const split = (s: string, offset: number) =>
    s.split(" ").map((word, i) => (
      <Fragment key={i}>
        {offset + i ? " " : null}
        <span className="w" style={{ "--i": offset + i } as CSSProperties}>
          {word}
        </span>
      </Fragment>
    ));
  return (
    <>
      {split(head, 0)}
      {hasTail ? <em className="italic text-accent-soft">{split(emphasis!, headCount)}</em> : null}
    </>
  );
}

/** Counts up to `to` when visible. Renders the final value first, so SSR/no-JS is correct. */
export function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${to.toFixed(decimals)}${suffix}`;
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    el.textContent = `${(0).toFixed(decimals)}${suffix}`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1500);
          el.textContent = `${(to * (1 - (1 - k) ** 3)).toFixed(decimals)}${suffix}`;
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, decimals, suffix]);
  return (
    <span ref={ref} className="tabular-nums">
      {final}
    </span>
  );
}

/** Nature-portfolio cursor dot (fine pointers only); widens over interactive targets. */
export function PointerFX() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      dot.current?.setAttribute("data-on", "");
      dot.current?.toggleAttribute("data-wide", Boolean(target?.closest("a, button, [data-idx]")));
    };
    const leave = () => dot.current?.removeAttribute("data-on");
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={dot} aria-hidden="true" className="cursor-dot" />;
}
