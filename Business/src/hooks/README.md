# Hooks Management

Thư mục này chứa các custom hooks để quản lý các service và logic nghiệp vụ của ứng dụng. Hooks được tạo ra để đơn giản hóa việc gọi API và quản lý state trong các component.

## Danh sách Hooks

### 1. useMailService
Hook quản lý việc gửi email và các trạng thái liên quan.

**Ví dụ sử dụng:**
```jsx
import { useMailService } from '../hooks';

const MyComponent = () => {
  const {
    sendEmail,
    sendTemplateEmail,
    loading,
    error,
    success,
    EMAIL_TEMPLATES
  } = useMailService();

  const handleSendEmail = async () => {
    const result = await sendEmail({
      to: 'recipient@example.com',
      subject: 'Hello',
      body: 'This is a test email',
      isHtml: false
    });

    if (result.success) {
      // Email was sent successfully
    }
  };

  return (
    <div>
      <button onClick={handleSendEmail} disabled={loading}>
        {loading ? 'Sending...' : 'Send Email'}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Email sent successfully!</p>}
    </div>
  );
};
```

### 2. useJobPostingService
Hook quản lý các hoạt động liên quan đến đăng tin tuyển dụng.

**Ví dụ sử dụng:**
```jsx
import { useJobPostingService } from '../hooks';

const JobPostingForm = () => {
  const {
    formData,
    updateFormData,
    submitForm,
    saveDraft,
    loading,
    submitting,
    error,
    success
  } = useJobPostingService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submitForm();
    if (result.success) {
      // Handle success
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="jobTitle"
        value={formData?.jobTitle || ''}
        onChange={handleChange}
      />
      {/* Other form fields */}

      <div className="buttons">
        <button type="button" onClick={saveDraft} disabled={loading}>
          Lưu bản nháp
        </button>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Đăng tin tuyển dụng'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">Thao tác thành công!</p>}
    </form>
  );
};
```

### 3. useEmployerManagement
Hook quản lý các hoạt động liên quan đến thông tin nhà tuyển dụng.

**Ví dụ sử dụng:**
```jsx
import { useEmployerManagement } from '../hooks';

const EmployerForm = () => {
  const {
    formData,
    handleChange,
    handleFileUpload,
    handleSubmit,
    saveDraft,
    isLoading,
    isSaving,
    errors,
    industries,
    provinces,
    districts,
    saveSuccess
  } = useEmployerManagement();

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tên công ty</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName || ''}
          onChange={handleChange}
          className={errors.companyName ? 'error' : ''}
        />
        {errors.companyName && <span className="error-text">{errors.companyName}</span>}
      </div>

      <div className="form-group">
        <label>Ngành nghề</label>
        <select
          name="industry"
          value={formData.industry || ''}
          onChange={handleChange}
        >
          <option value="">Chọn ngành nghề</option>
          {industries.map(industry => (
            <option key={industry.id} value={industry.id}>
              {industry.name}
            </option>
          ))}
        </select>
        {errors.industry && <span className="error-text">{errors.industry}</span>}
      </div>

      <div className="form-group">
        <label>Logo công ty</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload('logo', e.target.files[0])}
        />
        {errors.logo && <span className="error-text">{errors.logo}</span>}
      </div>

      {/* Other form fields */}

      <div className="buttons">
        <button type="button" onClick={saveDraft} disabled={isSaving}>
          Lưu bản nháp
        </button>
        <button type="submit" disabled={isSaving || isLoading}>
          {isSaving ? 'Đang lưu...' : 'Lưu thông tin'}
        </button>
      </div>

      {saveSuccess && <div className="success-message">Đã lưu thông tin thành công!</div>}
    </form>
  );
};
```

## Ưu điểm của việc sử dụng Hooks

1. **Tách biệt các logic nghiệp vụ** khỏi các components, giúp components tập trung vào việc hiển thị UI
2. **Tái sử dụng logic** trên nhiều components khác nhau
3. **Quản lý state** một cách hiệu quả và nhất quán
4. **Dễ dàng testing** các logic nghiệp vụ mà không cần phải testing toàn bộ component
5. **Giảm sự phụ thuộc** trực tiếp vào các service, giúp việc thay đổi hoặc mock service dễ dàng hơn

## Cách thêm Hook mới

1. Tạo file mới trong thư mục `hooks` với tên theo quy ước `use[TênHook].js`
2. Implement logic của hook, sử dụng các hooks của React như `useState`, `useEffect`, `useCallback`, etc.
3. Xuất hook và cập nhật file `index.js` để export hook mới
4. Viết tài liệu hướng dẫn sử dụng trong README.md này
