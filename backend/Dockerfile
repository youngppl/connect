FROM node:14
EXPOSE 5000
EXPOSE $PORT
RUN mkdir /backend
WORKDIR /backend
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build
RUN npx prisma generate
CMD [ "node", "." ]
