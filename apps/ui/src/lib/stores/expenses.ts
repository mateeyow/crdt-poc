import { createStore } from 'tinybase/store';
import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';

export const store = createStore();
export const persister = createIndexedDbPersister(store, 'sample');
