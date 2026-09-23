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
    <button
      type="button"
      onClick={handleClick}
      disabled={count === null || pending}
      aria-label="Add your visit to the count"
      className="tabular-nums text-white/50 transition-colors hover:text-[#10B981] disabled:cursor-default disabled:opacity-100"
      suppressHydrationWarning
    >
      {count === null ? '—' : count.toLocaleString()}
    </button>
  )
}
