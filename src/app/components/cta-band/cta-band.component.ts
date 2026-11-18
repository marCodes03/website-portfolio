import { Component, inject, signal } from '@angular/core';
import { ChatBotService } from '../chat-bot/chat-bot.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

/** Closing call to action and the last section before the footer: CV, email, chat, contact form (CHG-0018). */
@Component({
  selector: 'app-cta-band',
  imports: [ContactDialogComponent],
  template: `
    <section class="py-12 md:py-16 px-gutter section-dark accent-on-dark" id="get-in-touch" aria-labelledby="cta-heading">
      <div class="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div class="space-y-3 text-left">
          <span class="font-label-caps text-label-caps text-accent tracking-widest">WORK WITH ME</span>
          <h2 id="cta-heading" class="font-headline-lg text-headline-lg text-on-tertiary font-bold">Get in touch</h2>
        </div>
        <div class="flex flex-wrap gap-4">
          <a href="/assets/files/marco-o-amira-cv-reference.pdf" target="_blank" download="Marco-O-Amira-CV.pdf"
             class="btn-primary no-underline">
            Download CV
            <span class="material-symbols-outlined" aria-hidden="true">download</span>
          </a>
          <button type="button" (click)="showContact.set(true)" aria-haspopup="dialog" class="btn-secondary">
            Send a message
            <span class="material-symbols-outlined" aria-hidden="true">send</span>
          </button>
          <button type="button" (click)="openChat($event)" aria-haspopup="dialog" class="btn-secondary">
            Ask my AI
            <span class="material-symbols-outlined" aria-hidden="true">smart_toy</span>
          </button>
          <a href="mailto:amira.coder03@gmail.com" class="btn-secondary no-underline [overflow-wrap:anywhere]">
            amira.coder03@gmail.com
            <span class="material-symbols-outlined" aria-hidden="true">mail</span>
          </a>
        </div>
      </div>
    </section>
    @if (showContact()) {
      <app-contact-dialog (closed)="showContact.set(false)" />
    }
  `
})
export class CtaBandComponent {
  private readonly chat = inject(ChatBotService);
  readonly showContact = signal(false);

  openChat(event: Event) {
    this.chat.open(event.currentTarget as HTMLElement);
  }
}
