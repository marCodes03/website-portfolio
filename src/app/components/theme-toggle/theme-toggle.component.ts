import { Component, signal, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggleTheme()"
            class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 text-text dark:text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
      <span class="material-symbols-outlined transition-transform duration-500"
            [class.rotate-[360deg]]="isDark()">
        {{ isDark() ? 'light_mode' : 'dark_mode' }}
      </span>
    </button>
  `
})
export class ThemeToggleComponent {
  readonly isDark = signal(false);

  constructor() {
    afterNextRender(() => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      this.isDark.set(shouldBeDark);
      this.applyTheme(shouldBeDark);
    });
  }

  toggleTheme() {
    const nextDark = !this.isDark();
    this.isDark.set(nextDark);
    this.applyTheme(nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  }

  private applyTheme(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
