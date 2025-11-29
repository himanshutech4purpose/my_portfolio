// Firebase Admin SDK initialization for server-side operations
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  try {
    const serviceAccount = require('../myapp-21f4c-firebase-adminsdk-ayghz-9f55842d90.json')
    
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

