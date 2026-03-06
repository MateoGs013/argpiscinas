/* eslint-disable no-console */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

const app = require('../src/app');

async function run() {
  const server = app.listen(0);

  try {
    await new Promise((resolve, reject) => {
      server.once('listening', resolve);
      server.once('error', reject);
    });

    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(`Health endpoint failed with status ${response.status}`);
    }

    if (payload.status !== 'ok') {
      throw new Error(`Unexpected health payload: ${JSON.stringify(payload)}`);
    }

    console.log(`Smoke health OK on :${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error('Smoke health failed:', error);
  process.exit(1);
});
