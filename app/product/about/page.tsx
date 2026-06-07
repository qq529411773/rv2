"use client";

import { useT } from "@/components/home/i18n";
import Link from "next/link";

export default function AboutPage() {
  const t = useT("about").productAbout;

  return (
    <div className="pf-container" style={{ paddingTop: "48px" }}>
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="home-hero text-center mb-14 reveal">
          <h1 style={{ fontFamily: "var(--font-display)" }}>
            {(() => {
              const parts = t.heroTitle.split("ChineseName.club");
              return (
                <>
                  {parts[0]}
                  <span className="highlight">ChineseName.club</span>
                  {parts[1] || ""}
                </>
              );
            })()}
          </h1>
          <p className="mt-3 text-[1.05rem]" style={{ color: "var(--text-s)" }}>
            {t.heroSubtitle}
          </p>
        </div>

        {/* Our Mission */}
        <Section title={t.ourMission.title} delay="d1">
          <p>{t.ourMission.p1}</p>
          <p>{t.ourMission.p2}</p>
        </Section>

        {/* How Our AI Works */}
        <Section title={t.howItWorks.title} delay="d2">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { step: 1, ...t.howItWorks.step1 },
              { step: 2, ...t.howItWorks.step2 },
              { step: 3, ...t.howItWorks.step3 },
            ].map((item) => (
              <div
                key={item.step}
                className="reveal reveal-d3"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
                  borderRadius: "var(--radius-xl)",
                  padding: "28px 24px",
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[1rem] font-extrabold mb-4"
                  style={{
                    background: "var(--amber-50)",
                    color: "var(--amber-600)",
                  }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-[1.05rem] font-bold mb-1.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[0.85rem] leading-relaxed"
                  style={{ color: "var(--text-s)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Why Choose */}
        <Section title={t.whyChoose.title} delay="d3">
          <p>{t.whyChoose.p1}</p>
          <ul
            className="space-y-2 mt-3"
            style={{
              color: "var(--text-s)",
              fontSize: "0.95rem",
              lineHeight: "1.8",
            }}
          >
            {t.whyChoose.items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        {/* Service Options */}
        <Section title={t.serviceOptions.title} delay="d4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                ...t.serviceOptions.free,
                tagStyle: {
                  background: "var(--n-100)",
                  color: "var(--text-s)",
                },
              },
              {
                ...t.serviceOptions.premium,
                tagStyle: { background: "var(--amber-500)", color: "#fff" },
                featured: true,
              },
            ].map((plan) => (
              <div
                key={plan.title}
                className="reveal"
                style={{
                  background: (plan as any).featured
                    ? "var(--amber-50)"
                    : "var(--bg-card)",
                  border: (plan as any).featured
                    ? "1px solid var(--amber-200)"
                    : "1px solid var(--border-color, rgba(0,0,0,0.06))",
                  borderRadius: "var(--radius-xl)",
                  padding: "28px 24px",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-[1.2rem] font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.title}
                  </h3>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold"
                    style={(plan as any).tagStyle}
                  >
                    {plan.tag}
                  </span>
                </div>
                <p
                  className="text-[0.85rem] mb-3"
                  style={{ color: "var(--text-s)" }}
                >
                  {plan.desc}
                </p>
                <ul
                  className="space-y-1.5"
                  style={{ color: "var(--text-s)", fontSize: "0.82rem" }}
                >
                  {plan.items.map((it: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        style={{ color: "var(--amber-500)", fontWeight: 700 }}
                      >
                        &#10003;
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section title={t.contact.title} delay="d1">
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
              borderRadius: "var(--radius-xl)",
              padding: "28px 24px",
            }}
          >
            <p
              className="text-[0.95rem] mb-5"
              style={{ color: "var(--text-s)" }}
            >
              {t.contact.desc}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-[0.88rem] font-semibold mb-2">
                  {t.contact.getInTouch}
                </h4>
                <div
                  className="space-y-1.5"
                  style={{ fontSize: "0.85rem", color: "var(--text-s)" }}
                >
                  <div>
                    <span
                      style={{ color: "var(--amber-600)", fontWeight: 600 }}
                    >
                      {t.contact.email}{" "}
                    </span>
                    <a
                      href="mailto:support@chinesename.club"
                      style={{
                        color: "var(--amber-600)",
                        textDecoration: "underline",
                      }}
                    >
                      support@chinesename.club
                    </a>
                  </div>
                  <div>
                    <span
                      style={{ color: "var(--amber-600)", fontWeight: 600 }}
                    >
                      {t.contact.website}{" "}
                    </span>
                    <a
                      href="https://chinesename.club"
                      style={{
                        color: "var(--amber-600)",
                        textDecoration: "underline",
                      }}
                    >
                      chinesename.club
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[0.88rem] font-semibold mb-2">
                  {t.contact.quickLinks}
                </h4>
                <div className="space-y-1.5" style={{ fontSize: "0.85rem" }}>
                  <div>
                    <Link
                      href="/privacy"
                      className="hover:text-[var(--amber-600)]"
                      style={{
                        color: "var(--text-s)",
                        transition: "color 0.2s",
                      }}
                    >
                      {t.contact.privacy}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/terms"
                      className="hover:text-[var(--amber-600)]"
                      style={{
                        color: "var(--text-s)",
                        transition: "color 0.2s",
                      }}
                    >
                      {t.contact.terms}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <div className="flex justify-center pt-4 pb-12">
          <Link href="/" className="pf-btn pf-btn-primary pf-btn-xl">
            {t.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay?: string;
}) {
  return (
    <section
      className={`reveal${delay ? " reveal-" + delay : ""}`}
      style={{ marginBottom: "48px" }}
    >
      <h2
        className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mb-5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div
        style={{
          color: "var(--text-s)",
          fontSize: "0.95rem",
          lineHeight: "1.75",
        }}
      >
        {children}
      </div>
    </section>
  );
}
