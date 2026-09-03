<script lang="ts">
	import { mealPlan, DAYS, type Day } from '$lib/stores/meal-plan.svelte';
	import { favorites } from '$lib/stores/favorites.svelte';
	import { userRecipes } from '$lib/stores/user-recipes.svelte';
	import { searchRecipes } from '$lib/api/mealdb';
	import type { RecipeSummary } from '$lib/types';

	let pickerDay = $state<Day | null>(null);
	let query = $state('');
	let searchResults = $state<RecipeSummary[]>([]);
	let searching = $state(false);

	const suggestions = $derived<RecipeSummary[]>(
		Array.from(
			new Map(
				[
					...favorites.list,
					...userRecipes.list.map((r) => ({ id: r.id, title: r.title, image: r.image, category: r.category, area: r.area, source: r.source }))
				].map((recipe) => [recipe.id, recipe])
			).values()
		)
	);

	function openPicker(day: Day) {
		pickerDay = day;
		query = '';
		searchResults = [];
	}

	function closePicker() {
		pickerDay = null;
	}

	async function handleSearch(event: Event) {
		event.preventDefault();
		if (!query.trim()) {
			searchResults = [];
			return;
		}
		searching = true;
		try {
			searchResults = await searchRecipes(query.trim());
		} finally {
			searching = false;
		}
	}

	function selectRecipe(recipe: RecipeSummary) {
		if (pickerDay) mealPlan.assign(pickerDay, recipe);
		closePicker();
	}
</script>

<svelte:head>
	<title>Meal Plan — Recipe Finder</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8">
	<h1 class="mb-1 text-2xl font-bold text-gray-900">Weekly meal plan</h1>
	<p class="mb-6 text-gray-600">Assign a recipe to each day of the week.</p>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each DAYS as day (day)}
			{@const meal = mealPlan.get(day)}
			<rui-meal-slot {day} recipeTitle={meal?.title} recipeImage={meal?.image} onremoveMeal={() => mealPlan.remove(day)}>
				{#if meal}
					<button type="button" onclick={() => openPicker(day)} class="text-xs font-medium text-orange-600 hover:underline">
						Change
					</button>
				{:else}
					<button
						slot="empty"
						type="button"
						onclick={() => openPicker(day)}
						class="text-sm font-medium text-orange-600 hover:underline"
					>
						+ Assign recipe
					</button>
				{/if}
			</rui-meal-slot>
		{/each}
	</div>

	{#if pickerDay}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
			role="presentation"
			onclick={closePicker}
			onkeydown={(e) => e.key === 'Escape' && closePicker()}
		>
			<div
				class="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl"
				role="dialog"
				aria-modal="true"
				aria-label={`Assign a recipe to ${pickerDay}`}
				tabindex="-1"
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => e.stopPropagation()}
			>
				<div class="flex items-center justify-between">
					<h2 class="text-lg font-semibold text-gray-900">Assign a recipe to {pickerDay}</h2>
					<button type="button" onclick={closePicker} class="text-gray-400 hover:text-gray-600" aria-label="Close">✕</button>
				</div>

				<form class="mt-3 flex gap-2" onsubmit={handleSearch}>
					<input
						bind:value={query}
						placeholder="Search recipes..."
						class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
					/>
					<button type="submit" class="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white">Search</button>
				</form>

				{#if searching}
					<p class="mt-4 text-sm text-gray-500">Searching…</p>
				{:else if searchResults.length > 0}
					<div class="mt-4">
						<h3 class="text-xs font-semibold uppercase text-gray-500">Search results</h3>
						<ul class="mt-2 space-y-1">
							{#each searchResults as recipe (recipe.id)}
								<li>
									<button
										type="button"
										onclick={() => selectRecipe(recipe)}
										class="flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors hover:bg-orange-50"
									>
										{#if recipe.image}<img src={recipe.image} alt="" class="h-10 w-10 rounded object-cover" />{/if}
										<span class="text-sm text-gray-800">{recipe.title}</span>
									</button>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if suggestions.length > 0}
					<div class="mt-4">
						<h3 class="text-xs font-semibold uppercase text-gray-500">Your favorites &amp; recipes</h3>
						<ul class="mt-2 space-y-1">
							{#each suggestions as recipe (recipe.id)}
								<li>
									<button
										type="button"
										onclick={() => selectRecipe(recipe)}
										class="flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors hover:bg-orange-50"
									>
										{#if recipe.image}<img src={recipe.image} alt="" class="h-10 w-10 rounded object-cover" />{/if}
										<span class="text-sm text-gray-800">{recipe.title}</span>
									</button>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
