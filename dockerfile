# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

# Serve with Nginx
FROM nginx:alpine
# Copy the default nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular application
COPY --from=builder /app/dist/PROJECT2023-main /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]