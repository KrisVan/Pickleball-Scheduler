import {
  handleGetSessions, handleGetSessionsBySessionID,
  handleDeleteSession,
} from './session.controller.js';

export async function sessionRoutes(app) {
  // Get all users at /api/sessions. Requires auth
  app.get(
    '/',
    {
      preHandler: [app.verifyJWT],
    },
    handleGetSessions,
  );

  // Get session at /api/sessions/:sessionid. Requires auth
  app.get(
    '/:sessionid',
    {
      preHandler: [app.verifyJWT],
    },
    handleGetSessionsBySessionID,
  );

  // Delete a session given ID at /api/sessions/. Requires auth
  app.delete(
    '/:sessionid',
    {
      preHandler: [app.verifyJWT],
    },
    handleDeleteSession,
  );

  app.log.info('Session routes registered');
}
