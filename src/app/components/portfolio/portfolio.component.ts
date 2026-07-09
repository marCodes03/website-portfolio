import { Component, signal, ElementRef, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProjectModalComponent } from './project-modal.component';

export interface Project {
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  modalImageUrl?: string;
  icon?: string;
  link?: string;
  skills: string[];
  contributions: string[];
}

@Component({
  selector: 'app-portfolio',
  imports: [NgOptimizedImage, ProjectModalComponent],
  template: `
    <section class="py-section-padding-mobile md:py-section-padding-desktop px-gutter section-dark" id="projects">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex justify-between items-end mb-16">
          <div class="space-y-4 text-left">
            <span class="font-label-caps text-label-caps text-accent tracking-widest">SELECTED WORKS</span>
            <h2 class="font-headline-lg text-headline-lg text-white font-bold">Featured Projects</h2>
          </div>
        </div>

        <div class="relative group/carousel">
          <!-- Navigation Arrows -->
          <button (click)="scrollCarousel('left')"
                  class="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 z-20 w-12 h-12 rounded-full bg-surface text-text border border-border flex items-center justify-center shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-accent dark:hover:box-glow cursor-pointer">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button (click)="scrollCarousel('right')"
                  class="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 z-20 w-12 h-12 rounded-full bg-surface text-text border border-border flex items-center justify-center shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-accent dark:hover:box-glow cursor-pointer">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>

          <!-- Carousel Container -->
          <div #carouselContainer
               (scroll)="onScroll(carouselContainer)"
               class="flex gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth">
            
            @for (project of projects; track project.title) {
              <div class="min-w-full md:min-w-[calc(50%-24px)] snap-center group cursor-pointer bg-white/10 p-8 rounded-2xl border border-white/20 text-white flex flex-col justify-between transition-all duration-300 hover:border-accent/40 dark:hover:box-glow-border"
                   (click)="openProjectModal(project, $event)"
                   (keydown.enter)="openProjectModal(project, $event)"
                   tabindex="0"
                   role="button"
                   aria-haspopup="dialog"
                   [attr.aria-label]="'View details for ' + project.title">
                <div>
                  <div class="aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-accent/20 mb-6 relative">
                    @if (project.imageUrl) {
                      <img [ngSrc]="project.imageUrl"
                           width="640"
                           height="400"
                           [alt]="project.title"
                           class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                      <!-- Frost Glass Overlay (Bottom 25% with soft fade) -->
                      <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-white/10 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                           style="mask-image: linear-gradient(to top, black, transparent); -webkit-mask-image: linear-gradient(to top, black, transparent);"></div>
                    } @else {
                      <div class="w-full h-full bg-secondary/20 flex items-center justify-center">
                        <span class="material-symbols-outlined !text-6xl text-accent/40">{{ project.icon || 'inventory_2' }}</span>
                      </div>
                    }
                  </div>
                  <div class="flex justify-between items-start">
                    <div class="space-y-2 text-left">
                      <span class="font-label-caps text-label-caps text-accent">{{ project.category }}</span>
                      <h3 class="font-headline-md text-headline-md leading-tight">{{ project.title }}</h3>
                    </div>
                    <button class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-accent hover:text-accent dark:hover:box-glow-border transition-all cursor-pointer flex-shrink-0"
                            aria-label="View details">
                       <span class="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                  </div>
                  <p class="mt-4 line-clamp-3 text-white/80 text-left text-body-md leading-relaxed">{{ project.description }}</p>
                </div>
                
                <!-- Skill pills (Max 5) -->
                <div class="flex flex-wrap gap-2 mt-6 justify-start">
                  @for (skill of project.skills.slice(0, 5); track skill) {
                    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/20 uppercase tracking-wide">
                      {{ skill }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Pagination Dots -->
          <div class="flex justify-center gap-3 mt-12">
            @for (project of projects; track project.title; let idx = $index) {
              <button (click)="scrollToProject(idx); $event.stopPropagation()"
                      class="w-3 h-3 rounded-full transition-all cursor-pointer bg-white"
                      [class.bg-accent]="activeProject() === idx"
                      [class.dark:box-glow]="activeProject() === idx"
                      [class.opacity-30]="activeProject() !== idx"
                      [class.hover:opacity-50]="activeProject() !== idx"
                      [attr.aria-label]="'Go to project ' + (idx + 1)">
              </button>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Details Modal Overlay Component -->
    <app-project-modal [project]="selectedProject()" (close)="closeModal()"></app-project-modal>
  `
})
export class PortfolioComponent {
  @ViewChild('carouselContainer') carouselRef!: ElementRef<HTMLDivElement>;
  readonly activeProject = signal<number>(0);
  readonly selectedProject = signal<Project | null>(null);

  readonly projects: Project[] = [
    {
      title: 'Smart Farming App',
      category: 'IOT / AGRI-TECH',
      description: 'An IoT-based application developed to monitor and manage smart farming parameters such as soil moisture, temperature, and automated irrigation. Integrated with Thingsboard IoT platform for data visualization.',
      imageUrl: 'assets/image/project-smart-farming-app.png',
      skills: ['Thingsboard', '.NET Core', 'Angular', 'IoT', 'MQTT', 'SQL Server', 'Git'],
      contributions: [
        'Configured Thingsboard IoT telemetry dashboards to track soil moisture and ambient temperature trends.',
        'Developed backend telemetry ingestion APIs using .NET Core and dynamic database logs.',
        'Built interactive widget dashboards in Angular to visualize crop sensor parameters in real-time.',
        'Assisted in hardware sensor integration, rule-engine configuration, and local server deployment.'
      ]
    },
    {
      title: 'Capataz Web Application',
      category: 'WEB APPLICATION',
      description: 'An enterprise construction management and operations web platform that streamlines project tracking, staff management, and workflows. Built backend and frontend systems using Angular, C#, and SQL.',
      link: 'https://capataz.ph/',
      imageUrl: 'assets/image/project-capataz-web-app.png',
      skills: ['Angular', 'C#', 'SQL Server', 'ASP.NET Core', 'TypeScript', 'RESTful API'],
      contributions: [
        'Designed and implemented the core project progress tracking dashboards and employee workspace modules.',
        'Developed C# RESTful API endpoints for workflows, shift tracking, and materials reporting.',
        'Optimized SQL database schema designs and query execution plans for dashboard logs.',
        'Implemented secure, role-based login environments (RBAC) to segment client and staff data access.'
      ]
    },
    {
      title: 'Capataz Mobile Application',
      category: 'MOBILE APPLICATION',
      description: 'An enterprise mobile application designed for on-site construction workers to report attendance, log project progress, and track resources in real-time.',
      link: 'https://capataz.ph/',
      imageUrl: 'assets/image/project-capataz-mobile-app.jpg',
      skills: ['Ionic', 'Angular', 'ASP.NET Core', 'TypeScript', 'C#', 'GPS API'],
      contributions: [
        'Developed offline synchronization modules, allowing construction logs to cache local drafts and sync automatically when internet becomes available.',
        'Integrated GPS location checking to validate shift clock-ins directly on-site.',
        'Programmed image compression utilities for photo attachment uploads, reducing client mobile data usage by 40%.',
        'Maintained fluid 60FPS mobile navigation flows utilizing Capacitor and Ionic Framework.'
      ]
    },
    {
      title: 'Eyeko App',
      category: 'MOBILE / COMPUTER VISION',
      description: 'An Android application built in Java utilizing text recognition, object recognition, and currency recognition computer vision concepts. Integrated with Firebase database.',
      imageUrl: 'assets/image/project-eyeko-app.jpg',
      modalImageUrl: 'assets/image/project-eyeko-app.jpg',
      skills: ['Java', 'Android SDK', 'Computer Vision', 'Firebase', 'ML Kit', 'TensorFlow Lite'],
      contributions: [
        'Developed real-time optical text recognition modules using Google ML Kit to extract book and product label contents.',
        'Integrated custom TensorFlow Lite computer vision models for objects and Philippine currency recognition.',
        'Structured real-time Firebase database configurations to sync profiles and user logs securely.',
        'Presented at CICT Systems Fair 2023, achieving 3rd Place for Best System Presentation.'
      ]
    },
    {
      title: 'VestiCare App',
      category: 'MOBILE / FINTECH / HEALTHCARE',
      description: 'An Android application for an insurance company to track, manage, and incentivize mental health insurance plans. Presented in the 11th IT Skills Olympics.',
      imageUrl: 'assets/image/project-vesticate-stepup-logo.png',
      skills: ['Java', 'Android SDK', 'Firebase', 'UI UX Design', 'RESTful API'],
      contributions: [
        'Designed mental wellness tracking UI layouts with an accessibility-first color scheme.',
        'Programmed health step integration metrics to award token points for insurance reductions.',
        'Built registration flows and automated policy payout claims modules.',
        'Presented in the 11th IT Skills Olympics, winning 1st Place in Android Development (Microfinance Category).'
      ]
    },
    {
      title: 'Student Cafeteria Management System',
      category: 'WEB / DATABASE',
      description: 'Student Credit Student Cafeteria System is a system design to introduce a connection between the environment and the user through cashless transaction terminal that merges students and storeowner information for their desired menu.',
      imageUrl: 'assets/image/project-student-cafeteria-system.png',
      skills: ['C#', 'SQL Server', 'Windows Forms', 'QR Scan', 'POS'],
      contributions: [
        'Coded QR scanning libraries for secure student profile identification at cashless POS checkout terminals.',
        'Created storeowner transaction records management screens for cashier checkout orders.',
        'Designed unified database structures merging student balances, cafeteria menus, and transaction histories.',
        'Showcased the working hardware-linked terminal system at the CICT Systems Fair 2023.'
      ]
    }
  ];

  openProjectModal(project: Project, event: Event) {
    event.stopPropagation();
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }

  openLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  scrollCarousel(direction: 'left' | 'right') {
    const container = this.carouselRef.nativeElement;
    const scrollAmount = container.offsetWidth;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

  scrollToProject(index: number) {
    const container = this.carouselRef.nativeElement;
    const items = container.querySelectorAll('.snap-center');
    if (items[index]) {
      items[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  onScroll(container: HTMLDivElement) {
    if (container.clientWidth === 0) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    const scrollPercent = container.scrollLeft / maxScroll;
    const activeIndex = Math.round(scrollPercent * (this.projects.length - 1));
    if (this.activeProject() !== activeIndex) {
      this.activeProject.set(activeIndex);
    }
  }
}
