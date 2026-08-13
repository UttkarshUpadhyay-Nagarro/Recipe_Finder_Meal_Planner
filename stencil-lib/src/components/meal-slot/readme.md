# rui-meal-slot



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute      | Description                                       | Type     | Default     |
| ------------------ | -------------- | ------------------------------------------------- | -------- | ----------- |
| `day` _(required)_ | `day`          | Day of week label, e.g. "Monday".                 | `string` | `undefined` |
| `recipeImage`      | `recipe-image` | Thumbnail image for the assigned recipe.          | `string` | `undefined` |
| `recipeTitle`      | `recipe-title` | Title of the recipe assigned to this day, if any. | `string` | `undefined` |


## Events

| Event        | Description                                                  | Type                |
| ------------ | ------------------------------------------------------------ | ------------------- |
| `removeMeal` | Emitted when the user removes the meal assigned to this day. | `CustomEvent<void>` |


## Slots

| Slot      | Description      |
| --------- | ---------------- |
|           | The default slot |
| `"empty"` |                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
