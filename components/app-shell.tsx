// The frame every page sits in: header with the app's name and menu, a phone menu, and the footer.
// Pages and labels come from design/app-shell.json; colours and fonts from design/tokens.json.
import Link from "next/link";
import { Suspense } from "react";
import { appShell, menuPages } from "@/lib/app-shell";
import { hasEnvVars } from "@/lib/utils";
import { AuthButton } from "./auth-button";
import { NavLinks } from "./nav-links";

function Account() {
  if (!appShell.signIn) return null;
  if (!hasEnvVars) return null;
  return <Suspense><AuthButton /></Suspense>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const side = appShell.nav === "side";
  return (
    <div className={side ? "min-h-screen md:grid md:grid-cols-[240px_1fr]" : "min-h-screen flex flex-col"}>
      <header className={side
        ? "border-b md:border-b-0 md:border-r bg-card md:min-h-screen"
        : "border-b bg-background/95 sticky top-0 z-30 backdrop-blur"}>
        <div className={side
          ? "flex md:flex-col md:items-stretch items-center justify-between gap-4 p-4 md:sticky md:top-0"
          : "mx-auto w-full max-w-6xl flex items-center justify-between gap-4 px-4 h-16"}>
          <Link href="/" className="font-display text-lg font-bold tracking-tight truncate">{appShell.name}</Link>
          <NavLinks pages={menuPages} side={side} />
          <div className={side ? "hidden md:block md:mt-auto" : "hidden md:block"}><Account /></div>
        </div>
      </header>
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 w-full mx-auto max-w-6xl px-4 py-8 md:py-12">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-muted-foreground">
            <span>{appShell.footer || `© ${appShell.name}`}</span>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
              {menuPages.map((p) => <Link key={p.route} href={p.route} className="hover:text-foreground">{p.name}</Link>)}
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
