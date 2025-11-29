import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'

// GET - Fetch all published blogs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const publishedOnly = searchParams.get('published') === 'true'

    let query = db.collection('blogs').orderBy('createdAt', 'desc')

    if (publishedOnly) {
      query = query.where('published', '==', true) as any
    }

    const snapshot = await query.get()
    const blogs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ success: true, blogs })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST - Create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, content, excerpt, tags, published, featuredImage } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const blogData = {
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt?.trim() || content.substring(0, 200).trim(),
      tags: tags || [],
      published: published || false,
      featuredImage: featuredImage || '',
      author: user.name,
      authorEmail: user.email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 0,
    }

    const docRef = await db.collection('blogs').add(blogData)

    return NextResponse.json({
      success: true,
      blog: { id: docRef.id, ...blogData },
    })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}

