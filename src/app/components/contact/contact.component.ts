import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../toast/toast.service';

type FieldName = 'name' | 'email' | 'subject' | 'message';

const ERROR_MESSAGES: Record<FieldName, { required: string; minlength?: string; email?: string }> = {
  name: { required: 'Please enter your name.', minlength: 'Your name must be at least 2 characters.' },
  email: { required: 'Please enter your email address.', email: 'Enter a valid email address, like john@example.com.' },
  subject: { required: 'Please enter a subject.' },
  message: { required: 'Please enter a message.', minlength: 'Your message must be at least 10 characters.' }
};

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    <section class="section-frosted py-section-padding-mobile md:py-section-padding-desktop px-gutter" id="contact">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
         <div class="space-y-8 text-left">
          <h2 class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-text">
            Let's talk about your Project
          </h2>
          <p class="text-body-lg text-text-muted max-w-md">
            I am currently available for high-impact projects and remote collaborations. Let's build something exceptional together.
          </p>
          <div class="space-y-6 pt-8">
            <div class="flex items-center gap-6">
              <div class="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-text border border-border">
                <span class="material-symbols-outlined" aria-hidden="true">mail</span>
              </div>
              <div class="min-w-0">
                <p class="font-label-caps text-label-caps text-text-muted">EMAIL ME</p>
                <p class="font-headline-md text-headline-md [overflow-wrap:anywhere]">amira.coder03@gmail.com</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-text border border-border">
                <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
              </div>
              <div>
                <p class="font-label-caps text-label-caps text-text-muted">LOCATION</p>
                <p class="font-headline-md text-headline-md">Taguig City, Philippines</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-surface p-8 md:p-12 rounded-3xl shadow-lg">
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

            <button type="submit"
                    [disabled]="isSubmitting()"
                    class="btn-primary w-full">
              {{ isSubmitting() ? 'Sending…' : 'Send Message' }}
              <span class="material-symbols-outlined" aria-hidden="true">send</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  readonly isSubmitting = signal(false);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

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

  async onSubmit() {
    if (this.isSubmitting()) {
      return;
    }

    // Surface every error at once instead of silently disabling the button.
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    try {
      await firstValueFrom(this.http.post('/api/contact', this.contactForm.getRawValue()));

      this.toast.success('Thank you! Your message has been sent successfully.');
      this.contactForm.reset();
    } catch {
      this.toast.error('Something went wrong sending your message. Please try again, or email me directly.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
