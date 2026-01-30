# BCC Website Backend

NestJS backend API for BCC Website with MongoDB.

## Features

- 🔐 Authentication with JWT and HTTP-only cookies
- 👥 User management (Admin can create, update, deactivate admins)
- 📧 Contact form submissions
- 🛡️ Role-based access control

## Prerequisites

- Node.js (v18 or higher)
- MongoDB running on `localhost:27017`
- npm or yarn

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/bcc_website
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## Running the app

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/login` - Login (creates HTTP-only cookie)
- `POST /auth/logout` - Logout (clears cookie)

### Users (Admin only)
- `GET /users` - Get all users
- `POST /users` - Create new admin user
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `PATCH /users/:id/toggle-active` - Activate/Deactivate user
- `DELETE /users/:id` - Delete user

### Contacts
- `POST /contacts` - Create contact (public)
- `GET /contacts` - Get all contacts (Admin only)
- `GET /contacts/:id` - Get contact by ID (Admin only)
- `DELETE /contacts/:id` - Delete contact (Admin only)

## Creating First Admin

You can create the first admin user using MongoDB directly or through the API after setting up authentication.

## Security

- Passwords are hashed using bcrypt
- JWT tokens stored in HTTP-only cookies
- Admin routes protected with guards
- Deactivated users cannot login







