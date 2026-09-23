'use client'

import { useEffect, useState } from 'react'

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Render nothing until mounted to avoid a server/client time mismatch
  if (!now) {
    return <span className="tabular-nums" suppressHydrationWarning />
  }

  const time = now.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
  const date = now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time} · {date}
    </span>
  )
}
