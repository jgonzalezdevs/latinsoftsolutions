import { Component, AfterViewInit, PLATFORM_ID, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="py-24 lg:py-32 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" #statsContainer>
          @for (stat of stats; track stat.key; let i = $index) {
            <div class="text-center group" data-animate="scale">
              <!-- Number -->
              <div class="text-6xl lg:text-7xl font-black mb-2 transition-transform duration-300 group-hover:scale-110">
                <span class="stat-number" [attr.data-value]="stat.value">0</span>{{ stat.suffix }}
              </div>
              <!-- Label -->
              <div class="text-neutral-400 dark:text-neutral-600 uppercase tracking-wider text-sm font-medium">
                {{ 'stats.' + stat.key + '.label' | translate }}
              </div>
              <!-- Description -->
              <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
                {{ 'stats.' + stat.key + '.desc' | translate }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class StatsComponent implements AfterViewInit {
  @ViewChild('statsContainer') statsContainer!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  stats = [
    { value: 50, suffix: '+', key: 'projects' },
    { value: 30, suffix: '+', key: 'clients' },
    { value: 99, suffix: '%', key: 'satisfaction' },
    { value: 5, suffix: '+', key: 'years' },
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initCounterAnimation();
    }
  }

  private async initCounterAnimation() {
    const gsap = (await import('gsap')).default;
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
    gsap.registerPlugin(ScrollTrigger);

    const numbers = this.statsContainer.nativeElement.querySelectorAll('.stat-number');

    numbers.forEach((el: HTMLElement) => {
      const value = parseInt(el.dataset['value'] || '0');

      gsap.fromTo(el,
        { innerText: 0 },
        {
          innerText: value,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }
}
