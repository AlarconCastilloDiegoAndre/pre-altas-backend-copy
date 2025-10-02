# Imagen base mínima de Node.js en Alpine Linux
FROM node:22-alpine AS base

ENV DIR=/app
WORKDIR $DIR

FROM base AS build

# Instala dumb-init para mejor manejo de señales de sistema
RUN apk update && apk add --no-cache dumb-init

# Copia archivos de dependencias
COPY package*.json $DIR/

# Instala dependencias solo en modo producción (más rápido y seguro)
RUN npm ci

# Copia archivos de configuración y el código fuente
COPY tsconfig*.json $DIR/
COPY src $DIR/src

# Compila el proyecto y elimina dependencias de desarrollo
RUN npm run build && \
    npm prune --production

FROM base AS dev

ENV NODE_ENV=development

# Copia archivos de dependencias y código fuente
COPY package*.json $DIR/
RUN npm install

COPY tsconfig*.json $DIR/
COPY src $DIR/src

EXPOSE 3000

CMD ["npm", "run", "start:dev", "--", "--poll"]

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

# Copia dumb-init, dependencias y código compilado desde build
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

EXPOSE 3000
USER $USER

CMD ["dumb-init", "node", "dist/main.js"]