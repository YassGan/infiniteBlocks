FROM node:18-alpine
WORKDIR /app
# Install dependencies based on the preferred package manager
COPY . ./
RUN yarn
RUN yarn build
EXPOSE 3000
ENV PORT 3000
CMD ["yarn", "start"]