//express: Đây là một framework phổ biến cho Node.js, giúp xây dựng các ứng dụng web một cách dễ dàng và nhanh chóng.
const express = require("express");

// Là một đối tượng đại diện cho ứng dụng web.
// Tất cả các cấu hình và định nghĩa route (đường dẫn) sẽ được thực hiện trên đối tượng này.
const app = express();

// tasks: Đây là module chứa các route liên quan đến "tasks" (nhiệm vụ) của ứng dụng.
const tasks = require("./routes/tasks");

// connectDB: Hàm này kết nối tới cơ sở dữ liệu MongoDB.
// Cơ sở dữ liệu của bạn được xác định bằng biến môi trường (được lưu trong .env)
const connectDB = require("./db/connect");

// dotenv.config(): Giúp load các biến môi trường từ file .env để sử dụng trong ứng dụng,
// chẳng hạn như chuỗi kết nối đến MongoDB (process.env.MONGO_URI).
require("dotenv").config();

// notFound và errorHandlerMiddleware: Đây là các middleware để xử lý
// các lỗi không tìm thấy đường dẫn và các lỗi khác trong ứng dụng.
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// express.static("./public"): Đây là middleware phục vụ các file tĩnh (HTML, CSS, JS client-side)
// từ thư mục public. Khi có yêu cầu tới các file tĩnh, Express sẽ tìm trong thư mục này.
app.use(express.static("./public"));

// express.json(): Middleware này giúp parse dữ liệu JSON từ request body, đặc biệt hữu ích khi làm việc với các API.
app.use(express.json());

// định nghĩa route cho API liên quan đến "tasks". Khi có request bắt đầu bằng /api/v1/tasks,
// các route trong module tasks sẽ xử lý. Ví dụ, có thể có các route như GET, POST, PUT, DELETE cho /api/v1/tasks.
app.use("/api/v1/tasks", tasks);

// Đây là một middleware chuyên xử lý các lỗi xảy ra trong ứng dụng và trả về phản hồi phù hợp cho client.
app.use(errorHandlerMiddleware);

// notFound: Đây là middleware xử lý các yêu cầu không tìm thấy (404).
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
