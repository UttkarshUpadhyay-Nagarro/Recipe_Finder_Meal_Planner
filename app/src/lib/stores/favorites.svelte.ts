import type { RecipeSummary } from '$lib/types';

const STORAGE_KEY = 'recipe-finder:favorites';

function loadInitial(): Record<string, RecipeSummary> {
	if (typeof localStorage === 'undefined') return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

class FavoritesStore {
	entries = $state<Record<string, RecipeSummary>>(loadInitial());

	get list(): RecipeSummary[] {
		return Object.values(this.entries);
	}

	isFavorite(id: string): boolean {
		return id in this.entries;
	}

	setFavorite(recipe: RecipeSummary, isFavorite: boolean) {
		const updated = { ...this.entries };
		if (isFavorite) {
			updated[recipe.id] = recipe;
		} else {
			delete updated[recipe.id];
		}
		this.entries = updated;
		this.persist();
	}

	remove(id: string) {
		if (!(id in this.entries)) return;
		const updated = { ...this.entries };
		delete updated[id];
		this.entries = updated;
		this.persist();
	}

	private persist() {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
	}
}

export const favorites = new FavoritesStore();
