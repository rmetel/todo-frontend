#!/bin/sh

TODO_FRONTEND_VERSION=$(grep -oPm1 "(?<=<version>)[^<]+" ~/logs/build/todo-frontend.log)
TODO_FRONTEND_BRANCH=$(grep -oPm1 "(?<=<branch>)[^<]+" ~/logs/build/todo-frontend.log)

TODO_BACKEND_VERSION=$(grep -oPm1 "(?<=<version>)[^<]+" ~/logs/build/todo-backend.log)
TODO_BACKEND_BRANCH=$(grep -oPm1 "(?<=<branch>)[^<]+" ~/logs/build/todo-backend.log)

export TODO_FRONTEND_VERSION
export TODO_FRONTEND_BRANCH

export TODO_BACKEND_VERSION
export TODO_BACKEND_BRANCH

cd ~/git/todo-frontend || exit

# todo: switch branch
#git switch "$TODO_FRONTEND_BRANCH"

git pull

docker-compose -f docker/docker-compose-prod.yaml up -d

# retrieve version
# docker inspect todo-frontend | grep -o 'todo-frontend:.*' | cut -f2 -d: | cut -f1 -d '"'