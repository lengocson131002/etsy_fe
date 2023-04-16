FROM node:18-alpine as development
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm ci
COPY . .
ENV CI=true
ENV PORT=3000
CMD [ "npm", "start" ]

FROM development as build

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

