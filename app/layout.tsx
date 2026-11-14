import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { fontsHref, tokenCss } from "@/lib/design-tokens";
import { appShell } from "@/lib/app-shell";
import { AppShell } from "@/components/app-shell";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: appShell.name,
  description: appShell.tagline || appShell.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Colours, fonts and corners come from design/tokens.json */}
        <link rel="stylesheet" href={fontsHref} />
        <style dangerouslySetInnerHTML={{ __html: tokenCss }} />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* The menu, header and footer come from design/app-shell.json */}
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
