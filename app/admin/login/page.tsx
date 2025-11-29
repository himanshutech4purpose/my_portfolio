import AdminLoginForm from '@/components/AdminLoginForm'

export default async function AdminLoginPage() {
  // Middleware handles redirecting authenticated users
  // No need to check here to avoid redirect loops
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <AdminLoginForm />
    </div>
  )
}

