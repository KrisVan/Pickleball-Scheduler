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

// Patch user schema
const patchUserByUsernameSchema = z.object({
  username: z.string().min(3).max(24).optional(),
  password: z.string().min(6).optional(),
  displayName: z.string().min(3).max(24).optional(),
  role: z.string().optional(),
  settings: z.object({
    color: z.string().optional(),
    theme: z.string().optional(),
  }).optional(),
});

// Create Session
const createSessionSchema = z.object({
  id: z.string().optional(),
  startTime: z.date(),
  endTime: z.date(),
});

// Update user settings schema
const updateUserSettingsSchema = z.object({
  username: z.string().min(3).max(24),
  color: z.string(),
  theme: z.string(),
});

// Export schemas as Jsons
// Returns all the schemas to register and a ref to refer these schemas
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  createSessionSchema,
  updateUserSchema,
  patchUserByUsernameSchema,
  updateUserSettingsSchema,
}, { $id: 'userSchemas' });
