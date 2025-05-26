#!/bin/sh
set -e

# Debug environment variables
echo "API_BASE_URL: $API_BASE_URL"

# Ensure config directory exists
mkdir -p /usr/share/nginx/html

# Generate config.js from template with environment variables
envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js

# Verify config.js was created
if [ ! -f "/usr/share/nginx/html/config.js" ]; then
    echo "ERROR: Failed to generate config.js"
    exit 1
fi

# Check config.js content
echo "Generated config.js content:"
cat /usr/share/nginx/html/config.js

# SSL certificate handling
if [ ! -f "/etc/ssl/certs/crm.davalores.crt" ] || [ ! -f "/etc/ssl/private/crm.davalores.key" ]; then
    echo "WARNING: SSL certificates not found, generating self-signed certificates for development"
    mkdir -p /etc/ssl/certs /etc/ssl/private
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/crm.davalores.key \
        -out /etc/ssl/certs/crm.davalores.crt \
        -subj "/C=AR/ST=CABA/L=CABA/O=Development/CN=localhost"
fi

# Start Nginx
exec nginx -g 'daemon off;'