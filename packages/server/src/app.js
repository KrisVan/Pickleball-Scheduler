import Fastify from 'fastify';
import pino from 'pino';
import { userRoutes } from './modules/user/user.route.js';
import { userSchemas } from './modules/user/user.schema.js';

const app = Fastify({ logger: true });
const logger = pino();

// Test
app.get('/test', (req, res) => {
  res.send({ message: 'Success' });
});

// Register routes
app.register(userRoutes, { prefix: 'api/users' });

// Add schemas to Fastify
Object.values(userSchemas).forEach((schema) => {
  app.addSchema(schema); 
});

// Graceful shutdown
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

// Start server at port
export const start = async (port = 5000, host = '0.0.0.0') => {
  logger.info('Starting PickleballService');
  await app.listen(
    {
      port,
      host,
    },
    (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      logger.info(`server listening on ${address}`);
    },
  );
};

console.log('Starting server');
start();
