#!/bin/sh
set -e

# Mostrar variables de entorno para depuración
echo "API_BASE_URL: $API_BASE_URL"

# Asegurar que el directorio de configuración existe
mkdir -p /usr/share/nginx/html

# Reemplazar los placeholders en el archivo de configuración de React y generar config.js
envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js

# Verificar que los archivos de certificados SSL existen
if [ ! -f "/etc/ssl/certs/crm.davalores.crt" ] || [ ! -f "/etc/ssl/private/crm.davalores.key" ]; then
    echo "WARNING: SSL certificates not found, generating self-signed certificates for development"
    mkdir -p /etc/ssl/certs /etc/ssl/private
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/crm.davalores.key \
        -out /etc/ssl/certs/crm.davalores.crt \
        -subj "/C=AR/ST=CABA/L=CABA/O=Development/CN=localhost"
fi

# Iniciar Nginx en primer plano
exec nginx -g 'daemon off;'