import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// Define schemas for user. Consist of schemas and response schemas for different functions.

// Register: Register data, response schema
const createUserSchema = z.object({
  email: z.string().min(1),
  displayName: z.string().min(1),
  password: z.string().min(6),
});

const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  displayName: z.string(),
});

// Login: Login data, response schema
const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string().min(6),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

// Export schemas as Jsons
// Returns all the schemas to register and a ref to refer these schemas
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});