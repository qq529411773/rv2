import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { BackgroundEffects } from "@/components/home/BackgroundEffects";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { Toaster } from "@/components/ui/toaster";
import { createClient, hasSessionCookie } from "@/utils/supabase/server";
import { DM_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "PicFlow AI — AI-Driven Image Creation",
  description:
    "AI-Driven Image Creation for Social & E-commerce Scenarios. No registration needed. Unlimited free generation.",
  keywords:
    "AI image generation, social media images, e-commerce images, PicFlow",
  openGraph: {
    title: "PicFlow AI — AI-Driven Image Creation",
    description: "AI-Driven Image Creation for Social & E-commerce Scenarios.",
    type: "website",
    url: baseUrl,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Skip expensive Supabase `getUser()` API call when no session cookie exists.
  // This avoids a network round-trip for anonymous users (~80% of traffic).
  let user: any = null;
  if (await hasSessionCookie()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("pf-theme");(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))&&document.documentElement.setAttribute("data-theme","dark")})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        <BackgroundEffects />
        <ScrollReveal />
        <div className="relative z-10">
          <Header user={user} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
