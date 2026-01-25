# Mock Backend Implementation Guide

## Overview
This mock backend provides a fully functional in-memory database backed by localStorage, allowing the NU Student Clubs Management System frontend to work without any backend server.

## Configuration

### Enable/Disable Mock Backend
Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081',  // Still kept for reference
  useMockBackend: true                  // Set to false to use real backend
};
```

## Architecture

### 1. MockDbService (`src/app/core/mock/mock-db.service.ts`)
A localStorage-backed database service that provides CRUD operations for all entities:

**Entities:**
- Users (with roles: ADMIN, STUDENT)
- Admins
- Board Members
- Committees
- Clubs
- Events
- Gallery Items

**Key Methods:**
- `load()` - Load database from localStorage
- `save()` - Save database to localStorage
- `reset()` - Clear all data
- `seedIfEmpty()` - Seed demo data on first run
- Entity-specific CRUD methods (create, read, update, delete)

**Demo Data (Auto-seeded):**
- 1 Admin user: `admin@nu.edu.eg` (password: `admin123`)
- 2 Student users:
  - `student1@nu.edu.eg` (password: `student123`)
  - `student2@nu.edu.eg` (password: `student123`)
- 2 Clubs: "Tech Club" and "Sports Club"
- 2 Events associated with the clubs
- 2 Gallery items

### 2. MockBackendInterceptor (`src/app/core/mock/mock-backend.interceptor.ts`)
Intercepts all HTTP requests and returns mock responses with simulated delays (300-500ms).

**Supported Endpoints:**

#### Authentication
- `POST /api/auth/register` - Register new user (NU email validation)
- `POST /api/auth/login` - Login with email & password
- `GET /api/auth/me` - Get current user (requires token)

#### Clubs
- `GET /api/clubs` - List all clubs
- `GET /api/clubs/:id` - Get club by ID
- `POST /api/clubs` - Create club (admin only)
- `PUT /api/clubs/:id` - Update club (admin only)
- `DELETE /api/clubs/:id` - Delete club (admin only)

#### Events
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

#### Gallery
- `GET /api/gallery` - List all gallery items
- `GET /api/gallery/:id` - Get gallery item by ID
- `POST /api/gallery` - Create gallery item (admin only)
- `DELETE /api/gallery/:id` - Delete gallery item (admin only)

#### Admin Management
- `GET /api/admins` - List all admins (admin only)
- `POST /api/admins` - Create admin (admin only)
- `DELETE /api/admins/:id` - Delete admin (admin only)

#### Board Members
- `GET /api/board-members` - List board members (admin only)
- `POST /api/board-members` - Create board member (admin only)
- `DELETE /api/board-members/:id` - Delete board member (admin only)

#### Committees
- `GET /api/committees` - List committees (admin only)
- `POST /api/committees` - Create committee (admin only)
- `DELETE /api/committees/:id` - Delete committee (admin only)
- `POST /api/committees/:id/members` - Add member to committee (admin only)
- `DELETE /api/committees/:id/members/:userId` - Remove member from committee (admin only)

### 3. Enhanced AuthService (`src/app/core/services/auth.service.ts`)
Extended to store and retrieve current user information:

```typescript
interface CurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'STUDENT';
}

// Methods
getCurrentUser(): CurrentUser | null  // Get current user from localStorage
```

### 4. Updated Guards

**AuthGuard** (`src/app/core/guards/auth.guard.ts`)
- Checks for valid token
- Redirects to login if not authenticated

**RoleGuard** (`src/app/core/guards/role.guard.ts`)
- Checks if current user has ADMIN role
- Redirects to home if not admin
- Use for `/admin` routes

## Usage in Components

### Login/Register
```typescript
// Login
this.authService.login(email, password).subscribe(
  (response) => {
    // Token and user stored automatically
    const currentUser = this.authService.getCurrentUser();
    console.log('Logged in as:', currentUser);
  }
);

// Register
this.authService.signup({ email, password, firstName, lastName }).subscribe(
  (response) => {
    // Token and user stored automatically
  }
);

// Logout
this.authService.logout(); // Clears token and user
```

### HTTP Calls (Automatic with Interceptor)
All existing services work without changes:

```typescript
// These automatically get intercepted and return mock data
this.clubService.getAllClubs().subscribe(clubs => {
  console.log(clubs); // Returns mock clubs
});

this.eventService.getAllEvents().subscribe(events => {
  console.log(events); // Returns mock events
});
```

## Error Handling

Mock backend returns proper HTTP error responses:

- **400 Bad Request**
  - Invalid NU email format (@nu.edu.eg)
  - Email already registered
  - Missing required fields

- **401 Unauthorized**
  - Invalid login credentials
  - Missing authentication token
  - Invalid token

- **403 Forbidden**
  - Non-admin access to admin endpoints

- **404 Not Found**
  - Resource ID doesn't exist

- **405 Method Not Allowed**
  - Unsupported HTTP method on endpoint

Response format:
```typescript
{
  status: number,
  statusText: string,
  error: { message: string }
}
```

## Demo Credentials

### Admin Account
- Email: `admin@nu.edu.eg`
- Password: `admin123`

### Student Accounts
- Email: `student1@nu.edu.eg`
- Password: `student123`

- Email: `student2@nu.edu.eg`
- Password: `student123`

### Register New Student
Any email with `@nu.edu.eg` suffix can be registered with any password.

## LocalStorage Schema

```
Key: 'mock_db'
Value: {
  users: MockUser[],
  admins: MockAdmin[],
  boardMembers: MockBoardMember[],
  committees: MockCommittee[],
  clubs: MockClub[],
  events: MockEvent[],
  gallery: MockGalleryItem[]
}

Key: 'token'
Value: string (JWT-like token)

Key: 'currentUser'
Value: JSON string of CurrentUser
```

## Testing the Mock Backend

1. **Clear all localStorage:**
   ```javascript
   localStorage.clear();
   // App will re-seed on next load
   ```

2. **Manually seed data:**
   ```typescript
   // In browser console
   this.mockDb.reset();
   this.mockDb.seedIfEmpty();
   ```

3. **Check stored data:**
   ```javascript
   JSON.parse(localStorage.getItem('mock_db'));
   ```

## Switching to Real Backend

1. Set `useMockBackend: false` in `environment.ts`
2. Ensure your backend server is running at `http://localhost:8081`
3. Backend must implement the same API endpoints
4. No component changes needed - everything works via interceptor

## Limitations

- Token is simple Base64 encoded format for demo purposes
- No actual password hashing (demo only)
- Data persists only in localStorage (browser-specific)
- No concurrent session support
- All dates stored as ISO strings

## Files Created/Modified

### New Files
- `src/app/core/mock/mock-db.service.ts`
- `src/app/core/mock/mock-backend.interceptor.ts`

### Modified Files
- `src/environments/environment.ts` - Added `useMockBackend` flag
- `src/app/core/services/auth.service.ts` - Added user storage and retrieval
- `src/app/core/guards/auth.guard.ts` - Improved token checking
- `src/app/core/guards/role.guard.ts` - Implemented admin role checking
- `src/app/app.config.ts` - Registered MockBackendInterceptor

## Next Steps

1. Test all user flows:
   - Register new student with NU email
   - Login with admin credentials
   - Login with student credentials
   - Access admin dashboard (admin only)
   - Create clubs, events, gallery items (admin only)
   - View clubs, events, gallery (everyone)

2. Verify error handling:
   - Try invalid email format
   - Try duplicate email registration
   - Try wrong password
   - Try accessing admin routes without admin role

3. When backend is ready, simply set `useMockBackend: false` in environment.ts
