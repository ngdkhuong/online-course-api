FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy .env file
ENV MONGO_URI=${MONGO_URI}

ENV REDIS_URL=${REDIS_URL}

ENV ACTIVATION_SECRET=${ACTIVATION_SECRET}

ENV ACCESS_TOKEN=${ACCESS_TOKEN}

ENV REFRESH_TOKEN=${REFRESH_TOKEN}

ENV ACCESS_TOKEN_EXPIRE=${ACCESS_TOKEN_EXPIRE}

ENV REFRESH_TOKEN_EXPIRE=${REFRESH_TOKEN_EXPIRE}

ENV SMTP_HOST=${SMTP_HOST}

ENV SMTP_PORT=${SMTP_PORT}

ENV SMTP_SERVICE=${SMTP_SERVICE}

ENV SMTP_MAIL=${SMTP_MAIL}

ENV SMTP_PASSWORD=${SMTP_PASSWORD}

ENV CLOUD_NAME=${CLOUD_NAME}

ENV CLOUD_SECRET_KEY=${CLOUD_SECRET_KEY} 

ENV CLOUD_API_KEY=${CLOUD_API_KEY}

# Build app
RUN npm run build

# Expose the port
EXPOSE 8000

# Start the application
CMD [ "node", "dist/app.js" ]