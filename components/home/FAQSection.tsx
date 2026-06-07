"use client";

import { useState } from "react";
import { useT } from "./i18n";

const faqItems = [
  { q: "Is PicFlow AI really completely free?", a: "Yes! PicFlow AI is currently completely free — no registration, no credit card required, no generation limits. We believe high-quality AI image tools should be accessible to everyone." },
  { q: "Can I use the generated images commercially?", a: "Yes. All images you generate with PicFlow AI belong to you and can be used freely for commercial purposes, including e-commerce displays, social media, and advertising." },
  { q: "What languages are supported?", a: "We support Chinese, English, Español, Português, Bahasa, Tiếng Việt, ไทย, Français, Deutsch and more. Our AI model excels at multilingual understanding." },
  { q: "Is my data secure?", a: "We strictly adhere to a 'zero data retention' policy. Your prompts and generated images are not saved on our servers. We comply with GDPR and ISO 27001 standards." },
  { q: "What's planned for the future?", a: "We plan to continuously iterate our AI models, enhance the user interface, add more creative features, and always maintain free service. Stay tuned!" },
];

export function FAQSection() {
  const t = useT("home");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-5 pb-10">
      <div className="text-center mb-9 reveal">
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-tight mb-2" style={{ fontFamily: "var(--font-display)" }}>{t.faq.title}</h2>
        <p style={{ color: "var(--text-s)", fontSize: "0.95rem" }}>{t.faq.subtitle}</p>
      </div>
      <div className="max-w-[640px] mx-auto space-y-[10px] relative z-10">
        {faqItems.map((item, i) => (
          <div key={i} className={`reveal reveal-d${(i % 4) + 1} faq-item overflow-hidden transition-all duration-300 ${openIndex === i ? "open" : ""}`}
            style={{ border: "1px solid var(--border-color, rgba(0,0,0,0.06))", borderRadius: "var(--radius-lg)" }}>
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-[18px] py-3.5 text-[0.88rem] font-semibold text-left flex items-center justify-between gap-2.5 transition-colors duration-200 hover:text-[var(--amber-600)]"
              style={{ color: "var(--text-p)", background: "none" }}>
              <span>{item.q}</span>
              <span className="text-[0.75rem] shrink-0 transition-transform duration-300"
                style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
            </button>
            <div className="overflow-hidden transition-all duration-350"
              style={{ maxHeight: openIndex === i ? "200px" : "0", padding: openIndex === i ? "0 18px 16px" : "0 18px", fontSize: "0.83rem", color: "var(--text-s)", lineHeight: "1.7" }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
