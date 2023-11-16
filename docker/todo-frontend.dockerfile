FROM node:21-alpine3.17

WORKDIR /var/www

COPY package.json tsconfig.json ./

COPY public ./public

COPY src ./src

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build"]

# terminal
# docker build -t todo-frontend -f docker/todo-frontend.dockerfile .
# docker run --name todo-frontend -dp 3000:3000 todo-frontend

# docker hub
# docker build -t ddrram/todo-frontend:1.1.0 -f todo-frontend.dockerfile .
# docker push ddrram/todo-frontend:1.1.0
# docker run --name todo-frontend -dp 3000:3000 ddrram/todo-frontend:1.1.0
