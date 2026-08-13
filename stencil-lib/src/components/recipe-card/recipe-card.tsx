import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rui-recipe-card',
  styleUrl: 'recipe-card.css',
  shadow: true,
})
export class RecipeCard {
  /** Title of the recipe. */
  @Prop() recipeTitle!: string;

  /** Recipe thumbnail image URL. */
  @Prop() image?: string;

  /** Recipe category, e.g. "Dessert". */
  @Prop() category?: string;

  /** Recipe cuisine/area, e.g. "Italian". */
  @Prop() area?: string;

  /** Whether the recipe is currently marked as a favorite. Owned by the consuming app. */
  @Prop() favorite = false;

  /** Emitted when the favorite toggle is clicked, with the requested new state. */
  @Event() favoriteToggle: EventEmitter<{ favorite: boolean }>;

  private handleFavoriteClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.favoriteToggle.emit({ favorite: !this.favorite });
  };

  render() {
    return (
      <div class="card">
        <div class="media">
          {this.image ? <img src={this.image} alt={this.recipeTitle} loading="lazy" /> : <div class="media-placeholder" />}
          <button
            type="button"
            class={{ 'fav-btn': true, active: this.favorite }}
            aria-pressed={this.favorite ? 'true' : 'false'}
            aria-label={this.favorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={this.handleFavoriteClick}
          >
            {this.favorite ? '♥' : '♡'}
          </button>
        </div>
        <div class="body">
          <h3 class="title">{this.recipeTitle}</h3>
          {(this.category || this.area) && (
            <div class="meta">
              {this.category && <span class="badge">{this.category}</span>}
              {this.area && <span class="badge muted">{this.area}</span>}
            </div>
          )}
          <div class="actions">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }
}
