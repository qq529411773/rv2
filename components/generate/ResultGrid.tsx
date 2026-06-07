"use client";

import { useT } from "@/components/home/i18n";

type ResultState = "empty" | "loading" | "done";

interface Result {
  state: ResultState;
  emoji: string;
  label: string;
  colors: string[];
}

interface ResultGridProps {
  results: Result[];
  previewIdx: number | null;
  onPreview: (idx: number) => void;
  onClosePreview: () => void;
}

function PreviewModal({ result, onClose }: { result: Result; onClose: () => void }) {
  const t = useT("generate");

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative"
        style={{
          background: `linear-gradient(135deg,${result.colors[0]},${result.colors[1]})`,
          borderRadius: "var(--radius-2xl)",
          padding: "48px 56px",
          maxWidth: "520px",
          width: "90%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          textAlign: "center",
          animation: "previewEnter 0.4s var(--ease-smooth) both",
        }}
      >
        <div style={{ fontSize: "6rem", lineHeight: 1.2, marginBottom: "12px" }}>
          {result.emoji}
        </div>
        <div style={{ fontSize: "1.15rem", fontWeight: 600, color: "rgba(0,0,0,0.65)", marginBottom: "20px" }}>
          {result.label}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            className="btn btn-primary btn-lg"
            style={{ fontSize: "0.9rem", padding: "10px 28px" }}
            onClick={() => {}}
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
                  background: `linear-gradient(135deg,${r.colors[0]},${r.colors[1]})`,
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "3rem" }}>{r.emoji}</div>
                <div className="glabel">{r.label}</div>
                <div className="overlay" onClick={(e) => e.stopPropagation()}>
                  <button className="act" title={t.downloadImage} onClick={() => {}}>⬇️</button>
                  <button className="act" title={t.close} onClick={() => onPreview(i)}>🔍</button>
                  <button className="act" title={t.share ?? "Share"} onClick={() => {}}>↗️</button>
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
