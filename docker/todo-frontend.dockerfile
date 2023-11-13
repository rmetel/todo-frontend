FROM node:18-alpine

LABEL author="Ralph Metel"

# cd /var/www
WORKDIR /var/www

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . ./

EXPOSE 3000

ENTRYPOINT ["npm","start"]

# terminal
# docker build -t todo-frontend -f docker/todo-frontend.dockerfile .
# docker run --name todo-frontend -dp 3000:3000 todo-frontend

# docker hub
# docker build -t ddrram/todo-frontend:1.1.0 -f todo-frontend.dockerfile .
# docker push ddrram/todo-frontend:1.1.0
# docker run --name todo-frontend -dp 3000:3000 ddrram/todo-frontend:1.1.0
