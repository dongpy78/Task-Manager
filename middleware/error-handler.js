// errorHandlerMiddleware chịu trách nhiệm kiểm tra xem lỗi có phải là một lỗi tùy chỉnh (custom error)
// hay không và phản hồi cho người dùng với mã trạng thái HTTP và thông báo lỗi phù hợp.
// Nếu lỗi không phải là lỗi tùy chỉnh, nó sẽ trả về một thông báo lỗi mặc định với mã trạng thái 500 (lỗi từ server).

// CustomAPIError là một lớp lỗi tùy chỉnh (custom error class) có thể định nghĩa trong một file khác (ở đây là custom-errors.js).
// Lớp này cho phép tạo ra các lỗi có thông tin chi tiết hơn (như mã trạng thái và thông báo lỗi), thay vì chỉ sử dụng lỗi mặc định.
const { CustomAPIError } = require("../errors/custom-errors");

// Đối số:
// err: Lỗi phát sinh từ các đoạn mã xử lý trước đó.
// req: Đối tượng yêu cầu (request) trong Express.
// res: Đối tượng phản hồi (response) trong Express.
// next: Hàm tiếp theo trong chuỗi middleware của Express, giúp chuyển tiếp điều khiển khi cần thiết.
// Cách hoạt động:
// Kiểm tra loại lỗi:
// Kiểm tra xem lỗi có phải là một instance của CustomAPIError hay không (sử dụng instanceof).
// Nếu đúng, nó trả về phản hồi với mã trạng thái HTTP và thông báo lỗi từ lỗi tùy chỉnh.
// err.statusCode: Mã trạng thái HTTP được định nghĩa trong lớp CustomAPIError.
// err.message: Thông báo lỗi được định nghĩa trong lớp CustomAPIError.
// Lỗi không phải là CustomAPIError:
// Nếu lỗi không phải là một CustomAPIError, nó sẽ trả về phản hồi với mã trạng thái HTTP 500 (lỗi từ server).
// Thông báo mặc định là "Something went wrong, please try again",
// điều này có nghĩa là lỗi không được chỉ định rõ ràng nên hệ thống sẽ trả về lỗi server tổng quát.
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
