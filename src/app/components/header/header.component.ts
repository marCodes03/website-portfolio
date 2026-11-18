import { Component, signal, computed, afterNextRender, inject, DestroyRef } from '@angular/core';

interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly mobileLabel: string;
}

const MAIN_NAV: readonly NavItem[] = [
  { id: 'home', label: 'Home', mobileLabel: 'Home' },
  { id: 'about', label: 'About', mobileLabel: 'About' },
  { id: 'experience', label: 'Experience', mobileLabel: 'Experience' },
  { id: 'projects', label: 'Projects', mobileLabel: 'Projects' },
  { id: 'contact', label: 'Contact', mobileLabel: 'Contact' }
];

const OTHER_NAV: readonly NavItem[] = [
  { id: 'skills', label: 'Tech Stack', mobileLabel: 'Skills & Tools' },
  { id: 'career-path', label: 'Work Flow Process', mobileLabel: 'Career Path' },
  { id: 'journey', label: 'Programming Journey', mobileLabel: 'Journey' },
  { id: 'achievements', label: 'Achievements', mobileLabel: 'Achievements' },
  { id: 'off-screen-activities', label: 'Outside Work', mobileLabel: 'Off-Screen' },
  { id: 'certificates', label: 'Certificates', mobileLabel: 'Certificates' }
];

const OTHER_IDS = OTHER_NAV.map(item => item.id);
const SECTION_IDS = [...MAIN_NAV, ...OTHER_NAV].map(item => item.id);

@Component({
  selector: 'app-header',
  host: {
    '(document:click)': 'onDocumentClick($event)'
  },
  template: `
    <header class="sticky top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-border transition-[background-color,border-color] duration-300 ease-in-out">
      <nav aria-label="Primary" class="flex justify-between items-center max-w-[1200px] mx-auto px-gutter py-4">
        <a href="#home" class="logo-link tap-44 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg no-underline" aria-label="marCodes home">
          <span class="font-roboto-mono text-xl font-extrabold tracking-tight text-accent dark:text-text flex items-baseline">
            <span>m</span>
            <span class="logo-letter-a">a</span>
            <span>r</span>
            <span class="text-primary flex items-baseline"><span>[</span><span class="logo-word-codes">Codes</span><span>]</span></span>
          </span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          @for (item of mainNav; track item.id) {
            <a class="font-label-caps text-label-caps transition-colors relative py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
               [class.text-primary]="activeSection() === item.id"
               [class.text-glow]="activeSection() === item.id"
               [class.text-text-muted]="activeSection() !== item.id"
               [attr.aria-current]="activeSection() === item.id ? 'location' : null"
               [href]="'#' + item.id">
              {{ item.label }}
              @if (activeSection() === item.id) {
                <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in dark:shadow-[0_0_8px_var(--color-accent)]" aria-hidden="true"></span>
              }
            </a>
          }

          <!-- Dropdown Option for Other -->
          <div class="relative inline-block other-dropdown-container" (keydown.escape)="closeDropdown()">
            <button type="button"
                    class="font-label-caps text-label-caps transition-colors relative py-2 flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
                    [class.text-primary]="isOtherActive() || isDropdownOpen()"
                    [class.text-glow]="isOtherActive() || isDropdownOpen()"
                    [class.text-text-muted]="!isOtherActive() && !isDropdownOpen()"
                    (click)="toggleDropdown($event)"
                    aria-controls="other-menu"
                    [attr.aria-expanded]="isDropdownOpen()">
              Other
              <span class="material-symbols-outlined text-sm transition-transform duration-300"
                    aria-hidden="true"
                    [class.rotate-180]="isDropdownOpen()">expand_more</span>
              @if (isOtherActive()) {
                <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in dark:shadow-[0_0_8px_var(--color-accent)]" aria-hidden="true"></span>
              }
            </button>

            @if (isDropdownOpen()) {
              <div id="other-menu" class="absolute right-0 mt-2 w-56 rounded-xl bg-surface/90 dark:bg-surface/95 backdrop-blur-md border border-border/50 dark:border-accent/30 dark:box-glow-border shadow-lg py-2 z-50 animate-fade-in flex flex-col">
                @for (item of otherNav; track item.id) {
                  <a class="px-4 py-3 text-label-caps hover:bg-primary/10 hover:text-primary transition-colors text-left font-label-caps border-l-2 border-transparent hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                     [class.text-primary]="activeSection() === item.id"
                     [class.text-glow]="activeSection() === item.id"
                     [class.border-primary]="activeSection() === item.id"
                     [class.text-text-muted]="activeSection() !== item.id"
                     [attr.aria-current]="activeSection() === item.id ? 'location' : null"
                     [href]="'#' + item.id"
                     (click)="closeDropdown()">
                    {{ item.label }}
                  </a>
                }
              </div>
            }
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button type="button"
                class="md:hidden p-2 text-text hover:opacity-80 transition-opacity rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                (click)="toggleMobileMenu()"
                aria-label="Toggle navigation menu"
                aria-controls="mobile-menu"
                [attr.aria-expanded]="isMobileMenuOpen()">
          <span class="material-symbols-outlined" aria-hidden="true">{{ isMobileMenuOpen() ? 'close' : 'menu' }}</span>
        </button>
      </nav>

      <!-- Mobile Navigation Drawer -->
      @if (isMobileMenuOpen()) {
        <div id="mobile-menu" class="md:hidden border-t border-border bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-md py-6 px-gutter flex flex-col gap-6 animate-fade-in">
          @for (item of mainNav; track item.id) {
            <a class="font-label-caps text-label-caps transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
               [class.text-primary]="activeSection() === item.id"
               [class.text-text-muted]="activeSection() !== item.id"
               [attr.aria-current]="activeSection() === item.id ? 'location' : null"
               [href]="'#' + item.id"
               (click)="closeMobileMenu()">{{ item.mobileLabel }}</a>
          }

          <!-- Mobile Accordion for Other -->
          <div class="flex flex-col border-t border-border/50 dark:border-white/10 pt-2">
            <button type="button"
                    class="font-label-caps text-label-caps py-2 flex items-center justify-between w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md text-left"
                    [class.text-primary]="isOtherActive() || isMobileDropdownOpen()"
                    [class.text-text-muted]="!isOtherActive() && !isMobileDropdownOpen()"
                    (click)="toggleMobileDropdown()"
                    aria-controls="mobile-other-menu"
                    [attr.aria-expanded]="isMobileDropdownOpen()">
              <span>Other</span>
              <span class="material-symbols-outlined transition-transform duration-300"
                    aria-hidden="true"
                    [class.rotate-180]="isMobileDropdownOpen()">expand_more</span>
            </button>
            @if (isMobileDropdownOpen()) {
              <div id="mobile-other-menu" class="flex flex-col gap-2 pl-4 border-l border-border/50 dark:border-white/10 mt-2">
                @for (item of otherNav; track item.id) {
                  <a class="font-label-caps text-label-caps py-2 transition-colors animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                     [class.text-primary]="activeSection() === item.id"
                     [class.text-text-muted]="activeSection() !== item.id"
                     [attr.aria-current]="activeSection() === item.id ? 'location' : null"
                     [href]="'#' + item.id"
                     (click)="closeMobileMenu()">{{ item.mobileLabel }}</a>
                }
              </div>
            }
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  readonly mainNav = MAIN_NAV;
  readonly otherNav = OTHER_NAV;

  readonly isMobileMenuOpen = signal(false);
  readonly isDropdownOpen = signal(false);
  readonly isMobileDropdownOpen = signal(false);
  readonly activeSection = signal<string>('home');

  readonly isOtherActive = computed(() => OTHER_IDS.includes(this.activeSection()));

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Expose the real header height so the hero can fill exactly the rest of the first screen.
      // Skipped while the mobile menu is open, which makes the header taller.
      const header = document.querySelector('app-header header');
      if (header && 'ResizeObserver' in window) {
        const root = document.documentElement;
        const sizeObserver = new ResizeObserver(() => {
          if (!this.isMobileMenuOpen()) {
            root.style.setProperty('--header-h', header.getBoundingClientRect().height + 'px');
          }
        });
        sizeObserver.observe(header);
        destroyRef.onDestroy(() => sizeObserver.disconnect());
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              if (id) {
                this.activeSection.set(id);
              }
            }
          }
        },
        {
          rootMargin: '-30% 0px -50% 0px',
          threshold: 0
        }
      );

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }

      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
    this.isMobileDropdownOpen.set(false);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.isMobileDropdownOpen.set(false);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update(open => !open);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  toggleMobileDropdown() {
    this.isMobileDropdownOpen.update(open => !open);
  }

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.other-dropdown-container')) {
      this.isDropdownOpen.set(false);
    }
  }
}
