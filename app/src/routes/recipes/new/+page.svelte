<script lang="ts">
	import { goto } from '$app/navigation';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { userRecipes, type UserRecipeInput } from '$lib/stores/user-recipes.svelte';

	function handleSubmit(input: UserRecipeInput) {
		const recipe = userRecipes.create(input);
		goto(`/recipes/${recipe.id}`);
	}
</script>

<svelte:head>
	<title>Add a recipe — Recipe Finder</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-4 py-8">
	<h1 class="text-2xl font-bold text-gray-900">Add a recipe</h1>
	<p class="mt-1 text-gray-600">Share your own recipe. It's saved in this browser.</p>
	<div class="mt-6">
		<RecipeForm onSubmit={handleSubmit} submitLabel="Save recipe" />
	</div>
</div>
