FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Install Serverless Framework globally
RUN npm install -g serverless

COPY . .

CMD ["sls", "offline"]
