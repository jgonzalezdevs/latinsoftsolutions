import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-marquee',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-neutral-50 dark:bg-neutral-900/50 overflow-hidden">
      <div class="mb-8 text-center">
        <span class="text-sm font-medium text-neutral-500 uppercase tracking-wider">Tecnologías que dominamos</span>
      </div>

      <!-- Marquee Container -->
      <div class="relative">
        <!-- Gradient Overlays -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 dark:from-neutral-900/50 to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 dark:from-neutral-900/50 to-transparent z-10"></div>

        <!-- First Row -->
        <div class="flex mb-6">
          <div class="flex animate-marquee">
            @for (tech of technologies; track tech.name) {
              <div class="flex items-center gap-3 px-8 py-4 mx-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors cursor-default group">
                <span class="text-2xl group-hover:scale-110 transition-transform">{{ tech.icon }}</span>
                <span class="font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">{{ tech.name }}</span>
              </div>
            }
          </div>
          <div class="flex animate-marquee" aria-hidden="true">
            @for (tech of technologies; track tech.name) {
              <div class="flex items-center gap-3 px-8 py-4 mx-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors cursor-default group">
                <span class="text-2xl group-hover:scale-110 transition-transform">{{ tech.icon }}</span>
                <span class="font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">{{ tech.name }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Second Row (Reverse) -->
        <div class="flex">
          <div class="flex animate-marquee-reverse">
            @for (tech of technologies2; track tech.name) {
              <div class="flex items-center gap-3 px-8 py-4 mx-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors cursor-default group">
                <span class="text-2xl group-hover:scale-110 transition-transform">{{ tech.icon }}</span>
                <span class="font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">{{ tech.name }}</span>
              </div>
            }
          </div>
          <div class="flex animate-marquee-reverse" aria-hidden="true">
            @for (tech of technologies2; track tech.name) {
              <div class="flex items-center gap-3 px-8 py-4 mx-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors cursor-default group">
                <span class="text-2xl group-hover:scale-110 transition-transform">{{ tech.icon }}</span>
                <span class="font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">{{ tech.name }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-marquee {
      animation: marquee 40s linear infinite;
    }

    .animate-marquee-reverse {
      animation: marquee 40s linear infinite reverse;
    }

    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-100%); }
    }
  `]
})
export class TechMarqueeComponent {
  technologies = [
    { icon: '🅰️', name: 'Angular' },
    { icon: '⚛️', name: 'React' },
    { icon: '💚', name: 'Vue.js' },
    { icon: '▲', name: 'Next.js' },
    { icon: '🟢', name: 'Node.js' },
    { icon: '🐍', name: 'Python' },
    { icon: '🔷', name: 'TypeScript' },
    { icon: '☕', name: 'Java' },
  ];

  technologies2 = [
    { icon: '🐘', name: 'PostgreSQL' },
    { icon: '🍃', name: 'MongoDB' },
    { icon: '☁️', name: 'AWS' },
    { icon: '🐳', name: 'Docker' },
    { icon: '📱', name: 'Flutter' },
    { icon: '⚡', name: 'Firebase' },
    { icon: '🎨', name: 'Tailwind' },
    { icon: '🔥', name: 'GraphQL' },
  ];
}
