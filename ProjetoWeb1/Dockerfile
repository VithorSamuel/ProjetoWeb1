from node:alpine AS build
workdir /usr/app
copy package*.json ./
run npm install 

copy . .

expose 3000

cmd ["node", "app.js"]