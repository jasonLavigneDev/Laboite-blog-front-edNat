FROM hub.eole.education/proxyhub/library/node:12-alpine
ENV PORT=4000
ENV NODE_ENV=production
run apk add git gcc
WORKDIR /app
COPY . .
RUN npm install --production
RUN npm rebuild node-sass
RUN npm install --save
RUN npm run build
run apk del git gcc
EXPOSE 4000
CMD ["npm", "start"]
