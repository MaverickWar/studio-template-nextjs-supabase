// Reads design/tokens.json (written by Universal App Studio) and turns it into the CSS variables
// the starter's components already use. Change the look in design/tokens.json, not here.
import tokens from "@/design/tokens.json";

type Tokens = {
  name?: string;
  color: Record<string, string>;
  font: { display: string; body: string };
  radius: Record<string, string>;
};
const t = tokens as Tokens;

/** "#2f6b55" → "158 39% 30%", the format the shadcn/ui variables expect. */
function hsl(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
function mix(a: string, b: string, w: number): string {
  const p = (x: string) => [0, 2, 4].map((i) => parseInt(x.replace("#", "").slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * w).toString(16).padStart(2, "0")).join("");
}

const c = t.color;
const border = mix(c.bg, c.text, 0.14);
const vars: Record<string, string> = {
  "--background": hsl(c.bg), "--foreground": hsl(c.text),
  "--card": hsl(c.surface), "--card-foreground": hsl(c.text),
  "--popover": hsl(c.bg), "--popover-foreground": hsl(c.text),
  "--primary": hsl(c.primary), "--primary-foreground": hsl(c["on-primary"]),
  "--secondary": hsl(c.surface), "--secondary-foreground": hsl(c.text),
  "--muted": hsl(c.surface), "--muted-foreground": hsl(c["text-muted"]),
  "--accent": hsl(c.accent), "--accent-foreground": hsl(c["on-accent"]),
  "--border": hsl(border), "--input": hsl(border), "--ring": hsl(c.primary),
  "--radius": t.radius.md,
  "--font-display": `'${t.font.display}', Georgia, serif`,
  "--font-body": `'${t.font.body}', system-ui, sans-serif`,
};

/** CSS for the root element, from the tokens. */
export const tokenCss = `:root{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(";")}}`;

/** The Google Fonts stylesheet for the two fonts in the tokens. */
export const fontsHref = `https://fonts.googleapis.com/css2?${[...new Set([t.font.display, t.font.body])]
  .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@400;600;700`).join("&")}&display=swap`;

export const projectName = t.name || "New project";
