# Build stage
FROM node:16 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli@16.1.0
RUN ng build --configuration production

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/tekup-students /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
