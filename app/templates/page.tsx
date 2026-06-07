"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/components/home/i18n";

interface Template {
  name: string;
  cat: string;
  emoji: string;
  desc: string;
  tag: string;
  usage: number;
}

const templates: Template[] = [
  { name: "短视频爆款封面", cat: "video", emoji: "🎬", desc: "9:16 高点击封面", tag: "热门", usage: 2340 },
  { name: "产品白底主图", cat: "ecom", emoji: "🛍️", desc: "1:1 电商标准图", tag: "经典", usage: 1890 },
  { name: "社交媒体轮播", cat: "social", emoji: "📱", desc: "多图轮播贴文", tag: "精选", usage: 1560 },
  { name: "巴迪克风情", cat: "regional", emoji: "🇮🇩", desc: "印尼风格主题", tag: "区域", usage: 980 },
  { name: "TikTok 挑战封面", cat: "video", emoji: "📹", desc: "年轻活力风格", tag: "热门", usage: 2100 },
  { name: "美食推荐卡片", cat: "social", emoji: "🍜", desc: "4:3 美食展示", tag: "精选", usage: 1320 },
  { name: "Shopee 商品图", cat: "ecom", emoji: "🛒", desc: "东南亚电商标准", tag: "区域", usage: 1650 },
  { name: "奥黛主题写真", cat: "regional", emoji: "🇻🇳", desc: "越南传统风格", tag: "区域", usage: 870 },
  { name: "YouTube 缩略图", cat: "video", emoji: "▶️", desc: "高点击率缩略图", tag: "热门", usage: 1980 },
  { name: "时尚穿搭排版", cat: "social", emoji: "👗", desc: "时尚杂志风格", tag: "精选", usage: 1140 },
  { name: "Lazada 促销图", cat: "ecom", emoji: "🏷️", desc: "促销活动主图", tag: "区域", usage: 1430 },
  { name: "欧洲旅行海报", cat: "regional", emoji: "🇪🇺", desc: "欧洲风景风格", tag: "新作", usage: 720 },
];

const thumbClass: Record<string, string> = {
  video: "tpl-thumb-video",
  ecom: "tpl-thumb-ecom",
  social: "tpl-thumb-social",
  regional: "tpl-thumb-reg",
};

export default function TemplatesPage() {
  const t = useT("templates");
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const tabs = [
    { id: "all", label: t.all, count: templates.length },
    { id: "video", label: t.shortVideo, count: templates.filter((tp) => tp.cat === "video").length },
    { id: "ecom", label: t.ecommerce, count: templates.filter((tp) => tp.cat === "ecom").length },
    { id: "social", label: t.social, count: templates.filter((tp) => tp.cat === "social").length },
    { id: "regional", label: t.regional, count: templates.filter((tp) => tp.cat === "regional").length },
  ];

  const filtered = useMemo(() => {
    const byCat = activeTab === "all" ? templates : templates.filter((tp) => tp.cat === activeTab);
    if (!search.trim()) return byCat;
    return byCat.filter((tp) => tp.name.toLowerCase().includes(search.toLowerCase()));
  }, [activeTab, search]);

  return (
    <div className="pf-container">
      {/* Header */}
      <div className="tpl-head reveal">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              fontWeight: 800,
              letterSpacing: "-0.4px",
            }}
          >
            {t.title}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-s)", marginTop: "2px" }}>
            {t.subtitle}
          </p>
        </div>
        <div className="tpl-search">
          <span className="ico">🔍</span>
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tpl-tabs reveal reveal-d1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tpl-tab${activeTab === tab.id ? " active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span style={{ fontSize: "0.7rem", opacity: 0.5, marginLeft: "4px" }}>
              ({tab.count})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="tpl-grid">
        {filtered.map((tpl, i) => (
          <div key={tpl.name} className={`tpl-card reveal reveal-d${(i % 4) + 1}`}>
            <div className={`thumb ${thumbClass[tpl.cat] || ""}`}>
              <span className="tag">{tpl.tag}</span>
              {tpl.emoji}
            </div>
            <div className="body">
              <div className="name">{tpl.name}</div>
              <div className="meta">
                <span>✦</span>
                <span>{tpl.desc}</span>
                <span style={{ marginLeft: "auto" }}>+{tpl.usage}</span>
              </div>
              <button className="use-btn" onClick={() => router.push("/")}>
                {t.useButton}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16" style={{ color: "var(--text-t)" }}>
          <span style={{ fontSize: "3rem", marginBottom: "12px" }}>🔍</span>
          <p style={{ fontSize: "0.9rem" }}>{t.noResults}</p>
          <button
            className="mt-3 text-[0.8rem] font-medium hover:text-[var(--amber-600)] transition-colors"
            style={{ background: "none", border: "none", color: "var(--text-s)", cursor: "pointer" }}
            onClick={() => { setSearch(""); setActiveTab("all"); }}
          >
            {t.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}
