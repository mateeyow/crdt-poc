<script lang="ts">
	import { store, dbPersister, remotePersister, yjsPersister, doc } from '$lib/stores/expenses';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import { WebsocketProvider } from 'y-websocket';

	let expenses = store.getTable('expenses');

	const onSubmit = async (evt: SubmitEvent) => {
		const target = evt.target as HTMLFormElement;
		const formData = new FormData(target);
		const amount = formData.get('amount');
		const description = formData.get('description') as string;

		store.setRow('expenses', crypto.randomUUID(), {
			amount: Number(amount),
			description,
			date: Date.now()
		});

		// await dbPersister.save();
		// await remotePersister.save();

		target.reset();
	};

	const parseDate = (date?: number) => {
		if (!date) return '';

		return dayjs(date).format('MMMM DD YYYY HH:mm');
	};

	onMount(() => {
		const wsProvider = new WebsocketProvider('ws://localhost:3000', 'sync-expenses', doc);

		wsProvider.on('status', (event: any) => {
			console.log('Status:', event.status, event);
		});

		// async function loadData() {
		// 	// await remotePersister.load();
		// 	// await dbPersister.load();
		// }

		// loadData();
		const listener = store.addTableListener('expenses', (store) => {
			expenses = store.getTable('expenses');
		});

		return () => {
			store.delListener(listener);
		};
	});
</script>

<main>
	<h1>Expenses</h1>

	<form on:submit|preventDefault={onSubmit}>
		<label>
			<span>Amount</span>
			<input type="number" name="amount" required />
		</label>

		<label>
			<span>Description</span>
			<textarea name="description"></textarea>
		</label>

		<button type="submit">Add</button>
	</form>

	<p>List of expenses</p>

	<ul>
		{#each Object.keys(expenses) as expense (expense)}
			<li>
				<span>Amount: {expenses[expense].amount}</span>
				<span>Description: {expenses[expense].description}</span>
				<span>Date: {parseDate(expenses[expense].date)}</span>
			</li>
		{/each}
	</ul>
</main>

<style>
	label {
		display: block;
		margin-bottom: 1rem;
	}

	label span {
		display: block;
		margin-bottom: 0.5rem;
	}

	li {
		display: flex;
		flex-direction: column;
	}
</style>
