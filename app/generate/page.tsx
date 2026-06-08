"use client";

import { GenerateButton } from "@/components/generate/GenerateButton";
import { PromptInput } from "@/components/generate/PromptInput";
import { ResultGrid, type Result } from "@/components/generate/ResultGrid";
import { SizeSelector } from "@/components/generate/SizeSelector";
import { StyleSelector } from "@/components/generate/StyleSelector";
import { UsageBadge } from "@/components/generate/UsageBadge";
import { useT } from "@/components/home/i18n";
import { useEffect, useRef, useState } from "react";

const EMPTY_RESULTS: Result[] = [
  { state: "empty", imageUrl: "", label: "" },
  { state: "empty", imageUrl: "", label: "" },
  { state: "empty", imageUrl: "", label: "" },
  { state: "empty", imageUrl: "", label: "" },
];

const LABELS = ["主图", "变体-角度", "变体-细节", "变体-全景"];

export default function GeneratePage() {
  const t = useT("generate");
  const [prompt, setPrompt] = useState("");
  const [selectedSize, setSelectedSize] = useState("9:16");
  const [selectedStyle, setSelectedStyle] = useState("fresh");
  const [isGenerating, setIsGenerating] = useState(false);
  const [usage, setUsage] = useState(5);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>(EMPTY_RESULTS);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  // 从模板页面跳转过来时，自动填入 prompt 并滚动到描述图片位置
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const promptFromUrl = params.get("prompt");
    if (promptFromUrl) {
      setPrompt(promptFromUrl);
      setTimeout(() => {
        promptRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, []);

  const generateImages = async () => {
    if (usage <= 0 || !prompt.trim()) return;

    setIsGenerating(true);
    setUsage((u) => u - 1);
    setErrorMsg(null);
    setResults(EMPTY_RESULTS.map((r) => ({ ...r, state: "loading" as const })));

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          size: selectedSize,
          style: selectedStyle,
          count: 4,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.images) {
        const msg = data?.message || `Server error (${response.status})`;
        console.error("[Generate] API error:", msg);
        setErrorMsg(msg);
        setResults(
          EMPTY_RESULTS.map((r) => ({ ...r, state: "empty" as const })),
        );
        return;
      }

      setResults(
        data.images.map((url: string, i: number) => ({
          state: "done" as const,
          imageUrl: url,
          label: LABELS[i] ?? `图片 ${i + 1}`,
        })),
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Network error";
      console.error("[Generate] Request failed:", error);
      setErrorMsg(msg);
      setResults(EMPTY_RESULTS.map((r) => ({ ...r, state: "empty" as const })));
    } finally {
      setIsGenerating(false);
      setUsage((u) => Math.min(u + 2, 8));
    }
  };

  return (
    <div className="pf-container">
      <div className="gen-layout">
        {/* LEFT PANEL */}
        <div className="gen-panel glass">
          <div className="gen-panel-head">
            <h2>{t.title}</h2>
            <UsageBadge usage={usage} max={8} />
          </div>

          <div ref={promptRef}>
            <PromptInput prompt={prompt} onChange={setPrompt} />
          </div>
          <SizeSelector selected={selectedSize} onChange={setSelectedSize} />
          <StyleSelector selected={selectedStyle} onChange={setSelectedStyle} />

          <GenerateButton
            isGenerating={isGenerating}
            disabled={isGenerating || !prompt.trim() || usage <= 0}
            onClick={generateImages}
          />

          <div
            className="mt-2 flex items-center justify-center gap-1.5"
            style={{ fontSize: "0.68rem", color: "var(--text-t)" }}
          >
            <span className="gdpr-badge">{t.gdprSafe}</span>
            <span>{t.zeroRetention}</span>
          </div>
        </div>

        {/* RIGHT PANEL — RESULTS */}
        <div>
          {errorMsg && (
            <div
              style={{
                background: "var(--red-50, #FEF2F2)",
                border: "1px solid var(--red-200, #FECACA)",
                color: "var(--red-700, #B91C1C)",
                borderRadius: "var(--radius-lg)",
                padding: "12px 16px",
                marginBottom: "12px",
                fontSize: "0.85rem",
              }}
            >
              {errorMsg}
            </div>
          )}
          <ResultGrid
            results={results}
            previewIdx={previewIdx}
            onPreview={setPreviewIdx}
            onClosePreview={() => setPreviewIdx(null)}
          />
        </div>
      </div>
    </div>
  );
}
