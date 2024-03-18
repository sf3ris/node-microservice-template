import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { FastifyInstance } from 'fastify';

const secretsManager = new SecretsManager({
  region: process.env.AWS_REGION
});

export default async (app: FastifyInstance): Promise<void> => {
  const loadSecrets = async () => {
    if (areSecretsLoaded()) {
      return;
    }

    const result = await secretsManager.getSecretValue({ SecretId: process.env.AWS_SECRET_ID as string });

    if (result.SecretString === undefined) {
      throw new Error('AWS Secret string is empty');
    } else {
      const secrets = JSON.parse(result.SecretString);
      process.env['DB_HOST'] = secrets['host'];
      process.env['DB_PORT'] = secrets['port'];
      process.env['DB_USER'] = secrets['username'];
      process.env['DB_PASSWORD'] = secrets['password'];
      process.env['DB_NAME'] = secrets['dbname'];
      process.env['DB_REPLICA_HOST'] = secrets['replicaHost'] || '';
    }
  }

  app.decorate('secrets', {
    loadSecrets
  });
};

const areSecretsLoaded = (): boolean => {
  return process.env['DB_HOST'] !== undefined && process.env['DB_HOST'] !== '';
};

