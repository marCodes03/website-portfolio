import { Injectable, signal } from '@angular/core';

export type ToastKind = 'error' | 'success';

export interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

const DEFAULT_DURATION_MS = 6000;

interface ToastTimer {
  durationMs: number;
  handle: ReturnType<typeof setTimeout> | null;
  hovered: boolean;
  focused: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 1;
  private readonly timers = new Map<number, ToastTimer>();

  show(kind: ToastKind, message: string, durationMs = DEFAULT_DURATION_MS) {
    const id = this.nextId++;
    this.toasts.update(list => [...list, { id, kind, message }]);
    this.timers.set(id, { durationMs, handle: null, hovered: false, focused: false });
    this.schedule(id);
  }

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  dismiss(id: number) {
    const timer = this.timers.get(id);
    if (timer?.handle) {
      clearTimeout(timer.handle);
    }
    this.timers.delete(id);
    this.toasts.update(list => list.filter(toast => toast.id !== id));
  }

  /** Pointer entered or left the toast. The timer is held while hovered. */
  setHovered(id: number, hovered: boolean) {
    this.update(id, timer => (timer.hovered = hovered));
  }

  /** Keyboard focus entered or left the toast. The timer is held while focused. */
  setFocused(id: number, focused: boolean) {
    this.update(id, timer => (timer.focused = focused));
  }

  private update(id: number, change: (timer: ToastTimer) => void) {
    const timer = this.timers.get(id);
    if (!timer) {
      return;
    }
    change(timer);
    this.schedule(id);
  }

  /** (Re)starts the full countdown unless the toast is currently hovered or focused. */
  private schedule(id: number) {
    const timer = this.timers.get(id);
    if (!timer) {
      return;
    }
    if (timer.handle) {
      clearTimeout(timer.handle);
      timer.handle = null;
    }
    if (!timer.hovered && !timer.focused) {
      timer.handle = setTimeout(() => this.dismiss(id), timer.durationMs);
    }
  }
}
