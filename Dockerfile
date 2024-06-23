# Stage 1: Build stage
FROM alpine:3.19.1 AS build

# Install dependencies
RUN apk add --update nodejs npm

# Set working directory
WORKDIR /application

# Copy package.json and .npmrc
COPY package.json .

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

# Copy dist artifacts from the dist stage
COPY --from=build /application/build /application/build

# Copy package.json
COPY package.json /application/build

# Install Node.js and npm in the final stage
RUN apk add --update nodejs npm git vim

# Copy .env if needed
COPY .env /application/build

# Set working directory
WORKDIR /application/build

# Install production dependencies
#RUN npm ci --omit="dev"
RUN npm install

# Expose port
EXPOSE 9689

CMD [ "node", "index.js" ]