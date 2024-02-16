import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// Define schemas for user. Consist of schemas and response schemas for different functions.

// Register: Register data, response schema
const createUserSchema = z.object({
  username: z.string().min(3).max(24),
  displayName: z.string()
    .min(3)
    .max(24)
    .optional()
    .or(z.literal('')),
  password: z.string().min(6).max(24),
});

const createUserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
});

// Update user schema
const updateUserSchema = z.object({
  username: z.string().min(3).max(24),
  password: z.string().min(6),
  displayName: z.string().min(3).max(24),
  role: z.string(),
});

// Create Session
const createSessionSchema = z.object({
  startTime: z.date(),
  endTime: z.date(),
});

// Export schemas as Jsons
// Returns all the schemas to register and a ref to refer these schemas
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  createSessionSchema,
  updateUserSchema,
}, { $id: 'userSchemas' });
