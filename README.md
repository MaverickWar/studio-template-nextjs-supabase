# Studio template: Next.js + Supabase

The starter Universal App Studio copies when someone picks **Next.js + Supabase** while setting up a new project.

It's the official Next.js [with-supabase example](https://github.com/vercel/next.js/tree/canary/examples/with-supabase) (sign-in, sign-up, password reset and a protected page, with shadcn/ui components), plus one change: **the look comes from `design/tokens.json`**.

- `design/tokens.json` holds the colours, fonts and corner radius. Studio replaces it with the project's own design straight after copying this template.
- `lib/design-tokens.ts` turns those tokens into the CSS variables the components already use, and loads the two fonts.
- Change the look by editing `design/tokens.json`, never by hard-coding colours.

**The menu, header and footer come from `design/app-shell.json`.** Studio writes it from the project's app map: the app's name, every page (name, web address, whether it's in the menu, what it's for), menu position (`top` or `side`) and the footer line.

- `components/app-shell.tsx` and `components/nav-links.tsx` are the frame every page sits in, with a phone menu.
- A page in `app-shell.json` that hasn't been built yet still opens, showing "Coming next" (`app/[page]/page.tsx`). Building it means adding `app/<page>/page.tsx`, which takes over.
- Add, rename or reorder pages in `design/app-shell.json`, not in the components.

## Running it

```
npm install
cp .env.example .env.local   # then add your Supabase project URL and publishable key
npm run dev
```

Open http://localhost:3000.

## Checks

```
npm run lint
npm run build
```
