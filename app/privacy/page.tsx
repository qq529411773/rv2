import Link from "next/link";
import { Shield, Database, Globe } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="pf-container" style={{ paddingTop: "48px" }}>
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="home-hero text-center mb-14 reveal">
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[0.78rem] font-semibold mb-5"
            style={{ background: "var(--amber-50)", color: "var(--amber-600)", border: "1px solid var(--amber-200)" }}
          >
            <Shield size={14} />
            Your Privacy Matters
          </div>
          <h1 style={{ fontFamily: "var(--font-display)" }}>Privacy Policy</h1>
          <p className="mt-3 text-[1.05rem] max-w-[600px] mx-auto" style={{ color: "var(--text-s)" }}>
            We are committed to protecting your privacy and being transparent about how we
            collect, use, and protect your personal information.
          </p>
          <p className="mt-2 text-[0.78rem]" style={{ color: "var(--text-t)" }}>
            Last updated: January 31, 2025
          </p>
        </div>

        {/* Principles */}
        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {[
            { emoji: "🔍", title: "Transparency", desc: "We clearly explain what data we collect and how we use it to provide the best experience." },
            { emoji: "🔒", title: "Security", desc: "Your personal information is protected with industry-standard security measures and encryption." },
            { emoji: "✅", title: "Control", desc: "You have full control over your data, including the ability to access, update, or delete it." },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-d${i + 1}`}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
                borderRadius: "var(--radius-xl)",
                padding: "28px 24px",
              }}
            >
              <div className="text-[1.6rem] mb-3">{item.emoji}</div>
              <h3 className="text-[0.95rem] font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
              <p className="text-[0.82rem] leading-relaxed" style={{ color: "var(--text-s)" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Content sections */}
        <ContentBlock icon={Database} title="Information We Collect" delay="d1">
          <h4 className="font-semibold mb-2">Information You Provide</h4>
          <ul>
            <li><strong>Personal Details:</strong> English name, gender, birth year (optional)</li>
            <li><strong>Preferences:</strong> Personality traits and name preferences you share</li>
            <li><strong>Account Information:</strong> Email address when you create an account</li>
            <li><strong>Generated Names:</strong> Chinese names you generate and save to your profile</li>
          </ul>
          <h4 className="font-semibold mb-2 mt-4">Information We Collect Automatically</h4>
          <ul>
            <li><strong>Usage Data:</strong> How you interact with our service</li>
            <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
            <li><strong>Cookies:</strong> To improve your experience and remember preferences</li>
          </ul>
        </ContentBlock>

        <ContentBlock title="How We Use Your Information" delay="d2">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Service Provision</h4>
              <ul>
                <li>Generate personalized Chinese names</li>
                <li>Save your generated names and preferences</li>
                <li>Provide customer support</li>
                <li>Process payments for premium features</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Service Improvement</h4>
              <ul>
                <li>Analyze service usage to improve functionality</li>
                <li>Develop new features and capabilities</li>
                <li>Ensure service security and prevent fraud</li>
                <li>Send service-related communications</li>
              </ul>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock icon={Globe} title="Information Sharing" delay="d3">
          <p>
            <strong>We do not sell your personal information.</strong> We may share your information only
            in these limited circumstances:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Trusted third parties who help us operate our service</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
            <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
          </ul>
        </ContentBlock>

        <ContentBlock title="Your Rights and Choices" delay="d4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Access and Control</h4>
              <ul>
                <li>Access your personal information</li>
                <li>Update or correct your data</li>
                <li>Delete your account and data</li>
                <li>Download your data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Communication Preferences</h4>
              <ul>
                <li>Opt out of marketing communications</li>
                <li>Manage cookie preferences</li>
                <li>Control data processing</li>
                <li>Request data portability</li>
              </ul>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock title="Data Security & Retention" delay="d1">
          <p>We implement appropriate technical and organizational measures to protect your personal information.</p>
          <div className="grid gap-4 md:grid-cols-2 mt-3">
            <div>
              <h4 className="font-semibold mb-1">Security Measures</h4>
              <ul>
                <li>Encryption in transit and at rest</li>
                <li>Regular security audits</li>
                <li>Access controls and monitoring</li>
                <li>Secure data centers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Data Retention</h4>
              <ul>
                <li>Account data: Until account deletion</li>
                <li>Generated names: Until you delete them</li>
                <li>Usage logs: Up to 2 years</li>
                <li>Marketing data: Until opt-out</li>
              </ul>
            </div>
          </div>
        </ContentBlock>

        {/* CTA */}
        <div
          className="reveal reveal-d2 text-center mb-8"
          style={{
            background: "var(--amber-50)",
            border: "1px solid var(--amber-200)",
            borderRadius: "var(--radius-xl)",
            padding: "40px 24px",
          }}
        >
          <h3 className="text-[1.4rem] font-extrabold mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Questions About Privacy?
          </h3>
          <p className="text-[0.9rem] mb-5 max-w-[500px] mx-auto" style={{ color: "var(--text-s)" }}>
            We&apos;re here to help and ensure your privacy is protected.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="pf-btn pf-btn-secondary pf-btn-xl">Contact Us</Link>
            <Link href="/" className="pf-btn pf-btn-primary pf-btn-xl">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentBlock({
  title,
  children,
  icon: Icon,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  delay?: string;
}) {
  return (
    <section className={`reveal${delay ? " reveal-" + delay : ""} mb-10`}>
      <h3
        className="text-[clamp(1.3rem,2.5vw,1.6rem)] font-extrabold tracking-tight mb-4 flex items-center gap-2.5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {Icon && <Icon size={20} style={{ color: "var(--amber-500)" }} />}
        {title}
      </h3>
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color, rgba(0,0,0,0.06))",
          borderRadius: "var(--radius-xl)",
          padding: "28px 24px",
          color: "var(--text-s)",
          fontSize: "0.88rem",
          lineHeight: "1.75",
        }}
      >
        {children}
        <style>{`
          section p { margin-bottom: 0.75rem; }
          section p:last-child { margin-bottom: 0; }
          section ul { padding-left: 0; list-style: none; }
          section ul li { padding: 2px 0; }
          section ul li::before { content: "• "; color: var(--amber-500); font-weight: 700; }
        `}</style>
      </div>
    </section>
  );
}
