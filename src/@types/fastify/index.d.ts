import fastify from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
    secrets: {
      loadSecrets(): void
    }
  }
}
