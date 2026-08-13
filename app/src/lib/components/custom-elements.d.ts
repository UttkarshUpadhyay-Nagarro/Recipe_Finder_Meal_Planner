// Ambient typing for the rui-* custom elements from @utkarshdz/recipe-ui-kit,
// so Svelte templates get prop/event checking. See https://svelte.dev/docs/typescript#custom-elements
declare namespace svelteHTML {
  interface IntrinsicElements {
    'rui-recipe-card': {
      recipeTitle?: string;
      image?: string;
      category?: string;
      area?: string;
      favorite?: boolean;
      onfavoriteToggle?: (event: CustomEvent<{ favorite: boolean }>) => void;
    };
    'rui-star-rating': {
      value?: number;
      max?: number;
      readonly?: boolean;
      onratingChange?: (event: CustomEvent<{ value: number }>) => void;
    };
    'rui-meal-slot': {
      day?: string;
      recipeTitle?: string;
      recipeImage?: string;
      onremoveMeal?: (event: CustomEvent<void>) => void;
    };
    'rui-search-bar': {
      value?: string;
      placeholder?: string;
      filters?: string[];
      activeFilter?: string;
      onsearch?: (event: CustomEvent<{ value: string }>) => void;
      onfilterChange?: (event: CustomEvent<{ filter: string }>) => void;
    };
    'rui-confirm-dialog': {
      open?: boolean;
      heading?: string;
      confirmLabel?: string;
      cancelLabel?: string;
      danger?: boolean;
      onconfirm?: (event: CustomEvent<void>) => void;
      oncancel?: (event: CustomEvent<void>) => void;
    };
  }
}
