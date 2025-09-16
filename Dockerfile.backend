# Imagen base
FROM node:18-alpine

# Instalar supervisor para manejar múltiples procesos
RUN apk add --no-cache supervisor

# Crear directorio de trabajo
WORKDIR /app

# Copiar frontend y backend
COPY frontend/ ./frontend/
COPY backend/ ./backend/

# Instalar dependencias frontend
WORKDIR /app/frontend
RUN npm install

# Instalar dependencias backend
WORKDIR /app/backend
RUN npm install

# Volver a raíz
WORKDIR /app

# Crear directorio para supervisord
RUN mkdir -p /etc/supervisor/conf.d

# Archivo de configuración de supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Exponer puertos (frontend 5173 y backend 3000)
EXPOSE 5173 3000

# Iniciar supervisord (que lanza frontend y backend)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
