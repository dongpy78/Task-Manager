// File này định nghĩa các route xử lý các yêu cầu liên quan đến tasks.
// Các yêu cầu đến /api/v1/tasks sẽ gọi đến hàm trong controllers/tasks để thực hiện
// các hành động như lấy tất cả các tasks, tạo task mới, hoặc thao tác với một task cụ thể thông qua /api/v1/tasks/:id.

const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router
  .route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)
  .put(editTask);

module.exports = router;
