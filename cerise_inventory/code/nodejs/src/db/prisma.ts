import { PrismaClient } from "@prisma/client";

export const getPrisma = async () => {
  const prisma: PrismaClient = new PrismaClient();

  return prisma;
};
