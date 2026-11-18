import { Component, ElementRef, inject, afterNextRender, DestroyRef } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { CareerPathComponent } from './components/career-path/career-path.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { JourneyComponent } from './components/journey/journey.component';
import { OffScreenActivitiesComponent } from './components/off-screen-activities/off-screen-activities.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    CareerPathComponent,
    PortfolioComponent,
    ContactComponent,
    JourneyComponent,
    OffScreenActivitiesComponent,
    CertificatesComponent,
    FooterComponent,
    ThemeToggleComponent,
    ChatBotComponent,
    ToastComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // Keyboard users get instant scrolling so focus lands on screen at once (see styles.css, html.kbd).
      const root = document.documentElement;
      document.addEventListener('keydown', (e) => { if (e.key === 'Tab') root.classList.add('kbd'); }, true);
      document.addEventListener('pointerdown', () => root.classList.remove('kbd'), true);

      // Skip the scroll reveal when it cannot run safely (reduced motion, or no IntersectionObserver)
      // so nothing is ever left hidden.
      if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Scroll reveal animation observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            } else if (!entry.target.contains(document.activeElement)) {
              // Never re-hide a section that holds keyboard focus.
              entry.target.classList.add('opacity-0', 'translate-y-10');
              entry.target.classList.remove('opacity-100', 'translate-y-0');
            }
          });
        },
        // threshold 0: a section starts revealing as soon as its top enters the viewport, so even a
        // section much taller than the screen can never stay hidden.
        { threshold: 0, rootMargin: '0px 0px -10% 0px' }
      );

      // Select all section tags and observe them
      const sections = this.el.nativeElement.querySelectorAll('section');
      sections.forEach((section: HTMLElement) => {
        section.classList.add('transition-[opacity,transform]', 'duration-1000', 'ease-out');
        // Never hide what the visitor is already looking at (no flash on load or on a deep link).
        const rect = section.getBoundingClientRect();
        if (rect.top >= window.innerHeight || rect.bottom <= 0) {
          section.classList.add('opacity-0', 'translate-y-10');
        }
        observer.observe(section);
        // Keyboard focus inside a section reveals it at once, so focus is never on hidden content.
        section.addEventListener('focusin', () => {
          section.style.transitionDuration = '0ms';
          section.classList.add('opacity-100', 'translate-y-0');
          section.classList.remove('opacity-0', 'translate-y-10');
        });
      });

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
