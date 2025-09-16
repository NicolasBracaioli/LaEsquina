# Imagen base
FROM node:18-alpine

# Instalar supervisor para correr varios procesos
RUN apk add --no-cache supervisor

# Crear directorio de trabajo
WORKDIR /app

# Copiar frontend (que está en la raíz)
COPY package*.json ./
COPY vite.config* ./
COPY tsconfig*.json ./
COPY public ./public
COPY src ./src

# Instalar dependencias del frontend
RUN npm install

# Copiar backend (carpeta back/)
COPY back ./back

# Instalar dependencias del backend
WORKDIR /app/back
RUN npm install

# Volver a raíz
WORKDIR /app

# Crear directorio para supervisor
RUN mkdir -p /etc/supervisor/conf.d

# Copiar configuración de supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Exponer puertos (frontend: 5173, backend: 3000)
EXPOSE 5173 3000

# Levantar supervisor (que corre frontend y backend juntos)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
