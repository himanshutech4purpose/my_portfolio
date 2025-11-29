# Firestore User Schema

## Collection: `users`

**Document ID:** Auto-generated or use a specific ID like `admin`

### Schema for Admin User:

```javascript
{
  email: string,              // Admin email address (required, unique)
  passwordHash: string,        // Bcrypt hashed password (required)
  name: string,               // Admin name (required)
  role: string,               // User role: "admin" (required)
  createdAt: timestamp,       // When user was created
  updatedAt: timestamp,       // Last update time
  lastLogin: timestamp,       // Last login time (optional)
  active: boolean,            // Whether account is active (default: true)
}
```

### Example Document:

```javascript
{
  email: "admin@himanshu.com",
  passwordHash: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  name: "Himanshu",
  role: "admin",
  createdAt: Timestamp(2024, 1, 15, 10, 30, 0),
  updatedAt: Timestamp(2024, 1, 15, 10, 30, 0),
  lastLogin: null,
  active: true
}
```

---

## How to Create User Document in Firestore

### Step 1: Generate Password Hash

Run this command in your terminal:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password-here', 10))"
```

Replace `your-password-here` with your actual password. Copy the output hash.

### Step 2: Create User Document

1. **Go to Firebase Console** → Your Project → Firestore Database

2. **Create `users` collection:**
   - Click "Start collection"
   - Collection ID: `users`
   - Document ID: `admin` (or use auto-ID)

3. **Add fields:**
   - `email` (string) = `admin@himanshu.com` (or your email)
   - `passwordHash` (string) = `<paste-the-hash-from-step-1>`
   - `name` (string) = `Himanshu` (or your name)
   - `role` (string) = `admin`
   - `createdAt` (timestamp) = current time
   - `updatedAt` (timestamp) = current time
   - `active` (boolean) = `true`

4. **Click "Save"**

---

## Security Rules

Add to Firestore Rules:

```javascript
match /users/{userId} {
  // No client-side access - server-side only
  allow read, write: if false; // Only Admin SDK can access
}
```

---

## Query Examples

### Get user by email:
```javascript
const userSnapshot = await db.collection('users')
  .where('email', '==', 'admin@himanshu.com')
  .where('active', '==', true)
  .limit(1)
  .get()

if (!userSnapshot.empty) {
  const user = userSnapshot.docs[0].data()
}
```

### Update last login:
```javascript
await db.collection('users').doc(userId).update({
  lastLogin: Timestamp.now(),
  updatedAt: Timestamp.now(),
})
```

---

## Notes

- **Only one admin user** should exist in the `users` collection
- Password is stored as **bcrypt hash** (never store plain text passwords)
- Use `role: "admin"` to identify admin users
- Set `active: true` to enable login
- `lastLogin` can be used to track login history

