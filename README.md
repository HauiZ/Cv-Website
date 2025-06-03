# CV Website - React + Vite

Đây là một ứng dụng web được xây dựng bằng React và Vite, cho phép người dùng tạo và quản lý CV trực tuyến một cách chuyên nghiệp. Dự án tập trung vào việc cung cấp nền tảng kết nối giữa ứng viên và nhà tuyển dụng, với các công cụ quản lý CV và tuyển dụng hiệu quả.

## 📝 Giới thiệu

Dự án CV Website là một nền tảng toàn diện kết nối ứng viên và nhà tuyển dụng, cung cấp:
- Hệ thống quản lý người dùng đa dạng (ứng viên/nhà tuyển dụng)
- Nền tảng đăng tin và tìm kiếm việc làm thông minh
- Công cụ tạo và quản lý CV chuyên nghiệp
- Hệ thống ứng tuyển và theo dõi trạng thái
- Dashboard thống kê và báo cáo

## 🚀 Tính năng chính

### 👤 Quản lý người dùng
- **Đăng ký và Xác thực:**
  - Đăng ký tài khoản (Ứng viên/Nhà tuyển dụng)
  - Đăng nhập với email/password
  - Đăng nhập bằng Google OAuth 2.0
  - Quên mật khẩu (OTP qua email)
  - Đổi mật khẩu

- **Quản lý thông tin:**
  - Cập nhật thông tin cá nhân
  - Quản lý hồ sơ công ty (cho nhà tuyển dụng)
  - Upload và quản lý avatar

### 💼 Quản lý tin tuyển dụng
- **Đăng tin và Quản lý:**
  - Đăng tin tuyển dụng mới
  - Cập nhật thông tin tin tuyển dụng
  - Xóa tin tuyển dụng
  - Quản lý trạng thái tin 

- **Tìm kiếm và Lọc:**
  - Tìm kiếm theo từ khóa
  - Lọc theo:
    - Chuyên môn
    - Khu vực
    - Kinh nghiệm
    - Cấp bậc
    - Mức lương
    - Loại hình công việc
  - Sắp xếp theo:
    - Kinh nghiệm
    - Mức lương
    - Ngày đăng

### 📝 Quản lý CV
- **Tạo và Chỉnh sửa:**
  - Tạo CV từ template có sẵn
  - Upload CV từ file
  - Tùy chỉnh giao diện CV

- **Template và Tùy chỉnh:**
  - Thư viện template CV đa dạng
  - Thêm/xóa các phần trong CV
  - Xuất CV dưới dạng PDF

### 📨 Quản lý ứng tuyển
- **Ứng viên:**
  - Ứng tuyển vào vị trí
  - Theo dõi trạng thái ứng tuyển
  - Nhận thông báo cập nhật
  - Quản lý lịch sử ứng tuyển

- **Nhà tuyển dụng:**
  - Xem danh sách ứng viên
  - Duyệt/từ chối ứng viên
  - Gửi phản hồi cho ứng viên
  - Quản lý quy trình tuyển dụng

### 🏢 Quản lý công ty
- **Thông tin công ty:**
  - Xem danh sách công ty
  - Thông tin chi tiết công ty

- **Quản lý hồ sơ:**
  - Cập nhật thông tin công ty
  - Upload logo và hình ảnh
  - Quản lý tin tuyển dụng
  - Thống kê và báo cáo

### 🔔 Hệ thống thông báo
- **Thông báo**
  - Thông báo cho ứng viên
  - Thông báo cho nhà tuyển dụng
  - Email notifications

### 📊 Dashboard
- **Admin Dashboard:**
  - Thống kê người dùng
  - Thống kê tin tuyển dụng
  - Báo cáo hoạt động
  - Quản lý hệ thống

- **Nhà tuyển dụng:**
  - Thống kê ứng viên
  - Báo cáo hiệu quả tuyển dụng
  - Phân tích dữ liệu
  - Quản lý tin tuyển dụng

## 🛠️ Công nghệ sử dụng

- **Frontend Framework:** React
- **Build Tool:** Vite
- **Styling:** 
  - Tailwind CSS
  - Styled Components
  - Ant Design
- **Form Handling:** React Hook Form với Yup validation
- **Routing:** React Router DOM
- **PDF Generation:** @react-pdf/renderer
- **Icons:** Font Awesome, React Icons
- **Animation:** React Spring
- **HTTP Client:** Axios

## 📦 Cài đặt và Chạy

1. Clone repository:
```bash
git clone [https://github.com/HauiZ/Cv-Website.git]
cd cv-website
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm run dev
```

## 🏗️ Cấu trúc dự án

```
src/
├── assets/        # Images, fonts, và các tài nguyên tĩnh
├── components/    # Các component có thể tái sử dụng
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── pages/         # Các trang của ứng dụng
├── router/        # Cấu hình routing
├── services/      # API services
└── utils/         # Utility functions
```

## 🧪 Scripts

- `npm run dev` - Chạy development server

## 📚 Tài liệu tham khảo

Dự án được xây dựng dựa trên template React + Vite với các plugin chính thức:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) sử dụng [Babel](https://babeljs.io/) cho Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) sử dụng [SWC](https://swc.rs/) cho Fast Refresh

## 📝 License

ISC License
