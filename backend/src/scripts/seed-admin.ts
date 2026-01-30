import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const configService = app.get(ConfigService);

  try {
    // Get admin credentials from environment variables or use defaults
    const email = configService.get<string>('ADMIN_EMAIL') || process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = configService.get<string>('ADMIN_PASSWORD') || process.env.ADMIN_PASSWORD || 'admin123';
    const firstName = configService.get<string>('ADMIN_FIRST_NAME') || process.env.ADMIN_FIRST_NAME || 'Admin';
    const lastName = configService.get<string>('ADMIN_LAST_NAME') || process.env.ADMIN_LAST_NAME || 'User';

    console.log('=== Seeding Admin User ===');
    console.log(`Email: ${email}`);

    // Check if admin already exists
    const existingUser = await usersService.findByEmail(email);
    if (existingUser) {
      console.log('✅ Admin user already exists!');
      console.log(`Email: ${email}`);
      await app.close();
      return;
    }

    // Create admin user
    const user = await usersService.create({
      email,
      password,
      firstName,
      lastName,
      role: 'admin',
      isActive: true,
    });

    console.log('\n✅ Admin user created successfully!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`ID: ${(user as any)._id?.toString() || (user as any).id?.toString() || 'N/A'}`);
  } catch (error: any) {
    console.error('\n❌ Error creating admin:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  } finally {
    await app.close();
  }
}

seedAdmin();

