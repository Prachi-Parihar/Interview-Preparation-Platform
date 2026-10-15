
FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./services/roadmapService/package*.json ./services/roadmapService/

RUN cd services/roadmapService && npm install

COPY services/roadmapService ./services/roadmapService

COPY shared ./shared

WORKDIR /app/services/roadmapService

EXPOSE 8004

CMD ["npm", "start"]
