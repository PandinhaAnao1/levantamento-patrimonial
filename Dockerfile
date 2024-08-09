FROM node
WORKDIR /app
COPY ./  ./app
RUN  npm install
ENTRYPOINT npm nodemon server.js

