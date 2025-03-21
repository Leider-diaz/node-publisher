FROM node:17-alpine

COPY consumer.js /consumer.js

CMD ["node", "./consumer.js"]