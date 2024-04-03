FROM node:21.1.0

WORKDIR /app

COPY ["./backend/package*.json","./"]

RUN npm ci

COPY /backend . 

CMD ["npm", "run", "dev"]

EXPOSE 8080