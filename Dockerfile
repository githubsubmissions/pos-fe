FROM node:18.4.0-alpine as build

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build

FROM nginx:1.19.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]