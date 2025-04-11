import { useForm } from "react-hook-form";
import LoginBannerBusiness from "../../components/LoginBannerBusiness";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/ValidationSchemas";
import Input from "../../components/BttnInput";
import BttnSignIn from "../../components/BttnSignIn";

function LoginPersonal() {
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
          >

            {/* Email Input */}
            <Input title="Email" type="email" {...register("email")} errors={errors} />
            {/* Password Input */}
            <Input title="Password" type="password" icon='lock' {...register("password")} errors={errors} />
            <div className='flex items-center justify-between mb-[2vh]'>
              <a href="/password" className='text-green-500 text-sm hover:underline'>Quên mật khẩu?</a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-green-500 text-white text-[20px] w-full h-[5vh] hover:bg-green-700 mt-[1vh] min-h-[40px]">
              Đăng Nhập
            </button>
            <p className='text-center my-[2vh] text-[#000000]'>
              Bạn chưa có tài khoản?
              <a href="/SignUpBusiness" className='text-green-600'> Đăng ký ngay</a>
            </p>
          </form>
        </div>
      </div>
      <LoginBannerBusiness/>
    </div>
  );
}

export default LoginPersonal;
