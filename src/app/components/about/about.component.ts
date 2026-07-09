import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section class="section-white py-section-padding-mobile md:py-section-padding-desktop px-gutter border-b border-border" id="about">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        <div class="md:col-span-7 space-y-6">
          <span class="font-label-caps text-label-caps text-accent tracking-widest">ABOUT ME</span>
          <h2 class="font-headline-lg text-headline-lg text-text">Crafting Software with .NET, Angular &amp; Mobile Technologies</h2>
          <p class="text-body-lg text-text-muted leading-relaxed text-left font-roboto-mono">
            Dedicated BS Computer Science graduate at Taguig City University with strong academic achievements and leadership credentials. 
            Eager to prove my abilities by accepting challenges, fulfilling goals, and achieving personal growth through continuous learning and commitment. 
            Experienced in software engineering through student internships, mobile development, .NET backend systems (thesis and hackathon awards), and leading multiple student organizations.
          </p>
        </div>
        <div class="md:col-span-5">
          <div class="bg-surface p-8 rounded-2xl border border-border text-left">
            <h3 class="font-label-caps text-label-caps text-text mb-8 border-b border-border pb-4">QUICK FACTS</h3>
            <div class="grid grid-cols-2 gap-8">
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">9+ Yrs Coding Experience</p>
                <p class="font-label-caps text-label-caps text-text-muted">CODING EXPERIENCE</p>
              </div>
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">20+ Projects</p>
                <p class="font-label-caps text-label-caps text-text-muted">PROJECTS</p>
              </div>
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">Backend &amp; Frontend Dev</p>
                <p class="font-label-caps text-label-caps text-text-muted">PRIMARY FOCUS</p>
              </div>
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">Taguig City, PH</p>
                <p class="font-label-caps text-label-caps text-text-muted">LOCATION</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent { }
