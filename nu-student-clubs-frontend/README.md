# NU Student Clubs Management System - Frontend

This is the Angular frontend application for the NU Student Clubs Management System. The project is designed with a scalable architecture following Angular best practices.

## Project Structure

```
nu-student-clubs-frontend/
│
├── src/
│   ├── app/
│   │   ├── core/                  # App-wide logic
│   │   │   ├── guards/             # Auth & Role-based access guards
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   ├── interceptors/       # JWT & error handling
│   │   │   │   ├── jwt.interceptor.ts
│   │   │   │   └── error.interceptor.ts
│   │   │   └── services/           # Core services
│   │   │       ├── auth.service.ts
│   │   │       ├── user.service.ts
│   │   │       └── api.service.ts
│   │   │
│   │   ├── shared/                # Reusable UI & models
│   │   │   ├── components/         # Shared components
│   │   │   │   ├── navbar.component.ts
│   │   │   │   └── sidebar.component.ts
│   │   │   └── models/             # Interfaces / DTOs
│   │   │       ├── user.model.ts
│   │   │       ├── club.model.ts
│   │   │       └── event.model.ts
│   │   │
│   │   ├── pages/                 # Main application pages
│   │   │   ├── auth/               # Login / Register
│   │   │   │   └── auth.module.ts
│   │   │   ├── dashboard/          # Dashboard
│   │   │   │   └── dashboard.module.ts
│   │   │   ├── clubs/              # Clubs + membership
│   │   │   │   └── clubs.module.ts
│   │   │   ├── events/             # Events
│   │   │   │   └── events.module.ts
│   │   │   ├── gallery/            # Gallery
│   │   │   │   └── gallery.module.ts
│   │   │   └── admin/              # Admin management pages
│   │   │       └── admin.module.ts
│   │   │
│   │   ├── app.routes.ts           # Main routing configuration
│   │   ├── app.ts                  # Root component
│   │   ├── app.config.ts           # App configuration
│   │   └── app.css                 # Global styles
│   │
│   ├── assets/                     # Static assets
│   ├── environments/               # Environment configurations
│   │   ├── environment.ts          # Development environment
│   │   └── environment.prod.ts     # Production environment
│   └── styles.css                  # Global styles
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Architecture Highlights

### Core Module
- **Guards**: Authentication and role-based access control
- **Interceptors**: JWT token injection and error handling
- **Services**: API communication and authentication management

### Shared Module
- **Components**: Reusable UI components (Navbar, Sidebar)
- **Models**: Type-safe interfaces for data models

### Pages Module
- Lazy-loaded feature modules for each major section
- Each module handles its own routing and components

## Setup & Installation

### Prerequisites
- Node.js 20+ 
- Angular CLI 21+
- npm or yarn package manager

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd nu-student-clubs-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Update `src/environments/environment.ts` with your local API URL
   - Update `src/environments/environment.prod.ts` with production API URL

## Development server

To start a local development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

For production build:

```bash
ng build --configuration production
```

## Running tests

Unit tests:
```bash
ng test
```

End-to-end tests:
```bash
ng e2e
```

## Available Routes

- `/auth` - Authentication (login/register)
- `/dashboard` - Dashboard view
- `/clubs` - Clubs listing and management
- `/events` - Events listing
- `/gallery` - Gallery/photos
- `/admin` - Admin management panel

## Environment Configuration

The application uses environment-specific configuration files:

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

Configure API endpoints and other settings in these files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Documentation](https://angular.io/cli).

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
