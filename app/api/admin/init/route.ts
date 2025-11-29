import { NextResponse } from 'next/server'
import { initializeAdminUser } from '@/lib/init-admin'

export const runtime = 'nodejs'

// Initialize admin user endpoint
// Call this once to create the admin user if it doesn't exist
export async function POST() {
  try {
    const result = await initializeAdminUser()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        userId: result.userId,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to initialize admin user',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Init admin error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initialize admin user',
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check if admin exists
export async function GET() {
  try {
    const { db } = await import('@/lib/firebase')
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@himanshu.com'

    const usersSnapshot = await db.collection('users')
      .where('email', '==', adminEmail)
      .where('role', '==', 'admin')
      .limit(1)
      .get()

    const exists = !usersSnapshot.empty

    return NextResponse.json({
      exists,
      message: exists ? 'Admin user exists' : 'Admin user does not exist',
    })
  } catch (error) {
    console.error('Check admin error:', error)
    return NextResponse.json(
      {
        exists: false,
        error: 'Failed to check admin user',
      },
      { status: 500 }
    )
  }
}

