# Getting Started with Mock Backend

## 🎯 5-Minute Quick Start

### 1. Install Dependencies (if not already done)
```bash
cd nu-student-clubs-frontend
npm install
```

### 2. Start the Application
```bash
npm start
```
Application will be available at `http://localhost:4200`

### 3. Login as Admin
- Navigate to the login page
- **Email**: `admin@nu.edu.eg`
- **Password**: `admin123`
- Click Login → Redirected to dashboard

### 4. Create Content
- **Create Club**: Admin Dashboard → Clubs → Create
  - Fill in club name, email, category
  - Submit → Club appears in list
- **Create Event**: Admin Dashboard → Events → Create
  - Select club, add title, date, location
  - Submit → Event appears in list
- **Upload Gallery**: Admin Dashboard → Gallery → Upload
  - Select club, image, title, description
  - Submit → Image appears in gallery

### 5. Test as Student
- Open new browser tab (or private/incognito)
- Register new account
  - Email: `newstudent@nu.edu.eg` (must end in @nu.edu.eg)
  - Password: anything
  - Click Register
- Login with new account
- View clubs, events, gallery (read-only)

## 📋 What's Already Set Up

✅ **Demo Users Created**
```
Admin: admin@nu.edu.eg / admin123
Student 1: student1@nu.edu.eg / student123
Student 2: student2@nu.edu.eg / student123
```

✅ **Demo Data Available**
- 2 Clubs
- 2 Events
- 2 Gallery Items
- 2 Board Members
- 2 Committees
- All linked and ready to use

✅ **Mock Backend Enabled**
- All HTTP requests intercepted
- Responses simulated (300-500ms delay)
- Data persists in browser localStorage
- Works completely offline

## 🔐 User Roles & Permissions

### Admin Role
- Access `/admin` dashboard
- Create/Edit/Delete clubs
- Create/Edit/Delete events
- Upload/Delete gallery items
- Manage board members
- Manage committees
- Manage other admins

### Student Role
- Register with NU email
- View clubs
- View events
- View gallery
- Cannot create/edit/delete content

## 🧪 Common Testing Scenarios

### Test 1: Admin Creates Club
```
1. Login as admin@nu.edu.eg
2. Go to Admin → Clubs
3. Click "Create New Club"
4. Fill in details:
   - Name: "Photography Club"
   - Email: "photo@nu.edu.eg"
   - Category: "Arts"
5. Click Create
✅ Club appears in list
```

### Test 2: Register New Student
```
1. Click "Logout" (if logged in)
2. Click "Register"
3. Fill in:
   - Email: "yourname@nu.edu.eg"
   - Password: "anything"
   - First Name: "Your Name"
   - Last Name: "Last Name"
4. Click Register
✅ Auto-login and redirected to dashboard
```

### Test 3: Student Tries Admin Page
```
1. Register as new student
2. Try to access /admin URL
3. Browser redirects to home
✅ Non-admin users cannot access admin area
```

### Test 4: Invalid Email Registration
```
1. Click "Register"
2. Enter: "student@gmail.com"
3. Click Register
❌ Error: "Email must be a NU email address"
```

### Test 5: Duplicate Email
```
1. Register: "test@nu.edu.eg"
2. Try to register same email again
❌ Error: "Email already registered"
```

## 💾 Data Management

### View Stored Data (Browser Console)
```javascript
// Open DevTools (F12) → Console tab
// View all stored data
JSON.parse(localStorage.getItem('mock_db'))

// View current user
JSON.parse(localStorage.getItem('currentUser'))

// View token
localStorage.getItem('token')
```

### Clear All Data & Reset
```javascript
// This will clear everything
localStorage.clear()

// Refresh page - auto-seeded with fresh demo data
location.reload()
```

### Seed Fresh Demo Data (without clearing)
```javascript
// In console (requires access to service)
// Reset to clean state
localStorage.removeItem('mock_db')
location.reload()
```

## 🔧 Configuration

### Enable Real Backend
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://your-backend-url:8081',
  useMockBackend: false  // ← Change this to false
};
```

Then restart: `npm start`

**No other code changes needed!** All services work with real backend.

### Disable Mock Backend (Keep using it)
Edit `src/environments/environment.ts`:
```typescript
useMockBackend: true  // Already true
```

## 📊 Network Delays

Mock backend simulates real network delays:
- Auth requests: ~500ms
- CRUD operations: ~500ms
- GET requests: ~300ms

View in DevTools Network tab (F12 → Network)

## 🐛 Troubleshooting

### Issue: Data lost after page refresh
**Solution**: Mock backend stores data in localStorage. Check:
```javascript
localStorage.getItem('mock_db')  // Should not be null
```

### Issue: Can't login
**Solution**: Try demo credentials exactly:
- Email: `admin@nu.edu.eg`
- Password: `admin123`

### Issue: Admin page shows but can't access
**Solution**: Make sure you're logged in as admin:
```javascript
JSON.parse(localStorage.getItem('currentUser')).role  // Should be "ADMIN"
```

### Issue: Getting 403 Forbidden errors
**Solution**: 403 = You're trying to do admin operation as student
- Create content only as admin
- Use `admin@nu.edu.eg` for testing admin features

### Issue: Getting validation errors
**Solution**: Check error message:
- "Email must be a NU email" → Use `@nu.edu.eg` domain
- "Email already registered" → Use different email
- "Missing required fields" → Fill all fields

### Issue: TypeScript errors in IDE
**Solution**: Dependencies issue:
```bash
npm install
npm start
```

## 📚 Documentation

For detailed information:
- `QUICK_REFERENCE.md` - All endpoints and credentials
- `MOCK_BACKEND_GUIDE.md` - Architecture and implementation
- `IMPLEMENTATION_SUMMARY.md` - Summary of changes

## 🎓 Learning Resources

### Understand the Flow
```
User Action → HttpClient Call → MockBackendInterceptor
→ MockDbService → LocalStorage → HttpResponse
→ Component Receives Data
```

### Key Files
- **Services**: `src/app/core/services/` (use HttpClient)
- **Interceptor**: `src/app/core/mock/mock-backend.interceptor.ts`
- **Database**: `src/app/core/mock/mock-db.service.ts`
- **Guards**: `src/app/core/guards/auth.guard.ts`, `role.guard.ts`
- **Config**: `src/app/app.config.ts`

## ✨ Pro Tips

1. **Fast Testing**: Use browser's private/incognito mode for multiple users
2. **Debug Data**: Always check localStorage to verify data is saved
3. **Clear Sessions**: Different localStorage per tab/window
4. **Simulate Errors**: Try invalid emails, duplicate registrations
5. **Check Types**: All entities are TypeScript-typed for IDE support

## 🚀 Next Steps

1. **Explore UI**: Login and navigate all pages
2. **Create Content**: Add clubs, events, gallery items as admin
3. **Test Flows**: Register students, verify access controls
4. **Check Data**: Verify localStorage has correct structure
5. **Review Code**: See how interceptor works
6. **When Backend Ready**: Set `useMockBackend: false`

## ❓ Questions?

Refer to relevant documentation:
- **Endpoints**: See `QUICK_REFERENCE.md`
- **Architecture**: See `MOCK_BACKEND_GUIDE.md`
- **Changes Made**: See `IMPLEMENTATION_SUMMARY.md`
- **Verification**: See `VERIFICATION_CHECKLIST.md`

---

**Ready to develop!** The mock backend is fully functional and your frontend works completely offline.
