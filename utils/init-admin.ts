// Initialize admin user if it doesn't exist
import { db } from '@/lib/firebase'
import bcrypt from 'bcryptjs'
import { Timestamp } from 'firebase-admin/firestore'

export async function initializeAdminUser() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@himanshu.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const adminName = process.env.ADMIN_NAME || 'Himanshu'

    // Check if admin user already exists (check by email only, more reliable)
    const usersSnapshot = await db.collection('users')
      .where('email', '==', adminEmail)
      .limit(1)
      .get()

    if (!usersSnapshot.empty) {
      const existingUser = usersSnapshot.docs[0].data()
      console.log('✅ Admin user already exists')
      console.log(`   User ID: ${usersSnapshot.docs[0].id}`)
      console.log(`   Email: ${existingUser.email}`)
      return { success: true, message: 'Admin user already exists' }
    }

    // Generate password hash
    const passwordHash = bcrypt.hashSync(adminPassword, 10)

    // Create admin user
    const now = Timestamp.now()
    const userData = {
      email: adminEmail,
      passwordHash: passwordHash,
      name: adminName,
      role: 'admin',
      active: true,
      createdAt: now,
      updatedAt: now,
      lastLogin: null,
    }

    const docRef = await db.collection('users').add(userData)

    console.log('✅ Admin user created successfully')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Name: ${adminName}`)
    console.log(`   User ID: ${docRef.id}`)

    return {
      success: true,
      message: 'Admin user created successfully',
      userId: docRef.id,
    }
  } catch (error) {
    console.error('❌ Error initializing admin user:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

