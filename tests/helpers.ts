import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import server from '../src/server';

let app: FastifyInstance | null = null;

// Fill in this config with all the configurations
// needed for testing the application
export const config = (): { url: string } => ({
  url: 'http://localhost:3000',
});

/**
 * Automatically build and tear down our instance
 * @param {Object=} stubs eg,
 *    {
 *      // path to the component to mock starting from the helpers.ts location (wherere proxy is created).
 *      '../src/infrastructure/aws/s3client': {
 *         readFile: function () {
 *           return JSON.stringify(outputFileZeroSolutionsAsset);
 *         },
 *      ...
 *    }
 * @returns {Promise<FastifyInstance>}
 */
export const build = async (stubs: any = {}): Promise<FastifyInstance> => {
  app = Fastify();

  app.register(server, config());
  return app;
};

export const teardown = async () => {
  if (app) {
    await app.close();
    app = null;
  }
};
