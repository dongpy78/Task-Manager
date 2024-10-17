// Mongoose là một thư viện giúp tương tác với MongoDB dễ dàng hơn bằng cách cung cấp các Schema và Model.
// Schema: Quy định cấu trúc của các tài liệu (documents) trong MongoDB.
// Model: Dùng để thao tác với cơ sở dữ liệu, ví dụ: thêm, sửa, xóa, và tìm kiếm dữ liệu.
const mongoose = require("mongoose");

// Phân tích Schema:
// 1. name:
// type: String: Thuộc tính này phải là một chuỗi (text).
// required: [true, "must provide name"]: Bắt buộc phải cung cấp tên. Nếu không, sẽ báo lỗi với thông báo "must provide name".
// trim: true: Loại bỏ khoảng trắng ở đầu và cuối chuỗi khi lưu vào cơ sở dữ liệu.
// maxlength: [20, "name can not be more than 20 characters"]: Độ dài tối đa của tên là 20 ký tự.
// Nếu vượt quá, sẽ báo lỗi với thông báo "name can not be more than 20 characters".

// 2. completed:
// type: Boolean: Thuộc tính này phải là true hoặc false.
// default: false: Nếu không cung cấp giá trị cho completed, mặc định sẽ là false (công việc chưa hoàn thành).
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// mongoose.model("Task", TaskSchema):
// Tạo ra Model có tên là Task từ TaskSchema.
// Model này sẽ đại diện cho collection có tên là tasks (Mongoose tự động thêm s vào tên model khi tạo collection).
// Export Model:

// Giúp bạn import model này ở nơi khác để thao tác với cơ sở dữ liệu.
// Ví dụ trong controllers/tasks.js, bạn có thể làm việc với model Task để tạo, đọc, cập nhật, xóa công việc.

module.exports = mongoose.model("Task", TaskSchema);
