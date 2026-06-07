"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLocale, useT } from "./i18n";

function HeroTitle({ locale }: { locale: string }) {
  if (locale === "en") {
    return (
      <>
        AI Image Creation for{" "}
        <span className="highlight">SEA &amp; Europe</span> Social &amp;
        E-commerce
      </>
    );
  }
  if (locale === "zh") {
    return (
      <>
        面向<span className="highlight">东南亚及欧洲</span>的社交媒体与电商 AI
        图像创作
      </>
    );
  }
  if (locale === "es") {
    return (
      <>
        Creación de Imágenes AI para{" "}
        <span className="highlight">SEA y Europa</span> Social &amp; E-commerce
      </>
    );
  }
  return <>AI Image Creation for Social &amp; E-commerce</>;
}

export function HeroSection() {
  const t = useT("home");
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.classList.add("visible");
  }, []);

  return (
    <div
      ref={sectionRef}
      className="home-hero text-center pt-16 md:pt-24 pb-8 reveal"
    >
      <div
        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[0.78rem] font-semibold mb-6"
        style={{
          background: "var(--amber-50)",
          color: "var(--amber-600)",
          border: "1px solid var(--amber-200)",
        }}
      >
        <span
          className="w-[7px] h-[7px] rounded-full animate-pulseDot"
          style={{ background: "var(--amber-400)" }}
        />
        {t.badge}
      </div>

      <h1
        className="font-extrabold leading-tight mb-4"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
        }}
      >
        <HeroTitle locale={locale} />
      </h1>

      <p
        className="text-[0.8rem] md:text-[0.95rem] tracking-wider uppercase mb-3.5 opacity-70"
        style={{ color: "var(--text-s)", fontFamily: "var(--font-mono)" }}
      >
        {t.heroSlogan}
      </p>

      <p
        className="text-[1rem] md:text-[1.15rem] max-w-[580px] mx-auto mb-8 leading-relaxed"
        style={{ color: "var(--text-s)" }}
      >
        {t.heroDesc}
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Link href="/generate" className="pf-btn pf-btn-primary pf-btn-xl">
          {t.heroCta}
        </Link>
        <button
          onClick={() =>
            document
              .querySelector(".showcase-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="pf-btn pf-btn-secondary pf-btn-xl"
        >
          {t.heroViewCases}
        </button>
      </div>

      <div
        className="inline-flex items-center justify-center gap-8 mt-10 px-6 py-4 flex-wrap"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
          borderRadius: "var(--radius-2xl)",
        }}
      >
        {[
          { value: "2M+", key: "mau" as const },
          { value: "600M+", key: "images" as const },
          { value: "4.95", key: "rating" as const },
          { value: "99.9%", key: "encryption" as const },
        ].map((stat) => (
          <div key={stat.key} className="text-center">
            <div
              className="text-[1.3rem] font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </div>
            <div className="text-[0.7rem]" style={{ color: "var(--text-t)" }}>
              {t.stats[stat.key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
