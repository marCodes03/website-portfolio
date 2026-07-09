import { Component, signal, ElementRef, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface Activity {
  title: string;
  period: string;
  description: string;
  quote: string;
  imageUrl?: string;
  icon?: string;
  gradient?: string;
}

@Component({
  selector: 'app-off-screen-activities',
  imports: [NgOptimizedImage],
  template: `
    <section class="py-section-padding-mobile md:py-section-padding-desktop px-gutter section-dark" id="off-screen-activities">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex justify-between items-end mb-16">
          <div class="space-y-4 text-left">
            <span class="font-label-caps text-label-caps text-accent tracking-widest">LIFE OUTSIDE WORK</span>
            <h2 class="font-headline-lg text-headline-lg text-white font-bold">Off-Screen Activities</h2>
          </div>
          <div class="hidden md:flex gap-4">
            <button (click)="scrollActivities('left')"
                    class="w-12 h-12 rounded-full border border-border  flex items-center justify-center hover:bg-surface transition-all cursor-pointer">
              <span class="material-symbols-outlined text-white hover:text-black dark:hover:text-white">chevron_left</span>
            </button>
            <button (click)="scrollActivities('right')"
                    class="w-12 h-12 rounded-full border border-border  flex items-center justify-center hover:bg-surface transition-all cursor-pointer">
              <span class="material-symbols-outlined text-white hover:text-black dark:hover:text-white">chevron_right</span>
            </button>
          </div>
        </div>

        <div class="relative">
          <!-- Carousel Container -->
          <div #activitiesContainer
               (scroll)="onScroll(activitiesContainer)"
               class="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth">
            
            @for (activity of activities; track activity.title) {
              <div class="min-w-full md:min-w-[calc(50%-16px)] snap-center bg-surface rounded-2xl border border-border/30 shadow-sm hover:shadow-md transition-all text-left overflow-hidden flex flex-col group cursor-default">
                <!-- Visual Header -->
                <div class="relative w-full aspect-video overflow-hidden bg-border/10 flex-shrink-0">
                  @if (activity.imageUrl) {
                    <img [ngSrc]="activity.imageUrl" fill class="object-cover transition-transform duration-500 group-hover:scale-105" [alt]="activity.title">
                    <!-- Frost Glass Overlay (Bottom 25% with soft fade) -->
                    <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-white/10 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                         style="mask-image: linear-gradient(to top, black, transparent); -webkit-mask-image: linear-gradient(to top, black, transparent);"></div>
                  } @else {
                    <div class="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105" [style.background]="activity.gradient">
                      <span class="material-symbols-outlined text-white text-5xl opacity-90 transition-transform duration-500 group-hover:scale-110">{{ activity.icon }}</span>
                    </div>
                    <!-- Frost Glass Overlay (Bottom 25% with soft fade) -->
                    <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-white/10 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                         style="mask-image: linear-gradient(to top, black, transparent); -webkit-mask-image: linear-gradient(to top, black, transparent);"></div>
                  }
                </div>

                <!-- Content Area -->
                <div class="p-8 flex-grow flex flex-col justify-between">
                  <div class="space-y-4">
                    <div class="flex justify-between items-start gap-4">
                      <h3 class="font-headline-md text-headline-md text-text leading-tight">{{ activity.title }}</h3>
                      <span class="font-label-caps text-label-caps text-text-muted whitespace-nowrap mt-1">{{ activity.period }}</span>
                    </div>
                    <p class="text-text-muted text-body-md leading-relaxed">{{ activity.description }}</p>
                  </div>
                  <div class="mt-8 pt-6 border-t border-border/30">
                    <p class="italic text-accent font-body-md">"{{ activity.quote }}"</p>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Pagination Dots -->
          <div class="flex justify-center gap-3 mt-12">
            @for (activity of activities; track activity.title; let idx = $index) {
              <button (click)="scrollToActivity(idx)"
                      class="w-3 h-3 rounded-full transition-all cursor-pointer"
                      [class.bg-accent]="activeActivity() === idx"
                      [class.bg-border]="activeActivity() !== idx"
                      [class.hover:bg-text-muted]="activeActivity() !== idx">
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class OffScreenActivitiesComponent {
  @ViewChild('activitiesContainer') activitiesRef!: ElementRef<HTMLDivElement>;
  readonly activeActivity = signal<number>(0);

  readonly activities: Activity[] = [
    {
      title: 'Coding & Build Sessions',
      period: '2018 - PRESENT',
      description: 'I spend long hours designing interfaces, fixing bugs, trying new stacks, and turning ideas into working systems. That habit became the bridge between school projects, freelance work, and professional software development.',
      quote: 'Most of my best ideas start while building',
      imageUrl: 'assets/image/coding_workspace.png'
    },
    {
      title: 'Student Leadership',
      period: '2018 - 2023',
      description: 'Leadership became one of the strongest parts of my college journey. I handled officer roles as ITS President, ICT-SF Student Director, and Lyceum of Alabang InComTech Council President, learning how to guide teams and run student federations.',
      quote: 'Leadership taught me how to serve and organize at the same time',
      imageUrl: 'assets/image/activities/activities-student-leadership.jpg'
    },
    {
      title: 'Gerry Roxas Foundation',
      period: '2019 - PRESENT',
      description: 'Active member of the Gerry Roxas Student Leaders network. Attended leadership workshops, community service camps, and the Bayanihan Awardees Camp to collaborate on youth civic initiatives.',
      quote: 'Serving the community starts with building leadership character',
      imageUrl: 'assets/image/activities/activities-gerry-roxas.jpg'
    },
    {
      title: 'Tech & Seminars',
      period: '2018 - PRESENT',
      description: 'Constantly attending advanced technology webinars and seminars. Gained insights into Wearable Tech, Machine Learning Optimization, Big Data, and Cyber Security to stay ahead of tech trends.',
      quote: 'Learning is an endless journey that expands beyond daily coding',
      imageUrl: 'assets/image/activities/activities-tech-and-seminars.jpg'
    },
    {
      title: 'Hardware & Servicing',
      period: '2019',
      description: 'Earned the Computer System Servicing National Certificate II (CSS NC II). Developed competencies in PC assembly, network configuration, server setup, and hardware diagnostics.',
      quote: 'Understanding software starts with mastering the physical machine',
      imageUrl: 'assets/image/hardware_servicing.png'
    },
    {
      title: 'Academic Awards',
      period: '2023 - 2024',
      description: 'Honored with academic achievements including graduating BS Computer Science Cum Laude, delivering the batch valedictory address, and winning systems design fairs and programming hackathons.',
      quote: 'Recognition feels best when it reflects the work behind it',
      imageUrl: 'assets/image/activities/activities-awards-cumlaude.jpg'
    },
    {
      title: 'Arts & Commission Work',
      period: '2016 - PRESENT',
      description: 'Active in fine arts, specializing in watercolor painting, charcoal and graphite sketching, and colored pencils. Successfully delivered commissioned artworks since 2016, blending creative visualization with tech designs.',
      quote: 'Traditional art keeps my eyes sharp and my design thinking grounded',
      imageUrl: 'assets/image/activities/activities-arts.jpg'
    }
  ];

  scrollActivities(direction: 'left' | 'right') {
    const container = this.activitiesRef.nativeElement;
    const scrollAmount = container.offsetWidth;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

  scrollToActivity(index: number) {
    const container = this.activitiesRef.nativeElement;
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
    const activeIndex = Math.round(scrollPercent * (this.activities.length - 1));
    if (this.activeActivity() !== activeIndex) {
      this.activeActivity.set(activeIndex);
    }
  }
}
