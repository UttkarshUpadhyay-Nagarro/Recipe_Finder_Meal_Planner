# rui-star-rating



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                  | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------------ | --------- | ------- |
| `max`      | `max`      | Maximum number of stars.                                     | `number`  | `5`     |
| `readonly` | `readonly` | When true, the rating is display-only and cannot be changed. | `boolean` | `false` |
| `value`    | `value`    | Current rating value, owned by the consuming app.            | `number`  | `0`     |


## Events

| Event          | Description                               | Type                              |
| -------------- | ----------------------------------------- | --------------------------------- |
| `ratingChange` | Emitted when the user picks a new rating. | `CustomEvent<{ value: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
