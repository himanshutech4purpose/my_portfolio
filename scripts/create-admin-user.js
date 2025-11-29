/**
 * Script to create admin user in Firestore
 * Run: node scripts/create-admin-user.js
 */

const bcrypt = require('bcryptjs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function createAdminUser() {
  console.log('=== Create Admin User ===\n')

  const email = await question('Enter admin email: ')
  const password = await question('Enter admin password: ')
  const name = await question('Enter admin name: ')

  if (!email || !password || !name) {
    console.error('All fields are required!')
    rl.close()
    return
  }

  // Generate password hash
  const passwordHash = bcrypt.hashSync(password, 10)

  console.log('\n=== User Data ===')
  console.log('Email:', email)
  console.log('Name:', name)
  console.log('Password Hash:', passwordHash)
  console.log('\n=== Firestore Document ===')
  console.log('Collection: users')
  console.log('Document ID: admin (or use auto-ID)')
  console.log('\nFields to add:')
  console.log(JSON.stringify({
    email: email,
    passwordHash: passwordHash,
    name: name,
    role: 'admin',
    active: true,
    createdAt: 'current timestamp',
    updatedAt: 'current timestamp',
  }, null, 2))

  console.log('\n✅ Copy the passwordHash and create the document in Firestore Console')
  console.log('📝 See USER_SCHEMA.md for detailed instructions')

  rl.close()
}

createAdminUser().catch(console.error)

