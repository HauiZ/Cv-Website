import LoginBannerPersonal from "../../components/LoginBannerPersonal";
import Input from "../../components/BttnInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpPersonalSchema } from "../../utils/ValidationSchemas";
import { useForm } from "react-hook-form";
import useLoading from "../../hooks/useLoading";
import Loader from "../../components/Loader";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";  // Make sure to import from react-router-dom
import { faUser, faLock } from "../../utils/fontAwsomeLib";
import useAuth from "../../hooks/useAuth";

function SignUpPersonal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signUpPersonalSchema),
  });
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  // Pass the navigation function to useAuth
  const { signUpCandidate } = useAuth((path) => navigate(path));

  const onSubmit = async (data) => {
    await withLoading(async () => {
      await new Promise((res) => setTimeout(res, 2000)); // fake delay
      await signUpCandidate(data);
    });
  };
  

  return (
    <div className="flex flex-col relative">
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl">
            <Loader />
          </div>
        </div>
      )}
      <div className="flex flex-col relative">
        <div className="ContentLeft w-4/6 max-lg:w-full max-md:h-full max-lg:mt-[20%] ">
          <div className="flex items-center justify-center min-h-screen">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-6 lg:rounded lg:shadow-md flex flex-col justify-center w-full max-w-[500px] mx-auto"
            >
              <Input
                title="User Name"
                type="text"
                icon={faUser}
                {...register("userName")}
                errors={errors}
              />
              <Input
                title="Email"
                type="email"
                {...register("email")}
                errors={errors}
              />
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
              >
                Đăng Ký
              </button>
              <p className="text-center my-4 text-[#000000]">
                Bạn có tài khoản?
                <a href="/login/candidate" className="text-green-600 hover:underline">
                  {" "}
                  Đăng nhập ngay
                </a>
              </p>
            </form>
          </div>
        </div>
        <LoginBannerPersonal />
      </div>
    </div>
  );
}

export default SignUpPersonal;