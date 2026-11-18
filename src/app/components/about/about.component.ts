import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section class="section-white py-section-padding-mobile md:py-section-padding-desktop px-gutter border-b border-border" id="about">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        <div class="md:col-span-7 space-y-6">
          <span class="font-label-caps text-label-caps text-accent tracking-widest">ABOUT ME</span>
          <h2 class="font-headline-lg text-headline-lg text-text font-bold">Crafting Software with .NET, Angular &amp; Mobile Technologies</h2>
          <p class="text-body-lg text-text-muted leading-relaxed text-left">
            Software Engineer at Eclectus Technologies, building full-stack .NET backend architectures and Angular frontends for production, enterprise-grade platforms.
            I graduated Cum Laude in BS Computer Science from Taguig City University, and now teach the next generation of developers as a Part-time Professor at AMA Computer College.
            My work spans the full stack and development lifecycle: scalable API engineering, cross-platform mobile development, relational database administration, and shipping systems that hold up under real production load.
          </p>
        </div>
        <div class="md:col-span-5">
          <div class="bg-surface p-8 rounded-xl border border-border text-left">
            <h3 class="font-label-caps text-label-caps text-text mb-8 border-b border-border pb-4">QUICK FACTS</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">9+ Yrs Coding Experience</p>
                <p class="font-label-caps text-label-caps text-text-muted">CODING EXPERIENCE</p>
              </div>
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">20+ Projects</p>
                <p class="font-label-caps text-label-caps text-text-muted">WEB, DESKTOP &amp; MOBILE</p>
              </div>
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">Backend &amp; Frontend Dev</p>
                <p class="font-label-caps text-label-caps text-text-muted">PRIMARY FOCUS</p>
              </div>
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">Part-time Professor</p>
                <p class="font-label-caps text-label-caps text-text-muted">TEACHING</p>
              </div>
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">Taguig City, PH</p>
                <p class="font-label-caps text-label-caps text-text-muted">LOCATION</p>
              </div>
              <div class="space-y-1 font-roboto-mono">
                <p class="font-body-md text-body-md text-text font-bold">Cum Laude Graduate</p>
                <p class="font-label-caps text-label-caps text-text-muted">HONORS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent { }
