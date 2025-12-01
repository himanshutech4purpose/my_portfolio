'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Eye, Tag } from 'lucide-react'

interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  published: boolean
  featuredImage: string
  createdAt: any
  views: number
  author?: string
}

export default function BlogDetailPage() {
  const params = useParams()
  // const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string)
    }
  }, [params.id])

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`)
      const result = await response.json()
      
      if (result.success) {
        // Only show published blogs to public
        if (!result.blog.published) {
          setError('This blog post is not available.')
          return
        }
        setBlog(result.blog)
      } else {
        setError(result.error || 'Blog not found')
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      setError('Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link
            href="/#blog"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/#blog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Back to Blogs</span>
          </Link>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full"
                  >
                    <Tag size={14} aria-hidden="true" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
              {blog.author && (
                <div>
                  <span className="font-medium">By {blog.author}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar size={16} aria-hidden="true" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={16} aria-hidden="true" />
                <span>{blog.views || 0} views</span>
              </div>
            </div>

            {/* Blog Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </motion.article>
      </div>
    </div>
  )
}

