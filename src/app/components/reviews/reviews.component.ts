import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface Testimonial {
  name: string;
  role: string;
  title: string;
  quote: string;
  rating: number;
  image: string;
  approved: boolean;
}

@Component({
  selector: 'app-reviews',
  imports: [NgOptimizedImage],
  template: `
    <section class="section-white py-section-padding-mobile md:py-section-padding-desktop px-gutter border-t border-border" id="reviews">
      <div class="max-w-[1200px] mx-auto">
        <!-- Section Header -->
        <div class="mb-16 space-y-4 text-left">
          <span class="font-label-caps text-label-caps text-accent tracking-widest">TESTIMONIALS</span>
          <h2 class="font-headline-lg text-headline-lg text-text font-bold">Our Clients Feedback</h2>
        </div>

        <!-- Reviews Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-stretch">
          @for (item of testimonials; track item.name) {
            @if (item.approved) {
              <div class="flex flex-col sm:flex-row gap-6 p-6 md:p-8 rounded-2xl border bg-surface/50 border-border/30 dark:bg-surface/40 dark:border-border/10 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                
                <!-- Client Avatar Photo -->
                <div class="flex-shrink-0 flex justify-center sm:block">
                  <img [ngSrc]="item.image"
                       [alt]="item.name + ' - ' + item.role"
                       width="120"
                       height="120"
                       class="w-32 h-32 object-cover rounded-2xl shadow-inner border border-border/20 select-none">
                </div>

                <!-- Testimonial Content -->
                <div class="flex-1 flex flex-col justify-between text-left gap-4">
                  <div class="space-y-2">
                    <h3 class="font-headline-md text-headline-md text-text leading-tight">{{ item.title }}</h3>
                    <p class="font-body-md text-body-md text-text-muted leading-relaxed">{{ item.quote }}</p>
                  </div>

                  <div class="space-y-3">
                    <!-- Star Rating -->
                    <div class="flex text-amber-500 gap-1 text-sm select-none" aria-label="5 out of 5 stars">
                      @for (star of [1,2,3,4,5]; track star) {
                        <span>★</span>
                      }
                    </div>

                    <!-- Client Info Details -->
                    <div class="space-y-0.5">
                      <p class="font-roboto-mono font-bold text-text text-sm">{{ item.name }}</p>
                      <p class="font-label-caps text-label-caps text-accent tracking-wider text-[11px] font-semibold">{{ item.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          }
        </div>
      </div>
    </section>
  `,
})
export class ReviewsComponent {
  readonly testimonials: Testimonial[] = [
    {
      name: 'Harsh P.',
      role: 'Product Designer',
      title: 'You have right place',
      quote: 'Nam libero tempore, cum soluta nobis est eligendi opti cumqu nihil impe quo minus id quod maxime placeat facere possimus omnis volupt assumenda est omnis dolor repellendus.',
      rating: 5,
      image: 'assets/image/reviews/client_harsh.png',
      approved: true
    },
    {
      name: 'Jane D.',
      role: 'CEO',
      title: "It's best",
      quote: 'Nam libero tempore, cum soluta nobis est eligendi opti cumqu nihil impe quo minus id quod maxime placeat facere possimus omnis volupt assumenda est omnis dolor repellendus.',
      rating: 5,
      image: 'assets/image/reviews/client_jane.png',
      approved: true
    }
  ];
}
