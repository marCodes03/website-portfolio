import { Component, input, output, signal, effect, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Certificate } from './certificates.component';

@Component({
  selector: 'app-certificate-modal',
  imports: [NgOptimizedImage],
  host: {
    '(window:keydown.escape)': 'onEscape()'
  },
  template: `
    @if (certificate()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/90 backdrop-blur-[1.5px] transition-opacity duration-300"
           (click)="onClose()"
           role="dialog"
           aria-modal="true"
           [attr.aria-labelledby]="'modal-title-' + certificate()?.title">
        
        <div class="bg-surface border border-border rounded-3xl max-w-[800px] w-full h-[80vh] overflow-hidden shadow-2xl flex flex-col transition-all duration-300 scale-100"
             (click)="$event.stopPropagation()">
          
          <!-- Auto-Slider Visual Header -->
          <div class="relative h-[50%] w-full overflow-hidden bg-text/50 flex-shrink-0">
            @if (certificate()?.images && certificate()!.images.length > 0) {
              <!-- Slider Images -->
              @for (img of certificate()!.images; track img; let idx = $index) {
                <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                     [class.opacity-100]="idx === currentImageIndex()"
                     [class.opacity-0]="idx !== currentImageIndex()"
                     [class.z-10]="idx === currentImageIndex()">
                  <img [ngSrc]="img"
                       fill
                       class="w-full h-full object-cover"
                       [alt]="certificate()?.title + ' slide ' + idx">
                </div>
              }
              
              <!-- Slide Progress Indicators (Dots) -->
              @if (certificate()!.images.length > 1) {
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  @for (img of certificate()!.images; track img; let idx = $index) {
                    <button (click)="setSlide(idx)"
                            class="w-2 h-2 rounded-full transition-all duration-300 bg-white cursor-pointer"
                            [class.opacity-100]="idx === currentImageIndex()"
                            [class.scale-125]="idx === currentImageIndex()"
                            [class.opacity-40]="idx !== currentImageIndex()"
                            [attr.aria-label]="'Go to slide ' + (idx + 1)">
                    </button>
                  }
                </div>
              }
            } @else {
              <div class="w-full h-full bg-secondary/25 flex items-center justify-center">
                <span class="material-symbols-outlined !text-7xl text-accent/40">{{ certificate()?.icon || 'workspace_premium' }}</span>
              </div>
            }
            
            <button (click)="onClose()"
                    class="absolute top-4 right-4 w-10 h-10 rounded-full bg-text/70 hover:bg-accent dark:text-black hover:text-surface text-white flex items-center justify-center transition-all cursor-pointer border border-border hover:border-accent dark:hover:box-glow z-30"
                    aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Modal Body content -->
          <div class="p-8 h-[50%] flex-grow overflow-y-auto space-y-6 text-left text-text">
            <div>
              <span class="font-label-caps text-label-caps text-accent">{{ certificate()?.category }}</span>
              <h3 [id]="'modal-title-' + certificate()?.title" class="font-headline-lg text-headline-lg mt-1 text-text dark:text-glow leading-tight">
                {{ certificate()?.title }}
              </h3>
            </div>
            
            <div class="space-y-2">
              <h4 class="text-sm font-semibold text-accent uppercase tracking-wider text-[11px]">Recognition Details</h4>
              <p class="text-text-muted font-label-caps text-xs">{{ certificate()?.subtitle }} • {{ certificate()?.year }}</p>
              <p class="text-text/80 text-body-md leading-relaxed">{{ certificate()?.description }}</p>
            </div>

            <div class="space-y-3">
              <h4 class="text-sm font-semibold text-accent uppercase tracking-wider text-[11px]">Key Highlights</h4>
              <div class="flex flex-wrap gap-2 justify-start">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/20 uppercase tracking-wide">
                  {{ certificate()?.category }}
                </span>
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/20 uppercase tracking-wide">
                  {{ certificate()?.year }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class CertificateModalComponent implements OnDestroy {
  readonly certificate = input<Certificate | null>(null);
  readonly close = output<void>();

  readonly currentImageIndex = signal<number>(0);
  private intervalId: any = null;

  constructor() {
    effect(() => {
      const cert = this.certificate();
      this.currentImageIndex.set(0);
      this.stopSlider();

      if (cert && cert.images && cert.images.length > 1) {
        this.startSlider(cert.images.length);
      }
    });
  }

  private startSlider(imagesCount: number) {
    this.intervalId = setInterval(() => {
      this.currentImageIndex.update(idx => (idx + 1) % imagesCount);
    }, 3000);
  }

  private stopSlider() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setSlide(index: number) {
    this.currentImageIndex.set(index);
    const cert = this.certificate();
    this.stopSlider();
    if (cert && cert.images && cert.images.length > 1) {
      this.startSlider(cert.images.length);
    }
  }

  onEscape() {
    this.onClose();
  }

  onClose() {
    this.stopSlider();
    this.close.emit();
  }

  ngOnDestroy() {
    this.stopSlider();
  }
}
