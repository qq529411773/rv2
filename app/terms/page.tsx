import Link from "next/link";
import { Scale, FileText, AlertTriangle, CheckCircle, XCircle, Users } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pf-container" style={{ paddingTop: "48px" }}>
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="home-hero text-center mb-14 reveal">
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[0.78rem] font-semibold mb-5"
            style={{ background: "var(--amber-50)", color: "var(--amber-600)", border: "1px solid var(--amber-200)" }}
          >
            <Scale size={14} />
            Legal Terms
          </div>
          <h1 style={{ fontFamily: "var(--font-display)" }}>Terms of Service</h1>
          <p className="mt-3 text-[1.05rem] max-w-[600px] mx-auto" style={{ color: "var(--text-s)" }}>
            These terms govern your use of our Chinese name generation service.
            By using our service, you agree to these terms and conditions.
          </p>
          <p className="mt-2 text-[0.78rem]" style={{ color: "var(--text-t)" }}>
            Last updated: January 31, 2025
          </p>
        </div>

        {/* Key Points */}
        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {[
            { icon: CheckCircle, color: "#22c55e", bg: "#dcfce7", title: "What You Can Do", desc: "Use our service to generate Chinese names, save your favorites, and share with others." },
            { icon: XCircle, color: "#ef4444", bg: "#fce4ec", title: "What You Cannot Do", desc: "Misuse our service, violate others' rights, or use generated names for illegal purposes." },
            { icon: Users, color: "#6366f1", bg: "#eef2ff", title: "Our Commitment", desc: "Provide reliable service, protect your privacy, and maintain quality name generation." },
          ].map(({ icon: Icon, color, bg, title, desc }, i) => (
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
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: bg, color }}>
                <Icon size={20} />
              </div>
              <h3 className="text-[0.95rem] font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="text-[0.82rem] leading-relaxed" style={{ color: "var(--text-s)" }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Content sections */}
        <ContentBlock icon={FileText} title="Our Service" delay="d1">
          <p>
            Chinese Name Generator is an AI-powered platform that creates personalized Chinese names based on
            your preferences, personality traits, and cultural considerations. Our service includes:
          </p>
          <ul>
            <li><strong>Free Generation:</strong> Limited daily name generation for non-registered users</li>
            <li><strong>Premium Features:</strong> Unlimited generation, personalized matching, and name saving</li>
            <li><strong>Cultural Education:</strong> Detailed meanings, pronunciations, and cultural context</li>
            <li><strong>Personal Collections:</strong> Save and manage your favorite generated names</li>
          </ul>
        </ContentBlock>

        <ContentBlock title="Your Responsibilities" delay="d2">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: "#22c55e" }}>Acceptable Use</h4>
              <ul>
                <li>Use the service for personal, educational, or cultural purposes</li>
                <li>Provide accurate information when creating an account</li>
                <li>Respect intellectual property rights</li>
                <li>Keep your account credentials secure</li>
                <li>Report any technical issues or misuse</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2" style={{ color: "#ef4444" }}>Prohibited Activities</h4>
              <ul>
                <li>Using generated names for fraudulent purposes</li>
                <li>Attempting to reverse-engineer our algorithms</li>
                <li>Sharing account credentials with others</li>
                <li>Using automated tools to bulk-generate names</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock title="Intellectual Property" delay="d3">
          <h4 className="font-semibold mb-2">Your Rights to Generated Names</h4>
          <p>
            You have the right to use any Chinese names generated through our service for personal purposes.
            However, traditional Chinese names are part of cultural heritage and cannot be exclusively owned.
          </p>
          <h4 className="font-semibold mb-2 mt-4">Our Intellectual Property</h4>
          <p>
            The Chinese Name Generator platform, including our AI algorithms, website design, brand elements,
            and proprietary technology, remains our intellectual property.
          </p>
        </ContentBlock>

        <ContentBlock icon={AlertTriangle} title="Service Availability & Disclaimers" delay="d4">
          <h4 className="font-semibold mb-2">Service Availability</h4>
          <p>While we strive to maintain 24/7 service availability, we cannot guarantee uninterrupted access.</p>
          <h4 className="font-semibold mb-2 mt-4">AI-Generated Content</h4>
          <p>Our Chinese names are generated by AI technology. We recommend consulting with native speakers for important use cases.</p>
          <h4 className="font-semibold mb-2 mt-4">No Warranties</h4>
          <p>Our service is provided &ldquo;as is&rdquo; without warranties of any kind.</p>
        </ContentBlock>

        <ContentBlock title="Payment & Subscription" delay="d1">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Premium Subscriptions</h4>
              <ul>
                <li>Monthly and annual subscription options available</li>
                <li>Automatic renewal unless cancelled</li>
                <li>Access to unlimited name generation</li>
                <li>Premium features and personalization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cancellation & Refunds</h4>
              <ul>
                <li>Cancel anytime through your account settings</li>
                <li>Refunds processed according to our refund policy</li>
                <li>No refunds for partially used subscription periods</li>
                <li>Free trial cancellations take effect immediately</li>
              </ul>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock title="Changes to These Terms" delay="d2">
          <ul>
            <li>We will update the &ldquo;Last updated&rdquo; date at the top of this page</li>
            <li>For significant changes, we will notify users via email or service notifications</li>
            <li>Continued use of our service after changes constitutes acceptance of new terms</li>
            <li>You can always find the current version of our terms on this page</li>
          </ul>
        </ContentBlock>

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
            Questions About These Terms?
          </h3>
          <p className="text-[0.9rem] mb-5 max-w-[500px] mx-auto" style={{ color: "var(--text-s)" }}>
            We&apos;re here to help ensure you understand and can comply with these terms.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="pf-btn pf-btn-secondary pf-btn-xl">Contact Support</Link>
            <Link href="/" className="pf-btn pf-btn-primary pf-btn-xl">Start Using Service</Link>
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
