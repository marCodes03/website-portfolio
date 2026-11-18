import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-tertiary text-on-tertiary py-section-padding-mobile md:py-section-padding-desktop">
      <div class="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-gutter">
        <div class="text-center md:text-left mb-8 md:mb-0">
          <div class="font-headline-sm text-headline-sm font-bold text-on-tertiary mb-2">Marco O. Amira</div>
          <p class="font-body-md text-body-md text-on-tertiary/70">&copy; {{ currentYear }} Marco O. Amira. All rights reserved.</p>
        </div>
        <div class="flex flex-col items-center md:items-end gap-6">
          <div class="flex flex-wrap gap-8 justify-center">
            <a class="tap-44 inline-block font-label-caps text-label-caps text-on-tertiary/70 hover:text-on-tertiary transition-opacity" href="https://github.com/marCodes03" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a class="tap-44 inline-block font-label-caps text-label-caps text-on-tertiary/70 hover:text-on-tertiary transition-opacity" href="https://www.linkedin.com/in/marco-amira/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a class="tap-44 inline-block font-label-caps text-label-caps text-on-tertiary/70 hover:text-on-tertiary transition-opacity" href="mailto:amira.coder03@gmail.com">Email</a>
          </div>
          <button type="button" (click)="scrollToTop()"
                  class="tap-44 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Scroll to Top">
            <span class="material-symbols-outlined" aria-hidden="true">expand_less</span>
          </button>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
