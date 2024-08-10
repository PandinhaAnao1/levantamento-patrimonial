FROM node
WORKDIR /app
COPY .  /app
RUN npm install
RUN npm run prisma
ENV DATABASE_URL="mysql://data-base-container:3306"
ENTRYPOINT npm run dev