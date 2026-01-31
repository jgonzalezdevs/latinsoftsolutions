import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LogoComponent, TranslateModule],
  template: `
    <footer class="py-16 bg-neutral-100 dark:bg-neutral-900">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Main Footer -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <!-- Brand -->
          <div class="lg:col-span-1">
            <div class="mb-4">
              <app-logo size="small" />
            </div>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
              {{ 'footer.tagline' | translate }}
            </p>
            <p class="text-neutral-500 text-sm">
              {{ 'footer.description' | translate }}
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="font-semibold mb-4">{{ 'footer.navigation' | translate }}</h4>
            <ul class="space-y-3">
              @for (link of navLinks; track link.href) {
                <li>
                  <a [href]="link.href" class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm transition-colors">
                    {{ link.key | translate }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h4 class="font-semibold mb-4">{{ 'footer.servicesTitle' | translate }}</h4>
            <ul class="space-y-3">
              @for (service of services; track service.key) {
                <li>
                  <a href="#servicios" class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm transition-colors">
                    {{ service.key | translate }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-semibold mb-4">{{ 'footer.contactTitle' | translate }}</h4>
            <ul class="space-y-3 text-sm">
              <li class="text-neutral-600 dark:text-neutral-400">contact&#64;latinsoftsolutions.com</li>
              <li class="text-neutral-600 dark:text-neutral-400">+1 (555) 123-4567</li>
              <li class="text-neutral-600 dark:text-neutral-400">{{ 'contact.info.locationValue' | translate }}</li>
            </ul>

            <!-- Social -->
            <div class="flex gap-3 mt-6">
              <!-- LinkedIn -->
              <a href="#" target="_blank" aria-label="LinkedIn"
                class="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <!-- GitHub -->
              <a href="#" target="_blank" aria-label="GitHub"
                class="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <!-- X (Twitter) -->
              <a href="#" target="_blank" aria-label="X"
                class="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom -->
        <div class="pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-neutral-500 text-sm">
              &copy; {{ currentYear }} LatinSoftSolutions. {{ 'footer.copyright' | translate }}
            </p>
            <div class="flex gap-6 text-sm">
              <a href="#" class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">{{ 'footer.privacy' | translate }}</a>
              <a href="#" class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">{{ 'footer.terms' | translate }}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  navLinks = [
    { href: '#inicio', key: 'nav.home' },
    { href: '#servicios', key: 'nav.services' },
    { href: '#nosotros', key: 'nav.about' },
    { href: '#proyectos', key: 'nav.projects' },
    { href: '#testimonios', key: 'nav.testimonials' },
    { href: '#contacto', key: 'nav.contact' }
  ];

  services = [
    { key: 'services.items.web.title' },
    { key: 'services.items.mobile.title' },
    { key: 'services.items.software.title' },
    { key: 'services.items.ai.title' }
  ];
}
