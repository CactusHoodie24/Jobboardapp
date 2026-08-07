import Link from "next/link";

export default function OnboardingWelcomeBlock() {
  return (
    <section className="w-full max-w-5xl rounded-3xl border border-zinc-950/10 bg-white/90 p-8 shadow-xl shadow-slate-950/5 dark:border-zinc-50/10 dark:bg-zinc-950/80 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-signal">Welcome</p>
            <h1 className="text-3xl font-bold leading-tight text-slate-950 dark:text-white sm:text-4xl">
              Find the right job or hire the perfect candidate faster.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              A modern job board built for employers and seekers who want a seamless hiring experience. Explore curated roles, manage applications, and connect with top talent in one polished interface.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">For Employers</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Post jobs, review applicants, and build a stronger team with intelligent hiring tools.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">For Job Seekers</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Discover relevant openings, save your favorites, and apply quickly from one clean dashboard.
              </p>
            </div>
          </div>

          <Link href="/jobs" className="inline-flex rounded-full bg-signal px-6 py-3 text-sm font-semibold text-signal-foreground transition hover:bg-signal-hover">
            Browse Job Listings
          </Link>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-zinc-950 p-6 text-white shadow-2xl shadow-slate-950/20">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.25em] text-signal">Start your journey</p>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">Up next in your onboarding</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-signal" />
                  Create your profile and set your preferences.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-signal" />
                  Browse curated roles and save the best matches.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-signal" />
                  Easily connect with hiring teams and apply instantly.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
