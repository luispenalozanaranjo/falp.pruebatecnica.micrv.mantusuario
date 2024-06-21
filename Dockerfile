# Stage 1: Build stage
FROM alpine:3.19.1 AS build

# Install dependencies
RUN apk add --update nodejs npm

# Set working directory
WORKDIR /application

# Copy package.json and .npmrc
COPY package.json .
COPY .npmrc .

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Final stage
FROM alpine:3.19.1

# Set working directory
WORKDIR /application

# Copy build artifacts from the build stage
COPY --from=build /application/build /application/build

# Copy package.json and .npmrc
COPY package.json /application/build
COPY package-lock.json /application/build
COPY .npmrc /application/build

# Install Node.js and npm in the final stage
RUN apk add --update nodejs npm git vim

# Copy .env if needed
#COPY .env /application/build

# Set working directory
WORKDIR /application/build

# Install production dependencies
RUN npm ci --omit="dev"

# Expose port
EXPOSE 8237

CMD [ "node", "index.js" ]