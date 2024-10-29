# pos-fe

## REACT version: 18.2.0

##### create docker images

set .env pos-fe:

- REACT_APP_USE_PROD_DOCKER_BACKEND=true

set .env pos-api:

- ##LIVE DOCKER ENABLE
- change env to live

docker-compose build react-app spring-app --no-cache --parallel

push react and spring apps

##### run on new pc

copy pos folders

- pos-fe (this folder is empty)
- pos-api (this folder is empty)
- pos-init-db
- docker-compose.yaml

comment out build lines
run docker-compose up

## NODE version: 17.4.0

#### NVM

##### if using nvm, check installed node version:

nvm list

##### install:

nvm install 18.x.x

##### switch with:

nvm use 18.x.x

### SWAGGER:
/swagger-ui/
