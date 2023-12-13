# Use the Node.js image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install @emotion/styled

# Copy the entire project to the working directory
COPY . .

# Expose the port your application uses (if different from 5173)
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
