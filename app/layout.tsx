import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { BackgroundEffects } from "@/components/home/BackgroundEffects";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
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
