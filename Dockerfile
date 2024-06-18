# Sử dụng Node.js version 18 làm base image
FROM node:20

# Tạo thư mục app
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm ci

# Sao chép toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Expose port mà ứng dụng sẽ chạy
EXPOSE 8000

# Khởi chạy ứng dụng
CMD ["npm", "node", "./dist/app.js"]