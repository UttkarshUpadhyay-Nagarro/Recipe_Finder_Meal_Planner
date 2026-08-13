import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rui-meal-slot',
  styleUrl: 'meal-slot.css',
  shadow: true,
})
export class MealSlot {
  /** Day of week label, e.g. "Monday". */
  @Prop() day!: string;

  /** Title of the recipe assigned to this day, if any. */
  @Prop() recipeTitle?: string;

  /** Thumbnail image for the assigned recipe. */
  @Prop() recipeImage?: string;

  /** Emitted when the user removes the meal assigned to this day. */
  @Event() removeMeal: EventEmitter<void>;

  render() {
    const hasRecipe = !!this.recipeTitle;
    return (
      <div class={{ 'meal-slot': true, filled: hasRecipe }}>
        <div class="day">{this.day}</div>
        {hasRecipe ? (
          <div class="meal">
            {this.recipeImage && <img src={this.recipeImage} alt={this.recipeTitle} />}
            <span class="title">{this.recipeTitle}</span>
            <button
              type="button"
              class="remove"
              aria-label={`Remove ${this.recipeTitle} from ${this.day}`}
              onClick={() => this.removeMeal.emit()}
            >
              ✕
            </button>
          </div>
        ) : (
          <div class="empty">
            <slot name="empty">No meal planned</slot>
          </div>
        )}
        <div class="actions">
          <slot></slot>
        </div>
      </div>
    );
  }
}
