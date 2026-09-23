'use client'

import { useEffect, useState } from 'react'

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [pending, setPending] = useState(false)
  // Holds the pre-reset value so it can be restored with undo.
  const [undoValue, setUndoValue] = useState<number | null>(null)

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

  async function increment() {
    if (pending) return
    setPending(true)
    try {
      const res = await fetch('/api/visits', { method: 'POST' })
      if (res.ok) {
        const data: { count: number } = await res.json()
        setCount(data.count)
        setUndoValue(null)
      }
    } catch {
      // Ignore failures; keep the current count.
    } finally {
      setPending(false)
    }
  }

  async function setTo(value: number, remember: number | null) {
    if (pending) return
    setPending(true)
    try {
      const res = await fetch('/api/visits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: value }),
      })
      if (res.ok) {
        const data: { count: number } = await res.json()
        setCount(data.count)
        setUndoValue(remember)
      }
    } catch {
      // Ignore failures; keep the current count.
    } finally {
      setPending(false)
    }
  }

  const disabled = count === null || pending

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={increment}
          disabled={disabled}
          aria-label="Increase the visit count by one"
          className="inline-flex h-5 items-center justify-center rounded-md border border-[#10B981]/30 bg-[#10B981]/10 px-1.5 text-[#10B981] leading-none transition-colors hover:bg-[#10B981]/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => setTo(0, count)}
          disabled={disabled || count === 0}
          aria-label="Reset the visit count to zero"
          className="inline-flex h-5 items-center justify-center rounded-md border border-white/10 bg-white/5 px-1.5 text-white/50 leading-none transition-colors hover:border-white/20 hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => undoValue !== null && setTo(undoValue, null)}
          disabled={disabled || undoValue === null}
          aria-label="Undo the reset and restore the previous count"
          className="inline-flex h-5 items-center justify-center rounded-md border border-white/10 bg-white/5 px-1.5 text-white/50 leading-none transition-colors hover:border-white/20 hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Undo
        </button>
      </div>
      <span
        className="text-2xl font-bold tabular-nums tracking-tight text-white"
        aria-live="polite"
        suppressHydrationWarning
      >
        {count === null ? '—' : count.toLocaleString()}
      </span>
    </div>
  )
}
