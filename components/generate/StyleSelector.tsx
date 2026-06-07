"use client";

import { useT } from "@/components/home/i18n";

interface Style {
  id: string;
  emoji: string;
  name: string;
  cls: string;
}

const styles: Style[] = [
  { id: "fresh", emoji: "🌸", name: "fresh", cls: "sg-fresh" },
  { id: "vintage", emoji: "📜", name: "vintage", cls: "sg-vintage" },
  { id: "minimal", emoji: "◻️", name: "minimal", cls: "sg-minimal" },
  { id: "trendy", emoji: "🌈", name: "trendy", cls: "sg-trendy" },
  { id: "chinese", emoji: "🏮", name: "chinese", cls: "sg-chinese" },
  { id: "tropical", emoji: "🌴", name: "tropical", cls: "sg-tropical" },
];

interface StyleSelectorProps {
  selected: string;
  onChange: (id: string) => void;
}

export function StyleSelector({ selected, onChange }: StyleSelectorProps) {
  const t = useT("generate");

  return (
    <>
      <div className="sel-label">{t.style?.label || "Style"}</div>
      <div className="sel-grid style">
        {styles.map((st) => (
          <button
            key={st.id}
            className={`sel-style${selected === st.id ? " active" : ""}`}
            onClick={() => onChange(st.id)}
          >
            <div className={`preview ${st.cls}`}>{st.emoji}</div>
            <div className="sname">{t.style?.[st.name as keyof typeof t.style] ?? st.name}</div>
          </button>
        ))}
      </div>
    </>
  );
}
