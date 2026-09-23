import { LiveClock } from '@/components/live-clock'

export default function Page() {
  const year = new Date().getFullYear()

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6 text-white">
      {/* Soft animated gradient glow behind the headline */}
      <div
        aria-hidden="true"
        className="animate-glow-drift pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.35)_0%,rgba(16,185,129,0.12)_45%,transparent_70%)] blur-3xl sm:h-[620px] sm:w-[620px]"
      />

      <div className="flex flex-col items-center text-center">
        {/* Live status badge */}
        <div className="animate-fade-slide-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-[#10B981]" />
          Live
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-slide-up mt-8 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          style={{ animationDelay: '0.1s' }}
        >
          {"If you're reading this, the site is live."}
        </h1>

        {/* Subheading */}
        <p
          className="animate-fade-slide-up mt-6 text-base text-white/50 sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          Built with v0, deployed on Vercel, and backed up on GitHub.
        </p>

        {/* Detail line */}
        <p
          className="animate-fade-slide-up mt-3 text-sm text-white/30"
          style={{ animationDelay: '0.3s' }}
        >
          Made by Max Rosenfeld · <LiveClock />
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 flex justify-center py-6">
        <p className="text-xs text-white/25">© {year}</p>
      </footer>
    </main>
  )
}
