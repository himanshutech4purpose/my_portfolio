'use client'

import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

// Component to display total views with auto-update
const ViewCounter = () => {
  const [views, setViews] = useState<number | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchViews = async () => {
    try {
      const response = await fetch('/api/views/count')
      if (response.ok) {
        const data = await response.json()
        setViews(data.totalViews)
      }
    } catch (error) {
      console.error('Failed to fetch views:', error)
    }
  }

  useEffect(() => {
    // Fetch initial views
    fetchViews()

    // Poll for updates every 30 seconds (reduced frequency to avoid excessive API calls)
    const interval = setInterval(() => {
      setIsUpdating(true)
      fetchViews().finally(() => {
        setTimeout(() => setIsUpdating(false), 500)
      })
    }, 30000) // Changed from 5000ms (5s) to 30000ms (30s)

    return () => clearInterval(interval)
  }, [])

  if (views === null) {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <Eye size={16} aria-hidden="true" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 text-gray-600">
      <Eye size={16} aria-hidden="true" />
      <span className={`text-sm font-medium transition-all duration-300 ${isUpdating ? 'scale-110 text-primary' : ''}`}>
        {views.toLocaleString()} views
      </span>
    </div>
  )
}

export default ViewCounter
