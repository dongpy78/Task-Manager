const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
// Load tasks from /api/tasks

// Mục đích: Hàm này tải danh sách tasks từ API và hiển thị lên giao diện.
// Cách hoạt động:
// Hiển thị loadingDOM để báo rằng dữ liệu đang được tải.
// Sử dụng axios.get('/api/v1/tasks') để gọi API lấy danh sách tasks.
// Nếu không có task nào (tasks.length < 1), hiển thị thông báo "No tasks in your list".
// Nếu có tasks, nó sẽ dùng .map() để duyệt qua từng task và tạo HTML cho mỗi task.
// Mỗi task hiển thị tên và hai nút: edit (chỉnh sửa) và delete (xóa).
// Sau khi hoàn thành, ẩn loadingDOM.
const showTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && "task-completed"}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks();

// delete task /api/tasks/:id
// Mục đích: Xử lý việc xóa task khi người dùng nhấn nút "Delete".
// Cách hoạt động:
// Khi người dùng nhấn vào bất kỳ nút nào trong tasksDOM, sự kiện click được kích hoạt.
// Nếu nút nhấn là nút "Delete", mã sẽ lấy id của task từ thuộc tính data-id và gửi yêu cầu axios.delete tới API để xóa task đó.
// Sau khi xóa thành công, hàm showTasks() được gọi lại để tải danh sách tasks mới.
tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
