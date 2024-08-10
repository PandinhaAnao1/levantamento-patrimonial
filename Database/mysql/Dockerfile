FROM mysql:latest

COPY banco.sql /docker-entrypoint-initdb.d/
COPY seed.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
