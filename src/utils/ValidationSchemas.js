import * as yup from "yup";

// Reusable Fields
const testShema = yup.string().required();
const emailSchema = yup
  .string()
  .email("Invalid email format")
  .required("Please enter email");

const passwordSchema = yup
  .string()
  .min(6, "Password must be at least 6 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[@$!%*?&]/,
    "Password must contain at least one special character (@$!%*?&)"
  )
  .required("Enter your password");


// Password Reset
export const inputEmailSchema = yup.object().shape({
  email: emailSchema,
});
export const inputNewPasswordSchema = yup.object().shape({
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

// Login Personal & Business (Same Schema)
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  // test: testShema,
});

// Signup Personal
export const signUpPersonalSchema = yup.object().shape({
  userName: yup.string().required("Please enter user name"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

// Signup Business (Different rules)
export const signUpBusinessSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema.min(
    8,
    "Business password must be at least 8 characters"
  ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
  businessName: yup.string().required("Please enter business name"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Please enter phone number"),
});
