import { useForm } from "react-hook-form";
import LoginBannerPersonal from "../../components/LoginBannerPersonal";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/ValidationSchemas";
import Input from "../../components/BttnInput";
import BttnSignIn from "../../components/BttnSignIn";
import useLoading from "../../hooks/useLoading";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";  // Make sure to import from react-router-dom
import { faLock } from "../../utils/fontAwsomeLib";
import useAuth from "../../hooks/useAuth";

function LoginPersonal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const { loading, withLoading } = useLoading();
  // Pass the navigation function to useAuth
  const { loginCandidate } = useAuth((path) => navigate(path));  

  const onSubmit = async (data) => {
    await withLoading(async () => {
      await new Promise((res) => setTimeout(res, 2000)); // fake delay
      await loginCandidate(data);
    });
  };

  return (
    <div className="flex flex-col relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl">
          <Loader />
        </div>
      </div>
      )}

      <div className="ContentLeft w-4/6 max-lg:w-full max-md:h-full max-lg:mt-[15%]">
        <div className="flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 lg:rounded lg:shadow-md flex flex-col justify-center w-full max-w-[500px] mx-auto"
            method="POST"
          >
            {/* Email Input */}
            <Input title="Email" type="email" {...register("email")} errors={errors} />

            {/* Password Input */}
            <Input title="Password" type="password" icon={faLock} {...register("password")} errors={errors} />

            <div className="flex items-center justify-between mb-[2vh]">
              <BttnSignIn />
              <a href="/forgotPassword/candidate" className="text-green-500 text-sm hover:underline">Quên mật khẩu?</a>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white text-[20px] w-full h-[5vh] hover:bg-green-700 mt-[1vh] min-h-[40px]"
            >
              Đăng Nhập
            </button>

            <p className="text-center my-[2vh] text-[#000000]">
              Bạn chưa có tài khoản?
              <a href="/signup/candidate" className="text-green-600 hover:underline"> Đăng ký ngay</a>
            </p>
          </form>
        </div>
      </div>

      <LoginBannerPersonal />
    </div>
  );
}

export default LoginPersonal;