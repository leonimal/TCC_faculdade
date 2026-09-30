export default function Loading() {
  return (
    <div className="dashboard-shell min-h-screen px-5 py-8 text-slate-100 sm:px-8 lg:px-12 lg:py-10">
      <main className="mx-auto w-full max-w-[1440px] animate-pulse">
        <div className="h-10 w-48 rounded-xl bg-white/[0.06]" />
        <div className="mt-8 h-12 max-w-xl rounded-2xl bg-white/[0.06]" />
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-48 rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
          ))}
        </div>
        <div className="mt-8 h-80 rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
      </main>
    </div>
  );
}
