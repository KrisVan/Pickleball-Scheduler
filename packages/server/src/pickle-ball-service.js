import Fastify from 'fastify';
import pino from 'pino';
import { apisRoute } from './apis-route.js';

export class PickleballService {
  constructor() {
    this.pino = pino();
  }

  async start(port) {
    const fastify = Fastify({
      logger: true,
    });

    fastify.register(apisRoute);

    return fastify.listen({ port }, (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      this.pino.info(`server listening on ${address}`);
    });
  }
}
