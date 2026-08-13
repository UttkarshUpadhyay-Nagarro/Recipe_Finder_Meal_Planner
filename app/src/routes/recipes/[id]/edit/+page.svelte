<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { userRecipes, isUserRecipeId, type UserRecipeInput } from '$lib/stores/user-recipes.svelte';

	const id = $derived(page.params.id ?? '');
	const recipe = $derived(isUserRecipeId(id) ? userRecipes.getById(id) : undefined);

	function handleSubmit(input: UserRecipeInput) {
		userRecipes.update(id, input);
		goto(`/recipes/${id}`);
	}
</script>

<svelte:head>
	<title>Edit recipe — Recipe Finder</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-4 py-8">
	{#if !recipe}
		<p class="text-red-600">This recipe can't be edited — it may not exist, or it wasn't created by you.</p>
		<a href="/" class="mt-4 inline-block text-sm text-orange-600 hover:underline">&larr; Back to browse</a>
	{:else}
		<h1 class="text-2xl font-bold text-gray-900">Edit recipe</h1>
		<div class="mt-6">
			<RecipeForm initial={recipe} onSubmit={handleSubmit} submitLabel="Save changes" />
		</div>
	{/if}
</div>
