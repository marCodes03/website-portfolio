import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  readonly isOpen = signal(false);

  /** Element that opened the chat from outside the panel; focus returns here on close. */
  readonly opener = signal<HTMLElement | null>(null);

  toggle() {
    this.isOpen.update(open => !open);
  }

  open(opener: HTMLElement | null = null) {
    this.opener.set(opener);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
