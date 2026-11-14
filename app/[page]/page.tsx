// A page from the app map that hasn't been built yet. It's in the menu and opens, so the app works from
// day one; building the page means adding app/<page>/page.tsx, which takes over from this.
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ComingNext } from "@/components/coming-next";
import { appShell, pageAt } from "@/lib/app-shell";

export function generateStaticParams() {
  const pages = appShell.pages.filter((p) => p.route !== "/" && !p.route.slice(1).includes("/")).map((p) => ({ page: p.route.slice(1) }));
  // Next.js needs at least one; a project with only a home page gets a name no page uses (it shows "not found").
  return pages.length ? pages : [{ page: "_none" }];
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const p = pageAt("/" + (await params).page);
  return { title: p ? `${p.name} · ${appShell.name}` : appShell.name };
}

export default async function NotBuiltYet({ params }: { params: Promise<{ page: string }> }) {
  const p = pageAt("/" + (await params).page);
  if (!p) notFound();
  return <ComingNext name={p.name} purpose={p.purpose} />;
}
