import Fastify from 'fastify';
import pino from 'pino';
import dotenv from 'dotenv';
import fjwt from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import cors from '@fastify/cors';

import { corsOptions } from './config/corsOptions.js';
import { authRoutes } from './modules/auth/auth.route.js';
import { authSchemas } from './modules/auth/auth.schema.js';
import { userRoutes } from './modules/user/user.route.js';
import { userSchemas } from './modules/user/user.schema.js';
import { sessionRoutes } from './modules/session/session.route.js';
import { sessionSchemas } from './modules/session/session.schema.js';

import { verifyJWT } from './middleware/verifyJWT.js';

// Set environment variables
dotenv.config({ path: '.env', debug: true, encoding: 'UTF-8' });

const app = Fastify({ logger: true });
const logger = pino();

// Start server at port
export const start = async (port = 5000, host = '0.0.0.0') => {
  logger.info('Starting PickLeTimeService');
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
app.register(authRoutes, { prefix: 'api/auth' });
app.register(sessionRoutes, { prefix: 'api/sessions' });

// Add schemas to Fastify
Object.values(userSchemas).forEach((schema) => {
  app.addSchema(schema);
});
Object.values(authSchemas).forEach((schema) => {
  app.addSchema(schema);
});
Object.values(sessionSchemas).forEach((schema) => {
  app.addSchema(schema);
});

// Register access fjwt
app.register(fjwt, {
  secret: process.env.JWT_TOKEN_SECRET,
});

// Hook to pass token to req obj as prehandler before route calls
app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});

// Register cookie to fastify
app.register(fCookie, {
  secret: process.env.JWT_TOKEN_SECRET,
  hook: 'preHandler',
});

// Middleware to verify access JWT sent from client
app.decorate(
  'verifyJWT',
  verifyJWT,
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
