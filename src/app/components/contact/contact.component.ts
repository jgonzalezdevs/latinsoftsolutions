import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactFormService, ContactFormData } from '../../services/contact-form.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <section id="contacto" class="py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <!-- Info -->
          <div data-animate="fade-right">
            <span class="section-badge mb-4">{{ 'contact.badge' | translate }}</span>
            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {{ 'contact.title' | translate }}<br><span class="text-gradient">{{ 'contact.titleHighlight' | translate }}</span>?
            </h2>
            <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              {{ 'contact.description' | translate }}
            </p>

            <!-- Contact Info -->
            <div class="space-y-6 mb-8">
              <!-- Email -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-neutral-500">{{ 'contact.info.email' | translate }}</div>
                  <div class="font-medium">contact&#64;latinsoftsolutions.com</div>
                </div>
              </div>
              <!-- Phone -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-neutral-500">{{ 'contact.info.phone' | translate }}</div>
                  <div class="font-medium">+1 (555) 123-4567</div>
                </div>
              </div>
              <!-- Location -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-neutral-500">{{ 'contact.info.location' | translate }}</div>
                  <div class="font-medium">Latinoamérica</div>
                </div>
              </div>
            </div>

            <!-- Social -->
            <div class="flex gap-3">
              <!-- LinkedIn -->
              <a href="#" target="_blank" aria-label="LinkedIn"
                class="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <!-- GitHub -->
              <a href="#" target="_blank" aria-label="GitHub"
                class="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <!-- X (Twitter) -->
              <a href="#" target="_blank" aria-label="X"
                class="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Multi-Step Form -->
          <div class="card p-6 sm:p-8" data-animate="fade-left">
            <!-- Step Indicator -->
            <div class="flex items-center justify-between mb-6">
              @for (step of steps; track step.number; let i = $index) {
                <div class="flex items-center flex-1" [class.flex-none]="i === steps.length - 1">
                  <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 flex-shrink-0"
                    [class.bg-neutral-900]="currentStep() >= step.number"
                    [class.text-white]="currentStep() >= step.number"
                    [class.dark:bg-white]="currentStep() >= step.number"
                    [class.dark:text-neutral-900]="currentStep() >= step.number"
                    [class.bg-neutral-200]="currentStep() < step.number"
                    [class.dark:bg-neutral-700]="currentStep() < step.number"
                    [class.text-neutral-500]="currentStep() < step.number">
                    @if (currentStep() > step.number) {
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    } @else {
                      {{ step.number }}
                    }
                  </div>
                  @if (i < steps.length - 1) {
                    <div class="flex-1 h-0.5 mx-2 rounded-full transition-all duration-300"
                      [class.bg-neutral-900]="currentStep() > step.number"
                      [class.dark:bg-white]="currentStep() > step.number"
                      [class.bg-neutral-200]="currentStep() <= step.number"
                      [class.dark:bg-neutral-700]="currentStep() <= step.number">
                    </div>
                  }
                </div>
              }
            </div>

            <!-- Step Title -->
            <div class="mb-5">
              <h3 class="text-lg font-semibold">{{ stepTitles[currentStep() - 1].title }}</h3>
              <p class="text-sm text-neutral-500 mt-1">{{ stepTitles[currentStep() - 1].subtitle }}</p>
            </div>

            <form (ngSubmit)="onSubmit()" class="space-y-4">
              <!-- Step 1: Información de contacto -->
              @if (currentStep() === 1) {
                <div class="space-y-4 animate-fade-in">
                  <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1.5">Nombre *</label>
                      <input type="text" [(ngModel)]="form.name" name="name" required
                        placeholder="Tu nombre completo"
                        class="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 text-sm">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1.5">Email *</label>
                      <input type="email" [(ngModel)]="form.email" name="email" required
                        #emailInput="ngModel"
                        [pattern]="emailPattern"
                        placeholder="tu@email.com"
                        class="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors"
                        [class.border-neutral-200]="!emailInput.invalid || !emailInput.touched"
                        [class.dark:border-neutral-700]="!emailInput.invalid || !emailInput.touched"
                        [class.focus:ring-neutral-400]="!emailInput.invalid || !emailInput.touched"
                        [class.border-red-500]="emailInput.invalid && emailInput.touched"
                        [class.dark:border-red-500]="emailInput.invalid && emailInput.touched"
                        [class.focus:ring-red-400]="emailInput.invalid && emailInput.touched">
                      @if (emailInput.invalid && emailInput.touched) {
                        <p class="mt-1 text-xs text-red-500">
                          @if (emailInput.errors?.['required']) {
                            El email es requerido
                          } @else if (emailInput.errors?.['pattern']) {
                            Ingresa un email válido
                          }
                        </p>
                      }
                    </div>
                  </div>
                  <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1.5">Teléfono / WhatsApp</label>
                      <input type="tel" [(ngModel)]="form.phone" name="phone"
                        placeholder="+1 234 567 8900"
                        class="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 text-sm">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1.5">Empresa</label>
                      <input type="text" [(ngModel)]="form.company" name="company"
                        placeholder="Tu empresa (opcional)"
                        class="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 text-sm">
                    </div>
                  </div>
                </div>
              }

              <!-- Step 2: Detalles del proyecto -->
              @if (currentStep() === 2) {
                <div class="space-y-4 animate-fade-in">
                  <div>
                    <label class="block text-sm font-medium mb-1.5">Tipo de solución *</label>
                    <select [(ngModel)]="form.solutionType" name="solutionType" required
                      #solutionInput="ngModel"
                      class="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors"
                      [class.border-neutral-200]="!solutionInput.invalid || !solutionInput.touched"
                      [class.dark:border-neutral-700]="!solutionInput.invalid || !solutionInput.touched"
                      [class.border-red-500]="solutionInput.invalid && solutionInput.touched"
                      [class.dark:border-red-500]="solutionInput.invalid && solutionInput.touched">
                      <option value="" disabled>Selecciona una opción</option>
                      @for (opt of solutionOptions; track opt.value) {
                        <option [value]="opt.value">{{ opt.label }}</option>
                      }
                    </select>
                    @if (solutionInput.invalid && solutionInput.touched) {
                      <p class="mt-1 text-xs text-red-500">Selecciona un tipo de solución</p>
                    }
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1.5">Descripción del proyecto *</label>
                    <textarea [(ngModel)]="form.description" name="description" rows="3" required
                      placeholder="Describe tu idea, funcionalidades y objetivos..."
                      class="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 text-sm resize-none"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">¿Tienes diseño o mockups?</label>
                    <div class="space-y-2">
                      @for (opt of designOptions; track opt.value) {
                        <label class="flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all text-sm"
                          [class.border-neutral-900]="form.hasDesign === opt.value"
                          [class.dark:border-white]="form.hasDesign === opt.value"
                          [class.bg-neutral-50]="form.hasDesign === opt.value"
                          [class.dark:bg-neutral-800]="form.hasDesign === opt.value"
                          [class.border-neutral-200]="form.hasDesign !== opt.value"
                          [class.dark:border-neutral-700]="form.hasDesign !== opt.value">
                          <input type="radio" [(ngModel)]="form.hasDesign" name="hasDesign" [value]="opt.value" class="accent-neutral-900 dark:accent-white">
                          <span>{{ opt.label }}</span>
                        </label>
                      }
                    </div>
                  </div>
                </div>
              }

              <!-- Step 3: Presupuesto y tiempo -->
              @if (currentStep() === 3) {
                <div class="space-y-4 animate-fade-in">
                  <div>
                    <label class="block text-sm font-medium mb-2">Presupuesto estimado</label>
                    <div class="grid grid-cols-3 gap-2">
                      @for (opt of budgetOptions; track opt.value) {
                        <label class="flex items-center justify-center px-2 py-2 rounded-lg border cursor-pointer transition-all text-center text-xs"
                          [class.border-neutral-900]="form.budget === opt.value"
                          [class.dark:border-white]="form.budget === opt.value"
                          [class.bg-neutral-900]="form.budget === opt.value"
                          [class.text-white]="form.budget === opt.value"
                          [class.dark:bg-white]="form.budget === opt.value"
                          [class.dark:text-neutral-900]="form.budget === opt.value"
                          [class.border-neutral-200]="form.budget !== opt.value"
                          [class.dark:border-neutral-700]="form.budget !== opt.value">
                          <input type="radio" [(ngModel)]="form.budget" name="budget" [value]="opt.value" class="sr-only">
                          {{ opt.label }}
                        </label>
                      }
                    </div>
                  </div>
                  <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-1.5">Fecha de entrega *</label>
                      <select [(ngModel)]="form.deadline" name="deadline" required
                        #deadlineInput="ngModel"
                        class="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors"
                        [class.border-neutral-200]="!deadlineInput.invalid || !deadlineInput.touched"
                        [class.dark:border-neutral-700]="!deadlineInput.invalid || !deadlineInput.touched"
                        [class.border-red-500]="deadlineInput.invalid && deadlineInput.touched"
                        [class.dark:border-red-500]="deadlineInput.invalid && deadlineInput.touched">
                        <option value="" disabled>Selecciona</option>
                        @for (opt of deadlineOptions; track opt.value) {
                          <option [value]="opt.value">{{ opt.label }}</option>
                        }
                      </select>
                      @if (deadlineInput.invalid && deadlineInput.touched) {
                        <p class="mt-1 text-xs text-red-500">Selecciona una opción</p>
                      }
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1.5">¿Cómo nos encontraste? *</label>
                      <select [(ngModel)]="form.howFoundUs" name="howFoundUs" required
                        #howFoundInput="ngModel"
                        class="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors"
                        [class.border-neutral-200]="!howFoundInput.invalid || !howFoundInput.touched"
                        [class.dark:border-neutral-700]="!howFoundInput.invalid || !howFoundInput.touched"
                        [class.border-red-500]="howFoundInput.invalid && howFoundInput.touched"
                        [class.dark:border-red-500]="howFoundInput.invalid && howFoundInput.touched">
                        <option value="" disabled>Selecciona</option>
                        @for (opt of howFoundUsOptions; track opt.value) {
                          <option [value]="opt.value">{{ opt.label }}</option>
                        }
                      </select>
                      @if (howFoundInput.invalid && howFoundInput.touched) {
                        <p class="mt-1 text-xs text-red-500">Selecciona una opción</p>
                      }
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Urgencia de fecha límite</label>
                    <div class="flex justify-between items-center gap-1">
                      <span class="text-xs text-neutral-500">Flexible</span>
                      <div class="flex gap-1">
                        @for (n of [1,2,3,4,5]; track n) {
                          <label class="w-10 h-10 flex items-center justify-center rounded-lg border cursor-pointer transition-all font-medium"
                            [class.border-neutral-900]="form.urgency === n.toString()"
                            [class.dark:border-white]="form.urgency === n.toString()"
                            [class.bg-neutral-900]="form.urgency === n.toString()"
                            [class.text-white]="form.urgency === n.toString()"
                            [class.dark:bg-white]="form.urgency === n.toString()"
                            [class.dark:text-neutral-900]="form.urgency === n.toString()"
                            [class.border-neutral-200]="form.urgency !== n.toString()"
                            [class.dark:border-neutral-700]="form.urgency !== n.toString()">
                            <input type="radio" [(ngModel)]="form.urgency" name="urgency" [value]="n.toString()" class="sr-only">
                            {{ n }}
                          </label>
                        }
                      </div>
                      <span class="text-xs text-neutral-500">Crucial</span>
                    </div>
                  </div>
                </div>
              }

              <!-- Step 4: Prioridades -->
              @if (currentStep() === 4) {
                <div class="space-y-4 animate-fade-in">
                  @for (priority of priorities; track priority.key) {
                    <div class="space-y-1.5">
                      <label class="block text-sm font-medium">{{ priority.label }}</label>
                      <div class="grid grid-cols-4 gap-1.5">
                        @for (level of priorityLevels; track level) {
                          <label class="flex items-center justify-center px-2 py-2 rounded-lg border cursor-pointer transition-all text-center text-xs"
                            [class.border-neutral-900]="getPriority(priority.key) === level"
                            [class.dark:border-white]="getPriority(priority.key) === level"
                            [class.bg-neutral-900]="getPriority(priority.key) === level"
                            [class.text-white]="getPriority(priority.key) === level"
                            [class.dark:bg-white]="getPriority(priority.key) === level"
                            [class.dark:text-neutral-900]="getPriority(priority.key) === level"
                            [class.border-neutral-200]="getPriority(priority.key) !== level"
                            [class.dark:border-neutral-700]="getPriority(priority.key) !== level">
                            <input type="radio" [name]="'priority_' + priority.key" [value]="level"
                              (change)="setPriority(priority.key, level)" class="sr-only">
                            {{ level }}
                          </label>
                        }
                      </div>
                    </div>
                  }
                </div>
              }

              <!-- Step 5: Reuniones y Soporte -->
              @if (currentStep() === 5) {
                <div class="space-y-4 animate-fade-in">
                  <div>
                    <label class="block text-sm font-medium mb-2">¿Participarías en reuniones de seguimiento?</label>
                    <div class="grid grid-cols-2 gap-2">
                      @for (opt of meetingOptions; track opt.value) {
                        <label class="flex items-center justify-center px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-center text-xs"
                          [class.border-neutral-900]="form.sprintMeetings === opt.value"
                          [class.dark:border-white]="form.sprintMeetings === opt.value"
                          [class.bg-neutral-900]="form.sprintMeetings === opt.value"
                          [class.text-white]="form.sprintMeetings === opt.value"
                          [class.dark:bg-white]="form.sprintMeetings === opt.value"
                          [class.dark:text-neutral-900]="form.sprintMeetings === opt.value"
                          [class.border-neutral-200]="form.sprintMeetings !== opt.value"
                          [class.dark:border-neutral-700]="form.sprintMeetings !== opt.value">
                          <input type="radio" [(ngModel)]="form.sprintMeetings" name="sprintMeetings" [value]="opt.value" class="sr-only">
                          {{ opt.label }}
                        </label>
                      }
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">Soporte post-entrega (selecciona los que necesites)</label>
                    <div class="flex flex-wrap gap-2">
                      @for (opt of supportOptions; track opt.value) {
                        <label class="inline-flex items-center gap-2 px-3 py-2 rounded-full border cursor-pointer transition-all text-xs"
                          [class.border-neutral-900]="isSupportSelected(opt.value)"
                          [class.dark:border-white]="isSupportSelected(opt.value)"
                          [class.bg-neutral-900]="isSupportSelected(opt.value)"
                          [class.text-white]="isSupportSelected(opt.value)"
                          [class.dark:bg-white]="isSupportSelected(opt.value)"
                          [class.dark:text-neutral-900]="isSupportSelected(opt.value)"
                          [class.border-neutral-200]="!isSupportSelected(opt.value)"
                          [class.dark:border-neutral-700]="!isSupportSelected(opt.value)">
                          <input type="checkbox" [checked]="isSupportSelected(opt.value)"
                            (change)="toggleSupport(opt.value)" class="sr-only">
                          @if (isSupportSelected(opt.value)) {
                            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                          }
                          {{ opt.label }}
                        </label>
                      }
                    </div>
                  </div>

                  <!-- Summary -->
                  <div class="mt-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <h4 class="font-medium text-sm mb-2">Resumen</h4>
                    <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                      <p><strong>Nombre:</strong> {{ form.name }}</p>
                      <p><strong>Email:</strong> {{ form.email }}</p>
                      <p><strong>Solución:</strong> {{ form.solutionType }}</p>
                      <p><strong>Presupuesto:</strong> {{ form.budget || 'No especificado' }}</p>
                    </div>
                  </div>
                </div>
              }

              <!-- Navigation Buttons -->
              <div class="flex gap-3 pt-4">
                @if (currentStep() > 1) {
                  <button type="button" (click)="prevStep()"
                    class="flex-1 py-2.5 px-4 border border-neutral-300 dark:border-neutral-600 rounded-lg font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                    Atrás
                  </button>
                }
                @if (currentStep() < 5) {
                  <button type="button" (click)="nextStep()" [disabled]="!canProceed()"
                    class="flex-1 btn-primary py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                    Siguiente
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                } @else {
                  <button type="submit" [disabled]="isSubmitting()" class="flex-1 btn-primary py-2.5 text-sm disabled:opacity-50">
                    @if (isSubmitting()) {
                      <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Enviando...
                    } @else if (isSuccess()) {
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      ¡Enviado!
                    } @else {
                      Enviar Solicitud
                    }
                  </button>
                }
              </div>

              @if (isError()) {
                <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
                  {{ errorMessage() }}
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ContactComponent {
  private contactFormService = inject(ContactFormService);

  // Patrón de validación de email
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  currentStep = signal(1);
  isSubmitting = signal(false);
  isSuccess = signal(false);
  isError = signal(false);
  errorMessage = signal('');

  steps = [
    { number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }
  ];

  stepTitles = [
    { title: 'Información de Contacto', subtitle: '¿Cómo podemos comunicarnos contigo?' },
    { title: 'Sobre tu Proyecto', subtitle: 'Cuéntanos qué necesitas' },
    { title: 'Presupuesto y Tiempo', subtitle: 'Detalles para planificar' },
    { title: 'Prioridades', subtitle: '¿Qué aspectos son más importantes?' },
    { title: 'Detalles Finales', subtitle: 'Reuniones, soporte y resumen' }
  ];

  form: ContactFormData = {
    name: '', email: '', phone: '', company: '',
    solutionType: '', description: '', hasDesign: '',
    budget: '', deadline: '', urgency: '', howFoundUs: '',
    priorityTime: '', priorityCost: '', priorityQuality: '', priorityUX: '',
    sprintMeetings: '', supportType: []
  };

  // Opciones con valores EXACTOS del Google Form
  solutionOptions = [
    { value: 'Sitio Web / Landing Page', label: 'Sitio Web / Landing Page' },
    { value: 'Aplicación Web', label: 'Aplicación Web' },
    { value: 'Aplicación Móvil (iOS/Android)', label: 'Aplicación Móvil (iOS/Android)' },
    { value: 'Sistema de Gestión (ERP/CRM)', label: 'Sistema de Gestión (ERP/CRM)' },
    { value: 'E-commerce / Tienda Online', label: 'E-commerce / Tienda Online' },
    { value: 'Automatización de procesos', label: 'Automatización de procesos' },
    { value: 'Inteligencia Artificial / Chatbot', label: 'Inteligencia Artificial / Chatbot' },
    { value: 'Otro (Por favor, especifica en la descripción)', label: 'Otro' }
  ];

  designOptions = [
    { value: 'Sí, tengo diseños listos (Wireframes, prototipos, etc.)', label: 'Sí, tengo diseños listos' },
    { value: 'Tengo ideas pero necesito que LatinSoftSolutions me ayude con el diseño y la experiencia de usuario (UX/UI).', label: 'Tengo ideas, necesito ayuda con diseño' },
    { value: 'No, necesito el desarrollo completo, incluyendo el diseño desde cero.', label: 'Necesito diseño desde cero' }
  ];

  budgetOptions = [
    { value: 'Menos de $1,000 USD', label: '< $1K' },
    { value: '$1,000 - $5,000 USD', label: '$1K-$5K' },
    { value: '$5,000 - $15,000 USD', label: '$5K-$15K' },
    { value: '$15,000 - $50,000 USD', label: '$15K-$50K' },
    { value: 'Más de $50,000 USD', label: '> $50K' },
    { value: 'No tengo presupuesto definido aún', label: 'Por definir' }
  ];

  deadlineOptions = [
    { value: 'Lo antes posible (urgente)', label: 'Urgente' },
    { value: 'En 1-2 meses', label: '1-2 meses' },
    { value: 'En 3-6 meses', label: '3-6 meses' },
    { value: 'Sin fecha definida / Flexible', label: 'Flexible' }
  ];

  howFoundUsOptions = [
    { value: 'Búsqueda en Google / Otro motor de búsqueda', label: 'Google' },
    { value: 'Redes sociales (LinkedIn, Instagram, etc.)', label: 'Redes Sociales' },
    { value: 'Recomendación de un contacto o empresa', label: 'Recomendación' },
    { value: 'Otro', label: 'Otro' }
  ];

  priorities = [
    { key: 'time', label: 'Rapidez de Desarrollo' },
    { key: 'cost', label: 'Costo / Presupuesto' },
    { key: 'quality', label: 'Calidad y Robustez' },
    { key: 'ux', label: 'Experiencia de Usuario' }
  ];

  priorityLevels = ['Baja', 'Media', 'Alta', 'Crítica'];

  meetingOptions = [
    { value: 'Sí, semanalmente', label: 'Semanal' },
    { value: 'Sí, cada dos semanas', label: 'Quincenal' },
    { value: 'Sí, mensualmente', label: 'Mensual' },
    { value: 'No, prefiero actualizaciones por email/reporte', label: 'Solo email' }
  ];

  supportOptions = [
    { value: 'Soporte técnico por un período definido (ej. 3 meses)', label: 'Soporte técnico' },
    { value: 'Mantenimiento continuo', label: 'Mantenimiento' },
    { value: 'Actualizaciones de software', label: 'Actualizaciones' },
    { value: 'Capacitación para el uso del producto', label: 'Capacitación' },
    { value: 'Ninguno, manejo interno', label: 'Ninguno' }
  ];


  getPriority(key: string): string {
    switch(key) {
      case 'time': return this.form.priorityTime;
      case 'cost': return this.form.priorityCost;
      case 'quality': return this.form.priorityQuality;
      case 'ux': return this.form.priorityUX;
      default: return '';
    }
  }

  setPriority(key: string, value: string) {
    switch(key) {
      case 'time': this.form.priorityTime = value; break;
      case 'cost': this.form.priorityCost = value; break;
      case 'quality': this.form.priorityQuality = value; break;
      case 'ux': this.form.priorityUX = value; break;
    }
  }

  isSupportSelected(value: string): boolean {
    return this.form.supportType.includes(value);
  }

  toggleSupport(value: string) {
    const index = this.form.supportType.indexOf(value);
    if (index > -1) {
      this.form.supportType.splice(index, 1);
    } else {
      this.form.supportType.push(value);
    }
  }

  isValidEmail(email: string): boolean {
    const regex = new RegExp(this.emailPattern);
    return regex.test(email);
  }

  canProceed(): boolean {
    switch (this.currentStep()) {
      case 1: return !!this.form.name && !!this.form.email && this.isValidEmail(this.form.email);
      case 2: return !!this.form.solutionType && !!this.form.description;
      case 3: return !!this.form.deadline && !!this.form.howFoundUs;
      default: return true;
    }
  }

  nextStep() {
    if (this.canProceed() && this.currentStep() < 5) {
      this.currentStep.update(v => v + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(v => v - 1);
    }
  }

  async onSubmit() {
    this.isSubmitting.set(true);
    this.isError.set(false);

    const result = await this.contactFormService.submitForm(this.form);

    this.isSubmitting.set(false);

    if (result.success) {
      this.isSuccess.set(true);
      this.form = {
        name: '', email: '', phone: '', company: '',
        solutionType: '', description: '', hasDesign: '',
        budget: '', deadline: '', urgency: '', howFoundUs: '',
        priorityTime: '', priorityCost: '', priorityQuality: '', priorityUX: '',
        sprintMeetings: '', supportType: []
      };
      setTimeout(() => {
        this.isSuccess.set(false);
        this.currentStep.set(1);
      }, 3000);
    } else {
      this.isError.set(true);
      this.errorMessage.set(result.message);
      setTimeout(() => this.isError.set(false), 5000);
    }
  }
}
