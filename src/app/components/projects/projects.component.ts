import { Component, AfterViewInit, PLATFORM_ID, inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Project {
  id: string;
  key: string;
  tech: string[];
  emoji: string;
  gradient: string;
  cover: string;
  images: string[];
  link?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section id="proyectos" class="py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Header -->
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12" data-animate="fade-up">
          <div>
            <span class="section-badge mb-4">{{ 'projects.badge' | translate }}</span>
            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {{ 'projects.title' | translate }}<br><span class="text-gradient">{{ 'projects.titleHighlight' | translate }}</span>
            </h2>
          </div>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-md">
            {{ 'projects.description' | translate }}
          </p>
        </div>

        <!-- Projects Carousel -->
        <div class="relative" #swiperContainer>
          <swiper-container
            init="false"
            class="projects-swiper">
            @for (project of projects; track project.id) {
              <swiper-slide>
                <div
                  class="group card overflow-hidden cursor-pointer"
                  (click)="openModal(project)">
                  <!-- Image -->
                  <div
                    class="relative h-64 overflow-hidden"
                    [style.background]="project.gradient">
                    <img [src]="project.cover" [alt]="('projects.items.' + project.key + '.title') | translate"
                      class="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-900 via-transparent to-transparent pointer-events-none"></div>

                    <!-- Category Badge -->
                    <div class="absolute top-4 left-4">
                      <span class="px-3 py-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full text-xs font-medium">
                        {{ 'projects.items.' + project.key + '.category' | translate }}
                      </span>
                    </div>

                    <!-- View Project Overlay -->
                    <div class="absolute inset-0 bg-neutral-900/60 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span class="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {{ 'projects.viewProject' | translate }}
                      </span>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-6">
                    <h3 class="text-xl font-bold mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {{ 'projects.items.' + project.key + '.title' | translate }}
                    </h3>
                    <p class="text-neutral-500 text-sm mb-4 line-clamp-2">
                      {{ 'projects.items.' + project.key + '.description' | translate }}
                    </p>

                    <!-- Highlights -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      @for (highlight of getHighlights(project.key); track highlight) {
                        <span class="px-2 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-xs font-medium">
                          {{ highlight }}
                        </span>
                      }
                    </div>

                    <!-- Tech Stack -->
                    <div class="flex flex-wrap gap-2">
                      @for (tech of project.tech; track tech) {
                        <span class="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs text-neutral-600 dark:text-neutral-400">
                          {{ tech }}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </swiper-slide>
            }
          </swiper-container>

          <!-- Navigation -->
          <div class="flex items-center justify-center gap-4 mt-8">
            <button
              #prevBtn
              class="w-12 h-12 rounded-full border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div #pagination class="swiper-pagination-custom flex gap-2"></div>
            <button
              #nextBtn
              class="w-12 h-12 rounded-full border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    @if (selectedProject) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
        (click)="closeModal()">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
          (click)="$event.stopPropagation()">

          <!-- Close Button -->
          <button
            (click)="closeModal()"
            class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-neutral-700 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="flex flex-col lg:flex-row h-full max-h-[90vh]">
            <!-- Gallery Section -->
            <div class="lg:w-2/3 bg-neutral-100 dark:bg-neutral-800 p-4 lg:p-6">
              <!-- Main Image -->
              <div
                class="relative aspect-video rounded-xl overflow-hidden mb-4"
                [style.background]="selectedProject.gradient">
                <img [src]="selectedProject.images[currentImageIndex]" [alt]="('projects.items.' + selectedProject.key + '.title') | translate"
                  class="absolute inset-0 w-full h-full object-cover">


                <!-- Image Navigation Arrows -->
                @if (selectedProject.images.length > 1) {
                  <button
                    (click)="prevImage()"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button
                    (click)="nextImage()"
                    class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                }

                <!-- Image Counter -->
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                  {{ currentImageIndex + 1 }} / {{ selectedProject.images.length }}
                </div>
              </div>

              <!-- Thumbnails -->
              <div class="flex gap-2 overflow-x-auto pb-2">
                @for (image of selectedProject.images; track image; let i = $index) {
                  <button
                    (click)="selectImage(i)"
                    class="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all"
                    [class.border-neutral-900]="currentImageIndex === i"
                    [class.dark:border-white]="currentImageIndex === i"
                    [class.border-transparent]="currentImageIndex !== i"
                    [class.opacity-50]="currentImageIndex !== i">
                    <img [src]="image" class="w-full h-full object-cover">

                  </button>
                }
              </div>
            </div>

            <!-- Info Section -->
            <div class="lg:w-1/3 p-6 lg:p-8 overflow-y-auto">
              <!-- Category -->
              <span class="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-medium mb-4">
                {{ 'projects.items.' + selectedProject.key + '.category' | translate }}
              </span>

              <!-- Title -->
              <h3 class="text-2xl lg:text-3xl font-bold mb-4">{{ 'projects.items.' + selectedProject.key + '.title' | translate }}</h3>

              <!-- Description -->
              <p class="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                {{ 'projects.items.' + selectedProject.key + '.fullDescription' | translate }}
              </p>

              <!-- Highlights -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">{{ 'projects.highlights' | translate }}</h4>
                <div class="flex flex-wrap gap-2">
                  @for (highlight of getHighlights(selectedProject.key); track highlight) {
                    <span class="px-3 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-medium">
                      {{ highlight }}
                    </span>
                  }
                </div>
              </div>

              <!-- Tech Stack -->
              <div class="mb-8">
                <h4 class="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">{{ 'projects.technologies' | translate }}</h4>
                <div class="flex flex-wrap gap-2">
                  @for (tech of selectedProject.tech; track tech) {
                    <span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>

              <!-- Link Button -->
              @if (selectedProject.link) {
                <a
                  [href]="selectedProject.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
                  <span>{{ 'projects.viewProject' | translate }}</span>
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    swiper-container {
      width: 100%;
      padding-bottom: 20px;
    }

    swiper-slide {
      height: auto;
    }

    .swiper-pagination-custom {
      display: flex;
      gap: 8px;
    }

    .animate-fade-in {
      animation: fadeIn 0.2s ease-out;
    }

    .animate-scale-in {
      animation: scaleIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `]
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('prevBtn') prevBtn!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;
  @ViewChild('pagination') pagination!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private translate = inject(TranslateService);

  selectedProject: Project | null = null;
  currentImageIndex = 0;

  projects: Project[] = [
    { id: 'tienda-online', key: 'tiendaOnline', tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'], emoji: '🛒', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', cover: 'assets/images/projects/tienda-online-1.png', images: ['assets/images/projects/tienda-online-1.png', 'assets/images/projects/tienda-online-2.png', 'assets/images/projects/tienda-online-3.png'], link: 'https://ejemplo.com' },
    { id: 'delivery-app', key: 'deliveryApp', tech: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'], emoji: '🚀', gradient: 'linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)', cover: 'assets/images/projects/delivery-app-1.png', images: ['assets/images/projects/delivery-app-1.png', 'assets/images/projects/delivery-app-2.png', 'assets/images/projects/delivery-app-3.png'], link: 'https://ejemplo.com' },
    { id: 'sistema-erp', key: 'sistemaErp', tech: ['Angular', 'Python', 'AWS', 'Docker'], emoji: '📊', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', cover: 'assets/images/projects/sistema-erp-1.png', images: ['assets/images/projects/sistema-erp-1.png', 'assets/images/projects/sistema-erp-2.png', 'assets/images/projects/sistema-erp-3.png'], link: 'https://ejemplo.com' },
    { id: 'dashboard-analytics', key: 'dashboardAnalytics', tech: ['React', 'D3.js', 'Firebase', 'BigQuery'], emoji: '📈', gradient: 'linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)', cover: 'assets/images/projects/dashboard-analytics-1.png', images: ['assets/images/projects/dashboard-analytics-1.png', 'assets/images/projects/dashboard-analytics-2.png', 'assets/images/projects/dashboard-analytics-3.png'], link: 'https://ejemplo.com' },
    { id: 'plataforma-educativa', key: 'plataformaEducativa', tech: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC'], emoji: '🎓', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', cover: 'assets/images/projects/plataforma-educativa-1.png', images: ['assets/images/projects/plataforma-educativa-1.png', 'assets/images/projects/plataforma-educativa-2.png', 'assets/images/projects/plataforma-educativa-3.png'], link: 'https://ejemplo.com' },
    { id: 'chatbot-ia', key: 'chatbotIa', tech: ['Python', 'OpenAI', 'FastAPI', 'LangChain'], emoji: '🤖', gradient: 'linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)', cover: 'assets/images/projects/chatbot-ia-1.png', images: ['assets/images/projects/chatbot-ia-1.png', 'assets/images/projects/chatbot-ia-2.png', 'assets/images/projects/chatbot-ia-3.png'], link: 'https://ejemplo.com' },
    { id: 'app-fintech', key: 'appFintech', tech: ['Flutter', 'Go', 'PostgreSQL', 'Plaid'], emoji: '💳', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', cover: 'assets/images/projects/app-fintech-1.png', images: ['assets/images/projects/app-fintech-1.png', 'assets/images/projects/app-fintech-2.png', 'assets/images/projects/app-fintech-3.png'], link: 'https://ejemplo.com' },
    { id: 'marketplace-b2b', key: 'marketplaceB2b', tech: ['Next.js', 'NestJS', 'Elasticsearch', 'Kubernetes'], emoji: '🏪', gradient: 'linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)', cover: 'assets/images/projects/marketplace-b2b-1.png', images: ['assets/images/projects/marketplace-b2b-1.png', 'assets/images/projects/marketplace-b2b-2.png', 'assets/images/projects/marketplace-b2b-3.png'], link: 'https://ejemplo.com' },
    { id: 'sistema-reservas', key: 'sistemaReservas', tech: ['Angular', 'Node.js', 'PostgreSQL', 'Twilio'], emoji: '📅', gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', cover: 'assets/images/projects/sistema-reservas-1.png', images: ['assets/images/projects/sistema-reservas-1.png', 'assets/images/projects/sistema-reservas-2.png', 'assets/images/projects/sistema-reservas-3.png'], link: 'https://ejemplo.com' },
    { id: 'iot-dashboard', key: 'iotDashboard', tech: ['React', 'Python', 'InfluxDB', 'MQTT'], emoji: '🔧', gradient: 'linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)', cover: 'assets/images/projects/iot-dashboard-1.png', images: ['assets/images/projects/iot-dashboard-1.png', 'assets/images/projects/iot-dashboard-2.png', 'assets/images/projects/iot-dashboard-3.png'], link: 'https://ejemplo.com' }
  ];

  getHighlights(projectKey: string): string[] {
    const highlights = this.translate.instant(`projects.items.${projectKey}.highlights`);
    return Array.isArray(highlights) ? highlights : [];
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.closeModal();
  }

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
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: this.prevBtn.nativeElement,
        nextEl: this.nextBtn.nativeElement,
      },
      pagination: {
        el: this.pagination.nativeElement,
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return `<span class="${className} w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 cursor-pointer transition-all duration-300"></span>`;
        },
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    };

    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }

  openModal(project: Project) {
    this.selectedProject = project;
    this.currentImageIndex = 0;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedProject = null;
    this.currentImageIndex = 0;
    document.body.style.overflow = '';
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
  }

  prevImage() {
    if (this.selectedProject) {
      this.currentImageIndex = this.currentImageIndex === 0
        ? this.selectedProject.images.length - 1
        : this.currentImageIndex - 1;
    }
  }

  nextImage() {
    if (this.selectedProject) {
      this.currentImageIndex = this.currentImageIndex === this.selectedProject.images.length - 1
        ? 0
        : this.currentImageIndex + 1;
    }
  }
}
