import { Component, ElementRef, inject, signal, afterNextRender, DestroyRef } from '@angular/core';
import { ChatBotService } from '../chat-bot/chat-bot.service';

@Component({
  selector: 'app-career-path',
  template: `
    <section class="py-section-padding-mobile md:py-section-padding-desktop px-gutter section-white border-t border-border" id="career-path">
      <div class="max-w-[1200px] mx-auto">

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          <!-- Left Column: Sticky Sidebar Navigation -->
          <div class="lg:col-span-4">
            <div class="lg:sticky lg:top-24 h-fit">
              <!-- Sticky Section Header -->
              <div class="mb-8 space-y-3 text-left">
                <h2 class="font-headline-lg text-headline-lg text-text font-bold leading-tight">Workflow Process</h2>
                <button type="button" (click)="openChat($event)" aria-haspopup="dialog" class="tap-44 text-accent underline underline-offset-4 font-label-caps text-label-caps cursor-pointer text-left">Ask the chat about my workflow</button>
              </div>

              <!-- Navigation Steps -->
              <div class="space-y-3">
                @for (step of workflowSteps; track step.id) {
                  <button type="button"
                          (click)="scrollToStep(step.id)"
                          [attr.aria-current]="activeStep() === step.id ? 'step' : null"
                          class="w-full text-left p-4 rounded-xl transition-[background-color,color,box-shadow,opacity,transform] duration-300 flex items-center gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 select-none border border-transparent font-roboto-mono"
                          [class.scale-[1.02]]="activeStep() === step.id"
                          [class.bg-text]="activeStep() === step.id"
                          [class.text-white]="activeStep() === step.id"
                          [class.dark:bg-accent]="activeStep() === step.id"
                          [class.dark:text-on-accent]="activeStep() === step.id"
                          [class.dark:box-glow]="activeStep() === step.id"
                          [class.shadow-md]="activeStep() === step.id"
                          [class.text-text-muted]="activeStep() !== step.id"
                          [class.opacity-60]="activeStep() !== step.id"
                          [class.hover:opacity-100]="activeStep() !== step.id">
                    <span class="text-sm font-bold opacity-80">{{ step.num }}</span>
                    <span class="text-xs uppercase tracking-wider font-bold">{{ step.title }}</span>
                  </button>
                }
              </div>
            </div>
          </div>

          <!-- Right Column: Detailed Content Panels -->
          <div class="lg:col-span-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
            @for (step of workflowSteps; track step.id) {
              <div [id]="step.id"
                   class="workflow-panel bg-surface/60 dark:bg-white/5 border border-border/30 dark:border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 space-y-6 transition-[border-color,box-shadow] duration-300 scroll-mt-28"
                   [class.border-accent]="activeStep() === step.id"
                   [class.dark:border-accent]="activeStep() === step.id"
                   [class.shadow-lg]="activeStep() === step.id"
                   [class.dark:box-glow-border]="activeStep() === step.id">
                
                <div class="space-y-2">
                  <div class="flex items-center gap-3">
                    <span class="font-roboto-mono text-xs font-bold px-2.5 py-0.5 rounded bg-accent/25 text-accent uppercase tracking-wider dark:bg-accent/15">
                      Stage {{ step.num }}
                    </span>
                    <span class="text-text-muted font-bold text-xs uppercase tracking-wider font-roboto-mono">
                      {{ step.subtitle }}
                    </span>
                  </div>
                  <h3 class="font-headline-md text-headline-md text-text font-bold leading-tight">{{ step.title }}</h3>
                </div>

                <p class="font-body-md text-body-md text-text-muted leading-relaxed max-w-[70ch]">
                  {{ step.description }}
                </p>

                <!-- Technology Tray -->
                <div class="pt-4 border-t border-border/20 dark:border-white/5 flex flex-wrap gap-2">
                  @for (badge of step.badges; track badge) {
                    <span class="text-xs font-roboto-mono font-semibold px-3 py-1 rounded bg-text/5 dark:bg-white/5 text-text-muted border border-border/20 dark:border-white/10">
                      {{ badge }}
                    </span>
                  }
                </div>

              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `
})
export class CareerPathComponent {
  readonly activeStep = signal<string>('research');
  private readonly el = inject(ElementRef);
  private readonly chat = inject(ChatBotService);

  readonly workflowSteps = [
    {
      id: 'research',
      num: '01',
      title: 'Research & Discovery',
      subtitle: 'Technical Scope Definition',
      description: 'Define the technical scope, target users and edge-case business logic before any code.',
      badges: ['Requirement Analysis', 'Domain Modeling', 'Use Case Mapping']
    },
    {
      id: 'analyze',
      num: '02',
      title: 'Analyze & Model',
      subtitle: 'Architectural Blueprinting',
      description: 'Turn requirements into normalized MSSQL/MySQL schemas and secure REST endpoint plans.',
      badges: ['MSSQL', 'MySQL', 'Relational Databases', 'API Design']
    },
    {
      id: 'design',
      num: '03',
      title: 'System Design & UI',
      subtitle: 'Interface & Component Engineering',
      description: 'Wireframe in Figma, then build accessible, modular Angular, TypeScript and Tailwind components.',
      badges: ['Angular', 'TypeScript', 'Tailwind CSS', 'Figma', 'UI/UX Design']
    },
    {
      id: 'development',
      num: '04',
      title: 'Full-Stack Development',
      subtitle: 'Backend Logic & Integration',
      description: 'Build C# and .NET Core services with Entity Framework and ThingsBoard integration, drafting and reviewing with AI assistants (Claude, Gemini).',
      badges: ['C#', '.NET Core', 'ASP.NET Core', 'Entity Framework', 'ThingsBoard', 'IoT Telemetry', 'AI-Assisted Dev']
    },
    {
      id: 'qa',
      num: '05',
      title: 'Quality Assurance',
      subtitle: 'Testing & Version Control',
      description: 'Unit, regression and exploratory testing, with branching and pull requests in Azure DevOps.',
      badges: ['Unit Testing', 'Software Testing (QA)', 'Azure DevOps', 'Git Control']
    },
    {
      id: 'launch',
      num: '06',
      title: 'Launch & Optimize',
      subtitle: 'Deployment & Monitoring',
      description: 'Ship through automated Git pipelines, then watch logs, SQL performance and live telemetry.',
      badges: ['Microsoft Azure', 'AWS', 'CI/CD Pipelines', 'System Monitoring']
    }
  ];

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              if (id) {
                this.activeStep.set(id);
              }
            }
          });
        },
        {
          rootMargin: '-30% 0px -50% 0px',
          threshold: 0
        }
      );

      const panels = this.el.nativeElement.querySelectorAll('.workflow-panel');
      panels.forEach((panel: HTMLElement) => {
        observer.observe(panel);
      });

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  openChat(event: Event) {
    this.chat.open(event.currentTarget as HTMLElement);
  }

  scrollToStep(id: string) {
    this.activeStep.set(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
