import { Component, signal, computed, afterNextRender, inject } from '@angular/core';
import { ChatBotService } from '../chat-bot/chat-bot.service';

@Component({
  selector: 'app-header',
  host: {
    '(document:click)': 'onDocumentClick($event)'
  },
  template: `
    <header class="sticky top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-border transition-all duration-300 ease-in-out">
      <nav class="flex justify-between items-center max-w-[1200px] mx-auto px-gutter py-4">
        <a href="#home" class="logo-link flex items-center focus:outline-none rounded-lg no-underline" aria-label="marCodes home">
          <span class="font-roboto-mono text-xl font-extrabold tracking-tight text-accent dark:text-text flex items-baseline">
            <span>m</span>
            <span class="logo-letter-a">a</span>
            <span>r</span>
            <span class="text-primary flex items-baseline"><span>[</span><span class="logo-word-codes">Codes</span><span>]</span></span>
          </span>
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <a class="font-label-caps text-label-caps transition-colors relative py-2"
             [class.text-primary]="activeSection() === 'home'"
             [class.text-glow]="activeSection() === 'home'"
             [class.text-text-muted]="activeSection() !== 'home'"
             href="#home">
            Home
            @if (activeSection() === 'home') {
              <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in dark:shadow-[0_0_8px_var(--color-accent)]"></span>
            }
          </a>
          <a class="font-label-caps text-label-caps transition-colors relative py-2"
             [class.text-primary]="activeSection() === 'about'"
             [class.text-glow]="activeSection() === 'about'"
             [class.text-text-muted]="activeSection() !== 'about'"
             href="#about">
            About
            @if (activeSection() === 'about') {
              <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in dark:shadow-[0_0_8px_var(--color-accent)]"></span>
            }
          </a>
          <a class="font-label-caps text-label-caps transition-colors relative py-2"
             [class.text-primary]="activeSection() === 'experience'"
             [class.text-glow]="activeSection() === 'experience'"
             [class.text-text-muted]="activeSection() !== 'experience'"
             href="#experience">
            Experience
            @if (activeSection() === 'experience') {
              <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in dark:shadow-[0_0_8px_var(--color-accent)]"></span>
            }
          </a>
          <a class="font-label-caps text-label-caps transition-colors relative py-2"
             [class.text-primary]="activeSection() === 'projects'"
             [class.text-glow]="activeSection() === 'projects'"
             [class.text-text-muted]="activeSection() !== 'projects'"
             href="#projects">
            Projects
            @if (activeSection() === 'projects') {
              <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in dark:shadow-[0_0_8px_var(--color-accent)]"></span>
            }
          </a>
          <a class="font-label-caps text-label-caps transition-colors relative py-2"
             [class.text-primary]="activeSection() === 'contact'"
             [class.text-glow]="activeSection() === 'contact'"
             [class.text-text-muted]="activeSection() !== 'contact'"
             href="#contact">
            Contact
            @if (activeSection() === 'contact') {
              <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in dark:shadow-[0_0_8px_var(--color-accent)]"></span>
            }
          </a>

          
          <!-- Dropdown Option for Other -->
          <div class="relative inline-block other-dropdown-container">
            <button class="font-label-caps text-label-caps transition-colors relative py-2 flex items-center gap-1 cursor-pointer focus:outline-none"
                    [class.text-primary]="isOtherActive() || isDropdownOpen()"
                    [class.text-glow]="isOtherActive() || isDropdownOpen()"
                    [class.text-text-muted]="!isOtherActive() && !isDropdownOpen()"
                    (click)="toggleDropdown($event)"
                    (keydown.escape)="closeDropdown()"
                    aria-haspopup="true"
                    [aria-expanded]="isDropdownOpen()">
              Other
              <span class="material-symbols-outlined text-sm transition-transform duration-300"
                    [class.rotate-180]="isDropdownOpen()">expand_more</span>
              @if (isOtherActive()) {
                <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in dark:shadow-[0_0_8px_var(--color-accent)]"></span>
              }
            </button>
            
            @if (isDropdownOpen()) {
              <div class="absolute right-0 mt-2 w-56 rounded-xl bg-surface/90 dark:bg-surface/95 backdrop-blur-md border border-border/50 dark:border-accent/30 dark:box-glow-border shadow-lg py-2 z-50 animate-fade-in flex flex-col">
                <a class="px-4 py-3 text-label-caps hover:bg-primary/10 hover:text-primary transition-all text-left font-label-caps border-l-2 border-transparent hover:border-primary"
                   [class.text-primary]="activeSection() === 'skills'"
                   [class.text-glow]="activeSection() === 'skills'"
                   [class.border-primary]="activeSection() === 'skills'"
                   [class.text-text-muted]="activeSection() !== 'skills'"
                   href="#skills"
                   (click)="closeDropdown()">
                  Tech Stack
                </a>
                <a class="px-4 py-3 text-label-caps hover:bg-primary/10 hover:text-primary transition-all text-left font-label-caps border-l-2 border-transparent hover:border-primary"
                   [class.text-primary]="activeSection() === 'career-path'"
                   [class.text-glow]="activeSection() === 'career-path'"
                   [class.border-primary]="activeSection() === 'career-path'"
                   [class.text-text-muted]="activeSection() !== 'career-path'"
                   href="#career-path"
                   (click)="closeDropdown()">
                  Work Flow Process
                </a>
                 <a class="px-4 py-3 text-label-caps hover:bg-primary/10 hover:text-primary transition-all text-left font-label-caps border-l-2 border-transparent hover:border-primary"
                    [class.text-primary]="activeSection() === 'reviews'"
                    [class.text-glow]="activeSection() === 'reviews'"
                    [class.border-primary]="activeSection() === 'reviews'"
                    [class.text-text-muted]="activeSection() !== 'reviews'"
                    href="#reviews"
                    (click)="closeDropdown()">
                   Feedbacks
                 </a>
                <a class="px-4 py-3 text-label-caps hover:bg-primary/10 hover:text-primary transition-all text-left font-label-caps border-l-2 border-transparent hover:border-primary"
                   [class.text-primary]="activeSection() === 'journey'"
                   [class.text-glow]="activeSection() === 'journey'"
                   [class.border-primary]="activeSection() === 'journey'"
                   [class.text-text-muted]="activeSection() !== 'journey'"
                   href="#journey"
                   (click)="closeDropdown()">
                  Programming Journey
                </a>
                <a class="px-4 py-3 text-label-caps hover:bg-primary/10 hover:text-primary transition-all text-left font-label-caps border-l-2 border-transparent hover:border-primary"
                   [class.text-primary]="activeSection() === 'achievements'"
                   [class.text-glow]="activeSection() === 'achievements'"
                   [class.border-primary]="activeSection() === 'achievements'"
                   [class.text-text-muted]="activeSection() !== 'achievements'"
                   href="#achievements"
                   (click)="closeDropdown()">
                  Achievements
                </a>
                <a class="px-4 py-3 text-label-caps hover:bg-primary/10 hover:text-primary transition-all text-left font-label-caps border-l-2 border-transparent hover:border-primary"
                   [class.text-primary]="activeSection() === 'off-screen-activities'"
                   [class.text-glow]="activeSection() === 'off-screen-activities'"
                   [class.border-primary]="activeSection() === 'off-screen-activities'"
                   [class.text-text-muted]="activeSection() !== 'off-screen-activities'"
                   href="#off-screen-activities"
                   (click)="closeDropdown()">
                  Outside Work
                </a>
                <a class="px-4 py-3 text-label-caps hover:bg-primary/10 hover:text-primary transition-all text-left font-label-caps border-l-2 border-transparent hover:border-primary"
                   [class.text-primary]="activeSection() === 'certificates'"
                   [class.text-glow]="activeSection() === 'certificates'"
                   [class.border-primary]="activeSection() === 'certificates'"
                   [class.text-text-muted]="activeSection() !== 'certificates'"
                   href="#certificates"
                   (click)="closeDropdown()">
                  Certificates
                </a>
              </div>
            }
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="md:hidden p-2 text-text hover:opacity-80 transition-opacity" (click)="toggleMobileMenu()" aria-label="Toggle Navigation Menu">
          <span class="material-symbols-outlined">{{ isMobileMenuOpen() ? 'close' : 'menu' }}</span>
        </button>
      </nav>

      <!-- Mobile Navigation Drawer -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden border-t border-border bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-md py-6 px-gutter flex flex-col gap-6 animate-fade-in">
          <a class="font-label-caps text-label-caps transition-colors py-2"
             [class.text-primary]="activeSection() === 'home'"
             [class.text-text-muted]="activeSection() !== 'home'"
             href="#home"
             (click)="closeMobileMenu()">Home</a>
          <a class="font-label-caps text-label-caps transition-colors py-2"
             [class.text-primary]="activeSection() === 'about'"
             [class.text-text-muted]="activeSection() !== 'about'"
             href="#about"
             (click)="closeMobileMenu()">About</a>
          <a class="font-label-caps text-label-caps transition-colors py-2"
             [class.text-primary]="activeSection() === 'experience'"
             [class.text-text-muted]="activeSection() !== 'experience'"
             href="#experience"
             (click)="closeMobileMenu()">Experience</a>
          <a class="font-label-caps text-label-caps transition-colors py-2"
             [class.text-primary]="activeSection() === 'projects'"
             [class.text-text-muted]="activeSection() !== 'projects'"
             href="#projects"
             (click)="closeMobileMenu()">Projects</a>
          <a class="font-label-caps text-label-caps transition-colors py-2"
             [class.text-primary]="activeSection() === 'contact'"
             [class.text-text-muted]="activeSection() !== 'contact'"
             href="#contact"
             (click)="closeMobileMenu()">Contact</a>

          
          <!-- Mobile Accordion for Other -->
          <div class="flex flex-col border-t border-border/50 dark:border-white/10 pt-2">
            <button class="font-label-caps text-label-caps py-2 flex items-center justify-between w-full focus:outline-none text-left"
                    [class.text-primary]="isOtherActive() || isMobileDropdownOpen()"
                    [class.text-text-muted]="!isOtherActive() && !isMobileDropdownOpen()"
                    (click)="toggleMobileDropdown()"
                    aria-haspopup="true"
                    [aria-expanded]="isMobileDropdownOpen()">
              <span>Other</span>
              <span class="material-symbols-outlined transition-transform duration-300"
                    [class.rotate-180]="isMobileDropdownOpen()">expand_more</span>
            </button>
            @if (isMobileDropdownOpen()) {
              <div class="flex flex-col gap-2 pl-4 border-l border-border/50 dark:border-white/10 mt-2">
                <a class="font-label-caps text-label-caps py-2 transition-colors animate-fade-in"
                   [class.text-primary]="activeSection() === 'skills'"
                   [class.text-text-muted]="activeSection() !== 'skills'"
                   href="#skills"
                   (click)="closeMobileMenu()">Skills &amp; Tools</a>
                <a class="font-label-caps text-label-caps py-2 transition-colors animate-fade-in"
                   [class.text-primary]="activeSection() === 'career-path'"
                   [class.text-text-muted]="activeSection() !== 'career-path'"
                   href="#career-path"
                   (click)="closeMobileMenu()">Career Path</a>
                 <a class="font-label-caps text-label-caps py-2 transition-colors animate-fade-in"
                    [class.text-primary]="activeSection() === 'reviews'"
                    [class.text-text-muted]="activeSection() !== 'reviews'"
                    href="#reviews"
                    (click)="closeMobileMenu()">Feedbacks</a>
                <a class="font-label-caps text-label-caps py-2 transition-colors animate-fade-in"
                   [class.text-primary]="activeSection() === 'journey'"
                   [class.text-text-muted]="activeSection() !== 'journey'"
                   href="#journey"
                   (click)="closeMobileMenu()">Journey</a>
                <a class="font-label-caps text-label-caps py-2 transition-colors animate-fade-in"
                   [class.text-primary]="activeSection() === 'off-screen-activities'"
                   [class.text-text-muted]="activeSection() !== 'off-screen-activities'"
                   href="#off-screen-activities"
                   (click)="closeMobileMenu()">Off-Screen</a>
                 <a class="font-label-caps text-label-caps py-2 transition-colors animate-fade-in"
                    [class.text-primary]="activeSection() === 'certificates'"
                    [class.text-text-muted]="activeSection() !== 'certificates'"
                    href="#certificates"
                    (click)="closeMobileMenu()">Certificates</a>
              </div>
            }
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  readonly chatService = inject(ChatBotService);
  readonly isMobileMenuOpen = signal(false);
  readonly isDropdownOpen = signal(false);
  readonly isMobileDropdownOpen = signal(false);
  readonly activeSection = signal<string>('home');

  readonly isOtherActive = computed(() => {
    return ['skills', 'career-path', 'journey', 'achievements', 'off-screen-activities', 'certificates', 'reviews'].includes(this.activeSection());
  });

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              if (id) {
                this.activeSection.set(id);
              }
            }
          });
        },
        {
          rootMargin: '-30% 0px -50% 0px',
          threshold: 0
        }
      );

      const sectionIds = [
        'home',
        'about',
        'experience',
        'projects',
        'contact',
        'reviews',
        'skills',
        'career-path',
        'journey',
        'achievements',
        'off-screen-activities',
        'certificates'
      ];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
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

