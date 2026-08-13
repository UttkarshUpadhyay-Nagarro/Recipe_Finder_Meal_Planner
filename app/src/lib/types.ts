export type Ingredient = {
	name: string;
	measure?: string;
};

export type Recipe = {
	id: string;
	title: string;
	image?: string;
	category?: string;
	area?: string;
	instructions: string;
	ingredients: Ingredient[];
	/** 'api' recipes come from TheMealDB and are read-only; 'user' recipes are editable/deletable. */
	source: 'api' | 'user';
};

/** Lightweight shape used for browse/search grids, before full detail is loaded. */
export type RecipeSummary = Pick<Recipe, 'id' | 'title' | 'image' | 'category' | 'area' | 'source'>;
