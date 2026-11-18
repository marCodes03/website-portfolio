import { Component, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  logo?: string;
  icon?: string;
}

const METRIC = /(10,000\+|100\+|50%|80%)/;

@Component({
  selector: 'app-experience',
  imports: [NgOptimizedImage],
  template: `
    <section class="py-section-padding-mobile md:py-section-padding-desktop px-gutter border-b border-white/10 section-dark accent-on-dark" id="experience">
      <div class="max-w-[1200px] mx-auto">
        <div class="mb-16 space-y-4 text-left">
          <h2 class="font-headline-lg text-headline-lg text-white font-bold">Work Experience</h2>
        </div>
        
        <div class="space-y-8 text-left">
          @for (job of visibleJobs(); track job.company + job.role) {
            <div class="bg-white/10 p-8 rounded-3xl border border-white/20 shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(177,229,242,0.35)] hover:border-accent/40 hover:bg-white/15 transition-[background-color,border-color,box-shadow] duration-300 text-white group cursor-default">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
                <div class="flex items-center gap-6">
                  <!-- Logo Container -->
                  <div class="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 bg-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                       [class.!bg-white]="job.logo">
                    @if (job.logo) {
                      <img [ngSrc]="job.logo" width="64" height="64" [alt]="job.company + ' logo'" class="w-full h-full object-contain p-2">
                    } @else {
                      <span class="material-symbols-outlined text-accent text-4xl" aria-hidden="true">{{ job.icon || 'work' }}</span>
                    }
                  </div>
                  <div>
                    <h3 class="font-headline-md text-headline-md text-white">{{ job.role }}</h3>
                    <p class="text-accent font-bold">{{ job.company }} • {{ job.location }}</p>
                  </div>
                </div>
                <span class="font-label-caps text-label-caps bg-white/20 px-4 py-2 rounded-full text-white whitespace-nowrap">{{ job.period }}</span>
              </div>
              <ul class="space-y-3">
                @for (achievement of job.achievements; track achievement) {
                  <li class="flex items-start gap-3">
                    <span class="material-symbols-outlined text-accent text-body-md mt-1" aria-hidden="true">check_circle</span>
                    <span class="text-white/80">
                      @for (part of segments(achievement); track $index) {
                        @if (part.metric) { <strong class="text-accent font-bold">{{ part.text }}</strong> } @else { {{ part.text }} }
                      }
                    </span>
                  </li>
                }
              </ul>
            </div>
          }
        </div>

        @if (jobs.length > 3) {
          <div class="flex justify-center mt-12">
            <button type="button" (click)="toggleShowAll()"
                  class="btn-secondary btn-on-dark"
                    [aria-expanded]="showAll()"
                    aria-label="Toggle all experience cards display">
              {{ showAll() ? 'View Less' : 'View All Experience' }}
              <span class="material-symbols-outlined transition-transform duration-300"
                    [class.rotate-180]="showAll()" aria-hidden="true">expand_more</span>
            </button>
          </div>
        }
      </div>
    </section>
  `
})
export class ExperienceComponent {
  /** Splits a bullet so the headline numbers (users, devices, speed-up, coverage) can be emphasised. */
  segments(text: string): { text: string; metric: boolean }[] {
    return text.split(METRIC).filter(Boolean).map(part => ({ text: part, metric: METRIC.test(part) }));
  }

  readonly showAll = signal(false);

  readonly visibleJobs = computed(() => {
    if (this.showAll()) {
      return this.jobs;
    }
    return this.jobs.slice(0, 3);
  });

  toggleShowAll() {
    this.showAll.update(val => !val);
    if (!this.showAll()) {
      const element = document.getElementById('experience');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  readonly jobs: Job[] = [
    {
      role: 'Software Engineer',
      company: 'Eclectus Technologies Inc.',
      location: 'Taguig City, PH',
      period: 'May 2025 - Present',
      logo: 'assets/image/eti-logo.png',
      icon: 'work',
      achievements: [
        'Work full-stack on a production agricultural IoT platform, covering backend services, Angular front-end dashboards, and device management.',
        'Integrated the platform with ThingsBoard, connecting and monitoring 100+ IoT devices for real-time telemetry.',
        'Coordinate with cross-functional teams using Azure DevOps for sprint planning and release workflows.'
      ]
    },
    {
      role: 'Junior Software Engineer',
      company: 'Eclectus Technologies Inc.',
      location: 'Taguig City, PH',
      period: 'Jul 2023 - May 2025',
      logo: 'assets/image/eti-logo.png',
      icon: 'work',
      achievements: [
        'Built backend services for Capataz, a cross-platform workforce management system used daily by 10,000+ employees, covering timekeeping, scheduling, billing, and reporting.',
        'Optimized SQL queries, cutting key report load times by 50%, and maintained 80% unit test coverage across delivered modules.',
        'Managed version control and release workflows in Azure DevOps as part of an Agile development team.'
      ]
    },
    {
      role: 'Part-time Professor',
      company: 'AMA Computer College',
      location: 'Parañaque, PH',
      period: 'Feb 2025 - Present',
      logo: 'assets/image/ama logo.png',
      icon: 'school',
      achievements: [
        'Teach undergraduate courses and lead lectures in key topics including Computer Programming, Database Management Systems, Information Assurance and Security (IAS), and Microcontroller Operations using Arduino.',
        'Deliver hands-on laboratory exercises, design practical database projects, and guide student teams in building IoT projects with Arduino microcontrollers.'
      ]
    },
    {
      role: 'Student Intern',
      company: 'Eclectus Technologies Inc.',
      location: 'Taguig City, PH',
      period: 'Feb 2023 - Jun 2023',
      logo: 'assets/image/eti-logo.png',
      icon: 'work',
      achievements: [
        'Developed small applications using Angular JS, performed test plans, regression testing, exploratory testing, and automation testing.',
        'Attended daily scrums, sprint planning, sprint reviews, and retrospectives, receiving training in Git, AzureDevOps, UI/UX, and Marketing.'
      ]
    },
    {
      role: 'Main Developer',
      company: 'Eyeko Application (Thesis)',
      location: 'Taguig City University',
      period: '2023',
      logo: 'assets/image/tcu-logo.png',
      icon: 'school',
      achievements: [
        'Developed an Android application in Java utilizing text recognition, object recognition, and currency recognition computer vision concepts.',
        'Integrated Firebase database and won 3rd place in the Best System category at the CICT Systems Fair.'
      ]
    },
    {
      role: 'Assistant Programmer',
      company: 'VestiCare Application (Hackathon)',
      location: '11th IT Skills Olympics',
      period: '2022',
      logo: 'assets/image/it-olympics-logo.jpg',
      icon: 'emoji_events',
      achievements: [
        'Programmed an Android application for an insurance company to track, manage, and incentivize mental health insurance plans.',
        'Won Runner-up (2nd Place) in the Android Development Microfinance Category.'
      ]
    }
  ];
};

