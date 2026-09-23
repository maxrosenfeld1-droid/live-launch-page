'use client'

import { useEffect, useState } from 'react'

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    // Register this visit once per page load, then show the new total.
    fetch('/api/visits', { method: 'POST' })
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

  return (
    <span className="tabular-nums text-white/50" suppressHydrationWarning>
      {count === null ? '—' : count.toLocaleString()}
    </span>
  )
}
