import pino from 'pino';
import { PickleballService } from './pickle-ball-service.js';

const logger = pino();

export const start = async (port = 5000) => {
  logger.info('Starting PickleballService');
  const service = new PickleballService();
  const server = await service.start(port);
  return server;
};

start();
