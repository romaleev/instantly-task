import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './src/routes/index.js';
import initDB from './src/db/migrations/init.js';  // Import the migration script

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
});

// Register the cors plugin
fastify.register(cors, {
  origin: 'http://localhost:3000'  // Allow only this origin to access the resources
});

// Run the migration script to initialize the database
initDB().then(() => {
  fastify.register(routes);

  fastify.listen({ port: 3001 }, function (err, address) { // Change the port to 3001
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
  });
}).catch(err => {
  fastify.log.error('Failed to initialize database:', err);
  process.exit(1);
});
