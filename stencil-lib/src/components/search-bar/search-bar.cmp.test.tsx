import { render, h, describe, it, expect, vi } from '@stencil/vitest';

describe('rui-search-bar', () => {
  it('emits search with the input value on submit', async () => {
    const { root } = await render(<rui-search-bar></rui-search-bar>);
    const spy = vi.fn();
    root.addEventListener('search', spy);
    const input = root.shadowRoot!.querySelector('input[name="q"]') as HTMLInputElement;
    input.value = 'pasta';
    (root.shadowRoot!.querySelector('button[type="submit"]') as HTMLElement).click();
    expect((spy.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 'pasta' });
  });

  it('renders filter chips and emits filterChange on click', async () => {
    const { root } = await render(<rui-search-bar filters={['Dessert', 'Vegan']}></rui-search-bar>);
    const spy = vi.fn();
    root.addEventListener('filterChange', spy);
    const chips = root.shadowRoot!.querySelectorAll('.chip');
    expect(chips.length).toBe(2);
    (chips[1] as HTMLElement).click();
    expect((spy.mock.calls[0][0] as CustomEvent).detail).toEqual({ filter: 'Vegan' });
  });
});
