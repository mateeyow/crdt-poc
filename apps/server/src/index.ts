import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const data = [
  {
    expenses: {
      '0': {
        amount: 5,
        description: 'moo',
      },
      '1': {
        amount: 30,
        description: 'helo',
      },
      '2': {
        amount: 10,
        description: 'haw',
      },
      '3': {
        amount: 5,
        description: 'bew',
      },
    },
  },
  {},
];

const app = new Hono();

const v1 = new Hono();

v1.use(cors()).use(logger());
v1.get('/expenses', (c) => {
  return c.json(data);
});
v1.post('/expenses', (c) => {
  return c.text('synced!');
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/v1', v1);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
