/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

export const apisRoute = async (fastify) => {
  // Run a python script https://medium.com/swlh/run-python-script-from-node-js-and-send-data-to-browser-15677fcf199f
  // fastify.get('/api/runPythonScript', async () => {
  //   child_process.spawn('python', ['-u', './scripts/runPythonScript.py'])
  // });
  // Hello world
  fastify.get('/api/hello', async () => ({ hello: 'world' }));
};
