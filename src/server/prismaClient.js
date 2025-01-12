// src/server/prismaClient.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Initialize Prisma Client

export { prisma }; // Export for use in routes
