FROM node:10-alpine

WORKDIR /usr/src/schedule-bot
COPY . /usr/src/schedule-bot
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
