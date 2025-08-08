FROM node:20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173 5273

CMD ["npm", "run", "dev", "--", "--host"]

# Vite’s build step, Compiles TypeScript/JSX, Outputs a production-ready dist/ folder
# RUN npm run build

# RUN npm install -g http-server


# CMD ["http-server", "dist", "-p", "8888"]

# #MULTISTAGE BUILD FOR SMALLER IMAGE SIZE
# # Stage 1: Build
# FROM node:18 as builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Serve
# FROM node:18-slim
# RUN npm install -g http-server
# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# EXPOSE 8888
# CMD ["http-server", "dist", "-p", "8888"]
