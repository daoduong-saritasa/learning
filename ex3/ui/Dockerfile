# Build app
FROM node:16-alpine AS build
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent
COPY . .
RUN npm run build

# Serve app
FROM jawg/nginx-spa
COPY --from=build /app/dist/web /usr/share/nginx/html
