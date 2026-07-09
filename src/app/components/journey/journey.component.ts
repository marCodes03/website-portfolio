import { Component, ElementRef, inject, afterNextRender } from '@angular/core';

interface Milestone {
  year: string;
  title: string;
  bullets: string[];
  branch: 'main' | 'org' | 'achievements';
}

@Component({
  selector: 'app-journey',
  template: `
    <section class="section-ghost py-section-padding-mobile md:py-section-padding-desktop px-gutter border-t border-border" id="journey">
      <div class="max-w-[1200px] mx-auto">
        <!-- Section Header -->
        <div class="mb-16 space-y-4 text-left">
          <span class="font-label-caps text-label-caps text-accent tracking-widest">PROGRAMMING JOURNEY</span>
          <h2 class="font-headline-lg text-headline-lg text-text font-bold">Programming Journey</h2>
        </div>

        <!-- Git Commit Timeline Container -->
        <div class="relative w-full py-8">
          
          <!-- Parallel Git Tracks (Org, Main, Achievements) -->
          <!-- Org Feature Branch (dashed orange left track) -->
          <div class="absolute top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#f24e1e]/60 dark:border-[#f24e1e]/30
                      left-[56px] md:left-1/2 md:-translate-x-[25.5px] pointer-events-none z-0"></div>
          
          <!-- Solid Main Trunk (solid accent center track) -->
          <div class="absolute top-0 bottom-0 w-[3px] bg-accent/50 dark:bg-accent/30 rounded-full
                      left-[32px] md:left-1/2 md:-translate-x-[1.5px] pointer-events-none z-0"></div>
          
          <!-- Achievements Branch (dotted gold right track) -->
          <div class="absolute top-0 bottom-0 w-[2px] border-l-2 border-dotted border-[#eab308]/75 dark:border-[#eab308]/40
                      left-[80px] md:left-1/2 md:translate-x-[22.5px] pointer-events-none z-0"></div>

          <!-- Timeline Rows -->
          <div class="space-y-2 relative z-10">
            @for (milestone of milestones; track milestone.title; let idx = $index) {
              <div class="relative w-full text-left pl-[104px] md:pl-0 timeline-row">
                
                <!-- SVG Branch Split/Merge Curves -->
                @if (milestone.branch === 'org') {
                  <!-- Desktop SVG: spans 24px from org (calc(50%-24px)) to main (50%) -->
                  <svg class="hidden md:block absolute w-[24px] h-[36px] pointer-events-none z-10 left-[calc(50%-24px)]"
                       style="top: 20px;" viewBox="0 0 24 36" fill="none">
                    <path d="M 24 0 C 24 18, 0 18, 0 36" stroke="#f24e1e" stroke-width="2" stroke-dasharray="2 2" class="opacity-80 dark:opacity-40"/>
                  </svg>
                  <!-- Mobile SVG: spans 24px from main (32px) to org (56px) -->
                  <svg class="block md:hidden absolute w-[24px] h-[36px] pointer-events-none z-10 left-[32px]"
                       style="top: 20px;" viewBox="0 0 24 36" fill="none">
                    <path d="M 0 0 C 0 18, 24 18, 24 36" stroke="#f24e1e" stroke-width="2" stroke-dasharray="2 2" class="opacity-80 dark:opacity-40"/>
                  </svg>
                }

                @if (milestone.branch === 'achievements') {
                  <!-- Desktop SVG: spans 24px from main (50%) to achievements (calc(50%+24px)) -->
                  <svg class="hidden md:block absolute w-[24px] h-[36px] pointer-events-none z-10 left-[50%]"
                       style="top: 20px;" viewBox="0 0 24 36" fill="none">
                    <path d="M 0 0 C 0 18, 24 18, 24 36" stroke="#eab308" stroke-width="2" stroke-dasharray="2 2" class="opacity-80 dark:opacity-40"/>
                  </svg>
                  <!-- Mobile SVG: spans 48px from main (32px) to achievements (80px) -->
                  <svg class="block md:hidden absolute w-[48px] h-[36px] pointer-events-none z-10 left-[32px]"
                       style="top: 20px;" viewBox="0 0 48 36" fill="none">
                    <path d="M 0 0 C 0 18, 48 18, 48 36" stroke="#eab308" stroke-width="2" stroke-dasharray="2 2" class="opacity-80 dark:opacity-40"/>
                  </svg>
                }

                <!-- Commit Node Dot -->
                <div class="commit-dot"
                     [class.commit-main]="milestone.branch === 'main'"
                     [class.commit-org]="milestone.branch === 'org'"
                     [class.commit-achievements]="milestone.branch === 'achievements'">
                  <div class="w-3.5 h-3.5 rounded-full border-2 bg-background transition-all duration-300"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-9 items-center gap-0 relative">
                  
                  <!-- Left Column Card (Desktop alternate - Even index/Left side) -->
                  <div class="hidden md:flex md:col-span-4 justify-end md:pr-10"
                       [class.md:invisible]="getSide(milestone.branch, idx) !== 'left'">
                    @if (getSide(milestone.branch, idx) === 'left') {
                      <div class="timeline-card bg-surface/60 border border-border/20 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                        <span class="font-roboto-mono text-[9px] font-extrabold text-accent px-2 py-0.5 rounded bg-accent/10 mb-2 inline-block tracking-wider uppercase">
                          {{ milestone.branch === 'main' ? 'main' : milestone.branch === 'org' ? 'org' : 'award' }}
                        </span>
                        <div class="flex justify-between items-baseline mb-2">
                          <h3 class="font-roboto-mono text-xs font-bold text-text/80 leading-none">{{ milestone.year }}</h3>
                        </div>
                        <h4 class="font-bold text-accent text-[13px] mb-2 leading-snug">{{ milestone.title }}</h4>
                        <ul class="space-y-1.5 text-text-muted text-xs list-disc pl-4 leading-normal">
                          @for (bullet of milestone.bullets; track bullet) {
                            <li>{{ bullet }}</li>
                          }
                        </ul>
                      </div>
                    }
                  </div>

                  <!-- Empty Spacer for Center track column -->
                  <div class="hidden md:block md:col-span-1"></div>

                  <!-- Right Column Card (Desktop alternate - Odd index/Right side & Mobile - All indexes) -->
                  <div class="col-span-1 md:col-span-4 flex justify-start md:pl-10">
                    <!-- On mobile, shows all cards. On desktop, only shows if side is right. -->
                    <div class="w-full max-w-lg" [class.md:hidden]="getSide(milestone.branch, idx) === 'left'">
                      <div class="timeline-card bg-surface/60 border border-border/20 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                        <span class="font-roboto-mono text-[9px] font-extrabold text-accent px-2 py-0.5 rounded bg-accent/10 mb-2 inline-block tracking-wider uppercase">
                          {{ milestone.branch === 'main' ? 'main' : milestone.branch === 'org' ? 'org' : 'award' }}
                        </span>
                        <div class="flex justify-between items-baseline mb-2">
                          <h3 class="font-roboto-mono text-xs font-bold text-text/80 leading-none">{{ milestone.year }}</h3>
                        </div>
                        <h4 class="font-bold text-accent text-[13px] mb-2 leading-snug">{{ milestone.title }}</h4>
                        <ul class="space-y-1.5 text-text-muted text-xs list-disc pl-4 leading-normal">
                          @for (bullet of milestone.bullets; track bullet) {
                            <li>{{ bullet }}</li>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class JourneyComponent {
  private readonly el = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      const cards = this.el.nativeElement.querySelectorAll('.timeline-card');

      const observeAll = () => {
        cards.forEach((card: HTMLElement) => {
          observer.observe(card);
        });
      };

      observeAll();

      // Reset scroll reveal animation when the journey section goes out of view (top or bottom)
      const section = this.el.nativeElement.querySelector('section');
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              cards.forEach((card: HTMLElement) => {
                card.classList.remove('reveal');
              });
              observeAll();
            }
          });
        },
        { threshold: 0 }
      );
      if (section) {
        sectionObserver.observe(section);
      }
    });
  }

  readonly milestones: Milestone[] = [
    // 2017 - 2019
    {
      year: '2017 - 2019',
      title: 'SHS Tech-Voc ComputerProgramming Track',
      branch: 'main',
      bullets: [
        'Studied ICT Tech-Voc track at Lyceum of Alabang, specializing in Computer Programming.',
        'Started learning programming languages, focusing mainly on Java, VB.Net, and C# along with web basics.'
      ]
    },
    // 2018 - 2019
    {
      year: '2018 - 2019',
      title: 'InComTech Council President',
      branch: 'org',
      bullets: [
        'Elected President of the InComTech Council student organization.'
      ]
    },
    // 2019
    {
      year: '2019',
      title: 'Academic Honors & Leadership Award',
      branch: 'achievements',
      bullets: [
        'Awarded Dr. Danilo V. Ayap Academic Excellence "With Honor".',
        'Received the Gerry Roxas Leadership Award.'
      ]
    },
    {
      year: '2019',
      title: 'Admitted to Taguig City University',
      branch: 'main',
      bullets: [
        'Admitted to Taguig City University for BS in Computer Science.'
      ]
    },
    // 2019 - 2021
    {
      year: '2019 - 2021',
      title: 'CICT Events Committee',
      branch: 'org',
      bullets: [
        'Served on the CSS Events Committee, organizing Technolympics 2019 and Systems Fair 2019.'
      ]
    },
    {
      year: '2019 - 2021',
      title: 'Web Design Champion',
      branch: 'achievements',
      bullets: [
        'Won Champion in Web Design at the Technolympics 2019.'
      ]
    },
    // 2021 - 2022
    {
      year: '2021 - 2022',
      title: 'Information Technology Society President',
      branch: 'org',
      bullets: [
        'Elected President of the Information Technology Society (ITS) executive board.',
        'Represented the society externally and managed organization-wide events and seminars.'
      ]
    },
    // 2022 - 2023
    {
      year: '2022 - 2023',
      title: 'ICT-SF Student Director & USSC Board',
      branch: 'org',
      bullets: [
        'Elected Student Director of ICT-SF; managed multiple college organizations, planned college-wide activities, and served on the University Supreme Student Council Board of Directors.'
      ]
    },
    // 2023
    {
      year: '2023',
      title: 'IT Olympics 1st runner-up & Systems Fair',
      branch: 'achievements',
      bullets: [
        'Won 1st runner up in Android Development at the 11th IT Skills Olympics.',
        'Participated in CICT Systems Fair with Student Cafeteria Management System.'
      ]
    },
    {
      year: '2023',
      title: 'Best Research & Eyeko Thesis Accolades',
      branch: 'achievements',
      bullets: [
        'Won 3rd Place for Best System with Eyeko (Android computer vision thesis app) at TCU CICT Systems Fair.',
        'Awarded Best Research Paper and International Presentation at the 1st IRCMSW 2023.'
      ]
    },
    {
      year: '2023',
      title: 'Absorbed as Junior Software Engineer',
      branch: 'main',
      bullets: [
        'Absorbed from internship as Junior Software Engineer at Eclectus Technologies Inc., developing and maintaining modules for Capataz Web and Mobile.'
      ]
    },
    {
      year: '2023',
      title: 'Graduated BS CS (Cum Laude)',
      branch: 'achievements',
      bullets: [
        'Graduated Taguig City University BS Computer Science (Cum Laude) and delivered the valedictory address of the graduating batch.'
      ]
    },
    // 2025-Present
    {
      year: '2025-Present',
      title: 'Software Engineer (Smart Farming)',
      branch: 'main',
      bullets: [
        'Promoted to Software Engineer at Eclectus Technologies Inc., developing modules for Smart Farming.'
      ]
    },
    {
      year: '2025-Present',
      title: 'Part-time Professor at AMA Computer College',
      branch: 'main',
      bullets: [
        'Appointed Part-time Professor at AMA Computer College teaching programming, databases, IAS, and IoT Arduino.'
      ]
    }
  ];

  getSide(branch: 'main' | 'org' | 'achievements', index: number): 'left' | 'right' {
    return index % 2 === 0 ? 'left' : 'right';
  }
}


