import { useForm } from "react-hook-form";
import LoginBannerPersonal from "../../components/LoginBannerPersonal";
import { yupResolver } from "@hookform/resolvers/yup";
import { inputNewPasswordSchema } from "../../utils/ValidationSchemas";
import Input from "../../components/BttnInput";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useLoading from "../../hooks/useLoading";
import Loader from "../../components/Loader";
import { faLock } from "../../utils/fontAwsomeLib";

export default function InputNewPassword() {
  const navigate = useNavigate();
  const { loading, withLoading } = useLoading();
  const { inputNewPassword } = useAuth((path) => navigate(path));
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(inputNewPasswordSchema),
  });

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(5*60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const onSubmit = async (data) => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Không tìm thấy email để đặt lại mật khẩu.");
      return;
    }

    await withLoading(async () => {
      console.log(">>>>>>>>>>>data", params.role);
      await inputNewPassword({
        email,
        role: params.role,
        otpCode: otp,
        newPassword: data.password,
        confirmNewPassword: data.confirmPassword,
      });
    });

    // localStorage.removeItem("email");
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
            {/* OTP Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhập mã OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Mã OTP"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className={`text-sm mt-1 ${timeLeft > 0 ? "text-green-600" : "text-red-500"}`}>
                {timeLeft > 0
                  ? `Mã OTP còn hiệu lực trong ${formatTime(timeLeft)}`
                  : "Mã OTP đã hết hạn. Vui lòng yêu cầu lại."}
              </p>
            </div>

            <Input
              title="Password"
              type="password"
              icon={faLock}
              {...register("password")}
              errors={errors}
            />
            <Input
              title="Confirm Password"
              type="password"
              icon={faLock}
              {...register("confirmPassword")}
              errors={errors}
            />

            <button
              type="submit"
              className="bg-green-500 text-white text-[20px] w-full h-[5vh] hover:bg-green-700 mt-[1vh] min-h-[40px]"
              disabled={timeLeft <= 0}
            >
              Tạo mật khẩu mới
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
