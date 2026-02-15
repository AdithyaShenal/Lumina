FROM node:lts-alpine3.23

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev"]


# # Build stage
# FROM node:lts-alpine3.23 AS builder

# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm ci

# # Copy source code
# COPY . .

# # Build the app
# RUN npm run build

# # Production stage
# FROM node:lts-alpine3.23

# WORKDIR /app

# # Install serve to run the static files
# RUN npm install -g serve

# # Copy built files from builder
# COPY --from=builder /app/dist ./dist

# # Expose port
# EXPOSE 3000

# # Start the app
# CMD ["serve", "-s", "dist", "-l", "3000"]