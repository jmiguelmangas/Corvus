FROM node:18-alpine

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json* ./
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Iniciar la aplicación en modo desarrollo
CMD ["npm", "start"]
