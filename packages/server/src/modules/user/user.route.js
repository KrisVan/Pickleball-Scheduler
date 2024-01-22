import {
  createUser, getUsers, login, logout,
} from './user.controller.js';
import { $ref } from './user.schema.js';

export async function userRoutes(app) {
  // Get all users at /api/users. Requires authentication of logged in user
  app.get(
    '/',
    {
      preHandler: [app.authenticate],
    },
    getUsers,
  );
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
    login,
  );

  // Logout. Login required.
  app.delete('/logout', { preHandler: [app.authenticate] }, logout);

  app.log.info('user routes registered');
}
