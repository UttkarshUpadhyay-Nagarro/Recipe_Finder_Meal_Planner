<script lang="ts">
	import { searchRecipes, browseByCategory, listCategories } from '$lib/api/mealdb';
	import { favorites } from '$lib/stores/favorites.svelte';
	import type { RecipeSummary } from '$lib/types';

	let categories = $state<string[]>([]);
	let activeCategory = $state('Chicken');
	let query = $state('');
	let recipes = $state<RecipeSummary[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	async function loadCategories() {
		try {
			categories = await listCategories();
		} catch {
			categories = [];
		}
	}

	async function loadRecipes() {
		loading = true;
		error = null;
		try {
			recipes = query.trim() ? await searchRecipes(query.trim()) : await browseByCategory(activeCategory);
		} catch {
			error = 'Could not load recipes. Please try again.';
			recipes = [];
		} finally {
			loading = false;
		}
	}

	function handleSearch(event: CustomEvent<{ value: string }>) {
		query = event.detail.value;
		loadRecipes();
	}

	function handleFilterChange(event: CustomEvent<{ filter: string }>) {
		activeCategory = event.detail.filter;
		query = '';
		loadRecipes();
	}

	function handleFavoriteToggle(recipe: RecipeSummary, event: CustomEvent<{ favorite: boolean }>) {
		favorites.setFavorite(recipe, event.detail.favorite);
	}

	loadCategories();
	loadRecipes();
</script>

<svelte:head>
	<title>Recipe Finder & Meal Planner</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8">
	<h1 class="mb-1 text-2xl font-bold text-gray-900">Find your next recipe</h1>
	<p class="mb-6 text-gray-600">Search TheMealDB, browse by category, and save your favorites.</p>

	<rui-search-bar
		placeholder="Search recipes..."
		value={query}
		filters={categories}
		activeFilter={query ? undefined : activeCategory}
		onsearch={handleSearch}
		onfilterChange={handleFilterChange}
	></rui-search-bar>

	{#if loading}
		<p class="mt-10 text-gray-500">Loading recipes…</p>
	{:else if error}
		<p class="mt-10 text-red-600">{error}</p>
	{:else if recipes.length === 0}
		<p class="mt-10 text-gray-500">No recipes found. Try a different search or category.</p>
	{:else}
		<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{#each recipes as recipe (recipe.id)}
				<rui-recipe-card
					recipeTitle={recipe.title}
					image={recipe.image}
					category={recipe.category}
					area={recipe.area}
					favorite={favorites.isFavorite(recipe.id)}
					onfavoriteToggle={(e: CustomEvent<{ favorite: boolean }>) => handleFavoriteToggle(recipe, e)}
				>
					<a href={`/recipes/${recipe.id}`} class="text-sm font-medium text-orange-600 hover:underline"
						>View recipe</a
					>
				</rui-recipe-card>
			{/each}
		</div>
	{/if}
</div>
