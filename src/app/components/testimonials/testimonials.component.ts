import { Component, AfterViewInit, PLATFORM_ID, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section id="testimonios" class="py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-900/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16" data-animate="fade-up">
          <span class="section-badge mb-4">{{ 'testimonials.badge' | translate }}</span>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {{ 'testimonials.title' | translate }}<br><span class="text-gradient">{{ 'testimonials.titleHighlight' | translate }}</span>
          </h2>
        </div>

        <!-- Testimonials Carousel -->
        <div #swiperContainer>
          <swiper-container init="false" class="testimonials-swiper">
            @for (testimonial of testimonials; track testimonial.name) {
              <swiper-slide>
                <div class="card p-8 h-full flex flex-col">
                  <!-- Quote Icon -->
                  <div class="text-neutral-300 dark:text-neutral-600 mb-6">
                    <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                    </svg>
                  </div>

                  <!-- Rating -->
                  <div class="flex gap-1 mb-4">
                    @for (star of [1,2,3,4,5]; track star) {
                      <svg class="w-5 h-5 text-neutral-900 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    }
                  </div>

                  <!-- Content -->
                  <p class="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow leading-relaxed">
                    "{{ 'testimonials.items.' + testimonial.key + '.content' | translate }}"
                  </p>

                  <!-- Author -->
                  <div class="flex items-center gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <div class="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300">
                      {{ testimonial.initials }}
                    </div>
                    <div>
                      <div class="font-semibold">{{ testimonial.name }}</div>
                      <div class="text-sm text-neutral-500">{{ 'testimonials.items.' + testimonial.key + '.role' | translate }}, {{ testimonial.company }}</div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            }
          </swiper-container>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center gap-2 mt-8" #pagination></div>
      </div>
    </section>
  `,
  styles: [`
    swiper-container {
      width: 100%;
      padding: 10px 0;
    }
    swiper-slide {
      height: auto;
    }
  `]
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('pagination') pagination!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  testimonials = [
    { name: 'María Castillo', initials: 'MC', key: 'maria', company: 'TechStart' },
    { name: 'Juan Rodríguez', initials: 'JR', key: 'juan', company: 'DeliveryApp' },
    { name: 'Ana García', initials: 'AG', key: 'ana', company: 'Logística Plus' },
    { name: 'Carlos Méndez', initials: 'CM', key: 'carlos', company: 'FinanceHub' },
    { name: 'Laura Torres', initials: 'LT', key: 'laura', company: 'EduTech' }
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
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    };

    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }
}
