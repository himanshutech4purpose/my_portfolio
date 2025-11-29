import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'

export async function POST(request: NextRequest) {
  try {
    // Verify db is initialized
    if (!db) {
      throw new Error('Firestore database not initialized')
    }

    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Store message in Firestore
    const now = Timestamp.now()
    const messageData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: now,
      date: new Date().toISOString().split('T')[0], // Store date for easy querying
      read: false, // Track if message has been read
      replied: false, // Track if message has been replied to
    }

    const docRef = await db.collection('messages').add(messageData)
    console.log('Message stored with ID:', docRef.id)

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    })
  } catch (error: any) {
    console.error('Error storing message:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    })
    
    // Return more detailed error in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message || error.toString() || 'Failed to send message'
      : 'Failed to send message. Please try again later.'
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

