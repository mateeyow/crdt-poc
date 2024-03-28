import { createStore } from 'tinybase/with-schemas';
import type { Store } from 'tinybase/store';
import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';
import { createRemotePersister } from 'tinybase/persisters/persister-remote';

const schemaStore = createStore();

const expensesSchema = {
	amount: { type: 'number' },
	description: { type: 'string' }
} as const;

export const store = schemaStore.setTablesSchema({
	expenses: expensesSchema
});

export const dbPersister = createIndexedDbPersister(store as Store, 'frugal.fund');
export const remotePersister = createRemotePersister(
	store as Store,
	'http://localhost:3000/api/v1/expenses',
	'http://localhost:3000/api/v1/expenses',
	10,
	(err) => console.error(err)
);
