import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export const yDoc = new Y.Doc();
const wsProvider = new WebsocketProvider('ws://localhost:3000', 'sync-expenses', yDoc);

wsProvider.on('status', (event: any) => {
	console.log('Status:', event.status, event);
});
