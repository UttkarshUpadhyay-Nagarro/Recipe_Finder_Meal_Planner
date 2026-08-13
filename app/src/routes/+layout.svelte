<script lang="ts">
	import './layout.css';
	import '$lib/components/register';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'Browse' },
		{ href: '/favorites', label: 'Favorites' },
		{ href: '/meal-plan', label: 'Meal Plan' },
		{ href: '/recipes/new', label: 'Add Recipe' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen bg-gray-50">
	<header class="border-b border-gray-200 bg-white">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
			<a href="/" class="text-lg font-bold text-orange-600">Recipe Finder</a>
			<nav class="flex gap-4 text-sm font-medium">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="rounded-md px-3 py-1.5 transition-colors {page.url.pathname === link.href
							? 'bg-orange-100 text-orange-700'
							: 'text-gray-600 hover:text-orange-600'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	</header>
	<main>
		{@render children()}
	</main>
</div>
