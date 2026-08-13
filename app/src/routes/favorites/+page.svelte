<script lang="ts">
	import { favorites } from '$lib/stores/favorites.svelte';
	import type { RecipeSummary } from '$lib/types';

	function handleFavoriteToggle(recipe: RecipeSummary, event: CustomEvent<{ favorite: boolean }>) {
		favorites.setFavorite(recipe, event.detail.favorite);
	}
</script>

<svelte:head>
	<title>Favorites — Recipe Finder</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8">
	<h1 class="mb-1 text-2xl font-bold text-gray-900">Your favorites</h1>
	<p class="mb-6 text-gray-600">Recipes you've saved for later.</p>

	{#if favorites.list.length === 0}
		<div class="flex flex-col items-center py-16 text-center">
			<span class="text-4xl">🤍</span>
			<p class="mt-3 text-gray-600">
				No favorites yet. <a href="/" class="font-medium text-orange-600 hover:underline">Browse recipes</a> and tap the heart
				to save one.
			</p>
		</div>
	{:else}
		<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{#each favorites.list as recipe (recipe.id)}
				<rui-recipe-card
					recipeTitle={recipe.title}
					image={recipe.image}
					category={recipe.category}
					area={recipe.area}
					favorite={true}
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
