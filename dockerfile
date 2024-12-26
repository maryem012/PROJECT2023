FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine
COPY --from=builder /app/dist/project2023 /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]