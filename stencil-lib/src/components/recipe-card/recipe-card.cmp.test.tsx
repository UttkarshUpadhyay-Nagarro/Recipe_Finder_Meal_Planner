import { render, h, describe, it, expect, vi } from '@stencil/vitest';

describe('rui-recipe-card', () => {
  it('renders title, meta, and default (non-favorite) state', async () => {
    const { root } = await render(<rui-recipe-card recipeTitle="Spaghetti Carbonara" category="Pasta" area="Italian"></rui-recipe-card>);
    expect(root.shadowRoot!.querySelector('.title')!.textContent).toBe('Spaghetti Carbonara');
    expect(root.shadowRoot!.querySelector('.fav-btn')!.getAttribute('aria-pressed')).toBe('false');
  });

  it('emits favoriteToggle with the toggled value on click', async () => {
    const { root } = await render(<rui-recipe-card recipeTitle="Tacos" favorite={false}></rui-recipe-card>);
    const spy = vi.fn();
    root.addEventListener('favoriteToggle', spy);
    (root.shadowRoot!.querySelector('.fav-btn') as HTMLElement).click();
    expect(spy).toHaveBeenCalledTimes(1);
    expect((spy.mock.calls[0][0] as CustomEvent).detail).toEqual({ favorite: true });
  });
});
