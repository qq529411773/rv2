"use client";

import { useT } from "@/components/home/i18n";

type ResultState = "empty" | "loading" | "done";

export interface Result {
  state: ResultState;
  imageUrl: string;
  label: string;
}

interface ResultGridProps {
  results: Result[];
  previewIdx: number | null;
  onPreview: (idx: number) => void;
  onClosePreview: () => void;
}

function PreviewModal({ result, onClose }: { result: Result; onClose: () => void }) {
  const t = useT("generate");

  const handleDownload = () => {
    if (!result.imageUrl) return;
    const a = document.createElement("a");
    a.href = result.imageUrl;
    a.download = `picflow-${Date.now()}.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative"
        style={{
          background: "var(--bg-card)",
          borderRadius: "var(--radius-2xl)",
          padding: "24px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          width: "auto",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          textAlign: "center",
          animation: "previewEnter 0.4s var(--ease-smooth) both",
        }}
      >
        <img
          src={result.imageUrl}
          alt={result.label}
          style={{
            maxWidth: "100%",
            maxHeight: "70vh",
            borderRadius: "var(--radius-lg)",
            objectFit: "contain",
          }}
        />
        <div style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: "16px", color: "var(--text-p)" }}>
          {result.label}
        </div>
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            className="btn btn-primary btn-lg"
            style={{ fontSize: "0.9rem", padding: "10px 28px" }}
            onClick={handleDownload}
          >
            {t.downloadImage}
          </button>
          <button
            className="btn btn-secondary btn-lg"
            style={{ fontSize: "0.9rem", padding: "10px 28px" }}
            onClick={onClose}
          >
            {t.close}
          </button>
        </div>
        <button
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-lg"
          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

const PLACEHOLDER_COLORS = [
  ["#FEF3C7", "#FDE68A"],
  ["#DBEAFE", "#93C5FD"],
  ["#FCE7F3", "#F9A8D4"],
  ["#D1FAE5", "#6EE7B7"],
];

export function ResultGrid({ results, previewIdx, onPreview, onClosePreview }: ResultGridProps) {
  const t = useT("generate");

  return (
    <>
      <div className="results-head">
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.2px" }}>
            {t.results}
          </h2>
          <p style={{ fontSize: "0.78rem", color: "var(--text-s)", marginTop: "1px" }}>
            {t.resultsSubtitle}
          </p>
        </div>
        <span className="gdpr-badge">{t.e2eEncrypted}</span>
      </div>

      <div className="results-grid">
        {results.map((r, i) => (
          <div key={i} className={`res-card${r.state === "loading" ? " loading" : ""}`}>
            {r.state === "empty" && (
              <div className="empty">
                <span className="ico">🖼️</span>
                <span className="txt">{t.waiting}</span>
              </div>
            )}
            {r.state === "done" && (
              <div
                className="gen-result"
                onClick={() => onPreview(i)}
                style={{
                  background: `linear-gradient(135deg,${PLACEHOLDER_COLORS[i][0]},${PLACEHOLDER_COLORS[i][1]})`,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {r.imageUrl ? (
                  <img
                    src={r.imageUrl}
                    alt={r.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "inherit",
                      position: "absolute",
                      inset: 0,
                    }}
                  />
                ) : null}
                <div className="glabel" style={{ position: "relative", zIndex: 1 }}>{r.label}</div>
                <div className="overlay" onClick={(e) => e.stopPropagation()}>
                  <button className="act" title={t.downloadImage} onClick={() => {
                    if (r.imageUrl) {
                      const a = document.createElement("a");
                      a.href = r.imageUrl;
                      a.download = `picflow-${Date.now()}.png`;
                      a.target = "_blank";
                      a.rel = "noopener noreferrer";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }
                  }}>⬇️</button>
                  <button className="act" title={t.share ?? "Share"} onClick={() => onPreview(i)}>🔍</button>
                </div>
              </div>
            )}
            {r.state === "loading" && (
              <div className="empty">
                <span className="ico">⏳</span>
                <span className="txt">{t.generatingState}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {previewIdx !== null && results[previewIdx]?.state === "done" && (
        <PreviewModal result={results[previewIdx]} onClose={onClosePreview} />
      )}
    </>
  );
}
