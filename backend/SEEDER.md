# Admin Seeder Guide

This guide explains how to create an admin user using the seeder script, especially when connecting via PuTTY (SSH).

## Prerequisites

1. Node.js and npm installed on the server
2. MongoDB connection configured in `.env` file
3. All dependencies installed (`npm install`)

## Option 1: Using Environment Variables (Recommended)

### Step 1: Configure Environment Variables

Add the following variables to your `.env` file in the `backend` directory:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password_here
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
```

**Note:** If these variables are not set, the seeder will use default values:
- Email: `admin@example.com`
- Password: `admin123`
- First Name: `Admin`
- Last Name: `User`

### Step 2: Connect via PuTTY

1. Open PuTTY
2. Enter your server's hostname or IP address
3. Enter the port (usually 22 for SSH)
4. Click "Open"
5. Log in with your credentials

### Step 3: Navigate to Backend Directory

```bash
cd /path/to/your/project/backend
```

### Step 4: Run the Seeder

**If using TypeScript directly:**
```bash
npm run seed:admin
```

**Or if you need to build first and run from dist:**
```bash
npm run build
node dist/scripts/seed-admin.js
```

## Option 2: Using Command Line Arguments (Alternative)

You can also set environment variables directly in the command:

```bash
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=secure123 npm run seed:admin
```

## Option 3: Interactive Admin Creation

If you prefer an interactive approach that prompts for credentials:

```bash
npm run create-admin
```

This will prompt you to enter:
- Email
- Password
- First Name (optional)
- Last Name (optional)

## Running on Production Server via PuTTY

### Complete Step-by-Step Process:

1. **Connect to your server via PuTTY**
   ```
   Host: your-server-ip-or-domain
   Port: 22
   ```

2. **Navigate to the project directory**
   ```bash
   cd /var/www/your-project/backend
   # or wherever your project is located
   ```

3. **Ensure environment variables are set**
   ```bash
   # Edit .env file if needed
   nano .env
   # Add or update:
   # ADMIN_EMAIL=your-admin@email.com
   # ADMIN_PASSWORD=your-secure-password
   ```

4. **Install dependencies (if not already done)**
   ```bash
   npm install
   ```

5. **Run the seeder**
   ```bash
   npm run seed:admin
   ```

6. **Verify the output**
   You should see:
   ```
   === Seeding Admin User ===
   Email: admin@example.com
   
   ✅ Admin user created successfully!
   Email: admin@example.com
   Password: admin123
   ID: [user-id]
   ```

## Troubleshooting

### Error: "User with this email already exists"
- The admin user already exists in the database
- The seeder will skip creation and show a message

### Error: "Cannot find module"
- Make sure you're in the `backend` directory
- Run `npm install` to install dependencies

### Error: "MongoDB connection failed"
- Check your `.env` file has the correct `MONGODB_URI`
- Verify MongoDB is running and accessible

### Error: "ts-node not found"
- Install dependencies: `npm install`
- Or build the project first: `npm run build` then run from `dist/`

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env` files** with real credentials to version control
2. **Use strong passwords** for admin accounts
3. **Change default credentials** immediately after first login
4. **Limit SSH access** to your server
5. **Use environment variables** instead of hardcoding credentials

## Example .env Configuration

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Admin Seeder Configuration
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=ChangeThisPassword123!
ADMIN_FIRST_NAME=System
ADMIN_LAST_NAME=Administrator

# JWT Secret (if needed)
JWT_SECRET=your-jwt-secret-key
```

## Additional Commands

- **Build the project:** `npm run build`
- **Run in development mode:** `npm run start:dev`
- **Run in production mode:** `npm run start:prod`
- **Create admin interactively:** `npm run create-admin`


