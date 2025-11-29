import { NextRequest, NextResponse } from 'next/server'
import { db, FieldValue } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'

export async function POST(request: NextRequest) {
  try {
    const { page, referrer, userAgent } = await request.json()

    // Increment total views
    const analyticsRef = db.collection('my_portfolio_analytics').doc('my_portfolio')
    await analyticsRef.set(
      {
        total_views: FieldValue.increment(1),
        last_updated: Timestamp.now(),
      },
      { merge: true }
    )

    // Store individual view record
    await db.collection('views').add({
      page: page || 'home',
      referrer: referrer || 'direct',
      userAgent: userAgent || 'unknown',
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0], // Store date for easy querying
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track view' },
      { status: 500 }
    )
  }
}

