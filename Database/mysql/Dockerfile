FROM mysql:5.6

COPY banco.sql /docker-entrypoint-initdb.d/
COPY seed.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
