FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build the application
COPY . .
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the custom server that handles /health
CMD ["node", "server.js"]