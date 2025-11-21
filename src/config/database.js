import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DO NOT use prisma.$on("beforeExit") — removed due to Prisma library engine changes
// Modern Prisma automatically manages connection lifecycle properly.

export default prisma;
