FROM node:18-alpine

LABEL author="Ralph Metel"

# cd /var/www
WORKDIR /var/www


COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3000

ENTRYPOINT ["npm","start"]

# terminal
# docker run --name todo-frontend -dp 3000:3000 todo-frontend