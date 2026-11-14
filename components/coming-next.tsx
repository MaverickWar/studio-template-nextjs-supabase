// What a page shows until it's built: its name and what it's for, styled like the rest of the app.
export function ComingNext({ name, purpose }: { name: string; purpose?: string }) {
  return (
    <section className="flex flex-col gap-4 py-10">
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">Coming next</span>
      <h1 className="font-display text-4xl font-bold tracking-tight">{name}</h1>
      {purpose && <p className="text-lg text-muted-foreground max-w-2xl">{purpose}</p>}
      <div className="mt-4 rounded-lg border border-dashed bg-card p-6 text-muted-foreground max-w-2xl">
        This page is planned and will be built soon.
      </div>
    </section>
  );
}
