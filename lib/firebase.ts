// Firebase Admin SDK initialization for server-side operations
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  try {
    // Get credentials from environment variables
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    
    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing Firebase credentials in environment variables. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY')
    }
    
    const serviceAccount = {
      projectId,
      clientEmail,
      privateKey,
    }
    
    initializeApp({
      credential: cert(serviceAccount),
    })
  } catch (error) {
    console.error('Firebase initialization error:', error)
    throw new Error('Failed to initialize Firebase Admin SDK')
  }
}

export const db = getFirestore()
export { FieldValue }

