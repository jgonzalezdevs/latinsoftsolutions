import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Configuración del Google Form de LatinSoft Solutions
// Entry IDs obtenidos del enlace pre-llenado
const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfTuJd8p9K9ZYYq5GunP8dC-FJc6YMO5mrLFCBhy80r-YRXnA/formResponse',

  fields: {
    // Sección 1: Información de Contacto
    name: 'entry.1338216390',
    email: 'entry.233926134',
    phone: 'entry.100105723',
    company: 'entry.797540230',

    // Sección 2: Sobre tu Proyecto
    solutionType: 'entry.487789834',
    description: 'entry.1582331468',
    hasDesign: 'entry.1976997320',

    // Sección 3: Detalles Adicionales y Logística
    budget: 'entry.553275606',
    deadline: 'entry.293607855',
    urgency: 'entry.187441951',
    howFoundUs: 'entry.1829995819',

    // Prioridades (matriz)
    priorityTime: 'entry.461069179',
    priorityCost: 'entry.1435895190',
    priorityQuality: 'entry.1112908381',
    priorityUX: 'entry.762387833',

    // Reuniones y Soporte
    sprintMeetings: 'entry.127010719',
    supportType: 'entry.609430622',
  }
};

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  solutionType: string;
  description: string;
  hasDesign: string;
  budget: string;
  deadline: string;
  urgency: string;
  howFoundUs: string;
  priorityTime: string;
  priorityCost: string;
  priorityQuality: string;
  priorityUX: string;
  sprintMeetings: string;
  supportType: string[];
}

@Injectable({ providedIn: 'root' })
export class ContactFormService {
  private platformId = inject(PLATFORM_ID);

  async submitForm(form: ContactFormData): Promise<{ success: boolean; message: string }> {
    if (!isPlatformBrowser(this.platformId)) {
      return { success: false, message: 'No disponible en servidor' };
    }

    return new Promise((resolve) => {
      try {
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe_' + Date.now();
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const formElement = document.createElement('form');
        formElement.method = 'POST';
        formElement.action = GOOGLE_FORM_CONFIG.formUrl;
        formElement.target = iframe.name;
        formElement.style.display = 'none';

        // Solo agregar campo si tiene valor (Google Forms rechaza valores inválidos)
        const addField = (name: string, value: string) => {
          if (!value) return; // No enviar campos vacíos
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          formElement.appendChild(input);
        };

        // Campos de texto (siempre se envían, pueden estar vacíos)
        const addTextField = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value || '';
          formElement.appendChild(input);
        };

        // Campos de texto (pueden estar vacíos)
        addTextField(GOOGLE_FORM_CONFIG.fields.name, form.name);
        addTextField(GOOGLE_FORM_CONFIG.fields.email, form.email);
        addTextField(GOOGLE_FORM_CONFIG.fields.phone, form.phone);
        addTextField(GOOGLE_FORM_CONFIG.fields.company, form.company);
        addTextField(GOOGLE_FORM_CONFIG.fields.description, form.description);

        // Campos de selección (solo enviar si tienen valor válido)
        addField(GOOGLE_FORM_CONFIG.fields.solutionType, form.solutionType);
        addField(GOOGLE_FORM_CONFIG.fields.hasDesign, form.hasDesign);
        addField(GOOGLE_FORM_CONFIG.fields.budget, form.budget);
        addField(GOOGLE_FORM_CONFIG.fields.deadline, form.deadline);
        addField(GOOGLE_FORM_CONFIG.fields.urgency, form.urgency);
        addField(GOOGLE_FORM_CONFIG.fields.howFoundUs, form.howFoundUs);

        // Prioridades (solo enviar si tienen valor)
        addField(GOOGLE_FORM_CONFIG.fields.priorityTime, form.priorityTime);
        addField(GOOGLE_FORM_CONFIG.fields.priorityCost, form.priorityCost);
        addField(GOOGLE_FORM_CONFIG.fields.priorityQuality, form.priorityQuality);
        addField(GOOGLE_FORM_CONFIG.fields.priorityUX, form.priorityUX);

        // Reuniones (solo enviar si tiene valor)
        addField(GOOGLE_FORM_CONFIG.fields.sprintMeetings, form.sprintMeetings);

        // Soporte (múltiple selección - solo enviar si hay seleccionados)
        if (form.supportType && form.supportType.length > 0) {
          form.supportType.forEach(support => {
            addField(GOOGLE_FORM_CONFIG.fields.supportType, support);
          });
        }

        document.body.appendChild(formElement);

        console.log('=== ENVIANDO A GOOGLE FORMS ===');
        console.log('Datos:', form);

        formElement.submit();

        setTimeout(() => {
          document.body.removeChild(formElement);
          document.body.removeChild(iframe);
          resolve({ success: true, message: 'Solicitud enviada correctamente' });
        }, 2000);

      } catch (error) {
        console.error('Error enviando formulario:', error);
        resolve({ success: false, message: 'Error al enviar. Intenta de nuevo.' });
      }
    });
  }
}
