"use client";

import { useEffect, useRef } from "react";

/*
 * Palette grade: grayscale the footage, multiply by the grade colour so highlights
 * land on `grade` (tailwind.config) and shadows on ink, then a scrim for text contrast.
 */
export const gradeFilter = (brightness = 0.9) => `grayscale(1) contrast(1.15) brightness(${brightness})`;

export function Grade({ scrim = 0.35 }: { scrim?: number }) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-grade mix-blend-multiply" />
      <div aria-hidden="true" className="absolute inset-0 bg-ink-base" style={{ opacity: scrim }} />
    </>
  );
}

/**
 * Lazy looping background film: the source attaches ~1 viewport before it is
 * needed, plays only while visible (and `active`), pauses otherwise.
 */
export function GradedVideo({
  src,
  active = true,
  brightness,
  className = "",
}: {
  src: string;
  active?: boolean;
  brightness?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const state = useRef({ near: false, visible: false, active });
  const sync = useRef(() => {});
  state.current.active = active;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sync.current = () => {
      const s = state.current;
      if (s.near && s.active && !v.src) v.src = src;
      if (s.visible && s.active && !reduce) v.play().catch(() => {});
      else v.pause();
    };
    const near = new IntersectionObserver(
      ([e]) => {
        state.current.near = e.isIntersecting;
        sync.current();
      },
      { rootMargin: "100% 0px" },
    );
    const seen = new IntersectionObserver(([e]) => {
      state.current.visible = e.isIntersecting;
      sync.current();
    });
    near.observe(v);
    seen.observe(v);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [src]);

  useEffect(() => sync.current(), [active]);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ filter: gradeFilter(brightness) }}
    />
  );
}
