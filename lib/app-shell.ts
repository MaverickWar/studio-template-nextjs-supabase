// Reads design/app-shell.json (written by Universal App Studio from the project's app map): the app's
// name, its pages and which ones are in the menu, where the menu sits, and the footer line. The menu,
// header, footer and the "coming next" pages all come from here, so the app works from day one.
// Add, rename or reorder pages in design/app-shell.json, not here.
import shell from "@/design/app-shell.json";

export type ShellPage = { name: string; route: string; menu?: boolean; purpose?: string };
export type Shell = { name: string; tagline?: string; nav?: "top" | "side"; pages: ShellPage[]; footer?: string; signIn?: boolean };

const s = shell as Shell;
const clean = (r: string) => "/" + String(r || "").replace(/^\/+|\/+$/g, "");

export const appShell: Required<Shell> = {
  name: s.name || "New project",
  tagline: s.tagline || "",
  nav: s.nav === "side" ? "side" : "top",
  pages: (s.pages || []).filter((p) => p && p.name && typeof p.route === "string").map((p) => ({ ...p, route: clean(p.route) })),
  footer: s.footer || "",
  signIn: s.signIn !== false,
};

/** The pages in the menu, in order. */
export const menuPages = appShell.pages.filter((p) => p.menu !== false);

/** A page by its web address ("/menu"), for the placeholder of a page not built yet. */
export function pageAt(route: string): ShellPage | undefined {
  return appShell.pages.find((p) => p.route === clean(route));
}
