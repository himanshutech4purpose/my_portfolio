/**
 * Test password hash against stored hash
 * Run: node scripts/test-password.js
 */

require('dotenv').config({ path: '.env.local' })
require('dotenv').config()

const bcrypt = require('bcryptjs')

const storedHash = process.argv[2] || '$2b$10$JSRQXk7KmO/PPWWrb1JV/eG4rFB0OZfQTbPVilBOhhay4J4q0ljki'
const testPassword = process.argv[3] || process.env.ADMIN_PASSWORD || 'admin123'

console.log('Testing password...')
console.log('Stored Hash:', storedHash)
console.log('Test Password:', testPassword)

const isValid = bcrypt.compareSync(testPassword, storedHash)
console.log('Password Match:', isValid ? '✅ YES' : '❌ NO')

if (!isValid) {
  console.log('\nGenerating new hash for your password:')
  const newHash = bcrypt.hashSync(testPassword, 10)
  console.log('New Hash:', newHash)
  console.log('\nUpdate this hash in Firestore for user:', process.env.ADMIN_EMAIL || 'hs230998@gmail.com')
}

