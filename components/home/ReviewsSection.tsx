"use client";

import { useT } from "./i18n";

interface Review {
  stars: string;
  text: string;
  initial: string;
  gradient: string;
  name: string;
  role: string;
}

const reviews: Review[] = [
  { stars: "★★★★★", text: "PicFlow AI has completely transformed our content workflow. An e-commerce product set used to take half a day, now it's 10 minutes with quality beyond expectations.", initial: "S", gradient: "linear-gradient(135deg,#F59E0B,#D97706)", name: "Sarah Chen", role: "E-commerce Ops · Shopee" },
  { stars: "★★★★★", text: "As a short-video creator, thumbnails were always my pain point. PicFlow's 9:16 templates and style engines let me produce high-quality covers daily with great results.", initial: "M", gradient: "linear-gradient(135deg,#6366F1,#4F46E5)", name: "Marco Rossi", role: "TikTok Creator · Milan" },
  { stars: "★★★★★", text: "Running local e-commerce in Indonesia, PicFlow's regional templates give our product images international quality with local flavor. Free and no watermark, highly recommended!", initial: "A", gradient: "linear-gradient(135deg,#14B8A6,#0D9488)", name: "Ayu Wulandari", role: "Brand Manager · Jakarta" },
];

export function ReviewsSection() {
  const t = useT("home");
  return (
    <section className="py-10">
      <div className="text-center mb-9 reveal">
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-tight mb-2" style={{ fontFamily: "var(--font-display)" }}>{t.reviews.title}</h2>
        <p style={{ color: "var(--text-s)", fontSize: "0.95rem" }}>{t.reviews.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <div key={i} className={`reveal reveal-d${i + 1} review-card`}
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color, rgba(0,0,0,0.06))", borderRadius: "var(--radius-xl)", padding: "22px 20px", transition: "all 0.3s var(--ease-smooth)" }}>
            <div style={{ color: "var(--amber-400)", fontSize: "0.85rem", marginBottom: "8px", letterSpacing: "2px" }}>{r.stars}</div>
            <p className="text-[0.85rem] italic leading-relaxed mb-3.5" style={{ color: "var(--text-s)" }}>&ldquo;{r.text}&rdquo;</p>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[0.8rem] font-bold text-white shrink-0" style={{ background: r.gradient }}>{r.initial}</div>
              <div>
                <div className="text-[0.82rem] font-semibold">{r.name}</div>
                <div className="text-[0.68rem]" style={{ color: "var(--text-t)" }}>{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
