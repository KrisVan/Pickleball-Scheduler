import {
  handleCreateUser, handleGetUsers,
} from './user.controller.js';
import { $ref } from './user.schema.js';

export async function userRoutes(app) {
  // Get all users at /api/users. Requires authentication of logged in user
  app.get(
    '/',
    {
      preHandler: [app.verifyJWT],
    },
    handleGetUsers,
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
    handleCreateUser,
  );

  app.log.info('User routes registered');
}
