<p align="center">
  <img src="src/assets/icons/logo.svg" alt="LatinSoftSolutions Logo" width="120" height="120">
</p>

<h1 align="center">LatinSoftSolutions</h1>

<p align="center">
  <strong>Transformamos Ideas en Software</strong>
</p>

<p align="center">
  <a href="#-demo">Demo</a> •
  <a href="#-características">Características</a> •
  <a href="#-tecnologías">Tecnologías</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-equipo">Equipo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-18.2.0-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square" alt="Made with Love">
</p>

---

## 🌐 Demo

<p align="center">
  <a href="https://latinsoftsolutions.com" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Ver_Demo_en_Vivo-latinsoftsolutions.com-black?style=for-the-badge" alt="Live Demo">
  </a>
</p>

---

## ✨ Características

<table>
  <tr>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg" width="48" height="48" alt="Angular">
      <br><strong>Angular 18</strong>
      <br><sub>Standalone Components</sub>
    </td>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind">
      <br><strong>Tailwind CSS</strong>
      <br><sub>Utility-First CSS</sub>
    </td>
    <td align="center" width="25%">
      <img src="https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" width="48" height="48" alt="GSAP">
      <br><strong>GSAP</strong>
      <br><sub>Animaciones Premium</sub>
    </td>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="48" height="48" alt="Docker">
      <br><strong>Docker Ready</strong>
      <br><sub>Multi-stage Build</sub>
    </td>
  </tr>
</table>

### 🎯 Funcionalidades

| Feature | Descripción |
|---------|-------------|
| 🌍 **Multi-idioma** | Soporte para Español e Inglés con ngx-translate |
| 🌙 **Modo Oscuro** | Tema claro/oscuro con detección automática del sistema |
| 📱 **Responsive** | Diseño adaptable a todos los dispositivos |
| ⚡ **Performance** | Optimizado para Core Web Vitals |
| 🔒 **SSL Automático** | Certificados Let's Encrypt con renovación automática |
| 🎨 **Animaciones** | Efectos suaves con GSAP ScrollTrigger |
| 📊 **SEO Optimizado** | Meta tags, JSON-LD, sitemap y robots.txt |
| 🖼️ **PWA Ready** | Manifest y configuración para PWA |

---

## 🛠️ Tecnologías

<details>
<summary><strong>Frontend</strong></summary>

- **Framework:** Angular 18.2.0 (Standalone Components)
- **Estilos:** Tailwind CSS 3.4
- **Animaciones:** GSAP 3.12 + ScrollTrigger
- **Carrusel:** Swiper 11
- **i18n:** @ngx-translate
- **Tipado:** TypeScript 5.4

</details>

<details>
<summary><strong>DevOps & Deployment</strong></summary>

- **Contenedores:** Docker + Docker Compose
- **Reverse Proxy:** Nginx Proxy
- **SSL:** Let's Encrypt (acme-companion)
- **Cloud:** AWS EC2
- **CI/CD:** Ready for GitHub Actions

</details>

---

## 📦 Instalación

### Prerequisitos

- Node.js 20+
- npm 10+
- Angular CLI 18+

### Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/jgonzalezdevs/latinsoftsolutions.git
cd latinsoftsolutions

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run watch` | Build en modo watch |

---

## 🚀 Deployment

### Con Docker (Recomendado)

```bash
# Ir al directorio de deployment
cd deploy

# Configurar variables de entorno
cp .env.example .env
nano .env  # Editar con tu email para SSL

# Iniciar servicios
./scripts/deploy.sh up
```

### Arquitectura de Producción

```
┌─────────────────────────────────────────────────┐
│                   Internet                       │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│              EC2 Instance                        │
│  ┌───────────────────────────────────────────┐  │
│  │           nginx-proxy (:80/:443)          │  │
│  │         + SSL (Let's Encrypt)             │  │
│  └─────────────────┬─────────────────────────┘  │
│                    │                             │
│         ┌─────────┴─────────┐                   │
│         ▼                   ▼                   │
│  ┌─────────────┐    ┌─────────────┐            │
│  │   Landing   │    │  App N...   │            │
│  │ (Angular)   │    │             │            │
│  └─────────────┘    └─────────────┘            │
└─────────────────────────────────────────────────┘
```

### Scripts de Deployment

```bash
./scripts/deploy.sh up        # Iniciar servicios
./scripts/deploy.sh down      # Detener servicios
./scripts/deploy.sh logs      # Ver logs
./scripts/deploy.sh status    # Ver estado
./scripts/deploy.sh update    # Actualizar aplicación
./scripts/check-certs.sh      # Verificar certificados SSL
./scripts/force-renewal.sh    # Forzar renovación SSL
```

---

## 📁 Estructura del Proyecto

```
latinsoftsolutions/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 components/      # Componentes standalone
│   │   │   ├── header/
│   │   │   ├── hero/
│   │   │   ├── services/
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── team/
│   │   │   ├── testimonials/
│   │   │   ├── contact/
│   │   │   └── footer/
│   │   └── 📂 services/        # Servicios Angular
│   ├── 📂 assets/
│   │   ├── 📂 i18n/            # Traducciones (es.json, en.json)
│   │   ├── 📂 images/
│   │   └── 📂 icons/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── 📂 deploy/
│   ├── docker-compose.yml      # Producción con SSL
│   ├── docker-compose.dev.yml  # Desarrollo local
│   ├── 📂 scripts/             # Scripts de deployment
│   ├── 📂 nginx-proxy/         # Configuración Nginx
│   └── 📂 templates/           # Templates Docker
├── 📂 nginx/
│   └── default.conf            # Config Nginx para SPA
├── Dockerfile
├── .dockerignore
├── angular.json
├── tailwind.config.js
└── package.json
```

---

## 👥 Equipo

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/jgonzalezdevs.png" width="100px;" alt="Juan González" style="border-radius: 50%;"/>
      <br />
      <strong>Juan González</strong>
      <br />
      <sub>CEO & Founder</sub>
      <br />
      <a href="https://github.com/jgonzalezdevs">
        <img src="https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🤝 Contacto

<p align="center">
  <a href="mailto:contact@latinsoftsolutions.com">
    <img src="https://img.shields.io/badge/Email-contact%40latinsoftsolutions.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</p>

<p align="center">
  <a href="https://latinsoftsolutions.com">
    <img src="https://img.shields.io/badge/Website-latinsoftsolutions.com-000000?style=for-the-badge&logo=safari&logoColor=white" alt="Website">
  </a>
</p>

---

<p align="center">
  <sub>Hecho con ❤️ por el equipo de <strong>LatinSoftSolutions</strong></sub>
</p>

<p align="center">
  <sub>© 2024 LatinSoftSolutions. Todos los derechos reservados.</sub>
</p>
