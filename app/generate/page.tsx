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
}

export default function GeneratePage() {
  const t = useT("generate");
  const [prompt, setPrompt] = useState("");
  const [selectedSize, setSelectedSize] = useState("9:16");
  const [selectedStyle, setSelectedStyle] = useState("fresh");
  const [isGenerating, setIsGenerating] = useState(false);
  const [usage, setUsage] = useState(5);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);

  const [results, setResults] = useState<Result[]>([
    { state: "empty", emoji: "", label: "", colors: [] },
    { state: "empty", emoji: "", label: "", colors: [] },
    { state: "empty", emoji: "", label: "", colors: [] },
    { state: "empty", emoji: "", label: "", colors: [] },
  ]);

  const generateImages = () => {
    if (usage <= 0) return;
    setIsGenerating(true);
    setUsage((u) => u - 1);

    const genData = [
      { emoji: "🎨", label: "主图", colors: ["#FEF3C7", "#FDE68A", "#FCD34D"] },
      { emoji: "🌈", label: "变体-角度", colors: ["#DBEAFE", "#BFDBFE", "#93C5FD"] },
      { emoji: "✨", label: "变体-细节", colors: ["#FCE7F3", "#FBCFE8", "#F9A8D4"] },
      { emoji: "🌟", label: "变体-全景", colors: ["#D1FAE5", "#A7F3D0", "#6EE7B7"] },
    ];

    setResults(results.map((r) => ({ ...r, state: "loading" })));

    genData.forEach((item, idx) => {
      setTimeout(() => {
        setResults((prev) => {
          const next = [...prev];
          next[idx] = { state: "done", ...item };
          return next;
        });
      }, 600 + idx * 300);
    });

    setTimeout(() => {
      setIsGenerating(false);
      setUsage((u) => Math.min(u + 2, 8));
    }, 2200);
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
