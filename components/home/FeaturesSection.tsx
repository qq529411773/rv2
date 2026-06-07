"use client";

import { useT } from "./i18n";

const features = [
  { icon: "⚡", title: "Lightning Fast", desc: "Built on FLUX.1-Schnell, generates 4 HD images in under 10 seconds without compromising quality." },
  { icon: "🎯", title: "Precisely Controllable", desc: "Size presets (9:16/1:1/4:3), 6 style engines, and smart prompt understanding for pixel-perfect output." },
  { icon: "🛡️", title: "Privacy First", desc: "Zero data retention policy. No generated content stored on servers. GDPR compliant for EU users." },
  { icon: "🌏", title: "Region Adapted", desc: "Built-in SEA & LATAM style templates (Batik, Ao Dai, Samba, etc.) for one-click localized content." },
  { icon: "🎨", title: "Full Style Coverage", desc: "From fresh and vintage to trendy and Chinese traditional styles — one platform covers all creative needs." },
  { icon: "💰", title: "Completely Free", desc: "No registration, no payment, unlimited generations. High-quality AI images should be accessible to everyone." },
];

export function FeaturesSection() {
  const t = useT("home");
  return (
    <section className="py-10">
      <div className="text-center mb-9 reveal">
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-tight mb-2" style={{ fontFamily: "var(--font-display)" }}>{t.features.title}</h2>
        <p style={{ color: "var(--text-s)", fontSize: "0.95rem" }}>{t.features.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {features.map((f, i) => (
          <div key={i} className={`feature-card reveal reveal-d${(i % 3) + 1}`}
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color, rgba(0,0,0,0.06))", borderRadius: "var(--radius-xl)", padding: "28px 24px", transition: "all 0.3s var(--ease-smooth)" }}>
            <div className="text-[1.8rem] mb-2.5">{f.icon}</div>
            <h4 className="text-[0.95rem] font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h4>
            <p className="text-[0.82rem] leading-relaxed" style={{ color: "var(--text-s)" }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
