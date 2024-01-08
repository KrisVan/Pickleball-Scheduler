import pino from 'pino';
import { PrismaClient } from '@prisma/client';
import { PickleballService } from './pickle-ball-service.js';

const logger = pino();
//const prisma = new PrismaClient({ errorFormat: 'minimal' });

// Start server at port 5000
export const start = async (port = 5000) => {
  logger.info('Starting PickleballService');
  const service = new PickleballService();
  const server = await service.start(port);
  return server;
};

// Execute start server
console.log('Start server');
start();
