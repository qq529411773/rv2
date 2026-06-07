"use client";

import { useT } from "@/components/home/i18n";

type ResultState = "empty" | "loading" | "done";

interface Result {
  state: ResultState;
  emoji: string;
  label: string;
  colors: string[];
  imageUrl: string;
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
    if (result.imageUrl) {
      window.open(result.imageUrl, "_blank");
    }
  };

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
          background: "#1a1a2e",
          borderRadius: "var(--radius-2xl)",
          padding: "24px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          width: "auto",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          animation: "previewEnter 0.4s var(--ease-smooth) both",
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center justify-center rounded-xl overflow-hidden"
          style={{ maxHeight: "70vh", background: "#0d0d1a" }}
        >
          <img
            src={result.imageUrl}
            alt={result.label}
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
            }}
          />
        </div>
        <div style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginTop: "16px", textAlign: "center" }}>
          {result.label}
        </div>
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            className="btn btn-primary"
            style={{ fontSize: "0.9rem", padding: "10px 28px" }}
            onClick={handleDownload}
          >
            {t.downloadImage}
          </button>
          <button
            className="btn btn-secondary"
            style={{ fontSize: "0.9rem", padding: "10px 28px" }}
            onClick={onClose}
          >
            {t.close}
          </button>
        </div>
        <button
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-lg text-white"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
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
                  background: r.imageUrl ? "#0d0d1a" : `linear-gradient(135deg,${r.colors[0] || "#333"},${r.colors[1] || "#555"})`,
                  cursor: "pointer",
                }}
              >
                {r.imageUrl ? (
                  <>
                    <img
                      src={r.imageUrl}
                      alt={r.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                      }}
                    />
                    <div className="overlay" onClick={(e) => e.stopPropagation()}>
                      <button className="act" title={t.downloadImage} onClick={() => window.open(r.imageUrl, "_blank")}>
                        ⬇️
                      </button>
                      <button className="act" title={t.close} onClick={() => onPreview(i)}>
                        🔍
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: "3rem" }}>{r.emoji}</div>
                    <div className="glabel">{r.label}</div>
                    <div className="overlay" onClick={(e) => e.stopPropagation()}>
                      <button className="act" title={t.downloadImage} onClick={() => {}}>⬇️</button>
                      <button className="act" title={t.close} onClick={() => onPreview(i)}>🔍</button>
                    </div>
                  </>
                )}
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
