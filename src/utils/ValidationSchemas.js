import * as yup from "yup";

// Reusable Fields
const emailSchema = yup
  .string()
  .email("Invalid email format")
  .required("Please enter email");

const passwordSchema = yup
  .string()
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
  .matches(/[A-Z]/, "Mật khẩu phải chứa chữ hoa")
  .matches(/[a-z]/, "Mật khẩu phải chứa chữ thường")
  .matches(/[0-9]/, "Mật khẩu phải chứa số")
  .matches(
    /[@$!%*?&]/,
    "Mật khẩu phải chứa ký tự đặc biệt"
  )
  .required("Vui lòng nhập mật khẩu");


// Password Reset
export const inputEmailSchema = yup.object().shape({
  email: emailSchema,
});
export const inputNewPasswordSchema = yup.object().shape({
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

// Login Personal & Business (Same Schema)
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

// Signup Personal
export const signUpPersonalSchema = yup.object().shape({
  userName: yup.string().required("Vui lòng nhập tên"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),  
});

// Signup Business (Different rules)
export const signUpBusinessSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
  businessName: yup.string().required("Vui lòng nhập tên"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
});
