"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
      style={{
        fontFamily: "var(--font-display)",
        color: "var(--text-p)",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Something went wrong</h2>
      <p style={{ color: "var(--text-s)", fontSize: "0.9rem" }}>
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={reset}
        className="px-5 py-2 rounded-[var(--radius-md)] text-sm font-semibold text-white cursor-pointer"
        style={{
          background: "var(--gradient-brand)",
          border: "none",
        }}
      >
        Try again
      </button>
    </div>
  );
}
