# Multi-stage build for optimized image
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package files (if any)
COPY package*.json ./

# Install dependencies (if needed for build process)
RUN npm install --only=production --silent || echo "No dependencies to install"

# Copy source files
COPY src/ ./src/
COPY README.md . || echo "No README.md file to copy"

# Final stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/src/ /usr/share/nginx/html/

# Copy custom nginx configuration (optional, for better performance)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf || echo "server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]