// The home page until it's built to its design. Building it means replacing this file.
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { ComingNext } from "@/components/coming-next";
import { appShell, pageAt } from "@/lib/app-shell";
import { hasEnvVars } from "@/lib/utils";

export default function Home() {
  const home = pageAt("/");
  return (
    <div className="flex flex-col gap-10">
      <ComingNext name={home?.name && home.name !== "Home" ? home.name : appShell.name} purpose={appShell.tagline || home?.purpose} />
      {!hasEnvVars && (
        <section className="rounded-lg border bg-card p-6 max-w-2xl flex flex-col gap-4">
          <h2 className="text-xl font-bold">Connect Supabase</h2>
          <ConnectSupabaseSteps />
        </section>
      )}
    </div>
  );
}
