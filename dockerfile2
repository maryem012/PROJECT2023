# Stage 1: Build the Angular application
FROM node:18 as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy application files
COPY . .

# Build the application
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built application to Nginx serve directory
COPY --from=builder /app/dist/project2023 /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
