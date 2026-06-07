import Link from "next/link";
import { Heart, Users, Globe, Sparkles } from "lucide-react";

export default function AboutPage() {
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
            Connecting Cultures Through Names
          </div>
          <h1 style={{ fontFamily: "var(--font-display)" }}>
            Bridging Cultures with{" "}
            <span className="highlight">Meaningful Chinese Names</span>
          </h1>
          <p className="mt-3 text-[1.05rem] max-w-[600px] mx-auto" style={{ color: "var(--text-s)" }}>
            We believe that a name is more than just words — it&apos;s a bridge between cultures,
            a reflection of identity, and a connection to the rich heritage of Chinese tradition.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {[
            { icon: Heart, title: "Our Mission", desc: "To help people from all backgrounds discover meaningful Chinese names that reflect their personality while honoring traditional Chinese naming conventions." },
            { icon: Users, title: "Our Community", desc: "We've helped thousands of people worldwide discover their perfect Chinese names, fostering cultural appreciation and personal connection." },
            { icon: Globe, title: "Global Impact", desc: "From students studying abroad to business professionals, our platform serves people seeking authentic cultural connection worldwide." },
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
            Our Story
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
              <p>
                Chinese Name Generator was born from a simple observation: in our increasingly
                connected world, many people desire meaningful connections to Chinese culture,
                but finding an authentic Chinese name that truly represents their identity can be challenging.
              </p>
              <p>
                Traditional Chinese naming is a beautiful art form that considers not just the sound
                of a name, but its meaning, cultural significance, and how it reflects the person&apos;s
                character and aspirations. Our advanced AI technology combines this ancient wisdom
                with modern personalization to create names that are both culturally authentic and personally meaningful.
              </p>
              <p>
                Whether you&apos;re a student preparing for study in China, a professional working with
                Chinese colleagues, or simply someone fascinated by Chinese culture, we&apos;re here to
                help you discover a name that truly represents who you are while honoring the rich
                traditions of Chinese naming conventions.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="reveal reveal-d2 mb-12">
          <h3
            className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Values
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { num: "1", title: "Cultural Authenticity", desc: "Every name we generate respects traditional Chinese naming conventions and cultural significance." },
              { num: "2", title: "Personal Meaning", desc: "We believe names should reflect who you are. Our AI considers your personality and preferences." },
              { num: "3", title: "Educational Value", desc: "Beyond just providing names, we help users understand the meaning and cultural context." },
              { num: "4", title: "Accessibility", desc: "We make Chinese name generation accessible to everyone, regardless of their background." },
            ].map((v) => (
              <div key={v.num} className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[0.8rem] font-bold shrink-0"
                  style={{ background: "var(--amber-50)", color: "var(--amber-600)" }}
                >
                  {v.num}
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
            Ready to Discover Your Chinese Name?
          </h3>
          <p className="text-[0.9rem] mb-5 max-w-[500px] mx-auto" style={{ color: "var(--text-s)" }}>
            Join thousands of others who have found their perfect Chinese name.
            Start your cultural journey today.
          </p>
          <Link href="/" className="pf-btn pf-btn-primary pf-btn-xl">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
