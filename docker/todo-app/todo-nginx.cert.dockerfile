FROM nginx

WORKDIR /

EXPOSE 80

EXPOSE 443

RUN rm /usr/share/nginx/html/*

COPY ./nginx/nginx.cert.conf /etc/nginx/nginx.conf

COPY ./public /var/www/public

CMD ["nginx", "-g", "daemon off;"]

# terminal
# docker build -t todo-nginx-cert -f docker/todo-nginx.cert.dockerfile .
# docker run --name todo-nginx-cert -dp 80:80 -p 443:443 todo-nginx-cert

# docker hub
# docker build -t ddrram/todo-nginx-cert:2.1.0 -f docker/todo-nginx.cert.dockerfile .
# docker push ddrram/todo-nginx-cert:2.1.0
# docker run --name todo-nginx-cert -dp 8080:8080 ddrram/todo-nginx-cert:2.1.0
