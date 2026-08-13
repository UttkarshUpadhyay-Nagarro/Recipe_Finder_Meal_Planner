# rui-recipe-card



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute      | Description                                                                       | Type      | Default     |
| -------------------------- | -------------- | --------------------------------------------------------------------------------- | --------- | ----------- |
| `area`                     | `area`         | Recipe cuisine/area, e.g. "Italian".                                              | `string`  | `undefined` |
| `category`                 | `category`     | Recipe category, e.g. "Dessert".                                                  | `string`  | `undefined` |
| `favorite`                 | `favorite`     | Whether the recipe is currently marked as a favorite. Owned by the consuming app. | `boolean` | `false`     |
| `image`                    | `image`        | Recipe thumbnail image URL.                                                       | `string`  | `undefined` |
| `recipeTitle` _(required)_ | `recipe-title` | Title of the recipe.                                                              | `string`  | `undefined` |


## Events

| Event            | Description                                                                | Type                                  |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------- |
| `favoriteToggle` | Emitted when the favorite toggle is clicked, with the requested new state. | `CustomEvent<{ favorite: boolean; }>` |


## Slots

| Slot | Description      |
| ---- | ---------------- |
|      | The default slot |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
