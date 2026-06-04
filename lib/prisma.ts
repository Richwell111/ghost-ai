import { PrismaClient } from '../app/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { withAccelerate } from '@prisma/extension-accelerate';
import pg from 'pg';

const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL || '';

  if (databaseUrl.startsWith('prisma+postgres://')) {
    return new PrismaClient({
      accelerateUrl: databaseUrl,
    }).$extends(withAccelerate());
  }

  const pool = new pg.Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
