FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["node", "--env-file=.env", "app.ts"]
