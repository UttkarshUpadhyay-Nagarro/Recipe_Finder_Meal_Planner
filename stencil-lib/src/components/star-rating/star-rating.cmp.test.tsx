import { render, h, describe, it, expect, vi } from '@stencil/vitest';

describe('rui-star-rating', () => {
  it('renders the configured number of stars with the value filled', async () => {
    const { root } = await render(<rui-star-rating value={2} max={5}></rui-star-rating>);
    const stars = root.shadowRoot!.querySelectorAll('.star');
    expect(stars.length).toBe(5);
    expect(Array.from(stars).filter(s => s.classList.contains('filled')).length).toBe(2);
  });

  it('emits ratingChange with the clicked value', async () => {
    const { root } = await render(<rui-star-rating value={0}></rui-star-rating>);
    const spy = vi.fn();
    root.addEventListener('ratingChange', spy);
    (root.shadowRoot!.querySelectorAll('.star')[3] as HTMLElement).click();
    expect((spy.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 4 });
  });

  it('does not emit when readonly', async () => {
    const { root } = await render(<rui-star-rating value={1} readonly></rui-star-rating>);
    const spy = vi.fn();
    root.addEventListener('ratingChange', spy);
    (root.shadowRoot!.querySelector('.star') as HTMLElement).click();
    expect(spy).not.toHaveBeenCalled();
  });
});
