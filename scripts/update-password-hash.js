/**
 * Update password hash for existing user
 * Run: node scripts/update-password-hash.js <email> <new-password>
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

async function updatePasswordHash() {
  try {
    const email = process.argv[2] || process.env.ADMIN_EMAIL || 'hs230998@gmail.com'
    const newPassword = process.argv[3] || process.env.ADMIN_PASSWORD

    if (!newPassword) {
      console.error('❌ Error: Password is required')
      console.log('Usage: node scripts/update-password-hash.js <email> <password>')
      process.exit(1)
    }

    console.log('🔍 Finding user...')
    console.log(`   Email: ${email}`)

    // Find user by email
    const usersSnapshot = await db.collection('users')
      .where('email', '==', email)
      .limit(1)
      .get()

    if (usersSnapshot.empty) {
      console.error('❌ User not found!')
      process.exit(1)
    }

    const userDoc = usersSnapshot.docs[0]
    const userId = userDoc.id
    const userData = userDoc.data()

    console.log(`✅ Found user: ${userData.name} (ID: ${userId})`)

    // Generate new password hash
    const newPasswordHash = bcrypt.hashSync(newPassword, 10)

    console.log('📝 Updating password hash...')

    // Update password hash
    await db.collection('users').doc(userId).update({
      passwordHash: newPasswordHash,
      updatedAt: admin.firestore.Timestamp.now(),
    })

    console.log('✅ Password hash updated successfully!')
    console.log(`   New Hash: ${newPasswordHash}`)
    console.log(`\n✅ You can now login with:`)
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${newPassword}`)
  } catch (error) {
    console.error('❌ Error updating password:', error)
    process.exit(1)
  }
}

updatePasswordHash()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })

