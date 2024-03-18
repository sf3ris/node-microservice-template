import fastifyHelmet from '@fastify/helmet';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { IncomingMessage, Server, ServerResponse } from 'http';
import secrets from './plugins/secrets';
import health from './routes/health';

export default async (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _: FastifyPluginOptions,
  next: (error?: Error) => void,
): Promise<void> => {
  fastify.setErrorHandler(async (error, req, reply) => {
    fastify.log.error(error.stack);
    return reply.status(500).send(error);
  });

  fastify.log.info('Registering health endpoint');
  await fastify.register(health);

  fastify.log.info('Registering helmet endpoint');
  await fastify.register(fastifyHelmet);

  fastify.log.info('Registering secrets manager pluging');
  await fastify.register(fp(secrets));
  fastify.log.info('Retrieving environment variables from secret manager');
  fastify.log.info(fastify.hasDecorator('secrets') ? 'true' : 'false');
  fastify.secrets.loadSecrets();

  next();
};
