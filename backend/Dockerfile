FROM node:21.1.0
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g nodemon
CMD ["nodemon", "src/server.js"]
EXPOSE 8080