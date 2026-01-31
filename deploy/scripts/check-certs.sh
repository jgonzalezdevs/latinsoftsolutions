#!/bin/bash
# =============================================================================
# Script para verificar estado de certificados SSL
# =============================================================================
# Uso: ./check-certs.sh
# =============================================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "=========================================="
echo " Verificacion de Certificados SSL"
echo "=========================================="
echo ""

# Verificar si el volumen de certificados existe
CERT_VOLUME=$(docker volume inspect nginx-proxy-certs 2>/dev/null | grep Mountpoint | awk -F'"' '{print $4}')

if [ -z "$CERT_VOLUME" ]; then
    echo -e "${RED}[ERROR]${NC} No se encontro el volumen de certificados"
    echo "Asegurate de que los contenedores esten corriendo: docker compose ps"
    exit 1
fi

echo -e "${BLUE}[INFO]${NC} Volumen de certificados: $CERT_VOLUME"
echo ""

# Listar certificados usando docker
echo "Certificados encontrados:"
echo "--------------------------"

docker run --rm -v nginx-proxy-certs:/certs:ro alpine sh -c '
    for cert in /certs/*.crt; do
        if [ -f "$cert" ]; then
            domain=$(basename "$cert" .crt)

            # Obtener fecha de expiracion
            expiry=$(openssl x509 -enddate -noout -in "$cert" 2>/dev/null | cut -d= -f2)

            if [ -n "$expiry" ]; then
                # Calcular dias restantes
                expiry_epoch=$(date -d "$expiry" +%s 2>/dev/null || echo 0)
                now_epoch=$(date +%s)
                days_left=$(( (expiry_epoch - now_epoch) / 86400 ))

                # Color segun dias restantes
                if [ $days_left -lt 7 ]; then
                    status="CRITICO"
                elif [ $days_left -lt 30 ]; then
                    status="ADVERTENCIA"
                else
                    status="OK"
                fi

                printf "%-40s %s dias (%s) [%s]\n" "$domain" "$days_left" "$expiry" "$status"
            fi
        fi
    done
' 2>/dev/null || echo "No se encontraron certificados o no se pudo acceder al volumen"

echo ""
echo "=========================================="
echo " Estado del servicio ACME"
echo "=========================================="

# Verificar estado del contenedor acme-companion
ACME_STATUS=$(docker inspect -f '{{.State.Status}}' nginx-proxy-acme 2>/dev/null || echo "not found")
ACME_UPTIME=$(docker inspect -f '{{.State.StartedAt}}' nginx-proxy-acme 2>/dev/null || echo "N/A")

echo "Contenedor: nginx-proxy-acme"
echo "Estado: $ACME_STATUS"
echo "Iniciado: $ACME_UPTIME"
echo ""

# Verificar estado del cron
CRON_STATUS=$(docker inspect -f '{{.State.Status}}' certbot-cron 2>/dev/null || echo "not found")
echo "Contenedor: certbot-cron"
echo "Estado: $CRON_STATUS"
echo ""

# Mostrar logs recientes del acme-companion
echo "=========================================="
echo " Logs recientes (acme-companion)"
echo "=========================================="
docker logs --tail 20 nginx-proxy-acme 2>/dev/null || echo "No se pudo obtener logs"

echo ""
echo "=========================================="
echo " Comandos utiles"
echo "=========================================="
echo "  Ver logs completos:     docker logs -f nginx-proxy-acme"
echo "  Forzar renovacion:      docker restart nginx-proxy-acme"
echo "  Ver logs del cron:      docker logs certbot-cron"
echo ""
