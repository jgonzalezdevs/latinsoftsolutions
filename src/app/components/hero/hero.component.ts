import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 -z-10">
        <!-- Grid -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <!-- Gradient Orbs -->
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neutral-200 dark:bg-neutral-800 rounded-full blur-[120px] opacity-60 animate-pulse-soft"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neutral-300 dark:bg-neutral-700 rounded-full blur-[100px] opacity-40 animate-pulse-soft animation-delay-500"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm mb-8 animate-fade-in">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-600 dark:bg-neutral-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-neutral-900 dark:bg-white"></span>
            </span>
            <span class="text-neutral-600 dark:text-neutral-400">{{ 'hero.badge' | translate }}</span>
          </div>

          <!-- Title -->
          <h1
            #titleRef
            class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight mb-8">
            <span class="block overflow-hidden">
              <span class="block animate-fade-in-up">{{ 'hero.title1' | translate }}</span>
            </span>
            <span class="block overflow-hidden">
              <span class="block animate-fade-in-up animation-delay-100">{{ 'hero.title2' | translate }} <span class="text-gradient">{{ 'hero.title3' | translate }}</span></span>
            </span>
            <span class="block overflow-hidden">
              <span class="block animate-fade-in-up animation-delay-200">{{ 'hero.title4' | translate }} <span class="text-gradient">{{ 'hero.title5' | translate }}</span></span>
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-300 text-balance">
            {{ 'hero.description' | translate }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
            <a href="#contacto" class="btn-primary w-full sm:w-auto group">
              <span>{{ 'hero.cta1' | translate }}</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="#proyectos" class="btn-secondary w-full sm:w-auto group">
              <span>{{ 'hero.cta2' | translate }}</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
        <a href="#servicios" class="flex flex-col items-center gap-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <span class="text-xs uppercase tracking-[0.2em] font-medium">{{ 'hero.scroll' | translate }}</span>
          <div class="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <div class="w-1 h-2 bg-current rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-1/3 right-8 lg:right-20 hidden lg:block animate-float">
        <div class="w-20 h-20 border border-neutral-200 dark:border-neutral-800 rounded-2xl rotate-12"></div>
      </div>
      <div class="absolute bottom-1/3 left-8 lg:left-20 hidden lg:block animate-float animation-delay-300">
        <div class="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-xl -rotate-12"></div>
      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('titleRef') titleRef!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private async initAnimations() {
    const gsap = (await import('gsap')).default;

    // Magnetic effect on buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e: Event) => {
        const event = e as MouseEvent;
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }
}
