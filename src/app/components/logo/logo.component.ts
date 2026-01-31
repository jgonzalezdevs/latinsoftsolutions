import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a href="#" class="group flex items-center gap-1" [class]="containerClass">
      <!-- Logo Mark - Stylized "LS" -->
      <div
        class="relative flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105"
        [ngClass]="{
          'w-10 h-10': size === 'default',
          'w-8 h-8': size === 'small',
          'w-12 h-12': size === 'large'
        }">
        <!-- Background with gradient border effect -->
        <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white"></div>
        <div class="absolute inset-[2px] rounded-[6px] bg-white dark:bg-neutral-900"></div>
        <!-- Letters -->
        <div class="relative flex items-center"
          [ngClass]="{
            'text-sm': size === 'small',
            'text-base': size === 'default',
            'text-lg': size === 'large'
          }">
          <span class="font-black text-neutral-900 dark:text-white">L</span>
          <span class="font-black text-neutral-400 dark:text-neutral-500 -ml-0.5">S</span>
        </div>
      </div>

      <!-- Logo Text -->
      <div class="flex items-baseline ml-1">
        <span
          class="font-black tracking-tight text-neutral-900 dark:text-white"
          [ngClass]="{
            'text-lg': size === 'small',
            'text-xl': size === 'default',
            'text-2xl': size === 'large'
          }">
          Latin
        </span>
        <span
          class="font-black tracking-tight text-neutral-400 dark:text-neutral-500"
          [ngClass]="{
            'text-lg': size === 'small',
            'text-xl': size === 'default',
            'text-2xl': size === 'large'
          }">
          Soft
        </span>
        <span
          class="font-black tracking-tight text-neutral-900 dark:text-white"
          [ngClass]="{
            'text-lg': size === 'small',
            'text-xl': size === 'default',
            'text-2xl': size === 'large'
          }">
          Solutions
        </span>
      </div>

      <!-- Animated dot -->
      <div
        class="rounded-full bg-neutral-900 dark:bg-white transition-all duration-300 group-hover:scale-150 group-hover:bg-neutral-600 dark:group-hover:bg-neutral-300"
        [ngClass]="{
          'w-1 h-1': size === 'small',
          'w-1.5 h-1.5': size === 'default',
          'w-2 h-2': size === 'large'
        }">
      </div>
    </a>
  `
})
export class LogoComponent {
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() containerClass = '';
}
