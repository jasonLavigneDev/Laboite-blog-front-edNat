FROM hub.eole.education/proxyhub/library/node:12-alpine
ENV PORT=4000
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm rebuild node-sass
RUN npm install --save
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
