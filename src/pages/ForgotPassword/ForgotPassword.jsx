import { useForm } from "react-hook-form";
import LoginBannerPersonal from "../../components/LoginBannerPersonal";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/ValidationSchemas";
import Input from "../../components/BttnInput";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

  };

  return (
    <div className="flex flex-col relative">
      <div className="ContentLeft w-4/6 max-lg:w-full max-md:h-full max-lg:mt-[15%] ">
        <div className="flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 lg:rounded lg:shadow-md flex flex-col justify-center w-full max-w-[500px] mx-auto"
            method="POST"
          >

            {/* Email Input */}
            <Input title="Email" type="email" {...register("email")} errors={errors} />
            <button type="submit" className="bg-green-500 text-white text-[20px] w-full h-[5vh] hover:bg-green-700 mt-[1vh] min-h-[40px]">
              Tạo lại mật khẩu
            </button>
            <div className="flex justify-between my-[2vh]">
            <p >
              <a href="/SignUp" className='text-green-600 hover:underline'> Đăng ký tài khoản mới</a>
            </p>
            <p>
            <a href="/" className="text-green-600 hover:underline">Quay lại trang đăng nhập</a>
            </p>
            </div>
          </form>
        </div>
      </div>
      <LoginBannerPersonal />
    </div>
  );
}