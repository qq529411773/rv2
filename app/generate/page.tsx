"use client";

import { useState } from "react";
import { useT } from "@/components/home/i18n";
import { PromptInput } from "@/components/generate/PromptInput";
import { SizeSelector } from "@/components/generate/SizeSelector";
import { StyleSelector } from "@/components/generate/StyleSelector";
import { GenerateButton } from "@/components/generate/GenerateButton";
import { ResultGrid } from "@/components/generate/ResultGrid";
import { UsageBadge } from "@/components/generate/UsageBadge";

type ResultState = "empty" | "loading" | "done";

interface Result {
  state: ResultState;
  emoji: string;
  label: string;
  colors: string[];
  imageUrl: string;
}

export default function GeneratePage() {
  const t = useT("generate");
  const [prompt, setPrompt] = useState("");
  const [selectedSize, setSelectedSize] = useState("9:16");
  const [selectedStyle, setSelectedStyle] = useState("fresh");
  const [isGenerating, setIsGenerating] = useState(false);
  const [usage, setUsage] = useState<number>(8);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [results, setResults] = useState<Result[]>([
    { state: "empty", emoji: "", label: "", colors: [], imageUrl: "" },
    { state: "empty", emoji: "", label: "", colors: [], imageUrl: "" },
    { state: "empty", emoji: "", label: "", colors: [], imageUrl: "" },
    { state: "empty", emoji: "", label: "", colors: [], imageUrl: "" },
  ]);

  const generateImages = async () => {
    if (usage <= 0) return;
    setIsGenerating(true);
    setError("");
    setUsage((u) => u - 1);

    setResults(results.map((r) => ({ ...r, state: "loading" as ResultState })));

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          size: selectedSize,
          style: selectedStyle,
          count: 4,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "生成失败");
        setResults(results.map((r) => ({ ...r, state: "empty" as ResultState })));
        setIsGenerating(false);
        return;
      }

      const images: string[] = data.images || [];
      const newResults = results.map((_, idx) => {
        if (idx < images.length) {
          return {
            state: "done" as ResultState,
            emoji: "",
            label: `图片 ${idx + 1}`,
            colors: [],
            imageUrl: images[idx] ?? "",
          };
        }
        return { state: "empty" as ResultState, emoji: "", label: "", colors: [], imageUrl: "" };
      });

      setResults(newResults);
    } catch (err) {
      setError("网络错误，请重试");
      setResults(results.map((r) => ({ ...r, state: "empty" as ResultState })));
    }

    setIsGenerating(false);
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

          <PromptInput prompt={prompt} onChange={setPrompt} />
          <SizeSelector selected={selectedSize} onChange={setSelectedSize} />
          <StyleSelector selected={selectedStyle} onChange={setSelectedStyle} />

          <GenerateButton
            isGenerating={isGenerating}
            disabled={isGenerating || !prompt.trim() || usage <= 0}
            onClick={generateImages}
          />

          {error && (
            <div
              className="mt-3 text-center"
              style={{ color: "var(--danger, #ef4444)", fontSize: "0.8rem" }}
            >
              {error}
            </div>
          )}

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
