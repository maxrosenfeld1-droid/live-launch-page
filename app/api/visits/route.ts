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
