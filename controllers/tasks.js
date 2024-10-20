// controller trong một ứng dụng Express được sử dụng để quản lý các thao tác liên quan đến tài nguyên
// "tasks" (nhiệm vụ/công việc). Mỗi hàm trong file này đại diện cho một chức năng trong ứng dụng,
// ví dụ như lấy tất cả các nhiệm vụ, tạo mới, sửa đổi, hay xóa một nhiệm vụ.
// Các hàm này tương tác với MongoDB thông qua một model Task, được định nghĩa trong models/Task.js.
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-errors");

// Chức năng: Lấy toàn bộ danh sách nhiệm vụ từ cơ sở dữ liệu.
// Cách hoạt động:
// Task.find({}): Truy vấn toàn bộ các nhiệm vụ trong collection tasks của MongoDB.
// Sau khi lấy xong, nó trả về một đối tượng JSON chứa danh sách các nhiệm vụ với mã trạng thái 200 (thành công).
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// Chức năng: Tạo một nhiệm vụ mới từ dữ liệu mà client gửi lên.
// Cách hoạt động:
// Task.create(req.body): Tạo một tài liệu (document) mới trong collection tasks dựa trên dữ liệu từ req.body (phần thân yêu cầu).
// Sau khi tạo thành công, trả về nhiệm vụ mới với mã trạng thái 201 (tạo mới thành công).
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// Chức năng: Lấy một nhiệm vụ cụ thể dựa trên ID từ yêu cầu.
// Cách hoạt động:
// req.params: Lấy ID của nhiệm vụ từ tham số URL.
// Task.findOne({ _id: taskID }): Tìm một nhiệm vụ với ID cụ thể trong cơ sở dữ liệu.
// Nếu không tìm thấy nhiệm vụ, hàm sẽ tạo ra một lỗi tùy chỉnh thông qua createCustomError với mã lỗi 404 (không tìm thấy).
// Nếu tìm thấy, trả về nhiệm vụ với mã trạng thái 200.
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

// Chức năng: Xóa một nhiệm vụ dựa trên ID từ yêu cầu.
// Cách hoạt động:
// Task.findOneAndDelete({ _id: taskID }): Tìm và xóa nhiệm vụ dựa trên ID.
// Nếu không tìm thấy nhiệm vụ, trả về lỗi 404.
// Nếu thành công, trả về nhiệm vụ đã xóa với mã trạng thái 200.
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  // res.status(200).json({ task: null, status: "success" });
  res.status(200).json({ task });
});

// Chức năng: Cập nhật một nhiệm vụ dựa trên ID, chỉ cập nhật những trường thay đổi.
// Cách hoạt động:
// Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true }): Tìm nhiệm vụ theo ID và cập nhật nó dựa trên dữ liệu từ req.body. new: true trả về tài liệu đã được cập nhật, runValidators: true để kiểm tra các giá trị mới có hợp lệ hay không.
// Nếu không tìm thấy nhiệm vụ, trả về lỗi 404.
// Nếu thành công, trả về nhiệm vụ đã cập nhật với mã trạng thái 200.
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

// Chức năng: Thay thế toàn bộ nội dung của một nhiệm vụ.
// Cách hoạt động:
// Tương tự updateTask, nhưng với tùy chọn overwrite: true, nghĩa là toàn bộ tài liệu sẽ bị thay thế bởi dữ liệu mới.
// Nếu không tìm thấy nhiệm vụ, trả về lỗi 404.
// Nếu thành công, trả về nhiệm vụ đã được thay thế với mã trạng thái 200.
const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
