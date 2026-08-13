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
	<header class="sticky top-0 z-40 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur">
		<div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
			<a href="/" class="shrink-0 text-base font-bold text-orange-600 sm:text-lg">🍽️ Recipe Finder</a>
			<nav class="flex min-w-0 gap-1 overflow-x-auto text-sm font-medium sm:gap-2">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 transition-all duration-150 sm:px-3 {page.url
							.pathname === link.href
							? 'bg-orange-100 text-orange-700'
							: 'text-gray-600 hover:bg-gray-100 hover:text-orange-600'}"
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
