FROM nginx

WORKDIR /

EXPOSE 80

EXPOSE 443

RUN rm /usr/share/nginx/html/*

COPY ./nginx/nginx.prod.conf /etc/nginx/nginx.conf

COPY ./todo-app /var/www/todo-app

COPY ./wine-app /var/www/wine-app

RUN apt-get update

RUN apt-get install nano -y

CMD ["nginx", "-g", "daemon off;"]

# terminal
# docker build -t todo-nginx-prod -f docker/todo-nginx.prod.dockerfile .
# docker run --name todo-nginx-prod -dp 80:80 -p 443:443 todo-nginx-prod

# docker hub
# docker build -t ddrram/todo-nginx-prod:1.4.0 -f docker/todo-app/todo-nginx.prod.dockerfile .
# docker push ddrram/todo-nginx-prod:1.4.0
