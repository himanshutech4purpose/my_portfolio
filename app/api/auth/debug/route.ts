import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const requestToken = request.cookies.get('admin_token')?.value

  const debug = {
    hasCookieInRequest: !!requestToken,
    hasCookieInServer: !!token,
    requestTokenPreview: requestToken ? requestToken.substring(0, 30) + '...' : 'none',
    serverTokenPreview: token ? token.substring(0, 30) + '...' : 'none',
    jwtSecret: JWT_SECRET.substring(0, 10) + '...',
    allCookies: Object.fromEntries(
      Array.from(request.cookies.getAll()).map(c => [c.name, c.value.substring(0, 20) + '...'])
    ),
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      return NextResponse.json({ 
        authenticated: true, 
        user: decoded,
        debug,
      })
    } catch (error: any) {
      return NextResponse.json({ 
        authenticated: false, 
        error: error.message,
        debug,
      })
    }
  }

  return NextResponse.json({ 
    authenticated: false, 
    reason: 'No token',
    debug,
  })
}

