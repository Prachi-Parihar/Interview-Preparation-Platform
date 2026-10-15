
FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./services/interviewService/package*.json ./services/interviewService/

RUN cd services/interviewService && npm install

COPY services/interviewService ./services/interviewService

COPY shared ./shared

WORKDIR /app/services/interviewService

EXPOSE 8003

CMD ["npm", "start"]
