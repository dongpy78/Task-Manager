const express = require("express");
// express.Router():
// Dùng để tạo router module.
// Router giúp quản lý các đường dẫn API gọn gàng, đặc biệt khi có nhiều route trong dự án.
const router = express.Router();

// ../controllers/tasks:
// Import các hàm xử lý logic từ file tasks.js trong thư mục controllers.
// Các hàm này sẽ thực hiện các chức năng như: lấy danh sách công việc, tạo mới, cập nhật, và xóa công việc.
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require("../controllers/tasks");

// Route /: (không có id trong URL)
// GET /api/v1/tasks: Lấy tất cả các công việc.
// → Sử dụng hàm getAllTasks.
// POST /api/v1/tasks: Tạo một công việc mới.
// → Sử dụng hàm createTask.

// Route /:id: (chứa id của công việc trong URL)
// GET /api/v1/tasks/:id: Lấy thông tin của một công việc theo ID.
// → Sử dụng hàm getTask.
// PATCH /api/v1/tasks/:id: Cập nhật một công việc dựa trên ID.
// → Sử dụng hàm updateTask (chỉ cập nhật các trường cụ thể).
// DELETE /api/v1/tasks/:id: Xóa một công việc dựa trên ID.
// → Sử dụng hàm deleteTask.

router.route("/").get(getAllTasks).post(createTask);
router
  .route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)
  .put(editTask);

module.exports = router;
