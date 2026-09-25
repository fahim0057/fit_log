import { Spinner } from "@/../components/ui";

export default function Loading() {
  return (
    <main className="site-shell grid min-h-[65vh] place-items-center py-24">
      <div className="flex flex-col items-center gap-3 text-zinc-500">
        <Spinner />
        <p className="text-sm uppercase tracking-[0.14em]">Loading workout…</p>
      </div>
    </main>
  );
}
