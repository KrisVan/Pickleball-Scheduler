import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// Set sessions by usernbame
const getSessionByUserSchema = z.object({
  username: z.string().min(3),
});

// Export schemas as Jsons
// Returns all the schemas to register and a ref to refer these schemas
export const { schemas: sessionSchemas, $ref } = buildJsonSchemas({
  getSessionByUserSchema,
}, { $id: 'sessionSchemas' });
