import { Component, ElementRef, inject, afterNextRender } from '@angular/core';
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
    ChatBotComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly el = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      // Scroll reveal animation observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            } else {
              entry.target.classList.add('opacity-0', 'translate-y-10');
              entry.target.classList.remove('opacity-100', 'translate-y-0');
            }
          });
        },
        { threshold: 0.1 }
      );

      // Select all section tags and observe them
      const sections = this.el.nativeElement.querySelectorAll('section');
      sections.forEach((section: HTMLElement) => {
        section.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
        observer.observe(section);
      });
    });
  }
}
