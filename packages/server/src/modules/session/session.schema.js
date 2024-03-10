import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// Set sessions by usernbame
const getSessionByUserSchema = z.object({
  username: z.string().min(3),
});

// Update Session
const updateSessionSchema = z.object({
  creationDate: z.date().optional(),
  startTime: z.date(),
  endTime: z.date(),
  username: z.string().min(3).optional(),
});

// Export schemas as Jsons
// Returns all the schemas to register and a ref to refer these schemas
export const { schemas: sessionSchemas, $ref } = buildJsonSchemas({
  getSessionByUserSchema, updateSessionSchema,
}, { $id: 'sessionSchemas' });
