<script lang="ts">
	import { store } from '$lib/stores/expenses';
	import { onMount } from 'svelte';

	let expenses = store.getTable('expenses');

	const onSubmit = (evt: SubmitEvent) => {
		const target = evt.target as HTMLFormElement;
		const formData = new FormData(target);
		const amount = formData.get('amount');
		const description = formData.get('description') as string;

		store.addRow('expenses', {
			amount: Number(amount),
			description
		});

		target.reset();
	};

	onMount(() => {
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
