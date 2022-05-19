# stage build
FROM hub.eole.education/proxyhub/library/node:16-alpine

# install dependencies
WORKDIR /app
COPY package.json  yarn.lock  ./
RUN yarn install   

# Copy all local files into the image.
COPY . .

RUN npm run build

###
# Only copy over the Node pieces we need
###
FROM hub.eole.education/proxyhub/library/node:16-alpine

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 3000
CMD ["node", "./build"]
