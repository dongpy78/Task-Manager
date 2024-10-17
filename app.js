// express: Là một framework phổ biến của Node.js giúp xây dựng các ứng dụng web nhanh chóng và dễ dàng.
const express = require("express");
// app: Khởi tạo một ứng dụng Express.
const app = express();
// tasks: import các route (đường dẫn API) từ file tasks.js trong thư mục routes.
const tasks = require("./routes/tasks");
// connectDB: Hàm dùng để kết nối đến MongoDB (nằm trong file connect.js trong thư mục db).
const connectDB = require("./db/connect");
// dotenv: Dùng để đọc biến môi trường từ file .env. File này giúp bảo mật thông tin nhạy cảm (như chuỗi kết nối database).
require("dotenv").config();

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// middleware]
// express.static("./public"): Cho phép Express phục vụ các file tĩnh (HTML, CSS, JS, ảnh) từ thư mục public.
app.use(express.static("./public"));
// express.json(): Cho phép ứng dụng hiểu và xử lý dữ liệu JSON từ body của request
app.use(express.json());

app.use("/api/v1/tasks", tasks);
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
