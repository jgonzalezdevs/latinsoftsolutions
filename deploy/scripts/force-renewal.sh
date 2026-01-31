#!/bin/bash
# =============================================================================
# Script para forzar renovacion de certificados SSL
# =============================================================================
# Uso: ./force-renewal.sh [dominio]
# =============================================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DOMAIN=${1:-""}

echo "=========================================="
echo " Forzar Renovacion de Certificados SSL"
echo "=========================================="
echo ""

if [ -n "$DOMAIN" ]; then
    echo -e "${YELLOW}[INFO]${NC} Forzando renovacion para: $DOMAIN"
else
    echo -e "${YELLOW}[INFO]${NC} Forzando renovacion de TODOS los certificados"
fi

echo ""

# Reiniciar el contenedor acme-companion para forzar verificacion
echo -e "${GREEN}[1/3]${NC} Reiniciando nginx-proxy-acme..."
docker restart nginx-proxy-acme

echo -e "${GREEN}[2/3]${NC} Esperando 10 segundos para que inicie..."
sleep 10

echo -e "${GREEN}[3/3]${NC} Verificando estado..."
docker logs --tail 30 nginx-proxy-acme

echo ""
echo "=========================================="
echo -e "${GREEN}Proceso completado${NC}"
echo "=========================================="
echo ""
echo "El acme-companion verificara automaticamente todos los certificados."
echo "Si un certificado necesita renovacion, se renovara automaticamente."
echo ""
echo "Para verificar el estado: ./check-certs.sh"
echo "Para ver logs en tiempo real: docker logs -f nginx-proxy-acme"
echo ""
