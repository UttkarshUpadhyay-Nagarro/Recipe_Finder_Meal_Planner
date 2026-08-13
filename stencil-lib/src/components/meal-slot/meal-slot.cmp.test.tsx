import { render, h, describe, it, expect, vi } from '@stencil/vitest';

describe('rui-meal-slot', () => {
  it('shows the empty slot content when no recipe is assigned', async () => {
    const { root } = await render(<rui-meal-slot day="Monday"></rui-meal-slot>);
    expect(root.shadowRoot!.querySelector('.empty')).not.toBeNull();
    expect(root.shadowRoot!.querySelector('.meal')).toBeNull();
  });

  it('shows the assigned recipe and emits removeMeal on click', async () => {
    const { root } = await render(<rui-meal-slot day="Tuesday" recipeTitle="Tacos"></rui-meal-slot>);
    expect(root.shadowRoot!.querySelector('.meal .title')!.textContent).toBe('Tacos');
    const spy = vi.fn();
    root.addEventListener('removeMeal', spy);
    (root.shadowRoot!.querySelector('.remove') as HTMLElement).click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
