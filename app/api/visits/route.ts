import { NextResponse } from 'next/server'
import { redis, VISITS_KEY } from '@/lib/redis'

export const dynamic = 'force-dynamic'

// Read the current visit count without incrementing.
export async function GET() {
  const count = (await redis.get<number>(VISITS_KEY)) ?? 0
  return NextResponse.json({ count })
}

// Register a new visit: atomically add one and return the new total.
export async function POST() {
  const count = await redis.incr(VISITS_KEY)
  return NextResponse.json({ count })
}

// Set the visit count to an explicit value (used by reset and undo).
export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    count?: unknown
  } | null
  const value = Number(body?.count)
  if (!Number.isFinite(value) || value < 0 || !Number.isInteger(value)) {
    return NextResponse.json(
      { error: 'count must be a non-negative integer' },
      { status: 400 },
    )
  }
  await redis.set(VISITS_KEY, value)
  return NextResponse.json({ count: value })
}
