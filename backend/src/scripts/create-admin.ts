import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import * as readline from 'readline';

async function createAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  };

  try {
    console.log('=== Create Admin User ===\n');

    const email = await question('Email: ');
    const password = await question('Password: ');
    const firstName = await question('First Name (optional): ') || undefined;
    const lastName = await question('Last Name (optional): ') || undefined;

    const user = await usersService.create({
      email,
      password,
      firstName,
      lastName,
      role: 'admin',
      isActive: true,
    });

    console.log('\n✅ Admin user created successfully!');
    const userId = (user as any)._id?.toString() || (user as any).id?.toString() || 'N/A';
    console.log(`ID: ${userId}`);
    console.log(`Email: ${user.email}`);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
  } finally {
    rl.close();
    await app.close();
  }
}

createAdmin();

