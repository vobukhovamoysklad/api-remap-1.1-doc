FROM node:alpine

RUN npm config set user 0 && \
    npm config set unsafe-perm true && \
    npm install -g aglio@latest

ENTRYPOINT ["aglio"]
