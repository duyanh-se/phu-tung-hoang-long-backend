import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { RegisterDto } from '../src/auth/dto/register.dto';
import { PrismaClient, Role } from '../src/generated/prisma/client';

async function main() {
  const dto = plainToInstance(RegisterDto, {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    fullName: 'Hoàng Long Admin',
  });
  if (validateSync(dto).length)
    throw new Error(
      'Set valid ADMIN_EMAIL and ADMIN_PASSWORD (8-128 characters, lowercase, uppercase and digit) before seeding.',
    );
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
  try {
    const existing = await prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      if (existing.role !== Role.ADMIN)
        throw new Error(
          'Email belongs to a USER; seed will not promote an existing account.',
        );
      console.log('Admin already exists; no changes made.');
      return;
    }
    await prisma.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        passwordHash: await argon2.hash(dto.password),
        role: Role.ADMIN,
      },
    });
    console.log('Admin created.');
  } finally {
    await prisma.$disconnect();
  }
}
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
