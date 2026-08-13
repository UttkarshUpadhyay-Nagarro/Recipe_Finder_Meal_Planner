import type { Recipe } from '$lib/types';

const STORAGE_KEY = 'recipe-finder:user-recipes';

function loadInitial(): Record<string, Recipe> {
	if (typeof localStorage === 'undefined') return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

export function isUserRecipeId(id: string): boolean {
	return id.startsWith('user-');
}

export type UserRecipeInput = Omit<Recipe, 'id' | 'source'>;

class UserRecipesStore {
	entries = $state<Record<string, Recipe>>(loadInitial());

	get list(): Recipe[] {
		return Object.values(this.entries);
	}

	getById(id: string): Recipe | undefined {
		return this.entries[id];
	}

	create(input: UserRecipeInput): Recipe {
		const id = `user-${crypto.randomUUID()}`;
		const recipe: Recipe = { ...input, id, source: 'user' };
		this.entries = { ...this.entries, [id]: recipe };
		this.persist();
		return recipe;
	}

	update(id: string, input: UserRecipeInput) {
		if (!(id in this.entries)) return;
		this.entries = { ...this.entries, [id]: { ...input, id, source: 'user' } };
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

export const userRecipes = new UserRecipesStore();
