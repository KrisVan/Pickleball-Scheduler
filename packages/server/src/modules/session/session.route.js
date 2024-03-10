import {
  handleGetSessions, handleGetSessionsBySessionID,
  handleUpdateSession, handleDeleteSession,
} from './session.controller.js';
import { $ref } from './session.schema.js';

export async function sessionRoutes(app) {
  // Get all sessions at /api/sessions. Requires auth
  app.get(
    '/',
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

  // Update session by id at Put /api/session/:id. Requires auth
  app.put(
    '/:id',
    {
      preHandler: [app.verifyJWT],
      schema: {
        body: $ref('updateSessionSchema'),
      },
    },
    handleUpdateSession,
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
