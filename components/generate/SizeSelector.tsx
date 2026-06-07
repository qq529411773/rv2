"use client";

import { useT } from "@/components/home/i18n";

interface Size {
  id: string;
  val: string;
  lbl: string;
}

const sizes: Size[] = [
  { id: "9:16", val: "9:16", lbl: "shortVideo" },
  { id: "1:1", val: "1:1", lbl: "social" },
  { id: "4:3", val: "4:3", lbl: "ecommerce" },
];

interface SizeSelectorProps {
  selected: string;
  onChange: (id: string) => void;
}

export function SizeSelector({ selected, onChange }: SizeSelectorProps) {
  const t = useT("generate");

  return (
    <>
      <div className="sel-label">{t.size?.label || "Size"}</div>
      <div className="sel-grid size">
        {sizes.map((s) => (
          <button
            key={s.id}
            className={`sel-opt${selected === s.id ? " active" : ""}`}
            onClick={() => onChange(s.id)}
          >
            <div className="val">{s.val}</div>
            <div className="lbl">{t.size?.[s.lbl as keyof typeof t.size] ?? s.lbl}</div>
          </button>
        ))}
      </div>
    </>
  );
}
