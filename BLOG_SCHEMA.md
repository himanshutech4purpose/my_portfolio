# Firestore Blog Schema

## Collection: `blogs`

**Document ID:** Auto-generated (Firestore auto-ID)

### Fields:

```javascript
{
  title: string,              // Blog post title (required)
  slug: string,                // URL-friendly version of title (auto-generated)
  content: string,             // Full blog content (Markdown supported) (required)
  excerpt: string,             // Short description/preview (auto-generated if empty)
  tags: string[],             // Array of tags (e.g., ["react", "nextjs", "typescript"])
  published: boolean,          // Whether blog is published (default: false)
  featuredImage: string,       // URL to featured image (optional)
  author: string,              // Author name (auto-set from admin user)
  authorEmail: string,         // Author email (auto-set from admin user)
  createdAt: timestamp,        // When blog was created
  updatedAt: timestamp,        // Last update time
  views: number,               // Number of views (default: 0)
}
```

### Example Document:

```javascript
{
  title: "Getting Started with Next.js 15",
  slug: "getting-started-with-nextjs-15",
  content: "# Introduction\n\nNext.js 15 brings exciting new features...",
  excerpt: "Learn how to get started with Next.js 15 and its new features",
  tags: ["nextjs", "react", "web-development"],
  published: true,
  featuredImage: "https://example.com/nextjs15.jpg",
  author: "Admin",
  authorEmail: "admin@himanshu.com",
  createdAt: Timestamp(2024, 1, 15, 10, 30, 0),
  updatedAt: Timestamp(2024, 1, 15, 10, 30, 0),
  views: 42
}
```

---

## How to Create Collection in Firestore Console

1. **Go to Firebase Console** → Your Project → Firestore Database

2. **Create `blogs` collection:**
   - Click "Start collection"
   - Collection ID: `blogs`
   - Document ID: Auto-ID (leave empty)
   - Fields will be added automatically by the API when you create blogs

3. **Create Indexes (Optional but Recommended):**
   - Go to Firestore → Indexes → Create Index
   - For `published` + `createdAt`:
     - Collection: `blogs`
     - Fields: `published` (Ascending), `createdAt` (Descending)
   - For `createdAt`:
     - Collection: `blogs`
     - Fields: `createdAt` (Descending)
   - For `tags`:
     - Collection: `blogs`
     - Fields: `tags` (Array)

---

## Security Rules

Add to Firestore Rules:

```javascript
match /blogs/{document} {
  // Anyone can read published blogs
  allow read: if resource.data.published == true;
  
  // Only authenticated admins can write
  allow write: if false; // Server-side only via Admin SDK
}
```

---

## API Endpoints

### GET `/api/blogs`
- Fetch all blogs (or published only with `?published=true`)
- Returns: `{ success: true, blogs: [...] }`

### GET `/api/blogs/[id]`
- Fetch single blog by ID
- Automatically increments views
- Returns: `{ success: true, blog: {...} }`

### POST `/api/blogs`
- Create new blog (admin only)
- Requires: `title`, `content`
- Optional: `excerpt`, `tags`, `published`, `featuredImage`
- Returns: `{ success: true, blog: {...} }`

### PUT `/api/blogs/[id]`
- Update existing blog (admin only)
- Returns: `{ success: true, blog: {...} }`

### DELETE `/api/blogs/[id]`
- Delete blog (admin only)
- Returns: `{ success: true, message: 'Blog deleted' }`

---

## Admin Setup

1. **Set Admin Credentials in `.env`:**
```env
ADMIN_EMAIL=admin@himanshu.com
ADMIN_PASSWORD_HASH=<bcrypt-hashed-password>
JWT_SECRET=your-secret-key-here
```

2. **Generate Password Hash:**
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10))"
```

3. **Access Admin Panel:**
- Click the admin login button (bottom-right corner)
- Or navigate to `/admin/login`
- After login, access `/admin` for blog management

