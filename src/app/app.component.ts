import { Component, OnInit, PLATFORM_ID, inject, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { TechMarqueeComponent } from './components/tech-marquee/tech-marquee.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { StatsComponent } from './components/stats/stats.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    TechMarqueeComponent,
    ProjectsComponent,
    TeamComponent,
    TestimonialsComponent,
    StatsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <div class="relative overflow-x-clip">
      <app-header />
      <main>
        <app-hero />
        <app-services />
        <app-about />
        <app-tech-marquee />
        <app-projects />
        <app-team />
        <app-stats />
        <app-testimonials />
        <app-contact />
      </main>
      <app-footer />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initGSAP();
    }
  }

  private async initGSAP() {
    const gsap = (await import('gsap')).default;
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;

    gsap.registerPlugin(ScrollTrigger);

    // Animate elements on scroll
    gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((el) => {
      const animation = el.dataset['animate'] || 'fade-up';
      const delay = parseFloat(el.dataset['delay'] || '0');

      let fromVars: gsap.TweenVars = { opacity: 0, duration: 0.8, ease: 'power3.out' };

      switch (animation) {
        case 'fade-up':
          fromVars = { ...fromVars, y: 50 };
          break;
        case 'fade-down':
          fromVars = { ...fromVars, y: -50 };
          break;
        case 'fade-left':
          fromVars = { ...fromVars, x: -50 };
          break;
        case 'fade-right':
          fromVars = { ...fromVars, x: 50 };
          break;
        case 'scale':
          fromVars = { ...fromVars, scale: 0.8 };
          break;
      }

      gsap.from(el, {
        ...fromVars,
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }
}
