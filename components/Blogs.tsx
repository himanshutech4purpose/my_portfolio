'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Eye, ArrowRight, FileText } from 'lucide-react'

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

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?published=true')
      const result = await response.json()
      if (result.success) {
        setBlogs(result.blogs || [])
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
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

  const truncateContent = (html: string, maxLength: number = 150) => {
    // Remove HTML tags and get plain text
    const text = html.replace(/<[^>]*>/g, '').trim()
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50 w-full" aria-label="Blog posts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thoughts, insights, and experiences from my journey as a developer.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={64} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
            <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Featured Image */}
                {blog.featuredImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                    {blog.excerpt || truncateContent(blog.content)}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} aria-hidden="true" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={16} aria-hidden="true" />
                      <span>{blog.views || 0}</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-medium transition-colors group"
                  >
                    <span>Read More</span>
                    <ArrowRight 
                      size={18} 
                      className="group-hover:translate-x-1 transition-transform" 
                      aria-hidden="true" 
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Blogs

