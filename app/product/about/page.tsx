import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pf-container" style={{ paddingTop: "48px" }}>
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="home-hero text-center mb-14 reveal">
          <h1 style={{ fontFamily: "var(--font-display)" }}>
            About <span className="highlight">ChineseName.club</span>
          </h1>
          <p className="mt-3 text-[1.05rem]" style={{ color: "var(--text-s)" }}>
            Connecting cultures through meaningful AI-generated Chinese names
          </p>
        </div>

        {/* Our Mission */}
        <Section title="Our Mission" delay="d1">
          <p>
            We believe that a name is more than just a way to address someone — it&apos;s a connection
            to culture, history, and identity. ChineseName.club helps people from around the world bridge
            cultural gaps by providing them with meaningful Chinese names that resonate with
            their personalities and preferences.
          </p>
          <p>
            Using advanced artificial intelligence technology, we analyze your personal traits, interests, and preferences
            to generate names that are not just phonetically pleasing but also carry deep cultural
            significance and positive meanings in Chinese tradition.
          </p>
        </Section>

        {/* How Our AI Works */}
        <Section title="How Our AI Works" delay="d2">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Input Analysis",
                desc: "Our AI analyzes your English name, gender preference, and personality traits to understand your unique characteristics.",
              },
              {
                step: 2,
                title: "Cultural Matching",
                desc: "Advanced algorithms match your profile with appropriate Chinese characters that carry positive meanings and cultural significance.",
              },
              {
                step: 3,
                title: "Name Generation",
                desc: "Generate multiple personalized Chinese names with detailed meanings, pronunciations, and cultural context.",
              },
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
                <h3 className="text-[1.05rem] font-bold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h3>
                <p className="text-[0.85rem] leading-relaxed" style={{ color: "var(--text-s)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Why Choose */}
        <Section title="Why Choose Chinese Names?" delay="d3">
          <p>
            In Chinese culture, names hold immense significance. They&apos;re carefully chosen to reflect
            aspirations, virtues, and qualities. A meaningful Chinese name can:
          </p>
          <ul className="space-y-2 mt-3" style={{ color: "var(--text-s)", fontSize: "0.95rem", lineHeight: "1.8" }}>
            <li>Help you connect more authentically with Chinese friends, colleagues, and communities</li>
            <li>Demonstrate respect and appreciation for Chinese culture and traditions</li>
            <li>Make your experience in China or with Chinese speakers more immersive and personal</li>
            <li>Provide you with a unique perspective on your identity and cultural connections</li>
            <li>Enhance your language learning journey if you&apos;re studying Chinese</li>
            <li>Create meaningful connections in business and personal relationships</li>
          </ul>
        </Section>

        {/* Service Options */}
        <Section title="Service Options" delay="d4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Free Version",
                tag: "Free",
                tagStyle: { background: "var(--n-100)", color: "var(--text-s)" },
                desc: "Get started with our basic Chinese name generation service. Perfect for exploring what a Chinese name might mean for you.",
                items: ["Limited daily name generations", "Basic name meanings", "Standard pronunciation guides", "No account required"],
              },
              {
                title: "Premium Version",
                tag: "Paid",
                tagStyle: { background: "var(--amber-500)", color: "#fff" },
                featured: true,
                desc: "Unlock the full potential of our AI with unlimited access and advanced features for the most meaningful name experience.",
                items: ["Unlimited name generations", "Detailed cultural meanings", "Advanced pronunciation guides", "Character analysis & etymology", "Priority customer support", "Export and save functionality"],
              },
            ].map((plan) => (
              <div
                key={plan.title}
                className="reveal"
                style={{
                  background: plan.featured ? "var(--amber-50)" : "var(--bg-card)",
                  border: plan.featured ? "1px solid var(--amber-200)" : "1px solid var(--border-color, rgba(0,0,0,0.06))",
                  borderRadius: "var(--radius-xl)",
                  padding: "28px 24px",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[1.2rem] font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {plan.title}
                  </h3>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold"
                    style={plan.tagStyle}
                  >
                    {plan.tag}
                  </span>
                </div>
                <p className="text-[0.85rem] mb-3" style={{ color: "var(--text-s)" }}>
                  {plan.desc}
                </p>
                <ul className="space-y-1.5" style={{ color: "var(--text-s)", fontSize: "0.82rem" }}>
                  {plan.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: "var(--amber-500)", fontWeight: 700 }}>&#10003;</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact & Support" delay="d1">
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
              borderRadius: "var(--radius-xl)",
              padding: "28px 24px",
            }}
          >
            <p className="text-[0.95rem] mb-5" style={{ color: "var(--text-s)" }}>
              Have questions about our AI Chinese name generator or need assistance? Our team is here to help.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-[0.88rem] font-semibold mb-2">Get in Touch</h4>
                <div className="space-y-1.5" style={{ fontSize: "0.85rem", color: "var(--text-s)" }}>
                  <div>
                    <span style={{ color: "var(--amber-600)", fontWeight: 600 }}>Email: </span>
                    <a href="mailto:support@chinesename.club" style={{ color: "var(--amber-600)", textDecoration: "underline" }}>
                      support@chinesename.club
                    </a>
                  </div>
                  <div>
                    <span style={{ color: "var(--amber-600)", fontWeight: 600 }}>Website: </span>
                    <a href="https://chinesename.club" style={{ color: "var(--amber-600)", textDecoration: "underline" }}>
                      chinesename.club
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[0.88rem] font-semibold mb-2">Quick Links</h4>
                <div className="space-y-1.5" style={{ fontSize: "0.85rem" }}>
                  <div>
                    <Link href="/privacy" className="hover:text-[var(--amber-600)]" style={{ color: "var(--text-s)", transition: "color 0.2s" }}>
                      Privacy Policy
                    </Link>
                  </div>
                  <div>
                    <Link href="/terms" className="hover:text-[var(--amber-600)]" style={{ color: "var(--text-s)", transition: "color 0.2s" }}>
                      Terms of Use
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
            Generate Your Chinese Name Now
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
    <section className={`reveal${delay ? " reveal-" + delay : ""}`} style={{ marginBottom: "48px" }}>
      <h2
        className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mb-5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div style={{ color: "var(--text-s)", fontSize: "0.95rem", lineHeight: "1.75" }}>
        {children}
      </div>
    </section>
  );
}
