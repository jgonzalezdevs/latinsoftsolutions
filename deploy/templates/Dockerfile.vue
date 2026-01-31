# Template Dockerfile para aplicaciones Vue.js
# Copia este archivo a tu proyecto Vue y renombralo a "Dockerfile"

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config for SPA
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built application (Vue CLI y Vite usan "dist")
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
