#!/bin/bash
# =============================================================================
# Script para agregar una nueva aplicacion frontend
# =============================================================================
# Uso: ./add-app.sh <nombre-app> <dominio> [ruta-proyecto]
# Ejemplo: ./add-app.sh admin admin.latinsoftsolutions.com /opt/apps/admin-panel
# =============================================================================

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# =============================================================================
# Validar argumentos
# =============================================================================
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Uso: $0 <nombre-app> <dominio> [ruta-proyecto]"
    echo ""
    echo "Argumentos:"
    echo "  nombre-app    - Nombre unico para el servicio (ej: admin, portal)"
    echo "  dominio       - Dominio para la aplicacion (ej: admin.ejemplo.com)"
    echo "  ruta-proyecto - Ruta al proyecto (opcional, para build local)"
    echo ""
    echo "Ejemplos:"
    echo "  $0 admin admin.midominio.com /opt/apps/admin-panel"
    echo "  $0 portal portal.midominio.com"
    echo ""
    exit 1
fi

APP_NAME=$1
DOMAIN=$2
PROJECT_PATH=${3:-""}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(dirname "$SCRIPT_DIR")"
COMPOSE_FILE="$DEPLOY_DIR/docker-compose.yml"

# =============================================================================
# Verificar que el nombre no exista
# =============================================================================
if grep -q "^  ${APP_NAME}:" "$COMPOSE_FILE" 2>/dev/null; then
    print_error "Ya existe un servicio con el nombre '$APP_NAME' en docker-compose.yml"
    exit 1
fi

# =============================================================================
# Generar configuracion del servicio
# =============================================================================
print_status "Generando configuracion para '$APP_NAME'..."

if [ -n "$PROJECT_PATH" ]; then
    # Con build local
    SERVICE_CONFIG="
  # ============================================
  # APLICACION: ${APP_NAME^^}
  # ============================================
  ${APP_NAME}:
    build:
      context: ${PROJECT_PATH}
      dockerfile: Dockerfile
    container_name: ${APP_NAME}
    restart: always
    expose:
      - \"80\"
    environment:
      - VIRTUAL_HOST=${DOMAIN}
      - VIRTUAL_PORT=80
      - LETSENCRYPT_HOST=${DOMAIN}
    networks:
      - proxy-network
    healthcheck:
      test: [\"CMD\", \"wget\", \"--quiet\", \"--tries=1\", \"--spider\", \"http://localhost/health\"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
"
else
    # Sin build (imagen externa)
    SERVICE_CONFIG="
  # ============================================
  # APLICACION: ${APP_NAME^^}
  # ============================================
  ${APP_NAME}:
    image: ${APP_NAME}:latest
    container_name: ${APP_NAME}
    restart: always
    expose:
      - \"80\"
    environment:
      - VIRTUAL_HOST=${DOMAIN}
      - VIRTUAL_PORT=80
      - LETSENCRYPT_HOST=${DOMAIN}
    networks:
      - proxy-network
"
fi

# =============================================================================
# Agregar al docker-compose.yml
# =============================================================================
print_status "Agregando servicio a docker-compose.yml..."

# Insertar antes de la seccion de volumes
sed -i "/^# ============================================$/,/^# VOLUMENES PERSISTENTES$/{ /^# VOLUMENES PERSISTENTES$/i\\
${SERVICE_CONFIG}
}" "$COMPOSE_FILE"

print_status "Servicio '$APP_NAME' agregado exitosamente!"
echo ""
echo "=========================================="
echo " Configuracion agregada"
echo "=========================================="
echo "  Nombre:  $APP_NAME"
echo "  Dominio: $DOMAIN"
if [ -n "$PROJECT_PATH" ]; then
echo "  Build:   $PROJECT_PATH"
fi
echo ""
echo "Proximos pasos:"
echo "  1. Verifica la configuracion en docker-compose.yml"
echo "  2. Asegurate de que el DNS apunte a este servidor"
echo "  3. Ejecuta: ./deploy.sh up"
echo ""
