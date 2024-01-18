import { createUser } from './user.controller.js';
import { $ref } from './user.schema.js';

export async function userRoutes(app) {
  app.get('/', (req, reply) => {
    reply.send({ message: '/users route hit' });
  });

  // Register
  app.post(
    '/register',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    createUser,
  );

  // Login
  app.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    () => {},
  );

  // Logout
  app.delete('/logout', () => {});

  app.log.info('user routes registered');
}
