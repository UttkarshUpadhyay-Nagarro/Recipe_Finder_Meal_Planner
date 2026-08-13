import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rui-star-rating',
  styleUrl: 'star-rating.css',
  shadow: true,
})
export class StarRating {
  /** Current rating value, owned by the consuming app. */
  @Prop() value = 0;

  /** Maximum number of stars. */
  @Prop() max = 5;

  /** When true, the rating is display-only and cannot be changed. */
  @Prop() readonly = false;

  @State() hoverValue: number | null = null;

  /** Emitted when the user picks a new rating. */
  @Event() ratingChange: EventEmitter<{ value: number }>;

  private stars() {
    return Array.from({ length: this.max }, (_, i) => i + 1);
  }

  private select(star: number) {
    if (this.readonly) return;
    this.ratingChange.emit({ value: star });
  }

  render() {
    const display = this.hoverValue ?? this.value;
    return (
      <div class="stars" role="radiogroup" aria-label="Rating" onMouseLeave={() => (this.hoverValue = null)}>
        {this.stars().map(star => (
          <button
            type="button"
            class={{ star: true, filled: star <= display }}
            disabled={this.readonly}
            role="radio"
            aria-checked={star === this.value ? 'true' : 'false'}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onMouseEnter={() => !this.readonly && (this.hoverValue = star)}
            onClick={() => this.select(star)}
          >
            ★
          </button>
        ))}
      </div>
    );
  }
}
