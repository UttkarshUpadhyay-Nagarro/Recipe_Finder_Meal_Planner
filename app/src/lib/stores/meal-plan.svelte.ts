import type { RecipeSummary } from '$lib/types';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = (typeof DAYS)[number];

const STORAGE_KEY = 'recipe-finder:meal-plan';

function loadInitial(): Partial<Record<Day, RecipeSummary>> {
	if (typeof localStorage === 'undefined') return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

class MealPlanStore {
	entries = $state<Partial<Record<Day, RecipeSummary>>>(loadInitial());

	get(day: Day): RecipeSummary | undefined {
		return this.entries[day];
	}

	assign(day: Day, recipe: RecipeSummary) {
		this.entries = { ...this.entries, [day]: recipe };
		this.persist();
	}

	remove(day: Day) {
		if (!(day in this.entries)) return;
		const updated = { ...this.entries };
		delete updated[day];
		this.entries = updated;
		this.persist();
	}

	private persist() {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
	}
}

export const mealPlan = new MealPlanStore();
