FROM node:16-alpine3.11
WORKDIR /usr/src/app
COPY . .

RUN yarn
RUN yarn build
ENV NODE_ENV production
RUN yarn install --production

CMD ["node", "/usr/src/app/dist/index.js"]