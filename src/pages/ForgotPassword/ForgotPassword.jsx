import { useForm } from "react-hook-form";
import LoginBannerPersonal from "../../components/LoginBannerPersonal";
import { yupResolver } from "@hookform/resolvers/yup";
import { inputEmailSchema } from "../../utils/ValidationSchemas";
import Input from "../../components/BttnInput";
import { useParams } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { loading, withLoading } = useLoading();
  const { forgotPasswordCandidate, forgotPasswordRecruiter } = useAuth((path) => navigate(path));
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(inputEmailSchema),
  });

  const onSubmit = async (data) => {
    await withLoading(async () => {
      if (params.role === "candidate") {
        await forgotPasswordCandidate(data);
      } else if (params.role === "recruiter") {
        await forgotPasswordRecruiter(data);
      }
    });

    // Lưu email để dùng sau ở màn nhập mật khẩu mới
    localStorage.setItem("email", data.email);
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
            <Input
              title="Email"
              type="email"
              {...register("email")}
              errors={errors}
            />

            <button
              type="submit"
              className="bg-green-500 text-white text-[20px] w-full h-[5vh] hover:bg-green-700 mt-[1vh] min-h-[40px]"
            >
              Tạo lại mật khẩu
            </button>

            <div className="flex justify-between my-[2vh]">
              <p>
                <a href={`/signup/${params.role}`} className="text-green-600 hover:underline">
                  Đăng ký tài khoản mới
                </a>
              </p>
              <p>
                <a href={`/login/${params.role}`} className="text-green-600 hover:underline">
                  Quay lại trang đăng nhập
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <LoginBannerPersonal />
    </div>
  );
}
