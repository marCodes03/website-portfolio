import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <!-- Region stays mounted so screen readers announce toasts as they appear. -->
    <div class="fixed top-24 right-4 left-4 sm:left-auto sm:w-[380px] z-[120] flex flex-col gap-3 pointer-events-none"
         role="region"
         aria-label="Notifications">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="pointer-events-auto animate-fade-in flex items-start gap-3 rounded-xl border bg-surface text-text p-4 shadow-lg"
             [class.border-error]="toast.kind === 'error'"
             [class.border-success]="toast.kind === 'success'"
             [attr.role]="toast.kind === 'error' ? 'alert' : 'status'"
             (mouseenter)="toastService.setHovered(toast.id, true)"
             (mouseleave)="toastService.setHovered(toast.id, false)"
             (focusin)="toastService.setFocused(toast.id, true)"
             (focusout)="toastService.setFocused(toast.id, false)"
             (keydown.escape)="toastService.dismiss(toast.id)">
          <span class="material-symbols-outlined shrink-0"
                aria-hidden="true"
                [class.text-error]="toast.kind === 'error'"
                [class.text-success]="toast.kind === 'success'">
            {{ toast.kind === 'error' ? 'error' : 'check_circle' }}
          </span>
          <p class="flex-1 text-sm leading-relaxed">{{ toast.message }}</p>
          <button type="button"
                  (click)="toastService.dismiss(toast.id)"
                  aria-label="Dismiss notification"
                  class="shrink-0 rounded-full p-0.5 text-text-muted hover:text-text cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span class="material-symbols-outlined text-base" aria-hidden="true">close</span>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
