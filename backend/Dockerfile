FROM node:14
EXPOSE $PORT
RUN mkdir /backend
WORKDIR /backend
COPY package.json ./
RUN yarn install
COPY . .
RUN npx prisma generate
RUN yarn run build
CMD [ "node", "." ]
