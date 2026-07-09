import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

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
                <span class="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p class="font-label-caps text-label-caps text-text-muted">EMAIL ME</p>
                <p class="font-headline-md text-headline-md">amira.coder03@@gmail.com</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-text border border-border">
                <span class="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p class="font-label-caps text-label-caps text-text-muted">LOCATION</p>
                <p class="font-headline-md text-headline-md">Taguig City, Philippines</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-surface p-8 md:p-12 rounded-2xl shadow-lg">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2 text-left">
                <label class="font-label-caps text-label-caps text-text block">YOUR NAME</label>
                <input formControlName="name"
                       class="w-full bg-white border-border focus:border-text focus:ring-0 rounded-lg p-3 outline-none"
                       [class.border-error]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
                       placeholder="John Doe" type="text">
              </div>
              <div class="space-y-2 text-left">
                <label class="font-label-caps text-label-caps text-text block">EMAIL ADDRESS</label>
                <input formControlName="email"
                       class="w-full bg-white border-border focus:border-text focus:ring-0 rounded-lg p-3 outline-none"
                       [class.border-error]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                       placeholder="john@@example.com" type="email">
              </div>
            </div>
            <div class="space-y-2 text-left">
              <label class="font-label-caps text-label-caps text-text block">SUBJECT</label>
              <input formControlName="subject"
                     class="w-full bg-white border-border focus:border-text focus:ring-0 rounded-lg p-3 outline-none"
                     [class.border-error]="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched"
                     placeholder="New Project Inquiry" type="text">
            </div>
            <div class="space-y-2 text-left">
              <label class="font-label-caps text-label-caps text-text block">MESSAGE</label>
              <textarea formControlName="message"
                        class="w-full bg-white border-border focus:border-text focus:ring-0 rounded-lg p-3 outline-none"
                        [class.border-error]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
                        placeholder="How can I help you?" rows="4"></textarea>
            </div>
            
            <button type="submit"
                    [disabled]="contactForm.invalid"
                    class="w-full bg-text text-white py-4 rounded-lg font-label-caps text-label-caps dark:text-black hover:bg-primary transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              Send Message
              <span class="material-symbols-outlined">send</span>
            </button>

            @if (showSuccess()) {
              <div class="text-green-600 font-bold text-center mt-4">
                Thank you! Your message has been sent successfully.
              </div>
            }
          </form>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  readonly showSuccess = signal(false);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      const { name, email, subject, message } = this.contactForm.value;
      const mailtoUrl = `mailto:amira.coder03@gmail.com?subject=${encodeURIComponent(subject || '')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoUrl;

      this.showSuccess.set(true);
      this.contactForm.reset();

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.showSuccess.set(false);
      }, 5000);
    }
  }
}
