import "./mystical-loader.css";

interface MysticalLoaderProps {
  size?: number; // overrides default 30px height
  className?: string;
}

/**
 * MysticalLoader
 * Exact eye-with-waves loader per provided spec.
 * Colors are fixed (black center, white upper/lower) to preserve the intended aesthetic.
 */
export function MysticalLoader({
  size = 30,
  className = "",
}: MysticalLoaderProps) {
  return (
    <div
      className={`loader ${className}`}
      style={{ height: `${size}px` }}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
