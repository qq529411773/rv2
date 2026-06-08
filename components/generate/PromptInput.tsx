"use client";

import { useT } from "@/components/home/i18n";

interface Chip {
  label: string;
  prompt: string;
}

const chips: Chip[] = [
  { label: "tropical", prompt: "Tropical beach, sunset glow, palm trees, turquoise ocean, golden hour, vivid colors, cinematic lighting, 8K ultra HD" },
  { label: "product", prompt: "Product photography, pure white background, studio lighting, soft shadow, high-end commercial, sharp focus, elegant composition" },
  { label: "cover", prompt: "Short video cover, bold composition, vibrant contrast, eye-catching focal point, YouTube thumbnail style, clean text space, modern aesthetic" },
  { label: "food", prompt: "Food close-up, warm tones, steam rising, appetizing plating, shallow depth of field, natural window light, rustic wooden table" },
  { label: "fashion", prompt: "Fashion outfit, street style, natural sunlight, urban background, candid pose, editorial photography, soft bokeh, muted tones" },
  { label: "travel", prompt: "Travel landscape, aerial drone view, crystal clear water, golden light, majestic mountains, wanderlust vibe, National Geographic style" },
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
