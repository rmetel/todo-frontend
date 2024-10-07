FROM node:21-alpine3.17

WORKDIR /var/www

COPY .. ./

RUN npm install

RUN npm install -g serve

RUN npm run build

RUN apk add nano

RUN apk add curl

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build"]

# terminal
# docker build -t todo-frontend -f docker/todo-app/todo-frontend.dockerfile .
# docker run --name todo-frontend -dp 3000:3000 todo-frontend

# docker hub
# docker build -t ddrram/todo-frontend:1.1.0 -f docker/todo-app/todo-frontend.dockerfile .
# docker push ddrram/todo-frontend:1.1.0
# docker run --name todo-frontend -dp 3000:3000 ddrram/todo-frontend:1.1.0

# keycloak
# docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.1 start-dev
