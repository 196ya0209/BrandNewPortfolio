import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getThemeFromCookie, type Theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "BrandNewPortfolio",
  description: "A dual-mode portfolio platform with professional and playful themes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get theme from cookie server-side to prevent flash
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const theme: Theme = getThemeFromCookie(cookieHeader) || 'professional';

  return (
    <html lang="en" data-theme={theme}>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider initialTheme={theme}>
          <Header />
          <main id="main-content" className="pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
