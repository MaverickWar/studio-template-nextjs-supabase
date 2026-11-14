"use client";
// The menu: links across the top (or down the side) on a computer, and a menu button on a phone.
// The page you're on is marked for screen readers and shown in the primary colour.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { ShellPage } from "@/lib/app-shell";

export function NavLinks({ pages, side }: { pages: ShellPage[]; side: boolean }) {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  const on = (r: string) => (r === "/" ? path === "/" : path === r || path.startsWith(r + "/"));
  const link = (p: ShellPage, big = false) => (
    <Link key={p.route} href={p.route} aria-current={on(p.route) ? "page" : undefined}
      className={`rounded-md px-3 ${big ? "py-3 text-base" : "py-2 text-sm"} font-medium transition-colors hover:bg-muted ${on(p.route) ? "text-primary" : "text-foreground/80"}`}>
      {p.name}
    </Link>
  );
  return (
    <>
      <nav aria-label="Main" className={side ? "hidden md:flex md:flex-col gap-1" : "hidden md:flex items-center gap-1"}>
        {pages.map((p) => link(p))}
      </nav>
      <button type="button" className="md:hidden inline-flex items-center justify-center rounded-md h-11 w-11 hover:bg-muted"
        aria-expanded={open} aria-controls="phone-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      {open && (
        <nav id="phone-menu" aria-label="Main" className="md:hidden fixed inset-x-0 top-16 z-40 border-b bg-background shadow-lg">
          <div className="flex flex-col p-3">{pages.map((p) => link(p, true))}</div>
        </nav>
      )}
    </>
  );
}
