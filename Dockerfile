FROM node:17-alpine

COPY publisher.js /publisher.js

CMD ["node", "./publisher.js"]
