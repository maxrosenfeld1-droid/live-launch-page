'use client'

import { useEffect, useState } from 'react'

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    let cancelled = false

    // Load the current total without incrementing.
    fetch('/api/visits')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { count: number }) => {
        if (!cancelled) setCount(data.count)
      })
      .catch(() => {
        // Leave the count hidden if the request fails.
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleClick() {
    if (pending) return
    setPending(true)
    try {
      const res = await fetch('/api/visits', { method: 'POST' })
      if (res.ok) {
        const data: { count: number } = await res.json()
        setCount(data.count)
      }
    } catch {
      // Ignore failures; keep the current count.
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className="tabular-nums text-white/50"
        aria-live="polite"
        suppressHydrationWarning
      >
        {count === null ? '—' : count.toLocaleString()}
      </span>
      <button
        type="button"
        onClick={handleClick}
        disabled={count === null || pending}
        aria-label="Increase the visit count by one"
        className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] leading-none transition-colors hover:bg-[#10B981]/20 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +1
      </button>
    </div>
  )
}
