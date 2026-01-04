'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import RichTextEditor from '@/components/molecules/RichTextEditor'

interface BlogFormProps {
  initialData?: {
    id?: string
    title?: string
    content?: string
    excerpt?: string
    tags?: string[]
    published?: boolean
    featuredImage?: string
  }
  onSave?: () => void
}

const BlogForm = ({ initialData, onSave }: BlogFormProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '')
  const [published, setPublished] = useState(initialData?.published || false)
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || '')

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

      const url = initialData?.id ? `/api/blogs/${initialData.id}` : '/api/blogs'
      const method = initialData?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      })

      const result = await response.json()
      if (result.success) {
        if (onSave) {
          onSave()
        } else {
          router.push('/admin')
          router.refresh()
        }
      }
    } catch (error) {
      console.error('Failed to save blog:', error)
      alert('Failed to save blog. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData?.id ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          <motion.button
            onClick={() => router.push('/admin')}
            className="p-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to admin"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Back</span>
          </motion.button>
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
    </div>
  )
}

export default BlogForm

