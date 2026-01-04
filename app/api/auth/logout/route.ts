import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/utils/auth'

export async function POST() {
  await clearAuthCookie()
  return NextResponse.json({ success: true, message: 'Logged out successfully' })
}

