import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

// Get JWT_SECRET from environment
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  const token = request.cookies.get('admin_token')?.value
  
  // If on login page
  if (pathname === '/admin/login') {
    if (!token) {
      // No token, allow access to login page
      return NextResponse.next()
    }
    
    // Has token, verify it
    try {
      jwt.verify(token, JWT_SECRET)
      // Token is valid, redirect to admin dashboard
      const adminUrl = new URL('/admin', request.url)
      return NextResponse.redirect(adminUrl)
    } catch (error) {
      // Token is invalid, clear it and allow access to login page
      const response = NextResponse.next()
      response.cookies.delete('admin_token')
      return response
    }
  }
  
  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin')) {
    if (!token) {
      // No token, redirect to login
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Has token, verify it
    try {
      jwt.verify(token, JWT_SECRET)
      // Token is valid, allow access
      return NextResponse.next()
    } catch (error: any) {
      // Token is invalid, clear cookie and redirect to login
      console.error('JWT verification failed:', error.message)
      const loginUrl = new URL('/admin/login', request.url)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('admin_token')
      return response
    }
  }

  // Allow access to other routes
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}

