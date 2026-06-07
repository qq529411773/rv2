"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "./home/i18n";
import { setLocale, useLocale, useT } from "./home/i18n";
import { MobileNav } from "./mobile-nav";

interface HeaderProps {
  user: any;
}

interface NavItem {
  label: string;
  href: string;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const [langOpen, setLangOpen] = useState(false);

  const t = useT("nav");
  const languages = [
    { code: "en" as Locale, label: "English", flag: "🇬🇧", hint: undefined },
    { code: "zh" as Locale, label: "中文", flag: "🇨🇳", hint: "简体" },
    { code: "es" as Locale, label: "Español", flag: "🇪🇸", hint: "LATAM" },
  ];

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0];
  const switchLang = (code: Locale) => {
    setLocale(code);
    setLangOpen(false);
  };

  // Init theme
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("pf-theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("pf-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  // Main navigation items
  const mainNavItems: NavItem[] = [
    { label: "🏠", href: "/" },
    { label: "✦", href: "/homes" },
    { label: "✦", href: "/generate" },
    { label: "▦", href: "/templates" },
    { label: "💎", href: "/product/about" },
  ];

  const dashboardItems: NavItem[] = [];
  const navItems = isDashboard ? dashboardItems : mainNavItems;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        borderBottom: "1px solid var(--border-color)",
        transition: "background 0.5s ease",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1440px",
          padding: "0 28px",
          height: "64px",
        }}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-extrabold text-[1.1rem] tracking-tight no-underline"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-p)",
            }}
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[0.8rem] text-white relative overflow-hidden shrink-0"
              style={{
                background: "var(--gradient-brand)",
                boxShadow: "0 2px 12px var(--brand-glow)",
              }}
            >
              <span className="relative z-[1]">✦</span>
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
                }}
              />
            </span>
            <span>PicFlow</span>
            <span
              className="hidden md:inline-block text-[0.65rem] font-medium font-mono tracking-wider pl-2"
              style={{
                color: "var(--text-t)",
                borderLeft: "1px solid var(--border-color)",
              }}
            >
              AI-Driven Image Creation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`pf-nav-btn${active ? " active" : ""}`}
                  style={active ? {} : { color: "var(--text-s)" }}
                >
                  <span>{item.label}</span>
                  <span className="nav-label">
                    {(() => {
                      const m: Record<string, keyof typeof t> = {
                        "/": "home",
                        "/home": "home",
                        "/generate": "generate",
                        "/templates": "templates",
                        "/product/about": "pricing",
                      };
                      return t[m[item.href] || "home"];
                    })()}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-[var(--radius-md)] border border-[var(--pf-border)] bg-[var(--bg-card)] text-[var(--text-s)] text-[0.95rem] flex items-center justify-center transition-all duration-250 hover:border-[var(--brand)] hover:text-[var(--brand)] hover:-translate-y-px"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "light" ? "🌙" : "☀️") : "🌙"}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              onBlur={() => setTimeout(() => setLangOpen(false), 200)}
              className="px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--pf-border)] bg-[var(--bg-card)] text-[0.78rem] font-medium text-[var(--text-s)] flex items-center gap-1 transition-all duration-250 hover:border-[var(--brand)] hover:text-[var(--brand)]"
              aria-label="Switch language"
            >
              🌐 {currentLang.label}
            </button>

            {langOpen && (
              <div
                className="absolute top-[calc(100%+6px)] right-0 min-w-[200px] p-1.5 z-50"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--pf-border)",
                  borderRadius: "var(--radius-xl)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLang(lang.code)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-[var(--radius-md)] text-[0.8rem] text-left transition-colors duration-150 hover:bg-[var(--bg-hover)] ${
                      lang.code === locale ? "font-semibold" : ""
                    }`}
                    style={{ color: "var(--text-p)" }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {lang.hint && (
                      <span
                        className="text-[0.68rem] ml-auto"
                        style={{ color: "var(--text-t)" }}
                      >
                        {lang.hint}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons — Desktop */}
          <div className="hidden md:flex items-center gap-1.5">
            {user ? (
              <>
                {!isDashboard && (
                  <>
                    <Link
                      href="/profile"
                      className="pf-btn pf-btn-secondary pf-btn-sm"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      className="pf-btn pf-btn-primary pf-btn-sm"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="pf-btn pf-btn-secondary pf-btn-sm"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="pf-btn pf-btn-secondary pf-btn-sm"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="pf-btn pf-btn-primary pf-btn-sm"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Nav */}
          <MobileNav
            items={navItems}
            user={user}
            isDashboard={isDashboard}
            t={t}
          />
        </div>
      </div>
    </header>
  );
}
