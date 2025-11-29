import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Fetch single blog
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const doc = await db.collection('blogs').doc(id).get()

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    const blogData = doc.data()
    const blog = { id: doc.id, ...blogData } as any

    // Increment views
    await db.collection('blogs').doc(id).update({
      views: (blogData?.views || 0) + 1,
    })

    return NextResponse.json({ success: true, blog })
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT - Update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const { title, content, excerpt, tags, published, featuredImage } = await request.json()

    const updateData: any = {
      updatedAt: Timestamp.now(),
    }

    if (title) {
      updateData.title = title.trim()
      updateData.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    if (content) updateData.content = content.trim()
    if (excerpt !== undefined) updateData.excerpt = excerpt?.trim() || ''
    if (tags) updateData.tags = tags
    if (published !== undefined) updateData.published = published
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage

    await db.collection('blogs').doc(id).update(updateData)

    const updatedDoc = await db.collection('blogs').doc(id).get()
    const blog = { id: updatedDoc.id, ...updatedDoc.data() }

    return NextResponse.json({ success: true, blog })
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    await db.collection('blogs').doc(id).delete()

    return NextResponse.json({ success: true, message: 'Blog deleted' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}

