import { Component, signal, computed } from '@angular/core';

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

type TabId = 'back-front' | 'db-cloud' | 'design-ai' | 'methodologies';

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

        <!-- Pill-shaped Tab Navigation -->
        <div class="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Tech stack categories" (keydown)="onTabKeydown($event)">
          @for (tab of tabs; track tab.id) {
            <button type="button"
              role="tab"
              [id]="'skills-tab-' + tab.id"
              [attr.aria-selected]="activeTab() === tab.id"
              aria-controls="skills-panel"
              [attr.tabindex]="activeTab() === tab.id ? 0 : -1"
              (click)="setActiveTab(tab.id)"
              [class.bg-accent]="activeTab() === tab.id"
              [class.text-white]="activeTab() === tab.id"
              [class.dark:text-on-accent]="activeTab() === tab.id"
              [class.bg-surface]="activeTab() !== tab.id"
              [class.text-text-muted]="activeTab() !== tab.id"
              class="px-6 py-3 min-h-11 rounded-full font-label-caps text-label-caps transition-[border-color,transform] duration-300 border border-border/30 hover:border-accent cursor-pointer active:scale-95 shadow-md">
              {{ tab.label }}
            </button>
          }
        </div>

        <!-- 3D Skill Cards Grid -->
        <div id="skills-panel" role="tabpanel" tabindex="0" [attr.aria-labelledby]="'skills-tab-' + activeTab()" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
          @for (skill of filteredSkills(); track skill.name) {
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
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly activeTab = signal<TabId>('back-front');

  readonly tabs = [
    { id: 'back-front' as TabId, label: 'Development' },
    { id: 'db-cloud' as TabId, label: 'Database & Cloud' },
    { id: 'design-ai' as TabId, label: 'Design & AI' },
    { id: 'methodologies' as TabId, label: 'Methodologies' }
  ];

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

  readonly filteredSkills = computed(() => {
    const tab = this.activeTab();
    let targetCatIds: string[] = [];

    if (tab === 'back-front') {
      targetCatIds = ['backend', 'frontend'];
    } else if (tab === 'db-cloud') {
      targetCatIds = ['database', 'cloud'];
    } else if (tab === 'design-ai') {
      targetCatIds = ['design', 'ai-tools'];
    } else if (tab === 'methodologies') {
      targetCatIds = ['methodologies'];
    }

    const list: SkillItem[] = [];
    for (const catId of targetCatIds) {
      const category = this.categories.find(c => c.id === catId);
      if (category) {
        list.push(...category.skills);
      }
    }
    return list;
  });

  setActiveTab(tabId: TabId) {
    this.activeTab.set(tabId);
  }

  /** Arrow keys, Home and End move between tabs and activate them (WAI-ARIA tabs pattern). */
  onTabKeydown(event: KeyboardEvent) {
    const last = this.tabs.length - 1;
    const current = this.tabs.findIndex(tab => tab.id === this.activeTab());
    let next = -1;
    if (event.key === 'ArrowRight') next = current === last ? 0 : current + 1;
    else if (event.key === 'ArrowLeft') next = current === 0 ? last : current - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next < 0) {
      return;
    }

    event.preventDefault();
    const tabId = this.tabs[next].id;
    this.setActiveTab(tabId);
    (event.currentTarget as HTMLElement).querySelector<HTMLElement>('#skills-tab-' + tabId)?.focus();
  }

  getDashOffset(proficiency: number): string {
    const circumference = 188.5;
    const offset = circumference * (1 - proficiency / 100);
    return `${offset}px`;
  }
}

