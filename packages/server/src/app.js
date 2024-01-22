import Fastify from 'fastify';
import pino from 'pino';
import fjwt from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import cors from '@fastify/cors';

import { corsOptions } from './config/corsOptions.js';
import { userRoutes } from './modules/user/user.route.js';
import { userSchemas } from './modules/user/user.schema.js';

const app = Fastify({ logger: true });
const logger = pino();

// Start server at port
export const start = async (port = 5000, host = '0.0.0.0') => {
  logger.info('Starting PickleballService');
  await app.listen(
    {
      port,
      host,
    },
    // (err, address) => {
    (err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    },
  );
};
//----------------------------------------------------------------
// Cross Origin Resource Sharing
app.register(cors, corsOptions);

// Register routes
app.register(userRoutes, { prefix: 'api/users' });

// Add schemas to Fastify
Object.values(userSchemas).forEach((schema) => {
  app.addSchema(schema);
});

// Register fjwt
app.register(fjwt, { secret: process.env.ACCESS_TOKEN_SECRET });
// Hook to pass token to req obj as prehandler before route calls
app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});

// Register cookie to fastify
app.register(fCookie, {
  secret: process.env.REFRESH_TOKEN_SECRET,
  hook: 'preHandler',
});

// Authenticate via logged in user coookie
app.decorate(
  'authenticate',
  async (req, reply) => {
    const token = req.cookies.access_token;
    // If no token, user not authenticated
    if (!token) {
      return reply.status(401).send({ message: 'Authentication required' });
    }
    // Verify token with jwt
    const decoded = req.jwt.verify(token);
    // Attach current user payload to req
    req.user = decoded;
    return req.user;
  },
);

// Graceful shutdown
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

// Start server
console.log('Starting server');
start();
