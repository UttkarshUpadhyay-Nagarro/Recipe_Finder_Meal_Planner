const STORAGE_KEY = 'recipe-finder:ratings';

function loadInitial(): Record<string, number> {
	if (typeof localStorage === 'undefined') return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

class RatingsStore {
	values = $state<Record<string, number>>(loadInitial());

	get(id: string): number {
		return this.values[id] ?? 0;
	}

	set(id: string, value: number) {
		this.values = { ...this.values, [id]: value };
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.values));
	}
}

export const ratings = new RatingsStore();
