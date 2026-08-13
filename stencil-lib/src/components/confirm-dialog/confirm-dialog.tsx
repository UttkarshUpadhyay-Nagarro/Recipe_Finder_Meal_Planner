import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rui-confirm-dialog',
  styleUrl: 'confirm-dialog.css',
  shadow: true,
})
export class ConfirmDialog {
  /** Whether the dialog is visible. */
  @Prop() open = false;

  /** Dialog heading text. */
  @Prop() heading = 'Are you sure?';

  /** Label for the confirm button. */
  @Prop() confirmLabel = 'Confirm';

  /** Label for the cancel button. */
  @Prop() cancelLabel = 'Cancel';

  /** Styles the confirm button as a destructive action. */
  @Prop() danger = false;

  /** Emitted when the user confirms. */
  @Event() confirm: EventEmitter<void>;

  /** Emitted when the user cancels or dismisses the dialog. */
  @Event() cancel: EventEmitter<void>;

  render() {
    if (!this.open) {
      return null;
    }

    return (
      <div class="overlay" onClick={() => this.cancel.emit()}>
        <div class="dialog" role="alertdialog" aria-modal="true" aria-label={this.heading} onClick={(event: MouseEvent) => event.stopPropagation()}>
          <h3 class="heading">{this.heading}</h3>
          <div class="body">
            <slot>Are you sure you want to proceed?</slot>
          </div>
          <div class="actions">
            <button type="button" class="cancel" onClick={() => this.cancel.emit()}>
              {this.cancelLabel}
            </button>
            <button type="button" class={{ confirm: true, danger: this.danger }} onClick={() => this.confirm.emit()}>
              {this.confirmLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
