# Backend Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bcc_website
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

3. **Make sure MongoDB is running**
   ```bash
   # If MongoDB is installed locally, start it:
   mongod
   ```

4. **Create First Admin User**
   ```bash
   npm run create-admin
   ```
   Follow the prompts to create your first admin account.

5. **Start the Server**
   ```bash
   npm run start:dev
   ```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication
- **POST** `/auth/login`
  - Body: `{ "email": "admin@example.com", "password": "password123" }`
  - Sets HTTP-only cookie with JWT token
  - Returns: `{ "message": "Login successful", "user": {...} }`

- **POST** `/auth/logout`
  - Clears the authentication cookie

### Users Management (Admin Only)
- **GET** `/users` - Get all users
- **POST** `/users` - Create new admin
  - Body: `{ "email": "...", "password": "...", "firstName": "...", "lastName": "..." }`
- **GET** `/users/:id` - Get user by ID
- **PATCH** `/users/:id` - Update user
- **PATCH** `/users/:id/toggle-active` - Activate/Deactivate user
- **DELETE** `/users/:id` - Delete user

### Contacts (Public to create, Admin to view)
- **POST** `/contacts` - Create contact (Public)
  - Body: `{ "firstName": "...", "lastName": "...", "email": "...", "phone": "...", "message": "..." }`
- **GET** `/contacts` - Get all contacts (Admin only)
- **GET** `/contacts/:id` - Get contact by ID (Admin only)
- **DELETE** `/contacts/:id` - Delete contact (Admin only)

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **HTTP-Only Cookies**: JWT tokens are stored in HTTP-only cookies (not accessible via JavaScript)
3. **Role-Based Access**: Admin routes are protected
4. **Account Status**: Deactivated users cannot login
5. **CORS**: Configured to allow requests from frontend

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}' \
  -c cookies.txt
```

### Get Users (requires authentication)
```bash
curl -X GET http://localhost:3000/users \
  -b cookies.txt
```

### Create Contact (public)
```bash
curl -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","message":"Hello"}'
```







