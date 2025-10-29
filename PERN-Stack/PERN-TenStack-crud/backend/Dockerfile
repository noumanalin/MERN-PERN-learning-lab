# Use official Node.js image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Copy rest of the backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "dev"]
