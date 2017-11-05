FROM node

WORKDIR /app

COPY server .

RUN npm install

ENV PORT 80
EXPOSE 80

CMD node dist