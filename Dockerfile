FROM hub.eole.education/proxyhub/library/node:14.18.1-alpine
RUN apk add git gcc openssh-client libsass
WORKDIR /app
COPY --chown=node . .
RUN yarn install
RUN npm rebuild node-sass
RUN yarn install --save
RUN npm run build

FROM hub.eole.education/proxyhub/library/node:14.18.1-alpine
ENV PORT=4000
ENV NODE_ENV=production
WORKDIR /app
COPY --chown=node . .

# Install OS runtime dependencies
RUN apk --no-cache add \
	git \
	bash \
	ca-certificates

# Copy in app bundle with the built and installed dependencies from the previous image
COPY --chown=node --from=0 /app/__sapper__/build /app/__sapper__/build
RUN yarn install --prod
# Start app
EXPOSE ${PORT}
CMD ["npm", "start"]
