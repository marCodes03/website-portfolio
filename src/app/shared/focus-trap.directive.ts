import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal behaviour shared by every dialog. While the host element exists it:
 * - keeps keyboard focus inside: Tab on the last focusable element wraps to the first, Shift+Tab on the first wraps to the last;
 * - makes everything outside the dialog `inert` (unreachable by keyboard and assistive tech),
 *   by marking every sibling along the path from the dialog up to <body>;
 * - locks page scrolling;
 * - on destroy, undoes all of the above and returns focus to the element that opened the dialog.
 */
@Directive({
  selector: '[appFocusTrap]',
  host: {
    '(keydown.tab)': 'onTab($event)',
    '(keydown.shift.tab)': 'onTab($event)'
  }
})
export class FocusTrapDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly inerted: HTMLElement[] = [];
  /** Whatever had focus when the dialog was created, i.e. the control that opened it. */
  private readonly opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  private previousOverflow = '';

  constructor() {
    afterNextRender(() => {
      this.makeOutsideInert();
      this.previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    });
    inject(DestroyRef).onDestroy(() => this.restore());
  }

  onTab(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    const items = this.focusableItems();
    if (items.length === 0) {
      event.preventDefault();
      return;
    }

    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    const inside = active instanceof Node && this.host.nativeElement.contains(active);

    if (!inside) {
      event.preventDefault();
      (keyboardEvent.shiftKey ? last : first).focus();
    } else if (keyboardEvent.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusableItems(): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      el => el.offsetParent !== null || el === document.activeElement
    );
  }

  private makeOutsideInert() {
    let node: HTMLElement = this.host.nativeElement;
    while (node.parentElement) {
      const parent: HTMLElement = node.parentElement;
      for (const sibling of Array.from(parent.children)) {
        if (sibling !== node && sibling instanceof HTMLElement && !sibling.hasAttribute('inert')) {
          sibling.setAttribute('inert', '');
          this.inerted.push(sibling);
        }
      }
      node = parent;
      if (parent === document.body) {
        break;
      }
    }
  }

  private restore() {
    for (const el of this.inerted) {
      el.removeAttribute('inert');
    }
    this.inerted.length = 0;
    document.body.style.overflow = this.previousOverflow;
    const opener = this.opener;
    if (opener && opener.isConnected) {
      setTimeout(() => opener.focus());
    }
  }
}
