import type { Ingredient, Recipe, RecipeSummary } from '$lib/types';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

type MealDbMeal = Record<string, string | null> & {
	idMeal: string;
	strMeal: string;
};

function mapSummary(meal: MealDbMeal): RecipeSummary {
	return {
		id: meal.idMeal,
		title: meal.strMeal,
		image: meal.strMealThumb ?? undefined,
		category: meal.strCategory ?? undefined,
		area: meal.strArea ?? undefined,
		source: 'api'
	};
}

function mapRecipe(meal: MealDbMeal): Recipe {
	const ingredients: Ingredient[] = [];
	for (let i = 1; i <= 20; i++) {
		const name = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];
		if (name && name.trim()) {
			ingredients.push({ name: name.trim(), measure: measure?.trim() || undefined });
		}
	}
	return {
		...mapSummary(meal),
		instructions: meal.strInstructions ?? '',
		ingredients
	};
}

/** Search recipes by name. Passing an empty string returns TheMealDB's full recipe list. */
export async function searchRecipes(query: string, fetchFn: typeof fetch = fetch): Promise<RecipeSummary[]> {
	const res = await fetchFn(`${BASE}/search.php?s=${encodeURIComponent(query)}`);
	const data = await res.json();
	return ((data.meals ?? []) as MealDbMeal[]).map(mapSummary);
}

export async function browseByCategory(category: string, fetchFn: typeof fetch = fetch): Promise<RecipeSummary[]> {
	const res = await fetchFn(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
	const data = await res.json();
	return ((data.meals ?? []) as MealDbMeal[]).map(mapSummary);
}

export async function listCategories(fetchFn: typeof fetch = fetch): Promise<string[]> {
	const res = await fetchFn(`${BASE}/list.php?c=list`);
	const data = await res.json();
	return ((data.meals ?? []) as { strCategory: string }[]).map((m) => m.strCategory);
}

export async function getRecipeById(id: string, fetchFn: typeof fetch = fetch): Promise<Recipe | null> {
	const res = await fetchFn(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
	const data = await res.json();
	const meal = (data.meals as MealDbMeal[] | null)?.[0];
	return meal ? mapRecipe(meal) : null;
}
