/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export const apisRoute = async (fastify) => {
  fastify.get('/api/hello', async () => ({ hello: 'world' }));
};
