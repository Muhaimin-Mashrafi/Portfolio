/**
 * Original artwork: an abstract, angular mechanical head in near-black with two slit-shaped eyes.
 * Pure SVG; all motion is CSS (opacity/transform only) — see `.boot-*` rules in globals.css.
 */
function Eye({ side }: { side: "left" | "right" }) {
  const mirror = side === "right";
  return (
    <g transform={`translate(${mirror ? 505 : 295} 236) ${mirror ? "scale(-1 1)" : ""}`}>
      <g className="boot-eye">
        {/* soft ambient light (radial gradient, no blur filter) */}
        <ellipse className="boot-glow" cx="0" cy="0" rx="118" ry="64" fill="url(#bootGlow)" />
        {/* socket */}
        <path d="M-78 -4 L-50 -22 L56 -26 L80 -8 L52 18 L-58 22Z" fill="#0d1013" stroke="#292d32" strokeWidth="1.2" />
        <g className="boot-eye-power">
          <g className="boot-eye-pulse">
            <path d="M-60 -2 L-40 -14 L50 -17 L64 -6 L42 9 L-44 12Z" fill="url(#bootEye)" />
            <path d="M-44 0 L40 -4" stroke="#e5535c" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>
        </g>
      </g>
    </g>
  );
}

export function BootEyes({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 480" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="bootEye" cx="0.5" cy="0.5" r="0.62">
          <stop offset="0" stopColor="#c1121f" />
          <stop offset="0.7" stopColor="#8d101a" />
          <stop offset="1" stopColor="#4a0c11" />
        </radialGradient>
        <radialGradient id="bootGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c1121f" stopOpacity="0.32" />
          <stop offset="1" stopColor="#c1121f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* dormant silhouette: barely visible */}
      <g className="boot-silhouette" fill="#0f1215" stroke="#23272c" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M300 62 L400 38 L500 62 L548 118 L558 250 L522 332 L462 374 L400 386 L338 374 L278 332 L242 250 L252 118Z" />
        <path d="M120 480 L262 432 L358 410 L442 410 L538 432 L680 480" fill="none" />
        <path d="M358 386 V420 M442 386 V420" fill="none" />
      </g>
      <g fill="none" stroke="#23272c" strokeWidth="1.2" className="boot-silhouette">
        <path d="M400 38 V150" />
        <path className="boot-brow" d="M262 196 L400 176 L538 196" />
        <path d="M290 320 L340 346 M510 320 L460 346" />
        <path d="M372 340 H428 M380 352 H420 M388 364 H412" />
      </g>

      {/* axis traces that draw outward from the eyes */}
      <g fill="none" stroke="#3a3f45" strokeWidth="1" strokeDasharray="3 4">
        <path className="boot-trace" d="M40 236 H210" />
        <path className="boot-trace" d="M760 236 H590" />
      </g>

      <Eye side="left" />
      <Eye side="right" />
    </svg>
  );
}
