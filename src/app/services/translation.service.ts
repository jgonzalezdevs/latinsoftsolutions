import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private platformId = inject(PLATFORM_ID);
  currentLang = signal<Language>('es');

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.addLangs(['es', 'en']);

    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') as Language;
      const lang = savedLang || 'es';
      this.setLanguage(lang);
    } else {
      this.setLanguage('es');
    }
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    this.translate.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage() {
    const newLang: Language = this.currentLang() === 'es' ? 'en' : 'es';
    this.setLanguage(newLang);
  }

  isSpanish(): boolean {
    return this.currentLang() === 'es';
  }
}
