"use client";

import { useT } from "@/components/home/i18n";

interface GenerateButtonProps {
  isGenerating: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function GenerateButton({ isGenerating, disabled, onClick }: GenerateButtonProps) {
  const t = useT("generate");

  return (
    <div className="gen-btn-area">
      <button
        className={`btn btn-primary btn-block btn-lg ripple${isGenerating ? " generating" : ""}`}
        id="genBtn"
        onClick={onClick}
        disabled={disabled}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
      >
        <span className="spinner" />
        <span className="btn-text">
          {isGenerating ? t.generating : t.generate}
        </span>
      </button>
    </div>
  );
}
