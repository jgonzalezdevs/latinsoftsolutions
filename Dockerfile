# syntax=docker/dockerfile:1.7
# =============================================================================
# Build optimizado con BuildKit cache mounts (npm + Angular)
# Requiere DOCKER_BUILDKIT=1 (lo activa deploy.sh automáticamente)
# =============================================================================

# Stage 1: Build Angular application
FROM node:20-alpine AS builder

WORKDIR /app

# 1) Solo los manifests primero -> esta capa se cachea mientras package*.json no cambie
COPY package*.json ./

# 2) Instalar deps con cache persistente de npm.
#    Aunque cambie package-lock, reusa los tarballs descargados -> mucho más rápido.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps

# 3) Copiar el código y compilar, cacheando el compilador incremental de Angular.
COPY . .
RUN --mount=type=cache,target=/app/.angular/cache \
    npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Config de nginx para SPA (incluye /health)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Artefacto compilado desde el stage builder
COPY --from=builder /app/dist/latinsoftsolutions-pro/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
