FROM node:21.1.0

WORKDIR /app

COPY ["./frontend/package*.json","./"]

RUN npm ci

COPY /frontend . 

CMD ["npm", "start"]

EXPOSE 3000