"use client";

import Link from "next/link";
import { Heart, Users, Globe, Sparkles } from "lucide-react";
import { useT } from "@/components/home/i18n";

export default function AboutPage() {
  const t = useT("about");

  return (
    <div className="pf-container" style={{ paddingTop: "48px" }}>
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="home-hero text-center mb-14 reveal">
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[0.78rem] font-semibold mb-5"
            style={{ background: "var(--amber-50)", color: "var(--amber-600)", border: "1px solid var(--amber-200)" }}
          >
            <span className="mr-1">🇨🇳</span>
            {t.badge}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)" }}>
            {t.heroTitle1}{" "}
            <span className="highlight">{t.heroTitle2}</span>
          </h1>
          <p className="mt-3 text-[1.05rem] max-w-[600px] mx-auto" style={{ color: "var(--text-s)" }}>
            {t.heroDesc}
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {[
            { icon: Heart, title: t.mission.title, desc: t.mission.desc },
            { icon: Users, title: t.community.title, desc: t.community.desc },
            { icon: Globe, title: t.global.title, desc: t.global.desc },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`reveal reveal-d${i + 1}`}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
                borderRadius: "var(--radius-xl)",
                padding: "28px 24px",
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "var(--amber-50)", color: "var(--amber-600)" }}
              >
                <Icon size={20} />
              </div>
              <h3 className="text-[1.05rem] font-bold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                {title}
              </h3>
              <p className="text-[0.85rem] leading-relaxed" style={{ color: "var(--text-s)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Story */}
        <section className="reveal reveal-d1 mb-12">
          <h3
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mb-5 flex items-center gap-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Sparkles size={24} style={{ color: "var(--amber-500)" }} />
            {t.ourStory.title}
          </h3>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
              borderRadius: "var(--radius-xl)",
              padding: "32px",
            }}
          >
            <div className="space-y-4 text-[0.92rem] leading-relaxed" style={{ color: "var(--text-s)" }}>
              <p>{t.ourStory.p1}</p>
              <p>{t.ourStory.p2}</p>
              <p>{t.ourStory.p3}</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="reveal reveal-d2 mb-12">
          <h3
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.ourValues.title}
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              t.ourValues.v1,
              t.ourValues.v2,
              t.ourValues.v3,
              t.ourValues.v4,
            ].map((v, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[0.8rem] font-bold shrink-0"
                  style={{ background: "var(--amber-50)", color: "var(--amber-600)" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-[0.92rem] mb-1">{v.title}</h4>
                  <p className="text-[0.82rem] leading-relaxed" style={{ color: "var(--text-s)" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div
          className="reveal reveal-d3 text-center mb-8"
          style={{
            background: "var(--amber-50)",
            border: "1px solid var(--amber-200)",
            borderRadius: "var(--radius-xl)",
            padding: "40px 24px",
          }}
        >
          <h3 className="text-[1.4rem] font-extrabold mb-3" style={{ fontFamily: "var(--font-display)" }}>
            {t.cta.title}
          </h3>
          <p className="text-[0.9rem] mb-5 max-w-[500px] mx-auto" style={{ color: "var(--text-s)" }}>
            {t.cta.desc}
          </p>
          <Link href="/" className="pf-btn pf-btn-primary pf-btn-xl">
            {t.cta.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
