import { PrismaPg } from '@prisma/adapter-pg';

import { env } from '@/env';

import { PrismaClient } from '../../prisma/generated/client';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
