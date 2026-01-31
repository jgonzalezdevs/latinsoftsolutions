import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, TranslateModule],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      [class.glass]="isScrolled()"
      [class.border-b]="isScrolled()">
      <nav class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <app-logo size="default" />

          <!-- Desktop Nav -->
          <div class="hidden lg:flex items-center gap-1">
            @for (link of navLinks; track link.href) {
              <a
                [href]="link.href"
                class="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200">
                {{ link.key | translate }}
              </a>
            }
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">
            <!-- Language Toggle Switch -->
            <button
              (click)="toggleLanguage()"
              class="relative w-14 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              [attr.aria-label]="translationService.isSpanish() ? 'Switch to English' : 'Cambiar a Español'">
              <!-- Labels -->
              <div class="absolute inset-1 flex items-center justify-between px-1">
                <span
                  class="text-[10px] font-bold transition-all duration-300"
                  [class.text-white]="translationService.isSpanish()"
                  [class.text-neutral-400]="!translationService.isSpanish()">
                  ES
                </span>
                <span
                  class="text-[10px] font-bold transition-all duration-300"
                  [class.text-white]="!translationService.isSpanish()"
                  [class.text-neutral-400]="translationService.isSpanish()">
                  EN
                </span>
              </div>
              <!-- Sliding Background -->
              <div
                class="absolute top-1 w-6 h-6 bg-neutral-900 dark:bg-white rounded-full shadow-md transition-all duration-300 ease-out"
                [class.left-1]="translationService.isSpanish()"
                [class.left-7]="!translationService.isSpanish()">
              </div>
            </button>

            <!-- Theme Toggle -->
            <button
              (click)="toggleTheme()"
              class="relative w-14 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              [attr.aria-label]="themeService.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
              <!-- Track icons -->
              <div class="absolute inset-1 flex items-center justify-between px-1">
                <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
                </svg>
                <svg class="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              </div>
              <!-- Thumb -->
              <div
                class="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ease-out-expo"
                [class.left-1]="!themeService.isDark()"
                [class.left-7]="themeService.isDark()">
              </div>
            </button>

            <!-- CTA Button (Desktop) -->
            <a href="#contacto" class="hidden lg:flex btn-primary">
              {{ 'nav.contact' | translate }}
            </a>

            <!-- Mobile Menu Button -->
            <button
              (click)="toggleMenu()"
              class="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              [attr.aria-expanded]="isMenuOpen()">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                @if (!isMenuOpen()) {
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                } @else {
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                }
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        @if (isMenuOpen()) {
          <div class="lg:hidden absolute top-full left-0 right-0 glass border-t animate-fade-in-down">
            <div class="px-6 py-8 space-y-2">
              @for (link of navLinks; track link.href) {
                <a
                  [href]="link.href"
                  (click)="closeMenu()"
                  class="block px-4 py-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors">
                  {{ link.key | translate }}
                </a>
              }
              <a href="#contacto" (click)="closeMenu()" class="block mt-4 btn-primary text-center">
                {{ 'nav.contact' | translate }}
              </a>
            </div>
          </div>
        }
      </nav>
    </header>
  `
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  translationService = inject(TranslationService);

  isScrolled = signal(false);
  isMenuOpen = signal(false);

  navLinks = [
    { href: '#inicio', key: 'nav.home' },
    { href: '#servicios', key: 'nav.services' },
    { href: '#nosotros', key: 'nav.about' },
    { href: '#proyectos', key: 'nav.projects' },
    { href: '#testimonios', key: 'nav.testimonials' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleLanguage() {
    this.translationService.toggleLanguage();
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
