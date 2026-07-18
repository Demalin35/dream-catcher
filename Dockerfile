FROM node:20
WORKDIR /Documents
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3001
CMD ["npm", "start"]