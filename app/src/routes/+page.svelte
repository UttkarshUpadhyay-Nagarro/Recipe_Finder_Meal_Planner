<script lang="ts">
	import { onMount } from 'svelte';
	import { searchRecipes, browseByCategory, listCategories } from '$lib/api/mealdb';
	import { favorites } from '$lib/stores/favorites.svelte';
	import RecipeCardSkeleton from '$lib/components/RecipeCardSkeleton.svelte';
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

	onMount(() => {
		loadCategories();
		loadRecipes();
	});
</script>

<svelte:head>
	<title>Recipe Finder & Meal Planner</title>
</svelte:head>

<div class="bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500">
	<div class="mx-auto max-w-6xl px-4 py-12 sm:py-16">
		<h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Find your next recipe</h1>
		<p class="mt-2 max-w-xl text-orange-50">Search TheMealDB, browse by category, and save your favorites.</p>

		<div class="mt-6 drop-shadow-lg">
			<rui-search-bar
				placeholder="Search recipes..."
				value={query}
				filters={categories}
				activeFilter={query ? undefined : activeCategory}
				onsearch={handleSearch}
				onfilterChange={handleFilterChange}
			></rui-search-bar>
		</div>
	</div>
</div>

<div class="mx-auto max-w-6xl px-4 py-8">
	{#if loading}
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{#each { length: 8 } as _, i (i)}
				<RecipeCardSkeleton />
			{/each}
		</div>
	{:else if error}
		<div class="flex flex-col items-center py-16 text-center">
			<span class="text-4xl">⚠️</span>
			<p class="mt-3 text-gray-600">{error}</p>
		</div>
	{:else if recipes.length === 0}
		<div class="flex flex-col items-center py-16 text-center">
			<span class="text-4xl">🔍</span>
			<p class="mt-3 text-gray-600">No recipes found. Try a different search or category.</p>
		</div>
	{:else}
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
