# Mock Backend - Quick Reference

## 🔐 Demo Credentials

```
ADMIN:
  Email: admin@nu.edu.eg
  Password: admin123

STUDENT 1:
  Email: student1@nu.edu.eg
  Password: student123

STUDENT 2:
  Email: student2@nu.edu.eg
  Password: student123

REGISTER NEW:
  Any email ending in @nu.edu.eg
  With any password
```

## 🔧 Enable/Disable

```typescript
// src/environments/environment.ts
export const environment = {
  useMockBackend: true   // Set to false for real backend
};
```

## 📍 All API Endpoints (22 Total)

### Authentication (3)
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/me              - Get current user
```

### Clubs (5)
```
GET    /api/clubs                - List all clubs
GET    /api/clubs/:id            - Get club by ID
POST   /api/clubs                - Create club (admin)
PUT    /api/clubs/:id            - Update club (admin)
DELETE /api/clubs/:id            - Delete club (admin)
```

### Events (4)
```
GET    /api/events               - List all events
GET    /api/events/:id           - Get event by ID
POST   /api/events               - Create event (admin)
DELETE /api/events/:id           - Delete event (admin)
```

### Gallery (4)
```
GET    /api/gallery              - List all items
GET    /api/gallery/:id          - Get item by ID
POST   /api/gallery              - Create item (admin)
DELETE /api/gallery/:id          - Delete item (admin)
```

### Admin Management (3)
```
GET    /api/admins               - List all admins (admin)
POST   /api/admins               - Create admin (admin)
DELETE /api/admins/:id           - Delete admin (admin)
```

### Board Members (3)
```
GET    /api/board-members        - List all (admin)
POST   /api/board-members        - Create (admin)
DELETE /api/board-members/:id    - Delete (admin)
```

### Committees (5)
```
GET    /api/committees           - List all (admin)
POST   /api/committees           - Create (admin)
DELETE /api/committees/:id       - Delete (admin)
POST   /api/committees/:id/members        - Add member (admin)
DELETE /api/committees/:id/members/:userId - Remove member (admin)
```

## 💾 LocalStorage Keys

```javascript
// Authentication token
localStorage.getItem('token')

// Current user object
localStorage.getItem('currentUser')

// Full database
localStorage.getItem('mock_db')
```

## 🧪 Testing Commands (Browser Console)

```javascript
// Clear all data
localStorage.clear()

// View stored database
JSON.parse(localStorage.getItem('mock_db'))

// View current user
JSON.parse(localStorage.getItem('currentUser'))

// View token
localStorage.getItem('token')
```

## ❌ Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid credentials) |
| 403 | Forbidden (non-admin access) |
| 404 | Not Found (invalid ID) |
| 405 | Method Not Allowed |

## 🔍 Error Response Format

```typescript
{
  status: 400,
  statusText: 'Bad Request',
  error: {
    message: 'Email must be a NU email address (@nu.edu.eg)'
  }
}
```

## ✅ Validation Rules

| Field | Rule |
|-------|------|
| Email | Must end with `@nu.edu.eg` |
| Email | Must be unique |
| Password | Any value accepted |
| Admin Access | Requires `role === 'ADMIN'` |
| Token | Required for authenticated endpoints |

## 🎯 Common Use Cases

### User Registration
```
POST /api/auth/register
{
  "email": "student@nu.edu.eg",
  "password": "pass123",
  "firstName": "Ahmed",
  "lastName": "Hassan"
}
```

### User Login
```
POST /api/auth/login
{
  "email": "admin@nu.edu.eg",
  "password": "admin123"
}
```

### Create Club (Admin)
```
POST /api/clubs
{
  "name": "My Club",
  "email": "club@nu.edu.eg",
  "category": "Technology",
  "description": "Club description"
}
```

### Create Event (Admin)
```
POST /api/events
{
  "clubId": "1",
  "title": "Workshop",
  "startDate": "2024-01-25T10:00:00Z",
  "endDate": "2024-01-25T12:00:00Z",
  "location": "Building A",
  "capacity": 50
}
```

## 🚀 Quick Start

1. **Start App**: `npm start`
2. **Go to**: http://localhost:4200
3. **Login as Admin**: admin@nu.edu.eg / admin123
4. **Create Content**: Clubs, Events, Gallery items
5. **Clear Data**: `localStorage.clear()` in console

## 📝 Files Created

```
src/app/core/mock/
├── mock-db.service.ts           (420 lines)
└── mock-backend.interceptor.ts  (440 lines)

MOCK_BACKEND_GUIDE.md            (Complete documentation)
IMPLEMENTATION_SUMMARY.md         (Summary of changes)
QUICK_REFERENCE.md              (This file)
```

## 🔄 Data Flow

```
User Action
    ↓
HttpClient Request
    ↓
MockBackendInterceptor
    ↓
Check useMockBackend flag
    ↓
If true: Return mock response (via MockDbService)
If false: Pass to real backend
    ↓
Component receives response
```

## 💡 Pro Tips

1. **Clear data between tests**:
   ```javascript
   localStorage.clear()
   ```

2. **Check interceptor is loaded**:
   - Open DevTools → Application → LocalStorage
   - Should see `mock_db`, `token`, `currentUser`

3. **Verify admin access**:
   - Login as student
   - Try to access `/admin`
   - Should redirect to `/`

4. **Test validation**:
   - Register with `invalid@gmail.com` → Error 400
   - Register duplicate email → Error 400

5. **View network simulation**:
   - Open DevTools → Network
   - Network requests should show 300-500ms delay

## ⚠️ Important Notes

- ✓ Token is Base64 encoded (demo, not secure)
- ✓ Passwords not hashed (demo environment)
- ✓ Data only in localStorage (browser-specific)
- ✓ No actual email validation
- ✓ Single session per browser

## 🔗 Related Files

- Environment config: `src/environments/environment.ts`
- Auth Service: `src/app/core/services/auth.service.ts`
- Auth Guard: `src/app/core/guards/auth.guard.ts`
- Role Guard: `src/app/core/guards/role.guard.ts`
- App Config: `src/app/app.config.ts`

---

**Need more info?** See `MOCK_BACKEND_GUIDE.md` for detailed documentation.
