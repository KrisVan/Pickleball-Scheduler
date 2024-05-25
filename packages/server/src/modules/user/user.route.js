import {
  handleCreateUser, handleGetUsers, handleGetUserByUsername,
  handleGetSessionsByUser, handlePostSessionsByUser,
  handleUpdateUser, handlePatchUserByUsername, handleDeleteUser,
  handleGetSettingByUsername, handleUpdateSettingByUsername,
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
  // Register new user
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
  // Get user by username at /api/users/username. Requires auth
  app.get(
    '/:username',
    {
      preHandler: [app.verifyJWT],
    },
    handleGetUserByUsername,
  );
  // Update user by id at Put /api/users/:id. Requires auth
  app.put(
    '/:id',
    {
      preHandler: [app.verifyJWT],
      schema: {
        body: $ref('updateUserSchema'),
      },
    },
    handleUpdateUser,
  );
  // Patch user by id at Put /api/users/:id. Use optional values Requires auth
  app.patch(
    '/:username',
    {
      preHandler: [app.verifyJWT],
      schema: {
        body: $ref('patchUserByUsernameSchema'),
      },
    },
    handlePatchUserByUsername,
  );
  // Delete a user given username at /api/users/:username. Requires auth
  app.delete(
    '/:username',
    {
      preHandler: [app.verifyJWT],
    },
    handleDeleteUser,
  );

  // Get all sessions at /api/users/:username/sessions. Requires auth
  app.get(
    '/:username/sessions',
    {
      preHandler: [app.verifyJWT],
    },
    handleGetSessionsByUser,
  );
  // Create new session at /api/sessions/:username. Requires auth
  app.post(
    '/:username/sessions',
    {
      preHandler: [app.verifyJWT],
      schema: {
        body: $ref('createSessionSchema'),
      },
    },
    handlePostSessionsByUser,
  );

  // Get settings at /api/users/:username/settings.
  app.get(
    '/:username/settings',
    handleGetSettingByUsername,
  );
  // Update user settings by username at Put /api/users/:username/settings. Requires auth
  app.put(
    '/:username/settings',
    {
      preHandler: [app.verifyJWT],
      schema: {
        body: $ref('updateUserSettingsSchema'),
      },
    },
    handleUpdateSettingByUsername,
  );

  app.log.info('User routes registered');
}
