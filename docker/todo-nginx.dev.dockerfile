FROM nginx

WORKDIR /

EXPOSE 80

EXPOSE 443

RUN rm /usr/share/nginx/html/*

COPY ./nginx/nginx.dev.conf /etc/nginx/nginx.conf

COPY cert.* /etc/nginx/certs/

CMD ["nginx", "-g", "daemon off;"]

# terminal
# docker build -t todo-nginx-dev -f docker/todo-nginx.dev.dockerfile .
# docker run --name todo-nginx-dev -dp 80:80 -p 443:443 todo-nginx-dev

# docker hub
# docker build -t ddrram/todo-nginx-dev:1.1.0 -f docker/todo-nginx.dev.dockerfile .
# docker push ddrram/todo-nginx-dev:1.1.0
# docker run --name todo-nginx-dev -dp 8080:8080 ddrram/todo-nginx-dev:1.1.0
