/**
 * Conceptual scope diagram: where the research topic sits in a retrieval-augmented pipeline.
 * It illustrates the area of study only — it is NOT a description of the team's method or results.
 */
export function ResearchScope() {
  const nodes = [
    { x: 8, label: "Cross-lingual\nquery", sub: "INPUT" },
    { x: 188, label: "Retriever", sub: "RAG" },
    { x: 368, label: "External\nknowledge base", sub: "FOCUS", focus: true },
    { x: 548, label: "Large Language\nModel", sub: "OUTPUT" },
  ];
  return (
    <figure>
      <svg viewBox="0 0 700 150" role="img" aria-labelledby="scope-title scope-desc" className="h-auto w-full">
        <title id="scope-title">Research scope diagram</title>
        <desc id="scope-desc">A cross-lingual query passes to a retriever, which reads an external knowledge base, which feeds a large language model. The external knowledge base is the focus of the study.</desc>
        {nodes.map((n, i) => (
          <g key={n.sub}>
            <rect x={n.x} y="28" width="144" height="88" fill={n.focus ? "#121518" : "none"} stroke={n.focus ? "#c1121f" : "#292d32"} strokeWidth="1" />
            <text x={n.x + 12} y="46" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6" fill={n.focus ? "#c1121f" : "#92979d"}>{n.sub}</text>
            {n.label.split("\n").map((line, j) => (
              <text key={line} x={n.x + 12} y={78 + j * 20} fontFamily="var(--font-heading)" fontSize="16" fill="#e8e8e8">{line}</text>
            ))}
            {i < nodes.length - 1 && <path d={`M${n.x + 144} 72h36m-6 -5 6 5 -6 5`} fill="none" stroke="#92979d" strokeWidth="1.2" />}
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">
        Fig. 1 — Where the topic sits in a retrieval-augmented pipeline. Context only; not the team&apos;s method.
      </figcaption>
    </figure>
  );
}
