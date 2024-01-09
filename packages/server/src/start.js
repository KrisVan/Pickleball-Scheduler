import pino from 'pino';
import { PickleballService } from './pickle-ball-service.js';

const logger = pino();

// Start server at port 5000
export const start = async (port = 5000) => {
  logger.info('Starting PickleballService');
  const service = new PickleballService();
  const server = await service.start(port);
  return server;
};

// Execute start server
console.log('Starting server');
start();
