'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BlogForm from '@/components/molecules/BlogForm'

export default function CreateBlogPage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    fetch('/api/auth/check')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          console.error('Not authenticated, redirecting to login')
          router.push('/admin/login')
        }
      })
      .catch(err => {
        console.error('Auth check failed:', err)
        router.push('/admin/login')
      })
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <BlogForm />
    </div>
  )
}

