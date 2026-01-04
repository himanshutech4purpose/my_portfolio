'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Trash2, Plus, LogOut, FileText, X } from 'lucide-react'
import RichTextEditor from '@/components/molecules/RichTextEditor'

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
}

const BlogEditor = () => {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)
  const [featuredImage, setFeaturedImage] = useState('')

  useEffect(() => {
    fetchBlogs()
    
    // Check authentication status
    fetch('/api/auth/check')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          console.error('Not authenticated, redirecting to login')
          window.location.href = '/admin/login'
        }
      })
      .catch(err => {
        console.error('Auth check failed:', err)
      })
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const result = await response.json()
      if (result.success) {
        setBlogs(result.blogs || [])
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  const handleNewBlog = () => {
    router.push('/admin/blogs/create')
  }

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog)
    setIsEditing(true)
    setTitle(blog.title || '')
    setContent(blog.content || '')
    setExcerpt(blog.excerpt || '')
    setTags(blog.tags?.join(', ') || '')
    setPublished(blog.published || false)
    setFeaturedImage(blog.featuredImage || '')
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const blogData = {
        title,
        content,
        excerpt,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        published,
        featuredImage,
      }

      const url = selectedBlog ? `/api/blogs/${selectedBlog.id}` : '/api/blogs'
      const method = selectedBlog ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      })

      const result = await response.json()
      if (result.success) {
        setIsEditing(false)
        fetchBlogs()
      }
    } catch (error) {
      console.error('Failed to save blog:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      const result = await response.json()
      if (result.success) {
        fetchBlogs()
        if (selectedBlog?.id === id) {
          setIsEditing(false)
          setSelectedBlog(null)
        }
      }
    } catch (error) {
      console.error('Failed to delete blog:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Blog Management
        </h1>
        <div className="flex space-x-4">
          <motion.button
            onClick={handleNewBlog}
            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} aria-hidden="true" />
            <span>New Blog</span>
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} aria-hidden="true" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Blog List */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Blogs</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  onClick={() => handleEdit(blog)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedBlog?.id === blog.id
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">{blog.title}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(blog.id)
                      }}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete blog"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={blog.published ? 'text-green-600' : 'text-gray-400'}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                    <span>{blog.views || 0} views</span>
                  </div>
                </motion.div>
              ))}
              {blogs.length === 0 && (
                <p className="text-gray-500 text-center py-8">No blogs yet. Create your first blog!</p>
              )}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          {isEditing ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedBlog ? 'Edit Blog' : 'New Blog'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  aria-label="Close editor"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Blog title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Start writing your blog post... Use the toolbar above to format your text."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Short description (auto-generated if empty)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="react, nextjs, typescript"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700">
                    Publish this blog
                  </label>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    onClick={handleSave}
                    disabled={loading || !title || !content}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    <Save size={20} aria-hidden="true" />
                    <span>{loading ? 'Saving...' : 'Save Blog'}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
              <p className="text-gray-600">Select a blog to edit or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogEditor

