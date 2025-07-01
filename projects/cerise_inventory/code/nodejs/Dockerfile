FROM node:18 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run prisma generate
RUN yarn run build

FROM node:18

ENV NODE_ENV production
RUN apt-get update && apt-get -y install musl-dev
RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

COPY --from=builder /usr/src/app/ .

EXPOSE 3000
CMD [ "node", "./dist/src/index.js" ]
