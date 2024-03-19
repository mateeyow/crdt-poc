import { createStore } from 'tinybase/with-schemas';
import type { Store } from 'tinybase/store';
import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';

const schemaStore = createStore();

const expensesSchema = {
	amount: { type: 'number' },
	description: { type: 'string' }
} as const;

export const store = schemaStore.setTablesSchema({
	expenses: expensesSchema
});

export const persister = createIndexedDbPersister(store as Store, 'frugal.fund');
