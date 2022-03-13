# Install Node Applications
FROM node:latest
RUN mkdir -p /home/network-attack-map/react_frontend
WORKDIR /home/network-attack-map/react_frontend
ADD . /home/network-attack-map/react_frontend
EXPOSE 3000

# Install Packages and Set Virtual Environment
RUN npm install