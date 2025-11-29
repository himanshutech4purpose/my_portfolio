import BlogEditor from '@/components/BlogEditor'

export default async function AdminPage() {
  // Middleware handles authentication, so we don't need to check here
  // This prevents double redirects that cause loops
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <BlogEditor />
    </div>
  )
}

