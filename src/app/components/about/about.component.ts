import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section id="nosotros" class="py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <!-- Content -->
          <div data-animate="fade-right">
            <span class="section-badge mb-4">{{ 'about.badge' | translate }}</span>
            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {{ 'about.title' | translate }} <span class="text-gradient">{{ 'about.titleHighlight' | translate }}</span><br>{{ 'about.title2' | translate }}
            </h2>
            <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-6" [innerHTML]="'about.description1' | translate">
            </p>
            <p class="text-neutral-500 dark:text-neutral-500 mb-8">
              {{ 'about.description2' | translate }}
            </p>

            <!-- Features -->
            <div class="grid sm:grid-cols-2 gap-4">
              @for (feature of features; track feature.key) {
                <div class="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                  <div class="w-10 h-10 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white dark:text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold mb-1">{{ 'about.features.' + feature.key + '.title' | translate }}</h4>
                    <p class="text-sm text-neutral-500">{{ 'about.features.' + feature.key + '.desc' | translate }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Visual -->
          <div class="relative" data-animate="fade-left">
            <!-- Main Image/Card -->
            <div class="relative aspect-square max-w-md mx-auto group/card">
              <!-- Background shapes -->
              <div class="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-3xl transform rotate-6 transition-all duration-500 group-hover/card:rotate-3 group-hover/card:scale-105"></div>
              <div class="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 rounded-3xl transform rotate-3 transition-all duration-500 group-hover/card:rotate-1 group-hover/card:scale-[1.02]"></div>

              <!-- Main card -->
              <div class="relative h-full bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-center transition-all duration-500 group-hover/card:border-neutral-900 dark:group-hover/card:border-white group-hover/card:shadow-2xl group-hover/card:scale-[1.01]">
                <!-- Code snippet -->
                <div class="mb-6">
                  <div class="flex items-center gap-2 mb-4">
                    <div class="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover/card:bg-red-400 transition-colors duration-300"></div>
                    <div class="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover/card:bg-yellow-400 transition-colors duration-300 delay-75"></div>
                    <div class="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover/card:bg-green-400 transition-colors duration-300 delay-150"></div>
                    <span class="ml-2 text-xs text-neutral-400 group-hover/card:text-neutral-600 dark:group-hover/card:text-neutral-300 transition-colors">solution.ts</span>
                  </div>
                  <pre class="font-mono text-sm transition-all duration-300 group-hover/card:translate-x-1"><code class="text-neutral-600 dark:text-neutral-400"><span class="text-neutral-400">const</span> solution = &#123;
  innovation: <span class="text-neutral-500">"always"</span>,
  quality: <span class="text-neutral-500">100</span>,
  commitment: <span class="text-neutral-500">true</span>
&#125;;</code></pre>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 group-hover/card:border-neutral-300 dark:group-hover/card:border-neutral-700 transition-colors">
                  @for (stat of stats; track stat.key; let i = $index) {
                    <div class="text-center transition-transform duration-300 group-hover/card:scale-110" [style.transition-delay]="(i * 50) + 'ms'">
                      <div class="text-2xl font-bold">{{ stat.value }}</div>
                      <div class="text-xs text-neutral-500">{{ 'about.stats.' + stat.key | translate }}</div>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Floating badge -->
            <div class="absolute -bottom-4 -right-4 lg:-right-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl px-5 py-4 shadow-xl animate-float">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold">{{ 'about.buildPassed' | translate }}</div>
                  <div class="text-xs text-neutral-500">{{ 'about.testsSuccess' | translate }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  features = [
    { key: 'agile' },
    { key: 'support' },
    { key: 'code' },
    { key: 'delivery' }
  ];

  stats = [
    { value: '50+', key: 'projects' },
    { value: '30+', key: 'clients' },
    { value: '5+', key: 'years' }
  ];
}
