# Firestore Database Schema

## Collections Structure

### 1. `my_portfolio_analytics` Collection

**Document ID:** `my_portfolio`

**Fields:**
```javascript
{
  total_views: number,        // Total number of page views (incremented automatically)
  last_updated: timestamp     // Last time the document was updated
}
```

**Purpose:** Tracks aggregate view statistics for the portfolio site.

---

### 2. `views` Collection

**Document ID:** Auto-generated (Firestore auto-ID)

**Fields:**
```javascript
{
  page: string,               // Page path (e.g., "/", "/projects/kumbh-sahaiyak")
  referrer: string,            // HTTP referrer or "direct"
  userAgent: string,           // Browser user agent string
  timestamp: timestamp,        // Exact time of the view
  date: string                // Date in YYYY-MM-DD format for easy querying
}
```

**Purpose:** Stores individual page view records for detailed analytics.

**Indexes Needed:**
- `date` (Ascending) - for date-based queries
- `timestamp` (Descending) - for recent views queries

---

### 3. `messages` Collection

**Document ID:** Auto-generated (Firestore auto-ID)

**Fields:**
```javascript
{
  name: string,               // Sender's name
  email: string,              // Sender's email address
  subject: string,            // Message subject
  message: string,            // Message content
  timestamp: timestamp,       // When the message was sent
  date: string,               // Date in YYYY-MM-DD format
  read: boolean,              // Whether message has been read (default: false)
  replied: boolean            // Whether message has been replied to (default: false)
}
```

**Purpose:** Stores contact form submissions.

**Indexes Needed:**
- `date` (Ascending) - for date-based queries
- `read` (Ascending) + `timestamp` (Descending) - for unread messages
- `timestamp` (Descending) - for recent messages

---

## Firestore Security Rules

Add these rules in Firestore Console → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Analytics collection - read only for everyone, write only from server
    match /my_portfolio_analytics/{document} {
      allow read: if true;
      allow write: if false; // Only server-side writes via Admin SDK
    }
    
    // Views collection - no client access (server-side only)
    match /views/{document} {
      allow read, write: if false; // Only server-side writes via Admin SDK
    }
    
    // Messages collection - no client access (server-side only)
    match /messages/{document} {
      allow read, write: if false; // Only server-side writes via Admin SDK
    }
  }
}
```

---

## How to Create Collections in Firestore Console

1. **Go to Firebase Console** → Your Project → Firestore Database

2. **Create `my_portfolio_analytics` collection:**
   - Click "Start collection"
   - Collection ID: `my_portfolio_analytics`
   - Document ID: `my_portfolio`
   - Add fields:
     - `total_views` (number) = 0
     - `last_updated` (timestamp) = current time

3. **Create `views` collection:**
   - Click "Start collection"
   - Collection ID: `views`
   - Document ID: Auto-ID (leave empty)
   - Fields will be added automatically by the API

4. **Create `messages` collection:**
   - Click "Start collection"
   - Collection ID: `messages`
   - Document ID: Auto-ID (leave empty)
   - Fields will be added automatically by the API

5. **Create Indexes:**
   - Go to Firestore → Indexes
   - Click "Create Index"
   - For `views` collection:
     - Index on: `date` (Ascending)
     - Index on: `timestamp` (Descending)
   - For `messages` collection:
     - Index on: `read` (Ascending), `timestamp` (Descending)
     - Index on: `date` (Ascending)
     - Index on: `timestamp` (Descending)

---

## Query Examples

### Get total views:
```javascript
const doc = await db.collection('my_portfolio_analytics').doc('my_portfolio').get()
const totalViews = doc.data()?.total_views || 0
```

### Get views for a specific date:
```javascript
const views = await db.collection('views')
  .where('date', '==', '2024-01-15')
  .get()
```

### Get unread messages:
```javascript
const unreadMessages = await db.collection('messages')
  .where('read', '==', false)
  .orderBy('timestamp', 'desc')
  .get()
```

### Get recent messages:
```javascript
const recentMessages = await db.collection('messages')
  .orderBy('timestamp', 'desc')
  .limit(10)
  .get()
```

