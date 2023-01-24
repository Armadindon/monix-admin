# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine

# Permit to link the repo to the repository
LABEL org.opencontainers.image.source https://github.com/ClubNix/monix-2.0

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/start.sh /app/
EXPOSE 80
CMD ["sh", "-c", "/app/start.sh"]
