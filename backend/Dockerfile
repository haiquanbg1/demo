FROM node:21.1.0

WORKDIR /app

COPY ["./package*.json","./"]

RUN npm ci

COPY . . 

CMD ["npm", "run", "dev"]

EXPOSE 8080