
FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./services/resumeService/package*.json ./services/resumeService/

RUN cd services/resumeService && npm install

COPY services/resumeService ./services/resumeService

COPY shared ./shared

WORKDIR /app/services/resumeService

EXPOSE 8002

CMD ["npm", "start"]
