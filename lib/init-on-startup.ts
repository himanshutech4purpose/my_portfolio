// Initialize admin user on server startup
// This runs once when the server starts

let initPromise: Promise<void> | null = null

export function initAdminOnStartup() {
  // Only initialize once
  if (initPromise) {
    return initPromise
  }

  initPromise = (async () => {
    try {
      const { initializeAdminUser } = await import('./init-admin')
      await initializeAdminUser()
    } catch (error) {
      console.error('Failed to initialize admin on startup:', error)
    }
  })()

  return initPromise
}

// Call this in a server component or API route
if (typeof window === 'undefined') {
  // Only run on server
  initAdminOnStartup().catch(console.error)
}

