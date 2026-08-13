<script lang="ts">
	import type { Ingredient, Recipe } from '$lib/types';
	import type { UserRecipeInput } from '$lib/stores/user-recipes.svelte';

	type Props = {
		initial?: Recipe;
		submitLabel: string;
		onSubmit: (input: UserRecipeInput) => void;
	};

	let { initial, submitLabel, onSubmit }: Props = $props();

	let title = $state(initial?.title ?? '');
	let image = $state(initial?.image ?? '');
	let category = $state(initial?.category ?? '');
	let area = $state(initial?.area ?? '');
	let instructions = $state(initial?.instructions ?? '');
	let ingredients = $state<Ingredient[]>(
		initial?.ingredients?.length ? initial.ingredients.map((i) => ({ ...i })) : [{ name: '', measure: '' }]
	);
	let errors = $state<{ title?: string; instructions?: string; ingredients?: string }>({});

	function addIngredient() {
		ingredients.push({ name: '', measure: '' });
	}

	function removeIngredient(index: number) {
		ingredients.splice(index, 1);
	}

	function validate(): boolean {
		const nextErrors: typeof errors = {};
		if (!title.trim()) nextErrors.title = 'Title is required.';
		if (!instructions.trim()) nextErrors.instructions = 'Instructions are required.';
		if (!ingredients.some((i) => i.name.trim())) nextErrors.ingredients = 'Add at least one ingredient.';
		errors = nextErrors;
		return Object.keys(nextErrors).length === 0;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) return;
		onSubmit({
			title: title.trim(),
			image: image.trim() || undefined,
			category: category.trim() || undefined,
			area: area.trim() || undefined,
			instructions: instructions.trim(),
			ingredients: ingredients
				.filter((i) => i.name.trim())
				.map((i) => ({ name: i.name.trim(), measure: i.measure?.trim() || undefined }))
		});
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6" novalidate>
	<div>
		<label class="block text-sm font-medium text-gray-700" for="title">Title</label>
		<input
			id="title"
			bind:value={title}
			class="mt-1 w-full rounded-md border px-3 py-2 text-sm {errors.title ? 'border-red-400' : 'border-gray-300'}"
		/>
		{#if errors.title}<p class="mt-1 text-sm text-red-600">{errors.title}</p>{/if}
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div>
			<label class="block text-sm font-medium text-gray-700" for="category">Category</label>
			<input id="category" bind:value={category} class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700" for="area">Cuisine / Area</label>
			<input id="area" bind:value={area} class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
		</div>
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700" for="image">Image URL</label>
		<input id="image" bind:value={image} placeholder="https://..." class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
	</div>

	<div>
		<div class="flex items-center justify-between">
			<span class="block text-sm font-medium text-gray-700">Ingredients</span>
			<button type="button" onclick={addIngredient} class="text-sm font-medium text-orange-600 hover:underline">
				+ Add ingredient
			</button>
		</div>
		<div class="mt-2 space-y-2">
			{#each ingredients as ingredient, i (i)}
				<div class="flex gap-2">
					<input bind:value={ingredient.measure} placeholder="Qty" class="w-24 rounded-md border border-gray-300 px-2 py-1.5 text-sm" />
					<input
						bind:value={ingredient.name}
						placeholder="Ingredient"
						class="flex-1 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
					/>
					<button
						type="button"
						onclick={() => removeIngredient(i)}
						class="px-2 text-gray-400 hover:text-red-600"
						aria-label="Remove ingredient"
					>
						✕
					</button>
				</div>
			{/each}
		</div>
		{#if errors.ingredients}<p class="mt-1 text-sm text-red-600">{errors.ingredients}</p>{/if}
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700" for="instructions">Instructions</label>
		<textarea
			id="instructions"
			bind:value={instructions}
			rows="8"
			class="mt-1 w-full rounded-md border px-3 py-2 text-sm {errors.instructions ? 'border-red-400' : 'border-gray-300'}"
		></textarea>
		{#if errors.instructions}<p class="mt-1 text-sm text-red-600">{errors.instructions}</p>{/if}
	</div>

	<div class="flex gap-2">
		<button type="submit" class="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
			{submitLabel}
		</button>
		<a href="/" class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</a>
	</div>
</form>
