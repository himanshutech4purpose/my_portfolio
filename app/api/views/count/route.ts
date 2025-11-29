import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'

export async function GET() {
  try {
    const doc = await db.collection('my_portfolio_analytics').doc('my_portfolio').get()
    const data = doc.data()
    const totalViews = data?.total_views || 0

    return NextResponse.json({ totalViews })
  } catch (error) {
    console.error('Error fetching views:', error)
    return NextResponse.json(
      { totalViews: 0 },
      { status: 500 }
    )
  }
}
