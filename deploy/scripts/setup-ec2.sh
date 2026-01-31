#!/bin/bash
# =============================================================================
# Script de configuracion inicial para EC2 (Amazon Linux 2023 / Ubuntu)
# =============================================================================
# Uso: sudo ./setup-ec2.sh
# =============================================================================

set -e

echo "=========================================="
echo " Configuracion de EC2 para Docker + Nginx"
echo "=========================================="

# Detectar el sistema operativo
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo "No se pudo detectar el sistema operativo"
    exit 1
fi

echo "[INFO] Sistema operativo detectado: $OS"

# =============================================================================
# Instalar Docker
# =============================================================================
install_docker_amazon_linux() {
    echo "[INFO] Instalando Docker en Amazon Linux..."
    sudo yum update -y
    sudo yum install -y docker
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
}

install_docker_ubuntu() {
    echo "[INFO] Instalando Docker en Ubuntu..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg

    # Add Docker's official GPG key
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    # Add the repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
}

# =============================================================================
# Instalar Docker Compose
# =============================================================================
install_docker_compose() {
    echo "[INFO] Instalando Docker Compose..."

    # Check if docker compose plugin is available
    if docker compose version &> /dev/null; then
        echo "[INFO] Docker Compose plugin ya esta instalado"
        return
    fi

    # Install standalone docker-compose
    COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    sudo curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    echo "[INFO] Docker Compose instalado: $(docker-compose --version)"
}

# =============================================================================
# Configurar Firewall
# =============================================================================
configure_firewall() {
    echo "[INFO] Configurando firewall..."

    if command -v ufw &> /dev/null; then
        # Ubuntu UFW
        sudo ufw allow 22/tcp
        sudo ufw allow 80/tcp
        sudo ufw allow 443/tcp
        sudo ufw --force enable
    elif command -v firewall-cmd &> /dev/null; then
        # Amazon Linux / CentOS firewalld
        sudo systemctl start firewalld
        sudo systemctl enable firewalld
        sudo firewall-cmd --permanent --add-service=ssh
        sudo firewall-cmd --permanent --add-service=http
        sudo firewall-cmd --permanent --add-service=https
        sudo firewall-cmd --reload
    fi

    echo "[INFO] Firewall configurado para puertos 22, 80, 443"
}

# =============================================================================
# Crear estructura de directorios
# =============================================================================
create_directories() {
    echo "[INFO] Creando estructura de directorios..."

    sudo mkdir -p /opt/apps
    sudo chown -R $USER:$USER /opt/apps

    echo "[INFO] Directorio /opt/apps creado"
}

# =============================================================================
# Instalar utilidades adicionales
# =============================================================================
install_utilities() {
    echo "[INFO] Instalando utilidades adicionales..."

    if [ "$OS" == "amzn" ]; then
        sudo yum install -y git htop vim wget
    elif [ "$OS" == "ubuntu" ]; then
        sudo apt-get install -y git htop vim wget
    fi
}

# =============================================================================
# Main
# =============================================================================
main() {
    # Instalar Docker segun el OS
    if [ "$OS" == "amzn" ]; then
        install_docker_amazon_linux
    elif [ "$OS" == "ubuntu" ]; then
        install_docker_ubuntu
    else
        echo "[ERROR] Sistema operativo no soportado: $OS"
        exit 1
    fi

    install_docker_compose
    configure_firewall
    create_directories
    install_utilities

    echo ""
    echo "=========================================="
    echo " Configuracion completada!"
    echo "=========================================="
    echo ""
    echo "IMPORTANTE: Cierra sesion y vuelve a entrar para"
    echo "que los cambios de grupo de Docker surtan efecto."
    echo ""
    echo "Luego puedes verificar con:"
    echo "  docker --version"
    echo "  docker compose version"
    echo ""
    echo "Para desplegar tu aplicacion:"
    echo "  1. cd /opt/apps"
    echo "  2. git clone <tu-repositorio>"
    echo "  3. cd <tu-proyecto>/deploy"
    echo "  4. cp .env.example .env"
    echo "  5. nano .env  (configura tu email)"
    echo "  6. docker compose up -d"
    echo ""
}

main "$@"
