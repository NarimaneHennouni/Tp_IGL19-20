#Dockerfile for the database in order to get an image which will run 
#the container of mysql db

FROM mysql:5.7

#ENV MYSQL_DATABASE forumesi
#ENV MYSQL_ROOT_PASSWORD 123
#ENV MYSQL_USER nour
#ENV MYSQL_PASSWORD 123
#ENV DATABASE_HOST db

EXPOSE 3306

COPY ./sql-scripts/scripts.sql /docker-entrypoint-initdb.d/



