# rui-search-bar



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                            | Type       | Default               |
| -------------- | --------------- | -------------------------------------- | ---------- | --------------------- |
| `activeFilter` | `active-filter` | Currently active filter label, if any. | `string`   | `undefined`           |
| `filters`      | --              | Filter chip labels to display.         | `string[]` | `[]`                  |
| `placeholder`  | `placeholder`   | Placeholder text for the search input. | `string`   | `'Search recipes...'` |
| `value`        | `value`         | Current search input value.            | `string`   | `''`                  |


## Events

| Event          | Description                            | Type                               |
| -------------- | -------------------------------------- | ---------------------------------- |
| `filterChange` | Emitted when a filter chip is clicked. | `CustomEvent<{ filter: string; }>` |
| `search`       | Emitted when the search is submitted.  | `CustomEvent<{ value: string; }>`  |


## Slots

| Slot        | Description |
| ----------- | ----------- |
| `"actions"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
