/**
 * Original artwork: an abstract, angular mechanical head in near-black with two slit-shaped eyes.
 * Pure SVG; all motion is CSS (opacity/transform only) — see `.boot-*` rules in globals.css.
 */
function Eye({ side }: { side: "left" | "right" }) {
  const mirror = side === "right";
  return (
    <g transform={`translate(${mirror ? 505 : 295} 238) ${mirror ? "scale(-1 1)" : ""}`}>
      <g className="boot-eye">
        {/* soft ambient light (radial gradient, no blur filter) */}
        <ellipse className="boot-glow" cx="0" cy="0" rx="120" ry="58" fill="url(#bootGlow)" />
        {/* tilted so the inner ends point down: a fixed, angry stare */}
        <g transform="rotate(15)">
          <path d="M-84 -2 L-50 -17 L60 -19 L90 6 L50 17 L-58 18Z" fill="#0b0d0f" stroke="#2a2f35" strokeWidth="1.2" />
          <g className="boot-eye-power">
            <g className="boot-eye-pulse">
              <path d="M-70 0 L-42 -10 L56 -12 L76 4 L40 9 L-44 10Z" fill="url(#bootEye)" />
              <path d="M-48 0 L46 -3" stroke="#e5535c" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
            </g>
          </g>
          {/* heavy brow plate hooding the eye */}
          <path d="M-100 -30 L74 -30 L104 4 L84 -12 L-86 -18Z" fill="#090b0d" stroke="#2a2f35" strokeWidth="1.2" strokeLinejoin="round" />
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
        <path d="M296 66 L400 36 L504 66 L552 114 L560 244 L514 322 L452 372 L400 392 L348 372 L286 322 L240 244 L248 114Z" />
        <path d="M120 480 L262 432 L358 410 L442 410 L538 432 L680 480" fill="none" />
        <path d="M358 386 V420 M442 386 V420" fill="none" />
      </g>
      <g fill="none" stroke="#23272c" strokeWidth="1.2" className="boot-silhouette">
        <path d="M400 38 V150" />
        <path className="boot-brow" d="M252 176 L400 214 L548 176" />
        <path d="M276 316 L346 352 M524 316 L454 352 M400 214 V300" />
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
