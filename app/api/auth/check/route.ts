import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false, reason: 'No token' })
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      return NextResponse.json({ 
        authenticated: true, 
        user: decoded,
        tokenPreview: token.substring(0, 20) + '...'
      })
    } catch (error: any) {
      return NextResponse.json({ 
        authenticated: false, 
        reason: 'Invalid token',
        error: error.message 
      })
    }
  } catch (error: any) {
    return NextResponse.json({ 
      authenticated: false, 
      reason: 'Error checking auth',
      error: error.message 
    })
  }
}

