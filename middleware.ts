import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Get JWT_SECRET from environment
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Convert secret to Uint8Array for jose (required for Edge Runtime)
const getSecretKey = () => {
  return new TextEncoder().encode(JWT_SECRET)
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  const token = request.cookies.get('admin_token')?.value
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development' && pathname.startsWith('/admin')) {
    console.log(`[Middleware] ${pathname} - Token present: ${!!token}`)
    if (token) {
      console.log(`[Middleware] Token preview: ${token.substring(0, 20)}...`)
    }
  }
  
  // If on login page
  if (pathname === '/admin/login') {
    if (!token) {
      // No token, allow access to login page
      return NextResponse.next()
    }
    
    // Has token, verify it
    try {
      await jwtVerify(token, getSecretKey())
      // Token is valid, redirect to admin dashboard
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] Valid token on login page, redirecting to /admin')
      }
      const adminUrl = new URL('/admin', request.url)
      return NextResponse.redirect(adminUrl)
    } catch (error: any) {
      // Token is invalid, clear it and allow access to login page
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] Invalid token on login page:', error.message)
      }
      const response = NextResponse.next()
      response.cookies.delete('admin_token')
      return response
    }
  }
  
  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin')) {
    if (!token) {
      // No token, redirect to login
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] No token found, redirecting to login')
      }
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Has token, verify it
    try {
      await jwtVerify(token, getSecretKey())
      // Token is valid, allow access
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] Valid token, allowing access to', pathname)
      }
      return NextResponse.next()
    } catch (error: any) {
      // Token is invalid, clear cookie and redirect to login
      console.error('[Middleware] JWT verification failed:', error.message)
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

