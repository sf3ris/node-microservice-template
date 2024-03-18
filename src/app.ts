import fastify from 'fastify';
import server from './server';

const app = fastify({
  logger: {
    level: 'debug',
  },
});
app.register(server);

if (require.main === module) {
  app.listen({ port: 3000 }, (err: Error | null) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
}

export default app;
