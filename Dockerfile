FROM node:latest
WORKDIR /src
COPY . .
RUN npm install
CMD npm start
EXPOSE 8080