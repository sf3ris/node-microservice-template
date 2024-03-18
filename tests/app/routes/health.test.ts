import { afterEach, expect, test } from 'vitest'
import { build, teardown } from '../../helpers.ts';

afterEach(async () => {
  await teardown();
});

test('/health endpoint should return expected response if all services are up', async () => {
  const app = await build([]);
  const res = await app.inject({
    url: '/health',
  });

  expect(JSON.parse(res.payload)).toStrictEqual({
    status: 'UP',
  });
});
