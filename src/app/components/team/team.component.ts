import { Component, AfterViewInit, PLATFORM_ID, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section id="equipo" class="py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16" data-animate="fade-up">
          <span class="section-badge mb-4">{{ 'team.badge' | translate }}</span>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {{ 'team.title' | translate }}<br><span class="text-gradient">{{ 'team.titleHighlight' | translate }}</span>
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            {{ 'team.description' | translate }}
          </p>
        </div>

        <!-- Team Carousel -->
        <div #swiperContainer class="overflow-visible py-4">
          <swiper-container init="false" class="team-swiper !overflow-visible">
            @for (member of teamMembers; track member.name) {
              <swiper-slide class="!h-auto !overflow-visible">
                <div class="group card text-center h-full flex flex-col border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white hover:scale-[1.05] hover:z-10 hover:shadow-2xl transition-all duration-300">
                  <!-- Avatar -->
                  <div class="relative pt-8 pb-6">
                    @if (member.image) {
                      <!-- Avatar con imagen -->
                      <div class="w-24 h-24 mx-auto rounded-full relative overflow-hidden border-2 border-transparent group-hover:scale-110 group-hover:border-neutral-900 dark:group-hover:border-white transition-all duration-300">
                        <img [src]="member.image" [alt]="member.name" class="w-full h-full object-cover">
                        <!-- Overlay con iniciales en hover -->
                        <div class="absolute inset-0 bg-neutral-900/70 dark:bg-white/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span class="text-2xl font-bold text-white/90 dark:text-neutral-900/90">{{ member.initials }}</span>
                        </div>
                      </div>
                    } @else {
                      <!-- Avatar solo con iniciales -->
                      <div class="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-2xl font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-2 border-transparent group-hover:scale-110 group-hover:border-neutral-900 dark:group-hover:border-white transition-all duration-300">
                        {{ member.initials }}
                      </div>
                    }
                  </div>

                  <!-- Info -->
                  <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold mb-1">{{ member.name }}</h3>
                    <p class="text-neutral-500 dark:text-neutral-400 text-sm mb-4">{{ 'team.members.' + member.key + '.role' | translate }}</p>

                    <!-- Bio -->
                    <p class="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow">
                      {{ 'team.members.' + member.key + '.bio' | translate }}
                    </p>

                    <!-- Skills -->
                    <div class="flex flex-wrap justify-center gap-2 mb-6">
                      @for (skill of member.skills; track skill) {
                        <span class="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs text-neutral-600 dark:text-neutral-400">
                          {{ skill }}
                        </span>
                      }
                    </div>

                    <!-- Social Links -->
                    <div class="flex justify-center gap-3 mt-auto">
                      <a href="#" class="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href="#" class="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            }
          </swiper-container>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center gap-2 mt-8" #pagination></div>

        <!-- CTA -->
        <div class="text-center mt-12" data-animate="fade-up">
          <p class="text-neutral-600 dark:text-neutral-400 mb-4">
            {{ 'team.joinCta' | translate }}
          </p>
          <a href="#contacto" class="inline-flex items-center gap-2 text-neutral-900 dark:text-white font-medium hover:underline">
            {{ 'team.openPositions' | translate }}
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      overflow: visible;
    }
    swiper-container {
      width: 100%;
      padding: 20px 0;
      overflow: visible !important;
    }
    swiper-container::part(container) {
      overflow: visible !important;
    }
    swiper-container::part(wrapper) {
      align-items: stretch;
      overflow: visible !important;
    }
    swiper-slide {
      height: auto !important;
      display: flex;
      overflow: visible !important;
    }
  `]
})
export class TeamComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('pagination') pagination!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  teamMembers: { name: string; initials: string; key: string; skills: string[]; image?: string }[] = [
    { name: 'Juan González', initials: 'JG', key: 'juan', skills: ['Strategic Planning', 'Product Vision', 'Team Leadership', 'Cloud Architecture', 'AWS', 'Agile/Scrum', 'Roadmapping', 'Stakeholder Management'] },
    { name: 'Ana Martínez', initials: 'AM', key: 'ana', skills: ['AWS', 'Kubernetes', 'System Design', 'Microservices', 'Docker', 'Distributed Systems', 'PostgreSQL', 'Security'] },
    { name: 'Manuel Rios', initials: 'MR', key: 'manuel', skills: ['Python', 'FastAPI', 'Django', 'Node.js', 'Angular', 'React', 'Vue.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'LangChain', 'OpenAI', 'AWS'] },
    { name: 'Moisés Rodríguez', initials: 'MR', key: 'moises', skills: ['Figma', 'Adobe Creative Suite', 'UX/UI Design', 'Design Systems', 'Prototyping', 'User Research', 'Motion Graphics', 'Branding'] },
    { name: 'Diego López', initials: 'DL', key: 'diego', skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Express', 'GraphQL', 'Tailwind', 'Jest'] },
    { name: 'María García', initials: 'MG', key: 'maria', skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Wireframing', 'Accessibility', 'Adobe XD', 'Usability Testing'] },
    { name: 'Andrés Pérez', initials: 'AP', key: 'andres', skills: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'AWS', 'Azure', 'GitHub Actions', 'Linux'] },
    { name: 'Laura Sánchez', initials: 'LS', key: 'laura', skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'scikit-learn', 'OpenAI', 'Data Analysis'] },
    { name: 'Roberto Torres', initials: 'RT', key: 'roberto', skills: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Dart', 'iOS', 'Android', 'Firebase'] },
    { name: 'Patricia Flores', initials: 'PF', key: 'patricia', skills: ['Selenium', 'Cypress', 'Playwright', 'Test Automation', 'Jest', 'CI/CD', 'Postman', 'QA'] }
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSwiper();
    }
  }

  private async initSwiper() {
    const { register } = await import('swiper/element/bundle');
    register();

    const swiperEl = this.swiperContainer.nativeElement.querySelector('swiper-container');

    const params = {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: this.pagination.nativeElement,
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return `<span class="${className} w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 cursor-pointer transition-all duration-300 hover:bg-neutral-500"></span>`;
        },
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      },
    };

    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }
}
