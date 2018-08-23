FROM node:10.2.1-alpine

WORKDIR /service
ENV NODE_ENV production
ADD . /service
RUN npm install --production

ENTRYPOINT ["/service/entrypoint.sh"]

CMD ["node", "--harmony", "./index.js"]
