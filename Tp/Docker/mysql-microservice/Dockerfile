FROM mysql:5.7

#ENV MYSQL_DATABASE tp_igl
#ENV MYSQL_ROOT_PASSWORD password
#ENV MYSQL_USER narimane
#ENV MYSQL_PASSWORD password
#ENV DATABASE_HOST db

EXPOSE 3306
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
 