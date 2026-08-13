import { render, h, describe, it, expect, vi } from '@stencil/vitest';

describe('rui-confirm-dialog', () => {
  it('renders nothing when closed', async () => {
    const { root } = await render(<rui-confirm-dialog heading="Delete?"></rui-confirm-dialog>);
    expect(root.shadowRoot!.querySelector('.overlay')).toBeNull();
  });

  it('emits confirm and cancel from their respective buttons', async () => {
    const { root } = await render(<rui-confirm-dialog open heading="Delete recipe?" confirmLabel="Delete"></rui-confirm-dialog>);
    const confirmSpy = vi.fn();
    const cancelSpy = vi.fn();
    root.addEventListener('confirm', confirmSpy);
    root.addEventListener('cancel', cancelSpy);

    expect(root.shadowRoot!.querySelector('.heading')!.textContent).toBe('Delete recipe?');

    (root.shadowRoot!.querySelector('.confirm') as HTMLElement).click();
    expect(confirmSpy).toHaveBeenCalledTimes(1);

    (root.shadowRoot!.querySelector('.cancel') as HTMLElement).click();
    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });
});
