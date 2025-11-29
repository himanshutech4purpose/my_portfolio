/**
 * Script to initialize admin user in Firestore
 * Run: node scripts/init-admin.js
 * 
 * This script will create an admin user if it doesn't exist
 * Uses credentials from .env file or defaults
 */

require('dotenv').config({ path: '.env.local' })
require('dotenv').config()

const admin = require('firebase-admin')
const bcrypt = require('bcryptjs')
const path = require('path')

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = require(path.join(__dirname, '../myapp-21f4c-firebase-adminsdk-ayghz-9f55842d90.json'))
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

async function initializeAdminUser() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@himanshu.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const adminName = process.env.ADMIN_NAME || 'Himanshu'

    console.log('🔍 Checking for existing admin user...')
    console.log(`   Email: ${adminEmail}`)

    // Check if admin user already exists (by email only to avoid duplicates)
    const usersSnapshot = await db.collection('users')
      .where('email', '==', adminEmail)
      .limit(1)
      .get()

    if (!usersSnapshot.empty) {
      const existingUser = usersSnapshot.docs[0].data()
      console.log('✅ Admin user already exists!')
      console.log(`   User ID: ${usersSnapshot.docs[0].id}`)
      console.log(`   Email: ${existingUser.email}`)
      console.log(`   Name: ${existingUser.name}`)
      console.log(`   Role: ${existingUser.role || 'not set'}`)
      console.log(`   Active: ${existingUser.active}`)
      console.log('\n⚠️  Skipping creation to avoid duplicates.')
      return
    }

    console.log('📝 Creating new admin user...')

    // Generate password hash
    const passwordHash = bcrypt.hashSync(adminPassword, 10)

    // Create admin user
    const userData = {
      email: adminEmail,
      passwordHash: passwordHash,
      name: adminName,
      role: 'admin',
      active: true,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      lastLogin: null,
    }

    const docRef = await db.collection('users').add(userData)

    console.log('✅ Admin user created successfully!')
    console.log(`   User ID: ${docRef.id}`)
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Name: ${adminName}`)
    console.log(`   Password: ${adminPassword} (change this after first login!)`)
    console.log('\n⚠️  IMPORTANT: Change the default password after first login!')
  } catch (error) {
    console.error('❌ Error initializing admin user:', error)
    process.exit(1)
  }
}

initializeAdminUser()
  .then(() => {
    console.log('\n✅ Initialization complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })

