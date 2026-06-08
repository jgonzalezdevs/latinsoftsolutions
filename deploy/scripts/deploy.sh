#!/bin/bash
# =============================================================================
# Script de deployment
# =============================================================================
# Uso: ./deploy.sh [build|up|down|restart|logs|status]
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$(dirname "$SCRIPT_DIR")"

cd "$DEPLOY_DIR"

# Activar BuildKit para usar los cache mounts del Dockerfile (npm + Angular)
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# =============================================================================
# Funciones
# =============================================================================

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_env() {
    if [ ! -f .env ]; then
        print_warning "Archivo .env no encontrado. Copiando desde .env.example..."
        cp .env.example .env
        print_warning "Por favor edita .env con tu configuracion antes de continuar"
        exit 1
    fi
}

build() {
    # Por defecto usa cache (rápido). Para build limpio: ./deploy.sh build --no-cache
    if [ "${2:-}" = "--no-cache" ] || [ "${2:-}" = "clean" ]; then
        print_warning "Construyendo SIN cache (lento)..."
        docker compose build --no-cache
    else
        print_status "Construyendo imagenes (con cache)..."
        docker compose build
    fi
    print_status "Build completado!"
}

up() {
    check_env
    print_status "Iniciando servicios..."
    docker compose up -d
    print_status "Servicios iniciados!"
    echo ""
    status
}

down() {
    print_status "Deteniendo servicios..."
    docker compose down
    print_status "Servicios detenidos!"
}

restart() {
    print_status "Reiniciando servicios..."
    docker compose restart
    print_status "Servicios reiniciados!"
}

logs() {
    SERVICE=${2:-""}
    if [ -z "$SERVICE" ]; then
        docker compose logs -f --tail=100
    else
        docker compose logs -f --tail=100 "$SERVICE"
    fi
}

status() {
    echo "=========================================="
    echo " Estado de los servicios"
    echo "=========================================="
    docker compose ps
    echo ""
    echo "=========================================="
    echo " Uso de recursos"
    echo "=========================================="
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
}

update() {
    print_status "Actualizando aplicacion..."

    # Pull latest changes (si es un repo git)
    if [ -d "../.git" ]; then
        print_status "Obteniendo ultimos cambios del repositorio..."
        cd ..
        git pull
        cd "$DEPLOY_DIR"
    fi

    # Rebuild and restart (con cache -> rápido gracias a los cache mounts)
    print_status "Reconstruyendo imagen..."
    docker compose build landing

    print_status "Reiniciando contenedor..."
    docker compose up -d landing

    print_status "Actualizacion completada!"
}

cleanup() {
    print_status "Limpiando imagenes y volumenes no usados..."
    docker system prune -f
    docker image prune -f
    print_status "Limpieza completada!"
}

help() {
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  build    - Construir imagenes Docker"
    echo "  up       - Iniciar todos los servicios"
    echo "  down     - Detener todos los servicios"
    echo "  restart  - Reiniciar todos los servicios"
    echo "  logs     - Ver logs (opcional: especificar servicio)"
    echo "  status   - Ver estado de los servicios"
    echo "  update   - Actualizar y redesplegar la aplicacion"
    echo "  cleanup  - Limpiar imagenes y volumenes no usados"
    echo "  help     - Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 up              # Iniciar servicios"
    echo "  $0 logs landing    # Ver logs del servicio landing"
    echo "  $0 update          # Actualizar aplicacion"
}

# =============================================================================
# Main
# =============================================================================

case "${1:-help}" in
    build)
        build
        ;;
    up)
        up
        ;;
    down)
        down
        ;;
    restart)
        restart
        ;;
    logs)
        logs "$@"
        ;;
    status)
        status
        ;;
    update)
        update
        ;;
    cleanup)
        cleanup
        ;;
    help|*)
        help
        ;;
esac
