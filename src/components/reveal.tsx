/**
 * Scroll reveal with zero JavaScript.
 *
 * The markup renders in its final visible state; globals.css only animates it
 * where `animation-timeline: view()` is supported and the user has not asked
 * for reduced motion. Browsers without support (and crawlers) get the content
 * as-is rather than a block stuck at opacity 0.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className ? `reveal ${className}` : "reveal"}>{children}</div>;
}
