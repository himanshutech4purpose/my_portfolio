import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import bcrypt from 'bcryptjs'
import { Timestamp } from 'firebase-admin/firestore'
import jwt from 'jsonwebtoken'

export const runtime = 'nodejs' // Use Node.js runtime for bcrypt

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user in Firestore (check email first, then verify role and active status)
    const usersSnapshot = await db.collection('users')
      .where('email', '==', email)
      .limit(1)
      .get()

    if (usersSnapshot.empty) {
      console.log('Login failed: User not found with email:', email)
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const userDoc = usersSnapshot.docs[0]
    const userData = userDoc.data()
    const userId = userDoc.id

    // Check if user is active and has admin role
    if (!userData.active || userData.role !== 'admin') {
      console.log('Login failed: User not active or not admin', {
        active: userData.active,
        role: userData.role,
      })
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    if (!userData.passwordHash) {
      console.log('Login failed: No password hash found for user:', email)
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('Attempting password verification for:', email)
    const isValid = await bcrypt.compare(password, userData.passwordHash)
    
    if (!isValid) {
      console.log('Login failed: Password mismatch')
      console.log('Stored hash:', userData.passwordHash.substring(0, 20) + '...')
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    console.log('✅ Password verified successfully')

    // Generate token using the same JWT_SECRET as middleware
    const token = jwt.sign(
      { id: userId, email: userData.email, name: userData.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log('Login successful for:', userData.email)
    console.log('Token generated, length:', token.length)

    // Set cookie in response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: userId,
        email: userData.email,
        name: userData.name,
      },
    })

    // Set cookie with proper options - ensure it's accessible
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/', // Ensure cookie is available for all paths
    })
    
    console.log('[Login] Cookie set successfully')
    console.log('[Login] Cookie will be available on next request')

    // Update last login time (don't wait for this)
    db.collection('users').doc(userId).update({
      lastLogin: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }).catch(console.error)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
