import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Project } from './portfolio.component';

@Component({
  selector: 'app-project-modal',
  imports: [NgOptimizedImage],
  host: {
    '(window:keydown.escape)': 'onEscape()'
  },
  template: `
    @if (project()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/90 backdrop-blur-[1px] transition-opacity duration-300"
           (click)="onClose()"
           role="dialog"
           aria-modal="true"
           [attr.aria-labelledby]="'modal-title-' + project()?.title">
        <div class="bg-surface border border-border rounded-3xl max-w-[800px] w-full h-[80vh] overflow-hidden shadow-2xl flex flex-col transition-all duration-300 scale-100"
             (click)="$event.stopPropagation()">
          
          <!-- Modal Visual Header -->
          <div class="relative h-[50%] w-full overflow-hidden bg-text/50 flex-shrink-0">
            @if (project()?.modalImageUrl || project()?.imageUrl) {
              <img [ngSrc]="project()?.modalImageUrl || project()?.imageUrl || ''"
                   fill
                   class="w-full h-full object-cover"
                   [alt]="project()?.title + ' screenshot'">
            } @else {
              <div class="w-full h-full bg-secondary/25 flex items-center justify-center">
                <span class="material-symbols-outlined !text-7xl text-accent/40">{{ project()?.icon || 'inventory_2' }}</span>
              </div>
            }
            <button (click)="onClose()"
                    class="absolute top-4 right-4 w-10 h-10 dark:text-black rounded-full bg-text/70 hover:bg-accent hover:text-surface text-white flex items-center justify-center transition-all cursor-pointer border border-border hover:border-accent"
                    aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Modal Body content -->
          <div class="p-8 h-[60%] flex-grow overflow-y-auto space-y-6 text-left text-text">
            <div>
              <span class="font-label-caps text-label-caps text-accent">{{ project()?.category }}</span>
              <h3 [id]="'modal-title-' + project()?.title" class="font-headline-lg text-headline-lg mt-1 text-text dark:text-glow leading-tight">
                {{ project()?.title }}
              </h3>
            </div>
            
            <div class="space-y-2">
              <h4 class="text-sm font-semibold text-accent uppercase tracking-wider">Project Overview</h4>
              <p class="text-text/80 text-body-md leading-relaxed">{{ project()?.description }}</p>
            </div>

            <div class="space-y-3">
              <h4 class="text-sm font-semibold text-accent uppercase tracking-wider">My Contributions</h4>
              <ul class="list-disc pl-5 space-y-2 text-text/80 text-body-md leading-relaxed">
                @for (bullet of project()?.contributions; track bullet) {
                  <li>{{ bullet }}</li>
                }
              </ul>
            </div>

            <div class="space-y-3">
              <h4 class="text-sm font-semibold text-accent uppercase tracking-wider">Skills & Technologies</h4>
              <div class="flex flex-wrap gap-2 justify-start">
                @for (skill of project()?.skills; track skill) {
                  <span class="px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/20 uppercase tracking-wide">
                    {{ skill }}
                  </span>
                }
              </div>
            </div>

            @if (project()?.link) {
              <div class="pt-4 flex justify-end">
                <a [href]="project()?.link"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="px-6 py-3 bg-accent text-[#272635] dark:box-glow font-semibold rounded-xl hover:bg-white transition-all inline-flex items-center gap-2 cursor-pointer shadow-md">
                  <span>Visit Live Project</span>
                  <span class="material-symbols-outlined text-sm">arrow_outward</span>
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class ProjectModalComponent {
  readonly project = input<Project | null>(null);
  readonly close = output<void>();

  onEscape() {
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
