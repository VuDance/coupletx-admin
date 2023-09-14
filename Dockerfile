FROM node:16
WORKDIR /vudance/coupletx-admin
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
CMD  ["npm","run","start" ]