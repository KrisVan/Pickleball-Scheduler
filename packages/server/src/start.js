import { PickleballService } from "./pickle-ball-service.js";
import pino from 'pino';

const logger = pino();

export const start = async (port = 5000) => {
    logger.info('Starting PickleballService');
    const service = new PickleballService();
    const server = await service.start(port);
    return server;
}

start();
