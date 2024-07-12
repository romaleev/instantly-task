import DB from '../db/index.js';

async function routes(fastify, options) {
  fastify.post('/emails', async (request, reply) => {
    const { to, cc, bcc, subject, body } = request.body;
    await DB.addEmail({ to, cc, bcc, subject, body });
    reply.send({ success: true });
  });

  fastify.get('/emails', async (request, reply) => {
    const emails = await DB.getEmails();
    reply.send(emails);
  });

  fastify.get('/emails/search', async (request, reply) => {
    const { query } = request.query;
    const results = await DB.searchEmails(query);
    reply.send(results);
  });
}

export default routes;
