<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getRecipeById } from '$lib/api/mealdb';
	import { userRecipes, isUserRecipeId } from '$lib/stores/user-recipes.svelte';
	import { favorites } from '$lib/stores/favorites.svelte';
	import { ratings } from '$lib/stores/ratings.svelte';
	import type { Recipe } from '$lib/types';

	const id = $derived(page.params.id ?? '');
	const isUser = $derived(isUserRecipeId(id));

	let recipe = $state<Recipe | null>(null);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let showDeleteConfirm = $state(false);

	$effect(() => {
		const currentId = id;
		const currentIsUser = isUser;
		loading = true;
		error = null;
		recipe = null;

		if (currentIsUser) {
			// Deferred to a microtask so this branch (which has no natural `await`)
			// never resolves the whole load synchronously inside the effect's
			// tracking window — see recipe-finder-meal-planner memory notes.
			Promise.resolve().then(() => {
				if (id !== currentId) return;
				recipe = userRecipes.getById(currentId) ?? null;
				if (!recipe) error = 'Recipe not found.';
				loading = false;
			});
			return;
		}

		getRecipeById(currentId)
			.then((result) => {
				if (id !== currentId) return;
				recipe = result;
				if (!result) error = 'Recipe not found.';
			})
			.catch(() => {
				if (id !== currentId) return;
				error = 'Could not load this recipe.';
			})
			.finally(() => {
				if (id !== currentId) return;
				loading = false;
			});
	});

	const instructionParagraphs = $derived(
		recipe?.instructions
			.split(/\r?\n+/)
			.map((s) => s.trim())
			.filter(Boolean) ?? []
	);

	function toggleFavorite() {
		if (!recipe) return;
		favorites.setFavorite(
			{ id: recipe.id, title: recipe.title, image: recipe.image, category: recipe.category, area: recipe.area, source: recipe.source },
			!favorites.isFavorite(recipe.id)
		);
	}

	function handleRatingChange(event: CustomEvent<{ value: number }>) {
		if (!recipe) return;
		ratings.set(recipe.id, event.detail.value);
	}

	function handleDelete() {
		if (!recipe) return;
		userRecipes.remove(recipe.id);
		favorites.remove(recipe.id);
		goto('/');
	}
</script>

<svelte:head>
	<title>{recipe ? `${recipe.title} — Recipe Finder` : 'Recipe — Recipe Finder'}</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<a href="/" class="text-sm font-medium text-orange-600 hover:underline">&larr; Back to browse</a>

	{#if loading}
		<div class="mt-6 animate-pulse space-y-4">
			<div class="aspect-[21/9] w-full rounded-2xl bg-gray-200"></div>
			<div class="h-8 w-2/3 rounded bg-gray-200"></div>
			<div class="h-4 w-1/3 rounded bg-gray-200"></div>
		</div>
	{:else if error || !recipe}
		<div class="flex flex-col items-center py-16 text-center">
			<span class="text-4xl">⚠️</span>
			<p class="mt-3 text-gray-600">{error ?? 'Recipe not found.'}</p>
		</div>
	{:else}
		<article class="mt-4">
			{#if recipe.image}
				<img src={recipe.image} alt={recipe.title} class="aspect-[21/9] w-full rounded-2xl object-cover shadow-md" />
			{/if}

			<div class="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
				<aside class="order-first lg:order-2 lg:col-span-1">
					<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-20">
						<h2 class="text-lg font-semibold text-gray-900">Ingredients</h2>
						<ul class="mt-3 space-y-2">
							{#each recipe.ingredients as ingredient (ingredient.name)}
								<li class="flex gap-2 text-sm text-gray-700">
									<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400"></span>
									<span>
										{#if ingredient.measure}<span class="font-medium">{ingredient.measure}</span>{/if}
										{ingredient.name}
									</span>
								</li>
							{/each}
						</ul>
					</div>
				</aside>

				<div class="lg:order-1 lg:col-span-2">
					<div class="flex items-start justify-between gap-4">
						<div>
							<h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{recipe.title}</h1>
							<div class="mt-2 flex gap-2">
								{#if recipe.category}
									<span class="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">{recipe.category}</span>
								{/if}
								{#if recipe.area}
									<span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{recipe.area}</span>
								{/if}
							</div>
						</div>
						<button
							type="button"
							onclick={toggleFavorite}
							class="shrink-0 rounded-full border border-gray-200 p-2 text-xl transition-colors {favorites.isFavorite(
								recipe.id
							)
								? 'text-orange-600'
								: 'text-gray-400 hover:text-orange-500'}"
							aria-label={favorites.isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
							aria-pressed={favorites.isFavorite(recipe.id)}
						>
							{favorites.isFavorite(recipe.id) ? '♥' : '♡'}
						</button>
					</div>

					<div class="mt-4 flex items-center gap-2">
						<span class="text-sm text-gray-500">Your rating:</span>
						<rui-star-rating value={ratings.get(recipe.id)} onratingChange={handleRatingChange}></rui-star-rating>
					</div>

					{#if isUser}
						<div class="mt-4 flex gap-2">
							<a
								href={`/recipes/${recipe.id}/edit`}
								class="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
							>
								Edit
							</a>
							<button
								type="button"
								onclick={() => (showDeleteConfirm = true)}
								class="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
							>
								Delete
							</button>
						</div>
					{/if}

					<section class="mt-8">
						<h2 class="text-lg font-semibold text-gray-900">Instructions</h2>
						<div class="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
							{#each instructionParagraphs as paragraph, i (i)}
								<p>{paragraph}</p>
							{/each}
						</div>
					</section>
				</div>
			</div>
		</article>

		<rui-confirm-dialog
			open={showDeleteConfirm}
			heading="Delete this recipe?"
			confirmLabel="Delete"
			danger
			oncancel={() => (showDeleteConfirm = false)}
			onconfirm={handleDelete}
		>
			This will permanently remove "{recipe.title}". This cannot be undone.
		</rui-confirm-dialog>
	{/if}
</div>
