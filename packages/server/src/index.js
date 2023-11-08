// copied from https://fastify.dev
const port = 5000
// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
try {
  await fastify.listen({ port })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}