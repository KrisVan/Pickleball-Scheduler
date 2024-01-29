import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// Define schemas for auth. Consist of schemas and response schemas for different handlers.
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
export const { schemas: authSchemas, $ref } = buildJsonSchemas({
  loginSchema,
  loginResponseSchema,
}, { $id: 'authSchemas' });
