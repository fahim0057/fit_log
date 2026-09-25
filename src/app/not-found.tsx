import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <p className="eyebrow">404 / ROUTE NOT FOUND</p>
        <h1 className="display-title mt-4 text-7xl sm:text-9xl">NO REP.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-500">
          The page or workout you requested does not exist.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">GO HOME</Link>
          <Link href="/#library" className="btn-secondary">BROWSE WORKOUTS</Link>
        </div>
      </div>
    </main>
  );
}
