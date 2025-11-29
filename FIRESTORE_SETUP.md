# Firestore Database Setup Guide

## Quick Setup Instructions

### Step 1: Create Collections in Firestore Console

Go to [Firebase Console](https://console.firebase.google.com) → Your Project → Firestore Database

#### Collection 1: `my_portfolio_analytics`

1. Click **"Start collection"** or **"Add collection"**
2. Collection ID: `my_portfolio_analytics`
3. Document ID: `my_portfolio` (enter manually)
4. Add these fields:
   - Field: `total_views`
     - Type: **number**
     - Value: `0`
   - Field: `last_updated`
     - Type: **timestamp**
     - Value: (current time)
5. Click **"Save"**

#### Collection 2: `views`

1. Click **"Start collection"**
2. Collection ID: `views`
3. Document ID: Leave empty (Auto-ID)
4. Click **"Save"** (fields will be added automatically by the API)

#### Collection 3: `messages`

1. Click **"Start collection"**
2. Collection ID: `messages`
3. Document ID: Leave empty (Auto-ID)
4. Click **"Save"** (fields will be added automatically by the API)

---

### Step 2: Create Indexes (Optional but Recommended)

Go to Firestore → **Indexes** → **Create Index**

#### Index 1: Views by Date
- Collection: `views`
- Fields to index:
  - `date` (Ascending)
- Click **"Create"**

#### Index 2: Views by Timestamp
- Collection: `views`
- Fields to index:
  - `timestamp` (Descending)
- Click **"Create"**

#### Index 3: Messages by Read Status and Timestamp
- Collection: `messages`
- Fields to index:
  - `read` (Ascending)
  - `timestamp` (Descending)
- Click **"Create"**

#### Index 4: Messages by Date
- Collection: `messages`
- Fields to index:
  - `date` (Ascending)
- Click **"Create"**

---

### Step 3: Set Security Rules

Go to Firestore → **Rules** → Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Analytics - read only
    match /my_portfolio_analytics/{document} {
      allow read: if true;
      allow write: if false; // Server-side only
    }
    
    // Views - server-side only
    match /views/{document} {
      allow read, write: if false; // Server-side only
    }
    
    // Messages - server-side only
    match /messages/{document} {
      allow read, write: if false; // Server-side only
    }
  }
}
```

Click **"Publish"**

---

## Schema Reference

### Collection: `my_portfolio_analytics`
**Document:** `my_portfolio`

```javascript
{
  total_views: number,        // Auto-incremented
  last_updated: timestamp     // Auto-updated
}
```

### Collection: `views`
**Document ID:** Auto-generated

```javascript
{
  page: string,               // e.g., "/", "/projects/kumbh-sahaiyak"
  referrer: string,            // HTTP referrer or "direct"
  userAgent: string,          // Browser user agent
  timestamp: timestamp,       // When view occurred
  date: string                // YYYY-MM-DD format
}
```

### Collection: `messages`
**Document ID:** Auto-generated

```javascript
{
  name: string,               // Sender's name
  email: string,              // Sender's email
  subject: string,            // Message subject
  message: string,            // Message content
  timestamp: timestamp,       // When sent
  date: string,               // YYYY-MM-DD format
  read: boolean,              // Default: false
  replied: boolean            // Default: false
}
```

---

## How It Works

1. **View Tracking**: Automatically tracks every page visit and stores in `views` collection
2. **Total Views**: Increments `total_views` in `my_portfolio_analytics` collection
3. **Messages**: Contact form submissions are stored in `messages` collection

All operations are server-side only for security!

