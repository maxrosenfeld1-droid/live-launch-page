'use client'

import { useEffect, useState } from 'react'

// Common North American timezones.
const NORTH_AMERICA_ZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Phoenix',
  'America/Los_Angeles',
  'America/Anchorage',
  'America/Halifax',
  'America/St_Johns',
  'America/Toronto',
  'America/Vancouver',
  'America/Mexico_City',
  'America/Tijuana',
  'Pacific/Honolulu',
]

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)
  const [zone, setZone] = useState<string | null>(null)

  useEffect(() => {
    setNow(new Date())
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
    // Default to the detected zone if it's in the list, otherwise Eastern.
    setZone(
      NORTH_AMERICA_ZONES.includes(detected) ? detected : 'America/New_York',
    )
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Render a placeholder until mounted to avoid a server/client time mismatch.
  if (!now || !zone) {
    return <span className="tabular-nums" suppressHydrationWarning />
  }

  const time = now.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: zone,
  })
  const date = now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: zone,
  })

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="tabular-nums text-white/50" suppressHydrationWarning>
        {time} · {date}
      </span>
      <label className="sr-only" htmlFor="timezone-select">
        Select your timezone
      </label>
      <select
        id="timezone-select"
        value={zone}
        onChange={(e) => setZone(e.target.value)}
        className="max-w-[9rem] cursor-pointer truncate rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[0.7rem] text-white/60 outline-none transition-colors hover:border-[#10B981]/40 focus:border-[#10B981]/60"
      >
        {NORTH_AMERICA_ZONES.map((tz) => (
          <option key={tz} value={tz} className="bg-[#0A0A0A] text-white">
            {tz.replace(/^.*\//, '').replace(/_/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  )
}
