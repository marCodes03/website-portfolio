import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CertificateModalComponent } from './certificate-modal.component';

export interface Certificate {
  title: string;
  category: string;
  year: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  images: string[];
  icon: string;
  colSpan: number;
}

@Component({
  selector: 'app-certificates',
  imports: [NgOptimizedImage, CertificateModalComponent],
  template: `
    <section class="py-section-padding-mobile md:py-section-padding-desktop transition-[opacity,transform] duration-1000 ease-out opacity-100 translate-y-0 section-frosted" id="certificates">
      <div class="max-w-[1200px] mx-auto px-6 md:px-gutter">
        <!-- Section Header -->
        <div class="mb-16 space-y-4 text-left">
          <span class="font-label-caps text-label-caps text-accent tracking-widest">ACHIEVEMENTS</span>
          <h2 class="font-headline-lg text-headline-lg text-text font-bold">Certificates &amp; Training</h2>
        </div>

        <!-- Upper Marquee (Scrolls Left) -->
        <div class="relative w-full overflow-hidden mb-12 flex gap-6 select-none group pointer-events-auto">
          <div class="flex gap-6 shrink-0 animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] pointer-events-auto">
            @for (item of upperMarquee; track item.title) {
              <div class="bg-surface border border-border/70 dark:bg-white/10 dark:border-white/20 shadow-sm px-5 py-2.5 rounded-full flex items-center gap-3 text-xs md:text-sm font-roboto-mono whitespace-nowrap hover:scale-105 hover:border-accent transition-[border-color,transform] duration-300">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      [class]="item.type === 'Award' ? 'bg-text text-background dark:bg-white dark:text-on-accent' : 'bg-accent text-background dark:bg-accent dark:text-on-accent'">
                  {{ item.type }}
                </span>
                <span class="text-accent font-bold" aria-hidden="true">•</span>
                <span class="text-text dark:text-white font-bold">{{ item.title }}</span>
                <span class="text-accent font-bold" aria-hidden="true">•</span>
                <span class="text-text-muted dark:text-white/60 font-semibold">{{ item.year }}</span>
              </div>
            }
            @for (item of upperMarquee; track item.title + '-dup') {
              <div aria-hidden="true" class="bg-surface border border-border/70 dark:bg-white/10 dark:border-white/20 shadow-sm px-5 py-2.5 rounded-full flex items-center gap-3 text-xs md:text-sm font-roboto-mono whitespace-nowrap hover:scale-105 hover:border-accent transition-[border-color,transform] duration-300">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      [class]="item.type === 'Award' ? 'bg-text text-background dark:bg-white dark:text-on-accent' : 'bg-accent text-background dark:bg-accent dark:text-on-accent'">
                  {{ item.type }}
                </span>
                <span class="text-accent font-bold" aria-hidden="true">•</span>
                <span class="text-text dark:text-white font-bold">{{ item.title }}</span>
                <span class="text-accent font-bold" aria-hidden="true">•</span>
                <span class="text-text-muted dark:text-white/60 font-semibold">{{ item.year }}</span>
              </div>
            }
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter text-left">
          <!-- Card 1: Cum Laude & Valedictorian -->
          <div class="md:col-span-8 group relative overflow-hidden bg-surface border border-border p-8 transition-shadow hover:shadow-lg dark:hover:box-glow-border cursor-pointer"
               (click)="openModal(certificates[0], $event)"
               (keydown.enter)="openModal(certificates[0], $event)"
               tabindex="0"
               role="button"
               aria-haspopup="dialog"
               [attr.aria-label]="'View certificate details for ' + certificates[0].title">
            <div class="flex flex-col h-full justify-between gap-8">
              <div class="flex justify-between items-start">
                <span class="material-symbols-outlined text-accent text-3xl" aria-hidden="true">{{ certificates[0].icon }}</span>
                <span class="font-label-caps text-label-caps text-text-muted">{{ certificates[0].year }}</span>
              </div>
              <div>
                <h3 class="font-headline-md text-headline-md text-text mb-2">{{ certificates[0].title }}</h3>
                <p class="font-label-caps text-label-caps text-text mb-4">{{ certificates[0].subtitle }}</p>
                <p class="font-body-md text-text-muted max-w-md mb-4">{{ certificates[0].description }}</p>
                <span class="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-label-caps text-xs px-3.5 py-1 rounded-full inline-block font-semibold">{{ certificates[0].category }}</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Student Director -->
          <div class="md:col-span-4 bg-surface text-text p-8 transition-[transform,box-shadow] hover:translate-y-[-4px] border border-border dark:hover:box-glow-border cursor-pointer"
               (click)="openModal(certificates[1], $event)"
               (keydown.enter)="openModal(certificates[1], $event)"
               tabindex="0"
               role="button"
               aria-haspopup="dialog"
               [attr.aria-label]="'View certificate details for ' + certificates[1].title">
            <div class="flex flex-col h-full justify-between gap-8">
              <div class="flex justify-between items-start">
                <span class="material-symbols-outlined text-accent text-3xl" aria-hidden="true">{{ certificates[1].icon }}</span>
                <span class="font-label-caps text-label-caps text-text-muted">{{ certificates[1].year }}</span>
              </div>
              <div>
                <h3 class="font-headline-md text-headline-md mb-2">{{ certificates[1].title }}</h3>
                <p class="font-label-caps text-label-caps text-text-muted mb-4">{{ certificates[1].subtitle }}</p>
                <span class="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-label-caps text-xs px-3.5 py-1 rounded-full inline-block font-semibold">{{ certificates[1].category }}</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Gerry Roxas Leadership -->
          <div class="md:col-span-4 border border-border p-8 hover:bg-white/40 dark:hover:box-glow-border transition-colors bg-surface cursor-pointer"
               (click)="openModal(certificates[4], $event)"
               (keydown.enter)="openModal(certificates[4], $event)"
               tabindex="0"
               role="button"
               aria-haspopup="dialog"
               [attr.aria-label]="'View certificate details for ' + certificates[4].title">
            <div class="flex flex-col h-full justify-between gap-6">
              <div class="flex justify-between items-start">
                <span class="material-symbols-outlined text-accent text-3xl" aria-hidden="true">{{ certificates[4].icon }}</span>
                <span class="font-label-caps text-label-caps text-text-muted">{{ certificates[4].year }}</span>
              </div>
              <div>
                <h3 class="font-headline-md text-headline-md text-text mb-4">{{ certificates[4].title }}</h3>
                <p class="font-label-caps text-label-caps text-text mb-4">{{ certificates[4].subtitle }}</p>
                <p class="font-body-md text-text-muted mb-4">{{ certificates[4].description }}</p>
                <span class="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-label-caps text-xs px-3.5 py-1 rounded-full inline-block font-semibold">{{ certificates[4].category }}</span>
              </div>
            </div>
          </div>

          <!-- Card 4: Best Research Paper -->
          <div class="md:col-span-4 border border-border p-8 hover:bg-white/40 dark:hover:box-glow-border transition-colors bg-surface cursor-pointer"
               (click)="openModal(certificates[2], $event)"
               (keydown.enter)="openModal(certificates[2], $event)"
               tabindex="0"
               role="button"
               aria-haspopup="dialog"
               [attr.aria-label]="'View certificate details for ' + certificates[2].title">
            <div class="flex flex-col h-full justify-between gap-6">
              <div class="flex justify-between items-start">
                <span class="material-symbols-outlined text-accent text-3xl" aria-hidden="true">{{ certificates[2].icon }}</span>
                <span class="font-label-caps text-label-caps text-text-muted">{{ certificates[2].year }}</span>
              </div>
              <div>
                <h3 class="font-headline-md text-headline-md text-text mb-4">{{ certificates[2].title }}</h3>
                <p class="font-label-caps text-label-caps text-text mb-4">{{ certificates[2].subtitle }}</p>
                <p class="font-body-md text-text-muted mb-4">{{ certificates[2].description }}</p>
                <span class="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-label-caps text-xs px-3.5 py-1 rounded-full inline-block font-semibold">{{ certificates[2].category }}</span>
              </div>
            </div>
          </div>

          <!-- Card 5: 3rd Place Best System -->
          <div class="md:col-span-4 border border-border p-8 hover:bg-white/40 dark:hover:box-glow-border transition-colors bg-surface cursor-pointer"
               (click)="openModal(certificates[3], $event)"
               (keydown.enter)="openModal(certificates[3], $event)"
               tabindex="0"
               role="button"
               aria-haspopup="dialog"
               [attr.aria-label]="'View certificate details for ' + certificates[3].title">
            <div class="flex flex-col h-full justify-between gap-6">
              <div class="flex justify-between items-start">
                <span class="material-symbols-outlined text-accent text-3xl" aria-hidden="true">{{ certificates[3].icon }}</span>
                <span class="font-label-caps text-label-caps text-text-muted">{{ certificates[3].year }}</span>
              </div>
              <div>
                <h3 class="font-headline-md text-headline-md text-text mb-4">{{ certificates[3].title }}</h3>
                <p class="font-label-caps text-label-caps text-text mb-4">{{ certificates[3].subtitle }}</p>
                <p class="font-body-md text-text-muted mb-4">{{ certificates[3].description }}</p>
                <span class="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-label-caps text-xs px-3.5 py-1 rounded-full inline-block font-semibold">{{ certificates[3].category }}</span>
              </div>
            </div>
          </div>

          <!-- Card 6: Runner-up (2nd Place) Android Dev (Microfinance) -->
          <div class="md:col-span-12 group flex flex-col md:flex-row items-center border border-border overflow-hidden hover:border-accent dark:hover:box-glow-border transition-[border-color,box-shadow] cursor-pointer"
               (click)="openModal(certificates[5], $event)"
               (keydown.enter)="openModal(certificates[5], $event)"
               tabindex="0"
               role="button"
               aria-haspopup="dialog"
               [attr.aria-label]="'View certificate details for ' + certificates[5].title">
            <div class="w-full md:w-1/3 bg-border h-48 md:h-full md:self-stretch relative overflow-hidden">
              <img [ngSrc]="certificates[5].imageUrl"
                   fill
                   alt="IT Olympics"
                   class="object-cover w-full h-full opacity-60 group-hover:scale-110 transition-transform duration-700">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="bg-text text-background font-label-caps text-label-caps px-4 py-2">IT OLYMPICS</span>
              </div>
            </div>
            <div class="flex-1 p-8 md:p-12 bg-surface">
              <h3 class="font-headline-lg text-headline-lg text-text mb-4">{{ certificates[5].title }}</h3>
              <p class="font-body-lg text-text-muted max-w-2xl">{{ certificates[5].description }}</p>
              <div class="mt-8 flex flex-wrap gap-3">
                <span class="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-label-caps text-xs px-3.5 py-1 rounded-full font-semibold">Cybersec</span>
                <span class="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-label-caps text-xs px-3.5 py-1 rounded-full font-semibold">Mobile UI</span>
                <span class="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-label-caps text-xs px-3.5 py-1 rounded-full font-semibold">Systems Architecture</span>
              </div>
          </div>
        </div>
      </div>

      <!-- Lower Marquee (Scrolls Right) -->
      <div class="relative w-full overflow-hidden mt-12 flex gap-6 select-none group pointer-events-auto">
        <div class="flex gap-6 shrink-0 animate-[marquee-reverse_30s_linear_infinite] group-hover:[animation-play-state:paused] pointer-events-auto">
          @for (item of lowerMarquee; track item.title) {
            <div class="bg-surface border border-border/70 dark:bg-white/10 dark:border-white/20 shadow-sm px-5 py-2.5 rounded-full flex items-center gap-3 text-xs md:text-sm font-roboto-mono whitespace-nowrap hover:scale-105 hover:border-accent transition-[border-color,transform] duration-300 font-semibold">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    [class]="item.type === 'Award' ? 'bg-text text-background dark:bg-white dark:text-on-accent' : 'bg-accent text-background dark:bg-accent dark:text-on-accent'">
                {{ item.type }}
              </span>
              <span class="text-accent font-bold" aria-hidden="true">•</span>
              <span class="text-text dark:text-white font-bold">{{ item.title }}</span>
              <span class="text-accent font-bold" aria-hidden="true">•</span>
              <span class="text-text-muted dark:text-white/60 font-semibold">{{ item.year }}</span>
            </div>
          }
          @for (item of lowerMarquee; track item.title + '-dup') {
            <div aria-hidden="true" class="bg-surface border border-border/70 dark:bg-white/10 dark:border-white/20 shadow-sm px-5 py-2.5 rounded-full flex items-center gap-3 text-xs md:text-sm font-roboto-mono whitespace-nowrap hover:scale-105 hover:border-accent transition-[border-color,transform] duration-300 font-semibold">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    [class]="item.type === 'Award' ? 'bg-text text-background dark:bg-white dark:text-on-accent' : 'bg-accent text-background dark:bg-accent dark:text-on-accent'">
                {{ item.type }}
              </span>
              <span class="text-accent font-bold" aria-hidden="true">•</span>
              <span class="text-text dark:text-white font-bold">{{ item.title }}</span>
              <span class="text-accent font-bold" aria-hidden="true">•</span>
              <span class="text-text-muted dark:text-white/60 font-semibold">{{ item.year }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  </section>

    <!-- Details Modal Overlay Component -->
    <app-certificate-modal [certificate]="selectedCertificate()" (close)="closeModal()"></app-certificate-modal>
  `
})
export class CertificatesComponent {
  readonly selectedCertificate = signal<Certificate | null>(null);

  readonly upperMarquee = [
    { type: 'Award', title: 'Cum Laude & Valedictorian', year: '2023' },
    { type: 'Award', title: 'Best Research Paper', year: '2023' },
    { type: 'Award', title: 'Runner-up (2nd Place) Android Dev', year: '2022' },
    { type: 'Award', title: '3rd Place Best System', year: '2022' },
    { type: 'Award', title: 'Champion: Web Design', year: '2019' }
  ];

  readonly lowerMarquee = [
    { type: 'Training', title: 'Internet of Things Conference', year: '2025' },
    { type: 'Training', title: 'Internet of Things Conference', year: '2024' },
    { type: 'Training', title: 'Innovation Practices in Wearable Technology', year: '2023' },
    { type: 'Training', title: 'Grey Wolf Optimization Technique on ML', year: '2023' },
    { type: 'Training', title: 'ASP.NET Core 3 MVC Webinar Series', year: '2020' }
  ];

  readonly certificates: Certificate[] = [
    {
      title: 'Cum Laude & Valedictorian',
      category: 'Academic Honor',
      year: '2023',
      subtitle: 'Taguig City University',
      description: 'Graduated Bachelor of Science in Computer Science Cum Laude and served as the batch Valedictorian, delivering the valedictory address and representing academic distinction.',
      imageUrl: 'assets/image/activities/activities-awards-cumlaude.jpg',
      images: [
        'assets/image/activities/activities-awards-cumlaude.jpg'
      ],
      icon: 'school',
      colSpan: 8
    },
    {
      title: 'Student Director',
      category: 'Management',
      year: '2022 - 2023',
      subtitle: 'ICT-SF, 2022 - 2023',
      description: 'Elected as the Student Director of the Information Technology Student Federation, representing student interests, supporting federation initiatives, and contributing to College of Information and Communications Technology student development programs. Organized events such as systems fair, tech and seminars, outreach programs, and other school activities.',
      imageUrl: 'assets/image/activities/activities-tech-and-seminars.jpg',
      images: [
        'assets/image/activities/activities-tech-and-seminars.jpg'
      ],
      icon: 'groups',
      colSpan: 4
    },
    {
      title: 'Best Research Paper',
      category: 'Research',
      year: '2023',
      subtitle: '1st IRCMSW 2023',
      description: 'Awarded Best Research Paper and received Certificate of International Presentation at the 1st International Research Conference on Management, Science, and Technology.',
      imageUrl: 'assets/image/awards/awards-best-paper.jpg',
      images: [
        'assets/image/awards/awards-best-paper.jpg',
        'assets/image/awards/awards-best-paper-presentation.jpg',
        'assets/image/awards/awards-best-paper-slide.jpg'
      ],
      icon: 'history_edu',
      colSpan: 4
    },
    {
      title: '3rd Place Best System',
      category: 'Systems Fair',
      year: '2023',
      subtitle: 'CICT Systems Fair 2023',
      description: 'Presented the Eyeko computer vision mobile application and won 3rd place in Best System Presentation for outstanding interface design, computer vision integration, and execution.',
      imageUrl: 'assets/image/project-eyeko-app.jpg',
      images: [
        'assets/image/project-eyeko-app.jpg',
        'assets/image/project-eyeko-app-display.jpg'
      ],
      icon: 'architecture',
      colSpan: 4
    },
    {
      title: 'Gerry Roxas Leadership',
      category: 'Leadership',
      year: '2019',
      subtitle: 'Gerry Roxas Foundation',
      description: 'Honored with the prestigious Gerry Roxas Leadership Award, recognizing outstanding student leadership, academic integrity, and civic service.',
      imageUrl: 'assets/image/activities/activities-gerry-roxas.jpg',
      images: [
        'assets/image/activities/activities-gerry-roxas.jpg'
      ],
      icon: 'award_star',
      colSpan: 4
    },
    {
      title: 'Runner-up (2nd Place) Android Dev (Microfinance)',
      category: 'Competition',
      year: '2022',
      subtitle: '11th IT Skills Olympics',
      description: 'Won Runner-up (2nd Place) in Android Development (Microfinance Category) for designing and programming VestiCare, an innovative mobile health insurance tracking system.',
      imageUrl: 'assets/image/awards/awards-it-olympics.jpg',
      images: [
        'assets/image/awards/awards-it-olympics.jpg'
      ],
      icon: 'workspace_premium',
      colSpan: 12
    }
  ];

  openModal(cert: Certificate, event: Event) {
    event.stopPropagation();
    this.selectedCertificate.set(cert);
  }

  closeModal() {
    this.selectedCertificate.set(null);
  }
}
