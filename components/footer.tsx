"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return (
      <footer
        style={{
          borderTop: "1px solid var(--border-color)",
          color: "var(--text-t)",
          fontSize: "0.75rem",
          padding: "16px 0",
        }}
      >
        <div
          className="mx-auto flex items-center justify-center text-[0.7rem]"
          style={{ maxWidth: "1440px", padding: "0 28px" }}
        >
          <span>&copy; {new Date().getFullYear()} PicFlow AI</span>
        </div>
      </footer>
    );
  }

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-color)",
        color: "var(--text-t)",
        fontSize: "0.75rem",
        marginTop: "48px",
        padding: "24px 0",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between flex-wrap gap-3"
        style={{ maxWidth: "1440px", padding: "0 28px" }}
      >
        <span>
          &copy; {new Date().getFullYear()} PicFlow AI &middot; AI-Driven Image Creation for Social &amp; E-commerce Scenarios
        </span>
        <div className="flex gap-4">
          <button className="hover:text-[var(--text-p)] transition-colors bg-transparent border-none cursor-pointer text-inherit text-[0.75rem]">Privacy</button>
          <button className="hover:text-[var(--text-p)] transition-colors bg-transparent border-none cursor-pointer text-inherit text-[0.75rem]">Terms</button>
          <button className="hover:text-[var(--text-p)] transition-colors bg-transparent border-none cursor-pointer text-inherit text-[0.75rem]">Contact</button>
          <button className="hover:text-[var(--text-p)] transition-colors bg-transparent border-none cursor-pointer text-inherit text-[0.75rem]">GDPR</button>
        </div>
      </div>
    </footer>
  );
}
