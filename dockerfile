FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Use the correct directory name
COPY --from=builder /app/dist/tek-up-students /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
