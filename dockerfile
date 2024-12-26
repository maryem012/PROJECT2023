FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine
# Try different possible paths
COPY --from=builder /app/dist /usr/share/nginx/html/
# OR
COPY --from=builder /app/dist/browser /usr/share/nginx/html/
# OR
COPY --from=builder /app/dist/PROJECT2023-main /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]