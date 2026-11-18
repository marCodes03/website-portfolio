import { Component, computed } from '@angular/core';

interface SkillItem {
  name: string;
  icon: string;
  proficiency: number;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

interface SkillGroup {
  id: string;
  title: string;
  note: string;
  skills: SkillItem[];
}

@Component({
  selector: 'app-skills',
  template: `
    <section class="py-section-padding-mobile md:py-section-padding-desktop px-gutter section-frosted" id="skills">
      <div class="max-w-[1200px] mx-auto">
        <!-- Section Header -->
        <div class="mb-16 space-y-4 text-left">
          <span class="font-label-caps text-label-caps text-accent tracking-widest">SKILLS &amp; TOOLS</span>
          <h2 class="font-headline-lg text-headline-lg text-text font-bold">Tech Stack</h2>
        </div>

        <div class="space-y-12">
          @for (group of groups(); track group.id) {
            <div [attr.aria-labelledby]="'skills-group-' + group.id" role="group">
              <div class="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 [id]="'skills-group-' + group.id" class="font-headline-md text-headline-md text-text font-bold">{{ group.title }}</h3>
                <p class="font-body-md text-body-md text-text-muted">{{ group.note }}</p>
              </div>
              @if (group.id === 'primary') {
              <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center list-none p-0 m-0">
                  @for (skill of group.skills; track skill.name) {
                    <li>
                      <div class="skill-card-container aspect-square w-full">
                                    <div class="skill-card-inner">
                                      <!-- Front Face -->
                                      <div class="skill-card-front p-4 flex flex-col items-center justify-center gap-3 text-center select-none shadow-md">
                                        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-text transition-transform duration-300">
                                          @if (skill.icon.startsWith('devicon-')) {
                                            <i [class]="skill.icon" class="text-4xl"></i>
                                          } @else {
                                            <span class="material-symbols-outlined !text-4xl" aria-hidden="true">{{ skill.icon }}</span>
                                          }
                                        </div>
                                        <span class="font-roboto-mono text-xs font-bold tracking-tight text-text leading-tight">{{ skill.name }}</span>
                                      </div>
                      
                                      <!-- Back Face (Proficiency SVG Donut with Centered Icon) -->
                                      <div class="skill-card-back p-4 flex flex-col items-center justify-center gap-2 text-center select-none shadow-lg">
                                        <div class="relative w-20 h-20 flex items-center justify-center">
                                          <svg class="w-full h-full" viewBox="0 0 80 80">
                                            <!-- Background Ring -->
                                            <circle
                                              cx="40"
                                              cy="40"
                                              r="30"
                                              class="donut-circle-bg"
                                              stroke-width="5"
                                              fill="transparent"
                                            />
                                            <!-- Animated Foreground Ring -->
                                            <circle
                                              cx="40"
                                              cy="40"
                                              r="30"
                                              class="donut-circle-val"
                                              stroke-width="5"
                                              fill="transparent"
                                              stroke-dasharray="188.5"
                                              [style.--dashoffset]="getDashOffset(skill.proficiency)"
                                            />
                                          </svg>
                                          <div class="absolute flex items-center justify-center text-accent">
                                            @if (skill.icon.startsWith('devicon-')) {
                                              <i [class]="skill.icon" class="text-3xl"></i>
                                            } @else {
                                              <span class="material-symbols-outlined !text-3xl" aria-hidden="true">{{ skill.icon }}</span>
                                            }
                                          </div>
                                        </div>
                                        <span class="font-roboto-mono text-xs font-bold tracking-tight text-text leading-tight">{{ skill.name }}</span>
                                        <span class="font-roboto-mono text-xs text-text-muted">{{ levelLabel(skill.proficiency) }}</span>
                                      </div>
                                    </div>
                                  </div>
                    </li>
                  }
                </ul>
              } @else {
                <ul class="flex flex-wrap gap-3 list-none p-0 m-0">
                  @for (skill of group.skills; track skill.name) {
                    <li class="flex items-center gap-3 rounded-full border border-border/40 bg-surface/70 dark:bg-white/5 px-4 py-2">
                      @if (skill.icon.startsWith('devicon-')) {
                        <i [class]="skill.icon" class="text-xl" aria-hidden="true"></i>
                      } @else {
                        <span class="material-symbols-outlined text-xl text-accent" aria-hidden="true">{{ skill.icon }}</span>
                      }
                      <span class="font-roboto-mono text-xs font-bold text-text">{{ skill.name }}</span>
                      <span class="font-roboto-mono text-xs text-text-muted">{{ levelLabel(skill.proficiency) }}</span>
                    </li>
                  }
                </ul>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly categories: SkillCategory[] = [
    {
      id: 'backend',
      title: 'Backend Development',
      icon: 'code',
      skills: [
        { name: 'C# & .NET Core', icon: 'devicon-csharp-plain text-[#512bd4]', proficiency: 100 },
        { name: 'ASP.NET', icon: 'devicon-dotnetcore-plain text-[#512bd4]', proficiency: 80 },
        { name: 'Entity Framework', icon: 'devicon-dot-net-plain text-[#512bd4]', proficiency: 80 },
        { name: 'REST API', icon: 'code', proficiency: 100 },
        { name: 'Java', icon: 'devicon-java-plain text-[#e76f00]', proficiency: 60 },
        { name: 'Visual Basic', icon: 'devicon-visualstudio-plain text-[#5c2d91]', proficiency: 60 },
        { name: 'Python', icon: 'devicon-python-plain text-[#3776ab]', proficiency: 40 },
        { name: 'C++', icon: 'devicon-cplusplus-plain text-[#00599c]', proficiency: 40 }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      icon: 'code',
      skills: [
        { name: 'Angular (JS & v14+)', icon: 'devicon-angularjs-plain text-[#dd0031]', proficiency: 80 },
        { name: 'React JS', icon: 'devicon-react-original text-[#61dafb]', proficiency: 80 },
        { name: 'JavaScript & Bootstrap', icon: 'devicon-javascript-plain text-[#f7df1e]', proficiency: 60 },
        { name: 'HTML5 & CSS / Sass', icon: 'devicon-html5-plain text-[#e34f26]', proficiency: 80 },
        { name: 'TypeScript', icon: 'devicon-typescript-plain text-[#3178c6]', proficiency: 80 },
        { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain text-[#06b6d4]', proficiency: 80 },
        { name: 'Ionic Framework', icon: 'devicon-angularjs-plain text-[#3880ff]', proficiency: 80 },
      ]
    },
    {
      id: 'database',
      title: 'Database',
      icon: 'database',
      skills: [
        { name: 'Relational Database', icon: 'database', proficiency: 100 },
        { name: 'MSSQL', icon: 'devicon-microsoftsqlserver-plain text-[#cc292b]', proficiency: 80 },
        { name: 'MySQL', icon: 'devicon-mysql-plain text-[#00758f]', proficiency: 80 }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud Computing',
      icon: 'cloud',
      skills: [
        { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark text-[#ff9900]', proficiency: 80 },
        { name: 'Microsoft Azure', icon: 'devicon-azure-plain text-[#0089d6]', proficiency: 80 }
      ]
    },
    {
      id: 'design',
      title: 'UI/UX Design',
      icon: 'palette',
      skills: [
        { name: 'Figma', icon: 'devicon-figma-plain text-[#f24e1e]', proficiency: 80 },
        { name: 'UI/UX Design', icon: 'palette', proficiency: 60 },
        { name: 'Mobile Development', icon: 'phone_iphone', proficiency: 80 },
        { name: 'Web Design & Layouts', icon: 'web', proficiency: 80 },
        { name: 'Wireframing & Flows', icon: 'schema', proficiency: 80 }
      ]
    },
    {
      id: 'ai-tools',
      title: 'AI Tools',
      icon: 'auto_awesome',
      skills: [
        { name: 'Prompt Engineering', icon: 'psychology_alt', proficiency: 80 },
        { name: 'AI-Assisted Dev', icon: 'smart_toy', proficiency: 80 },
        { name: 'Antigravity', icon: 'rocket_launch', proficiency: 100 },
        { name: 'Gemini', icon: 'auto_awesome', proficiency: 100 },
        { name: 'ChatGPT', icon: 'forum', proficiency: 60 },
        { name: 'Claude', icon: 'hub', proficiency: 100 }
      ]
    },
    {
      id: 'methodologies',
      title: 'Methodologies',
      icon: 'psychology',
      skills: [
        { name: 'Software Testing (QA)', icon: 'fact_check', proficiency: 80 },
        { name: 'Playwright', icon: 'science', proficiency: 60 },
        { name: 'Agile & Scrum', icon: 'sync', proficiency: 100 },
        { name: 'Git & Azure DevOps', icon: 'devicon-git-plain text-[#f05032]', proficiency: 100 },
        { name: 'Version Control', icon: 'account_tree', proficiency: 100 },
        { name: 'Web Design & Layouts', icon: 'web', proficiency: 100 }
      ]
    }
  ];

  /** Each skill once (highest level wins), grouped by depth, ordered by level then name. */
  readonly groups = computed<SkillGroup[]>(() => {
    const best = new Map<string, SkillItem>();
    for (const category of this.categories) {
      for (const skill of category.skills) {
        const seen = best.get(skill.name);
        if (!seen || skill.proficiency > seen.proficiency) {
          best.set(skill.name, skill);
        }
      }
    }
    const sorted = [...best.values()].sort(
      (x, y) => y.proficiency - x.proficiency || x.name.localeCompare(y.name)
    );
    return [
      { id: 'primary', title: 'Primary', note: 'Expert and Advanced: what I build with every day.', skills: sorted.filter(k => k.proficiency >= 80) },
      { id: 'working', title: 'Working', note: 'Proficient: solid working knowledge.', skills: sorted.filter(k => k.proficiency >= 60 && k.proficiency < 80) },
      { id: 'familiar', title: 'Familiar', note: 'Developing and Familiar: practical basics.', skills: sorted.filter(k => k.proficiency < 60) }
    ].filter(group => group.skills.length > 0);
  });

  levelLabel(proficiency: number): string {
    if (proficiency >= 100) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 60) return 'Proficient';
    if (proficiency >= 40) return 'Developing';
    return 'Familiar';
  }

  getDashOffset(proficiency: number): string {
    const circumference = 188.5;
    const offset = circumference * (1 - proficiency / 100);
    return `${offset}px`;
  }
}

