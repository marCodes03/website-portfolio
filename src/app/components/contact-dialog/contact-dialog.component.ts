import { Component, afterNextRender, inject, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { FocusTrapDirective } from '../../shared/focus-trap.directive';
import { ToastService } from '../toast/toast.service';

type FieldName = 'name' | 'email' | 'subject' | 'message';

const ERROR_MESSAGES: Record<FieldName, { required: string; minlength?: string; email?: string }> = {
  name: { required: 'Please enter your name.', minlength: 'Your name must be at least 2 characters.' },
  email: { required: 'Please enter your email address.', email: 'Enter a valid email address, like john@example.com.' },
  subject: { required: 'Please enter a subject.' },
  message: { required: 'Please enter a message.', minlength: 'Your message must be at least 10 characters.' }
};

const SEND_FAILED = 'Something went wrong sending your message. Please try again, or email me directly.';

/** The contact form in a modal dialog, opened from the closing "Get in touch" band (CHG-0018). */
@Component({
  selector: 'app-contact-dialog',
  imports: [ReactiveFormsModule, FocusTrapDirective],
  host: {
    '(window:keydown.escape)': 'onEscape()'
  },
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/90 backdrop-blur-[1.5px]"
         (click)="onBackdrop()"
         appFocusTrap
         role="dialog"
         aria-modal="true"
         aria-labelledby="contact-dialog-title">
      <div class="bg-surface border border-border rounded-3xl max-w-[640px] w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-10"
           (click)="$event.stopPropagation()">
        <div class="flex items-start justify-between gap-4 mb-2">
          <h2 id="contact-dialog-title" class="font-headline-lg text-headline-lg text-text font-bold">Send me a message</h2>
          <button type="button" (click)="close()" aria-label="Close contact form"
                  class="tap-44 shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-text hover:bg-border/30 transition-colors cursor-pointer">
            <span class="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>
        <p class="text-body-md text-text-muted mb-6">
          I am currently available for high-impact projects and remote collaborations.
        </p>

        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6" novalidate>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2 text-left">
              <label for="contact-name" class="font-label-caps text-label-caps text-text block">YOUR NAME</label>
              <input id="contact-name" formControlName="name" autocomplete="name" maxlength="100"
                     class="w-full bg-white border-border focus:border-text focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-3"
                     [class.border-error]="errorFor('name')"
                     [attr.aria-invalid]="errorFor('name') ? 'true' : null"
                     [attr.aria-describedby]="errorFor('name') ? 'contact-name-error' : null"
                     placeholder="John Doe" type="text">
              @if (errorFor('name'); as error) {
                <p id="contact-name-error" class="text-error text-sm">{{ error }}</p>
              }
            </div>
            <div class="space-y-2 text-left">
              <label for="contact-email" class="font-label-caps text-label-caps text-text block">EMAIL ADDRESS</label>
              <input id="contact-email" formControlName="email" autocomplete="email" spellcheck="false" maxlength="254"
                     class="w-full bg-white border-border focus:border-text focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-3"
                     [class.border-error]="errorFor('email')"
                     [attr.aria-invalid]="errorFor('email') ? 'true' : null"
                     [attr.aria-describedby]="errorFor('email') ? 'contact-email-error' : null"
                     placeholder="john@example.com" type="email">
              @if (errorFor('email'); as error) {
                <p id="contact-email-error" class="text-error text-sm">{{ error }}</p>
              }
            </div>
          </div>
          <div class="space-y-2 text-left">
            <label for="contact-subject" class="font-label-caps text-label-caps text-text block">SUBJECT</label>
            <input id="contact-subject" formControlName="subject" autocomplete="off" maxlength="150"
                   class="w-full bg-white border-border focus:border-text focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-3"
                   [class.border-error]="errorFor('subject')"
                   [attr.aria-invalid]="errorFor('subject') ? 'true' : null"
                   [attr.aria-describedby]="errorFor('subject') ? 'contact-subject-error' : null"
                   placeholder="New Project Inquiry" type="text">
            @if (errorFor('subject'); as error) {
              <p id="contact-subject-error" class="text-error text-sm">{{ error }}</p>
            }
          </div>
          <div class="space-y-2 text-left">
            <label for="contact-message" class="font-label-caps text-label-caps text-text block">MESSAGE</label>
            <textarea id="contact-message" formControlName="message" autocomplete="off" maxlength="5000"
                      class="w-full bg-white border-border focus:border-text focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-3"
                      [class.border-error]="errorFor('message')"
                      [attr.aria-invalid]="errorFor('message') ? 'true' : null"
                      [attr.aria-describedby]="errorFor('message') ? 'contact-message-error' : null"
                      placeholder="How can I help you?" rows="4"></textarea>
            @if (errorFor('message'); as error) {
              <p id="contact-message-error" class="text-error text-sm">{{ error }}</p>
            }
          </div>

          <!-- Toasts sit outside the dialog (inert while it is open), so a failure is also stated here. -->
          @if (sendError()) {
            <p role="alert" class="text-error text-sm">{{ sendError() }}</p>
          }

          <button type="submit" [disabled]="isSubmitting()" class="btn-primary w-full">
            {{ isSubmitting() ? 'Sending…' : 'Send Message' }}
            <span class="material-symbols-outlined" aria-hidden="true">send</span>
          </button>
        </form>
      </div>
    </div>
  `
})
export class ContactDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);

  readonly closed = output<void>();
  readonly isSubmitting = signal(false);
  readonly sendError = signal<string | null>(null);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor() {
    afterNextRender(() => document.getElementById('contact-name')?.focus());
  }

  /** Returns the visible error text for a field once it has been touched, else null. */
  errorFor(field: FieldName): string | null {
    const control = this.contactForm.controls[field];
    if (!control.invalid || !control.touched) {
      return null;
    }
    const messages = ERROR_MESSAGES[field];
    const errors = control.errors ?? {};
    if (errors['required']) return messages.required;
    if (errors['minlength'] && messages.minlength) return messages.minlength;
    if (errors['email'] && messages.email) return messages.email;
    return messages.required;
  }

  close() {
    this.closed.emit();
  }

  /** Escape and outside click never close the dialog while a send is in flight. */
  onEscape() {
    if (!this.isSubmitting()) {
      this.close();
    }
  }

  onBackdrop() {
    if (!this.isSubmitting()) {
      this.close();
    }
  }

  async onSubmit() {
    if (this.isSubmitting()) {
      return;
    }
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.sendError.set(null);

    try {
      await firstValueFrom(this.http.post('/api/contact', this.contactForm.getRawValue()));
      this.toast.success('Thank you! Your message has been sent successfully.');
      this.contactForm.reset();
      this.close();
    } catch {
      this.sendError.set(SEND_FAILED);
      this.toast.error(SEND_FAILED);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
