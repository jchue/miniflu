# Separate container for client build
FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN npm install \
    && cd ./client \
    && npm install
RUN npm run build

# Runtime container
FROM node:alpine AS runner
WORKDIR /app
COPY . .
COPY --from=builder /app/build ./build
RUN rm -rf ./client
RUN npm install --production
EXPOSE 3001
ENV NODE_ENV=production
CMD ["npm", "run", "start"]