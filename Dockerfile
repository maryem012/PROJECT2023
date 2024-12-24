# Build stage
FROM node:16 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps  # Changed this line
COPY . .
RUN npm run build -- --configuration production

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/tek-up-students /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
