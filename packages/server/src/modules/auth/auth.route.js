import {
  handleLogin,
  handleLogout,
  handleRefreshToken,
} from './auth.controller.js';
import { $ref } from './auth.schema.js';

export async function authRoutes(app) {
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
    handleLogin,
  );

  // Logout. Login required.
  app.delete('/logout', handleLogout);

  //  Gives new access token if refresh token is still valid
  app.get(
    '/refreshtoken',
    handleRefreshToken,
  );

  app.log.info('Auth routes registered');
}
