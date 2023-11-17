FROM nginx

EXPOSE 81

RUN rm /usr/share/nginx/html/*

COPY docker/nginx.conf /etc/nginx/nginx.conf

#COPY cert.* /etc/nginx/certs

CMD ["nginx", "-g", "daemon off;"]

# terminal
# docker build -t todo-nginx -f docker/todo-nginx.dockerfile .
# docker run --name todo-nginx -dp 80:80 todo-nginx

# docker hub
# docker build -t ddrram/todo-nginx:1.1.0 -f docker/todo-nginx.dockerfile .
# docker push ddrram/todo-nginx:1.1.0
# docker run --name todo-nginx -dp 8080:8080 ddrram/todo-nginx:1.1.0
