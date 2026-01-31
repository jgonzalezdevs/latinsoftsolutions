import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section id="servicios" class="py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-900/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16" data-animate="fade-up">
          <span class="section-badge mb-4">{{ 'services.badge' | translate }}</span>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {{ 'services.title' | translate }} <span class="text-gradient">{{ 'services.titleHighlight' | translate }}</span>
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            {{ 'services.description' | translate }}
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (service of services; track service.id; let i = $index) {
            <div
              class="group card-hover p-8 relative overflow-hidden"
              [attr.data-animate]="'fade-up'"
              [attr.data-delay]="i * 0.1">

              <!-- Number + Icon (Background) -->
              <div class="absolute -top-2 -right-2 flex items-center gap-1 select-none">
                <span class="text-7xl font-black text-neutral-100 dark:text-neutral-800 transition-colors duration-300 group-hover:text-neutral-200 dark:group-hover:text-neutral-700">
                  0{{ i + 1 }}
                </span>
              </div>

              <!-- Icon Box -->
              <div class="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-neutral-900 dark:bg-white mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                @switch (service.id) {
                  @case ('web') {
                    <svg class="w-8 h-8 text-white dark:text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M3 9h18"/>
                      <path d="M9 21V9"/>
                    </svg>
                  }
                  @case ('mobile') {
                    <svg class="w-8 h-8 text-white dark:text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2"/>
                      <path d="M12 18h.01"/>
                    </svg>
                  }
                  @case ('software') {
                    <svg class="w-8 h-8 text-white dark:text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  }
                  @case ('ai') {
                    <svg class="w-8 h-8 text-white dark:text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2v4"/>
                      <path d="m6.8 15-3.5 2"/>
                      <path d="m20.7 7-3.5 2"/>
                      <path d="M6.8 9 3.3 7"/>
                      <path d="m20.7 17-3.5-2"/>
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 18v4"/>
                    </svg>
                  }
                }
              </div>

              <!-- Content -->
              <h3 class="relative text-xl font-bold mb-3">{{ 'services.items.' + service.id + '.title' | translate }}</h3>
              <p class="relative text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                {{ 'services.items.' + service.id + '.description' | translate }}
              </p>

              <!-- Features -->
              <ul class="relative space-y-2">
                @for (feature of getFeatures(service.id); track feature) {
                  <li class="flex items-center gap-2 text-sm text-neutral-500">
                    <div class="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
                    {{ feature }}
                  </li>
                }
              </ul>

              <!-- Arrow -->
              <div class="relative mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a href="#contacto" class="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
                  {{ 'services.learnMore' | translate }}
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
  private translate = inject(TranslateService);

  services = [
    { id: 'web' },
    { id: 'mobile' },
    { id: 'software' },
    { id: 'ai' }
  ];

  getFeatures(serviceId: string): string[] {
    const features = this.translate.instant(`services.items.${serviceId}.features`);
    return Array.isArray(features) ? features : [];
  }
}
