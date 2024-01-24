import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// Define schemas for user. Consist of schemas and response schemas for different functions.

// Register: Register data, response schema
const createUserSchema = z.object({
  username: z.string().min(3).max(24),
  password: z.string().min(6).max(24),
});

const createUserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
});

// Login: Login data, response schema
const loginSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }),
  password: z.string().min(6),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
  username: z.string(),
  displayName: z.string(),
  role: z.string(),
});

// Export schemas as Jsons
// Returns all the schemas to register and a ref to refer these schemas
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});
