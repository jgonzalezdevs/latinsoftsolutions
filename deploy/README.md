# Deployment en EC2 con Docker y Nginx Reverse Proxy

Esta configuracion permite desplegar multiples aplicaciones frontend en un mismo servidor EC2, usando Nginx como reverse proxy para direccionar el trafico basado en el dominio/DNS.

## Arquitectura

```
                    Internet
                        |
                   [EC2 - Puertos 80/443]
                        |
                  ┌─────┴─────┐
                  │nginx-proxy│ (reverse proxy)
                  └─────┬─────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
   ┌─────────┐    ┌─────────┐    ┌─────────┐
   │ App 1   │    │ App 2   │    │ App N   │
   │(landing)│    │(admin)  │    │ (...)   │
   └─────────┘    └─────────┘    └─────────┘

Routing:
- latinsoftsolutions.com → App 1
- admin.latinsoftsolutions.com → App 2
- portal.cliente.com → App N
```

## Prerequisitos

- Instancia EC2 (Amazon Linux 2023 o Ubuntu 22.04+)
- Security Group con puertos 22, 80, 443 abiertos
- Dominio(s) configurados apuntando a la IP de la EC2

## Configuracion Rapida

### 1. Configurar la EC2

```bash
# Conectarse a la EC2
ssh -i tu-key.pem ec2-user@tu-ip-ec2

# Descargar y ejecutar script de configuracion
curl -O https://raw.githubusercontent.com/tu-repo/deploy/scripts/setup-ec2.sh
chmod +x setup-ec2.sh
sudo ./setup-ec2.sh

# Cerrar sesion y reconectar para aplicar grupo docker
exit
ssh -i tu-key.pem ec2-user@tu-ip-ec2
```

### 2. Clonar el Proyecto

```bash
cd /opt/apps
git clone https://github.com/tu-usuario/angular-landing.git
cd angular-landing/deploy
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
nano .env
```

Configura tu email para Let's Encrypt:
```
LETSENCRYPT_EMAIL=tu-email@tudominio.com
```

### 4. Desplegar

```bash
chmod +x scripts/*.sh
./scripts/deploy.sh up
```

## Comandos Disponibles

```bash
# Iniciar servicios
./scripts/deploy.sh up

# Detener servicios
./scripts/deploy.sh down

# Ver logs
./scripts/deploy.sh logs
./scripts/deploy.sh logs landing  # logs de un servicio especifico

# Ver estado
./scripts/deploy.sh status

# Actualizar aplicacion
./scripts/deploy.sh update

# Reconstruir imagenes
./scripts/deploy.sh build

# Limpiar recursos no usados
./scripts/deploy.sh cleanup
```

## Agregar Nueva Aplicacion Frontend

### Opcion 1: Usando el script

```bash
./scripts/add-app.sh admin admin.tudominio.com /opt/apps/admin-panel
```

### Opcion 2: Manualmente

Edita `docker-compose.yml` y agrega un nuevo servicio:

```yaml
  mi-nueva-app:
    build:
      context: /ruta/a/mi/proyecto
      dockerfile: Dockerfile
    container_name: mi-nueva-app
    restart: always
    expose:
      - "80"
    environment:
      - VIRTUAL_HOST=miapp.tudominio.com
      - VIRTUAL_PORT=80
      - LETSENCRYPT_HOST=miapp.tudominio.com
    networks:
      - proxy-network
```

Luego ejecuta:
```bash
./scripts/deploy.sh up
```

## Configuracion DNS

Para cada aplicacion, configura un registro DNS tipo A:

| Tipo | Nombre | Valor |
|------|--------|-------|
| A | @ | IP-de-tu-EC2 |
| A | www | IP-de-tu-EC2 |
| A | admin | IP-de-tu-EC2 |
| A | portal | IP-de-tu-EC2 |

## SSL/HTTPS y Renovacion Automatica

Los certificados SSL se generan automaticamente usando Let's Encrypt cuando:

1. El dominio apunta correctamente a la IP del servidor
2. Los puertos 80 y 443 estan abiertos
3. El email esta configurado en `.env`

### Sistema de Renovacion Automatica (Doble Capa)

La configuracion incluye **dos capas** de renovacion automatica:

| Servicio | Frecuencia | Funcion |
|----------|------------|---------|
| `acme-companion` | Cada 1 hora | Renovacion principal (built-in) |
| `certbot-cron` | Cada 12 horas | Verificacion y alerta de respaldo |

**acme-companion** (principal):
- Verifica certificados cada hora
- Renueva automaticamente cuando quedan < 30 dias
- Recarga nginx automaticamente despues de renovar

**certbot-cron** (respaldo):
- Verifica estado de certificados cada 12 horas
- Si un certificado expira en < 7 dias, fuerza reinicio del acme-companion
- Genera logs para monitoreo

### Comandos para Certificados

```bash
# Ver estado de todos los certificados
./scripts/check-certs.sh

# Forzar renovacion manualmente
./scripts/force-renewal.sh

# Ver logs del servicio de renovacion
docker logs -f nginx-proxy-acme

# Ver logs del cron de verificacion
docker logs certbot-cron
```

## Desarrollo Local

Para probar localmente sin SSL:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Agrega a tu `/etc/hosts`:
```
127.0.0.1 landing.local
127.0.0.1 admin.local
```

## Estructura de Archivos

```
deploy/
├── docker-compose.yml        # Produccion con SSL
├── docker-compose.dev.yml    # Desarrollo local
├── .env.example              # Variables de entorno
├── nginx-proxy/
│   └── custom.conf           # Config personalizada de nginx
├── scripts/
│   ├── setup-ec2.sh          # Configuracion inicial EC2
│   ├── deploy.sh             # Script de deployment
│   └── add-app.sh            # Agregar nueva aplicacion
└── README.md                 # Esta documentacion
```

## Troubleshooting

### Los certificados SSL no se generan

1. Verifica que el DNS apunte correctamente:
   ```bash
   dig tudominio.com
   ```

2. Verifica los logs del companion:
   ```bash
   docker logs nginx-proxy-acme
   ```

### La aplicacion no responde

1. Verifica que el contenedor este corriendo:
   ```bash
   docker compose ps
   ```

2. Verifica los logs:
   ```bash
   docker logs latinsoftsolutions-landing
   ```

3. Verifica la red:
   ```bash
   docker network inspect proxy-network
   ```

### Error de permisos de Docker

```bash
sudo usermod -aG docker $USER
# Luego cerrar sesion y reconectar
```

## Recursos

- [nginx-proxy Documentation](https://github.com/nginx-proxy/nginx-proxy)
- [acme-companion Documentation](https://github.com/nginx-proxy/acme-companion)
- [Docker Compose Reference](https://docs.docker.com/compose/)
