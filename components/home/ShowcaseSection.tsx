"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "./i18n";

interface ShowcaseItem {
  name: string;
  emoji: string;
  prompt: string;
  fmt: string;
  tall: boolean;
  cls?: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    name: "热带海滩日落",
    emoji: "🌅",
    prompt: "Sunset tropical beach, palm trees, golden light, ocean waves",
    fmt: "9:16 · 视频封面",
    tall: false,
  },
  {
    name: "产品摄影白底",
    emoji: "👜",
    prompt:
      "Professional product photography, white background, studio lighting",
    fmt: "1:1 · 电商主图",
    tall: false,
  },
  {
    name: "巴迪克连衣裙",
    emoji: "👗",
    prompt: "Batik dress fashion, Indonesian traditional motif, bright colors",
    fmt: "9:16 · 社媒贴文",
    tall: true,
    cls: "tall",
  },
  {
    name: "越南河粉",
    emoji: "🍜",
    prompt: "Authentic Pho Bo, steaming bowl, herbs, street food close-up",
    fmt: "4:3 · 美食摄影",
    tall: false,
  },
  {
    name: "亚洲城市夜景",
    emoji: "🌃",
    prompt: "Night skyline of Bangkok, neon lights, cinematic mood",
    fmt: "16:9 · 横幅素材",
    tall: false,
    cls: "wide",
  },
  {
    name: "奥黛少女",
    emoji: "👘",
    prompt:
      "Vietnamese Ao Dai, traditional dress, graceful pose, garden background",
    fmt: "9:16 · 人像",
    tall: true,
    cls: "tall",
  },
  {
    name: "电商主图鞋类",
    emoji: "👟",
    prompt: "Sneaker product shot, clean white background, dynamic angle",
    fmt: "1:1 · 电商主图",
    tall: false,
  },
  {
    name: "欧洲街头咖啡",
    emoji: "☕",
    prompt: "European street cafe, morning light, croissant and coffee, cozy",
    fmt: "4:3 · 生活",
    tall: false,
  },
];

export function ShowcaseSection() {
  const t = useT("home");
  const router = useRouter();

  return (
    <section className="showcase-section" style={{ padding: "40px 0 60px" }}>
      <div className="text-center mb-9 reveal">
        <h2
          className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-tight mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.showcase.title}
        </h2>
        <p style={{ color: "var(--text-s)", fontSize: "0.95rem" }}>
          {t.showcase.subtitle}
        </p>
      </div>

      <div className="showcase-grid">
        {showcaseItems.map((item, i) => (
          <div
            key={i}
            className={`showcase-card reveal reveal-d${(i % 4) + 1}${item.cls ? " " + item.cls : ""}`}
            onClick={() => router.push(`/generate?prompt=${encodeURIComponent(item.prompt)}`)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.4s var(--ease-smooth)",
              transform: "perspective(800px) rotateX(0deg)",
              position: "relative",
            }}
          >
            <div
              className="thumb"
              style={{
                aspectRatio:
                  item.cls === "wide" ? "2/1" : item.tall ? "3/4" : "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.5s var(--ease-smooth)",
              }}
            >
              <span
                className="fmt-tag"
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  padding: "2px 8px",
                  borderRadius: "5px",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.88)",
                  color: "var(--text-s)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {item.fmt}
              </span>
              <span style={{ fontSize: "3rem", lineHeight: 1 }}>
                {item.emoji}
              </span>
            </div>
            <div className="info" style={{ padding: "12px 14px" }}>
              <div
                className="name"
                style={{ fontSize: "0.85rem", fontWeight: 600 }}
              >
                {item.name}
              </div>
              <div
                className="prompt"
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-t)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginTop: "2px",
                }}
              >
                &ldquo;{item.prompt}&rdquo;
              </div>
              <div
                className="meta"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.68rem",
                  color: "var(--text-t)",
                  marginTop: "5px",
                }}
              >
                <span>&#10022;</span>
                <span>{item.fmt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/generate" className="pf-btn pf-btn-secondary pf-btn-xl">
          {t.showcase.cta}
        </Link>
      </div>
    </section>
  );
}
