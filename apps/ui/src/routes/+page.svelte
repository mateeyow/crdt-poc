<script lang="ts">
	import { store, persister } from '$lib/stores/expenses';
	import { onMount } from 'svelte';

	onMount(async () => {
		await persister.load();
		// store.setValues({ name: 'test', amount: 100 });
		// store.setTables({ pets: { fido: { species: 'dog', age: 3 } } });
		console.log('store.getValues()', store.getValues());
		// store.setValue('name', 'test2');
		console.log('store.getValues()', store.getValues());
		// store.setValues({ name: 'woalo', amount: 13000 });
		console.log('store.getValues()', store.getValues());
		console.log('store.getTables()', store.getTables());
		// await persister.save();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
