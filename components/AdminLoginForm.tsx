'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Lock, Mail } from 'lucide-react'

const AdminLoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in request/response
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (result.success) {
        // Cookie is set in the response headers
        // Wait a moment for browser to process the cookie before redirecting
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // Redirect to admin page - cookie should be available now
        window.location.href = '/admin'
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-xl border border-gray-100"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock size={32} className="text-white" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
        <p className="text-gray-600">Access the blog management panel</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="admin@himanshu.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter password"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          <LogIn size={20} aria-hidden="true" />
          <span>{loading ? 'Logging in...' : 'Login'}</span>
        </motion.button>
      </form>
    </motion.div>
  )
}

export default AdminLoginForm

