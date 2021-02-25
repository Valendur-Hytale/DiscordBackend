 # Create image based on the official Node 6 image from the dockerhub
FROM node:12

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app2

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app2

# Copy dependency definitions
COPY package.json /usr/src/app2

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app2

# Expose the port the app runs in
EXPOSE 4000

# Needed to wait for mongoDB
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait


# Serve the app
CMD /wait && npm start
