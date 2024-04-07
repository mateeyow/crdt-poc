import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { Server } from 'http';
import { createClient } from 'redis';
import { WebSocketServer } from 'ws';
import utils from 'y-websocket/bin/utils';

const redisClient = createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const app = new Hono();

const v1 = new Hono();
// const doc = new Y.Doc();

v1.use(cors()).use(logger());
v1.get('/expenses', async (c) => {
  const expenses = await redisClient.get('expenses');
  const data = JSON.parse(expenses ?? '[]');

  return c.json(data);
});
v1.post('/expenses', async (c) => {
  const body = await c.req.json();

  await redisClient.set('expenses', JSON.stringify(body));

  return c.text('synced!');
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/v1', v1);

await redisClient.connect();
const port = 3000;
console.log(`Server is running on port ${port}`);

const server = serve({
  fetch: app.fetch,
  port,
});

const ws = new WebSocketServer({ server: server as Server });

// ws.on('connection', utils.setupWSConnection);
ws.on('connection', (ws, req) => {
  utils.setupWSConnection(ws, req, {});

  ws.emit('connection', ws, req);
});
