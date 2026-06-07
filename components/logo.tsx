import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <div className="flex items-center justify-center">
        <Image
          src="/images/chinesename-logo.png"
          alt="ChineseName.club Logo"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </div>
      <span className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
        ChineseName.club
      </span>
    </Link>
  );
}
