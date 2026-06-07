"use client";

import { useT } from "@/components/home/i18n";

interface Chip {
  label: string;
  prompt: string;
}

const chips: Chip[] = [
  { label: "tropical", prompt: "Tropical beach at sunset, palm trees, vivid colors, 8K" },
  { label: "product", prompt: "Product photography, white background, studio lighting" },
  { label: "cover", prompt: "Video cover, bold composition, vibrant, focal point" },
  { label: "food", prompt: "Food close-up, warm tones, appetizing, shallow DOF" },
  { label: "fashion", prompt: "Fashion outfit, street style, natural light" },
  { label: "travel", prompt: "Travel landscape, drone view, turquoise water" },
];

interface PromptInputProps {
  prompt: string;
  onChange: (val: string) => void;
}

export function PromptInput({ prompt, onChange }: PromptInputProps) {
  const t = useT("generate");

  return (
    <>
      <div className="prompt-wrap">
        <textarea
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.prompt?.placeholder || "Describe what you want to generate..."}
          maxLength={500}
          rows={3}
        />
        <span className="prompt-char">
          <span>{prompt.length}</span>/500
        </span>
      </div>

      <div className="chip-group">
        {chips.map((chip) => (
          <button key={chip.label} className="chip" onClick={() => onChange(chip.prompt)}>
            {t.chips?.[chip.label as keyof typeof t.chips] ?? chip.label}
          </button>
        ))}
      </div>
    </>
  );
}
