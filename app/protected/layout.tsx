// Pages only signed-in people can see. The menu, header and footer come from the app shell (app/layout.tsx).
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 w-full flex flex-col gap-12">{children}</div>;
}
