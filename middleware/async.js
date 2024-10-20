// asyncWrapper là một hàm wrapper (bao bọc) dùng để bọc các hàm async mà bạn sẽ sử dụng trong các route của ứng dụng Express.
// Nó giúp tự động xử lý lỗi trong các hàm này mà không cần phải lặp lại mã lỗi (error handling) cho mỗi hàm.

// asyncWrapper nhận vào một hàm bất đồng bộ fn (có thể là một controller trong Express).
// Nó trả về một hàm async mới với ba đối số: req (request), res (response), và next (để chuyển tiếp đến middleware tiếp theo).
// Bên trong, hàm này sử dụng try-catch:
// try: Thực thi hàm fn (hàm gốc) bằng cách chờ await cho nó hoàn thành.
// catch (error): Nếu có lỗi xảy ra, thay vì trả lỗi trực tiếp, nó sẽ chuyển lỗi đó cho middleware xử lý lỗi của Express thông qua hàm next(error).
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;

// Tại sao cần asyncWrapper?
// Trong Express, các hàm bất đồng bộ (async) có thể gây ra lỗi không được xử lý đúng nếu không dùng try-catch.
// Nếu một lỗi xảy ra mà không có try-catch, ứng dụng của bạn sẽ bị crash (dừng lại).
// Để tránh việc phải viết try-catch ở mỗi hàm xử lý (controller), asyncWrapper giúp đơn giản hóa việc xử lý lỗi.

// Ví dụ, thay vì viết như thế này trong một route:
// app.get("/tasks", async (req, res, next) => {
//   try {
//     const tasks = await Task.find();
//     res.status(200).json({ tasks });
//   } catch (error) {
//     next(error);
//   }
// });

// Có thể viết gọn lại như sau khi dùng asyncWrapper:
// app.get('/tasks', asyncWrapper(async (req, res, next) => {
//   const tasks = await Task.find();
//   res.status(200).json({ tasks });
// }));
