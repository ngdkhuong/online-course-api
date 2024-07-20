# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy the .env file
COPY .env .env

# Run the build command
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD [ "node", "dist/server.js" ]