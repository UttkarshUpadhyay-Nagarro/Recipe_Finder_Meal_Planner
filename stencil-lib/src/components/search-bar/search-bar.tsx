import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rui-search-bar',
  styleUrl: 'search-bar.css',
  shadow: true,
})
export class SearchBar {
  /** Current search input value. */
  @Prop() value = '';

  /** Placeholder text for the search input. */
  @Prop() placeholder = 'Search recipes...';

  /** Filter chip labels to display. */
  @Prop() filters: string[] = [];

  /** Currently active filter label, if any. */
  @Prop() activeFilter?: string;

  /** Emitted when the search is submitted. */
  @Event() search: EventEmitter<{ value: string }>;

  /** Emitted when a filter chip is clicked. */
  @Event() filterChange: EventEmitter<{ filter: string }>;

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).elements.namedItem('q') as HTMLInputElement;
    this.search.emit({ value: input.value });
  };

  render() {
    return (
      <div class="bar">
        <form onSubmit={this.handleSubmit}>
          <input name="q" type="search" placeholder={this.placeholder} value={this.value} aria-label="Search recipes" />
          <button type="submit">Search</button>
        </form>
        {this.filters.length > 0 && (
          <div class="filters" role="group" aria-label="Filters">
            {this.filters.map(filter => (
              <button
                type="button"
                class={{ chip: true, active: filter === this.activeFilter }}
                onClick={() => this.filterChange.emit({ filter })}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    );
  }
}
