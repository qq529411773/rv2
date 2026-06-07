"use client";

interface UsageBadgeProps {
  usage: number;
  max: number;
}

export function UsageBadge({ usage, max }: UsageBadgeProps) {
  return (
    <span className="usage-badge">
      <span>{usage}</span> / {max}
    </span>
  );
}
