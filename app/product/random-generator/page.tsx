"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import RandomNameGenerator from "@/components/product/random/random-name-generator";

export default function RandomNameGeneratorPage() {
  const router = useRouter();

  return (
    <div>
      {/* Header */}
      <div className="pf-header sticky top-0 z-40" style={{ height: "56px" }}>
        <div className="pf-header-inner" style={{ height: "56px" }}>
          <button
            onClick={() => router.push("/")}
            className="pf-btn pf-btn-secondary pf-btn-sm"
            style={{ gap: "6px" }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <div style={{ textAlign: "center", flex: 1 }}>
            <span className="text-[1rem] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              Random Name Generator
            </span>
          </div>
          <div style={{ width: "80px" }} />
        </div>
      </div>

      <div className="pf-container" style={{ paddingTop: "32px" }}>
        <div className="text-center mb-6">
          <p className="text-[0.9rem]" style={{ color: "var(--text-s)" }}>
            Generate beautiful Chinese names instantly
          </p>
        </div>
        <RandomNameGenerator />
      </div>
    </div>
  );
}
