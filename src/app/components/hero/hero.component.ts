import { Component, signal, computed, afterNextRender, inject, OnDestroy } from '@angular/core';
import { ChatBotService } from '../chat-bot/chat-bot.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  template: `
    <section class="relative overflow-hidden min-h-[calc(100svh-var(--header-h,73px))] flex justify-center pt-12 md:pt-16 pb-0 px-gutter section-frosted" id="home">
      <div class="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 items-center gap-12">
        <div class="md:col-span-7 space-y-8 text-center md:text-left pb-8 md:pb-12">
          <div class="space-y-4">
            <h1 class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-text italic">
              Hello, I'm <span class="text-primary not-italic">Marco</span>.
            </h1>
            
            <div class="flex flex-col sm:flex-row items-center sm:items-center gap-4 justify-center md:justify-start font-headline-md text-headline-md text-text my-2">
              <span class="font-semibold">I am a</span>
              <div class="relative inline-block h-12 w-64 md:w-72 select-none" style="perspective: 1000px;">
                <div class="relative w-full h-full transition-transform duration-700 ease-out"
                     style="transform-style: preserve-3d;"
                     [style.transform]="cubeTransform()">
                  @for (word of words; track word; let idx = $index) {
                    <div class="absolute inset-0 flex items-center justify-center bg-accent text-white dark:bg-accent/15 dark:text-accent dark:border dark:border-accent/30 dark:box-glow-border font-bold text-center text-sm md:text-md uppercase tracking-wider px-2"
                         [style.transform]="faceTransforms[idx]"
                         style="backface-visibility: hidden;">
                      {{ word }}
                    </div>
                  }
                </div>
              </div>
            </div>

            <p class="font-body-lg text-body-lg text-text-muted max-w-xl mx-auto md:mx-0">
              Full-stack software engineer, 9+ years coding, Taguig City, PH. Building production .NET backends and Angular frontends, from IoT platforms to enterprise workforce systems.
            </p>
          </div>
          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="/assets/files/marco-o-amira-cv-reference.pdf" target="_blank" download="Marco-O-Amira-CV.pdf" class="btn-primary group no-underline">
              Download CV
              <span class="material-symbols-outlined group-hover:translate-y-1 transition-transform" aria-hidden="true">download</span>
            </a>
            <button type="button" (click)="openChat($event)" aria-haspopup="dialog" class="btn-secondary group">
              Ask my AI about my work
              <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform" aria-hidden="true">smart_toy</span>
            </button>
          </div>
        </div>
        <div class="md:col-span-5 flex relative items-end justify-center md:justify-end self-end">
          <div class="relative z-10 w-full flex justify-center md:justify-end">
            <img [ngSrc]="profileImageUrl"
                 width="615"
                 height="885"
                 priority
                 alt="Marco O. Amira - Full-Stack Developer"
                 class="w-auto max-w-full object-contain rounded-t-[1rem]"
                 style="max-height: 78vh;">
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements OnDestroy {
  private readonly chat = inject(ChatBotService);

  readonly profileImageUrl = 'assets/image/marco-amira-hero-w-bg.png';

  readonly words = [
    'Software Engineer',
    '.NET Developer',
    'Angular Developer',
    'Mobile App Developer'
  ];

  readonly currentStep = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => {
      this.intervalId = setInterval(() => {
        this.currentStep.update(s => s + 1);
      }, 3000);
    });
  }

  readonly cubeTransform = computed(() => {
    const angle = this.currentStep() * -90;
    return `rotateX(${angle}deg)`;
  });

  readonly faceTransforms = this.words.map((_, idx) => {
    const angle = idx * 90;
    return `rotateX(${angle}deg) translateZ(24px)`;
  });

  openChat(event: Event) {
    this.chat.open(event.currentTarget as HTMLElement);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
