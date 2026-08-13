# rui-confirm-dialog



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                        | Type      | Default           |
| -------------- | --------------- | -------------------------------------------------- | --------- | ----------------- |
| `cancelLabel`  | `cancel-label`  | Label for the cancel button.                       | `string`  | `'Cancel'`        |
| `confirmLabel` | `confirm-label` | Label for the confirm button.                      | `string`  | `'Confirm'`       |
| `danger`       | `danger`        | Styles the confirm button as a destructive action. | `boolean` | `false`           |
| `heading`      | `heading`       | Dialog heading text.                               | `string`  | `'Are you sure?'` |
| `open`         | `open`          | Whether the dialog is visible.                     | `boolean` | `false`           |


## Events

| Event     | Description                                            | Type                |
| --------- | ------------------------------------------------------ | ------------------- |
| `cancel`  | Emitted when the user cancels or dismisses the dialog. | `CustomEvent<void>` |
| `confirm` | Emitted when the user confirms.                        | `CustomEvent<void>` |


## Slots

| Slot | Description      |
| ---- | ---------------- |
|      | The default slot |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
